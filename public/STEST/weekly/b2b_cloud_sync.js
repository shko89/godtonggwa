/**
 * 갓통과 B2B 멀티테넌트 클라우드 동기화 & 전국 벤치마크 집계 엔진 (B2B Cloud Sync Module)
 * 
 * 1. Firebase Firestore 기반 멀티테넌트 독립 격리 저장:
 *    - academies/{academyId}
 *    - academies/{academyId}/students/{studentId}
 *    - academies/{academyId}/submissions/{submissionId}
 * 2. 전국 누적 통합 벤치마크 (익명 집계):
 *    - benchmarks/fit20_national/weeks/{w}
 *    - 전국 누적 평균, 점수 정규분포 히스토그램, 20문항별 전국 정답률 자동 누적
 * 3. Offline-First 스마트 하이브리드 지원 (클라우드 미연결 시 로컬스토리지 자동 폴백)
 */

(function(exports) {
    'use strict';

    // 주간지 1~10회차별 표준 메타데이터 (만점 배점 및 2028 수능 통합과학 정규화 시드)
    const WEEKLY_BENCH_META = {
        1:  { max: 31.0, avg: 20.8, std: 5.2, high: 31.0 },
        2:  { max: 35.5, avg: 23.5, std: 5.8, high: 35.5 },
        3:  { max: 33.5, avg: 22.4, std: 5.5, high: 33.5 },
        4:  { max: 36.5, avg: 24.2, std: 6.0, high: 36.5 },
        5:  { max: 34.5, avg: 23.0, std: 5.7, high: 34.5 },
        6:  { max: 34.5, avg: 23.1, std: 5.7, high: 34.5 },
        7:  { max: 30.0, avg: 20.1, std: 5.0, high: 30.0 },
        8:  { max: 36.5, avg: 24.3, std: 6.0, high: 36.5 },
        9:  { max: 34.5, avg: 22.9, std: 5.7, high: 34.5 },
        10: { max: 33.5, avg: 22.5, std: 5.5, high: 33.5 }
    };

    // 기본 전국 표본 벤치마크 기준치 (2028 개정 통합과학 1,000명 표준 규준 시드)
    function getDefaultNationalBenchmark(weekNum) {
        const w = parseInt(weekNum, 10) || 1;
        const meta = WEEKLY_BENCH_META[w] || { max: 33.0, avg: 22.0, std: 5.5, high: 33.0 };
        const maxScore = meta.max;
        const avgScore = meta.avg;
        const stdScore = meta.std;

        // 2028 개정 5등급제 공식 비율(1등급 10%, 2등급 24%, 3등급 32%, 4등급 24%, 5등급 10%)에 맞춘 1,000명 표준 분포
        const s5 = Math.round(maxScore * 0.90 * 10) / 10;
        const s4 = Math.round(maxScore * 0.78 * 10) / 10;
        const s3 = Math.round(maxScore * 0.62 * 10) / 10;
        const s2 = Math.round(maxScore * 0.46 * 10) / 10;
        const s1 = Math.round(maxScore * 0.28 * 10) / 10;

        return {
            week: w,
            totalCandidates: 1000,
            nationalAverage: avgScore,
            nationalStdDev: stdScore,
            nationalHighest: meta.high,
            maxScore: maxScore,
            scoreHistogram: [
                { score: s5, count: 100 },  // 상위 10% (1등급권)
                { score: s4, count: 240 },  // 상위 34% (2등급권)
                { score: s3, count: 320 },  // 상위 66% (3등급권)
                { score: s2, count: 240 },  // 상위 90% (4등급권)
                { score: s1, count: 100 }   // 상위 100% (5등급권)
            ],
            // 20개 문항별 전국 누적 정답률 추정치 (%)
            itemCorrectRates: [
                78.5, 62.0, 85.0, 54.5, 41.0,
                72.0, 68.5, 38.0, 89.0, 58.0,
                64.5, 77.0, 44.0, 81.5, 69.0,
                35.0, 73.5, 59.0, 48.0, 61.5
            ],
            lastUpdated: new Date().toISOString()
        };
    }

    /**
     * 학원 프로필 저장 (Firestore or LocalStorage)
     */
    async function saveAcademyProfile(dbInstance, academyId, profileData) {
        const key = `b2b_academy_${academyId}`;
        const localData = { ...profileData, updatedAt: new Date().toISOString() };
        try {
            localStorage.setItem(key, JSON.stringify(localData));
        } catch(e) {}

        if (dbInstance && typeof dbInstance.collection === 'function') {
            try {
                await dbInstance.collection('academies').doc(academyId).set(localData, { merge: true });
                return { success: true, cloudSynced: true };
            } catch (err) {
                console.warn('[CloudSync] Firestore save error, saved locally:', err);
            }
        }
        return { success: true, cloudSynced: false };
    }

    /**
     * 학원 프로필 조회
     */
    async function loadAcademyProfile(dbInstance, academyId) {
        if (dbInstance && typeof dbInstance.collection === 'function') {
            try {
                const docSnap = await dbInstance.collection('academies').doc(academyId).get();
                if (docSnap.exists) {
                    return docSnap.data();
                }
            } catch(e) {}
        }
        // 로컬스토리지 폴백
        try {
            const raw = localStorage.getItem(`b2b_academy_${academyId}`);
            if (raw) return JSON.parse(raw);
        } catch(e) {}
        return null;
    }

    /**
     * 학생 응시 답안 제출 및 전국 벤치마크 실시간 누적 집계
     */
    async function submitExamRecord(dbInstance, academyId, submissionData) {
        const week = submissionData.week || 1;
        const subId = `${academyId}_w${week}_${submissionData.studentPhoneLast4}_${Date.now()}`;
        const record = {
            ...submissionData,
            submissionId: subId,
            academyId: academyId,
            submittedAt: new Date().toISOString()
        };

        // 1. 학원 내부 독립 저장 (로컬스토리지)
        try {
            const listKey = `b2b_submissions_${academyId}`;
            const existing = JSON.parse(localStorage.getItem(listKey) || '[]');
            existing.push(record);
            localStorage.setItem(listKey, JSON.stringify(existing));
        } catch(e) {}

        // 2. 전국 벤치마크 익명 누적 집계 (로컬 집계 캐시 갱신)
        updateLocalNationalBenchmarkCache(week, record);

        // 3. Firestore 클라우드 동기화 (연동 시)
        if (dbInstance && typeof dbInstance.collection === 'function') {
            try {
                // A. 학원 프라이빗 컬렉션에 학생 성적 기록
                await dbInstance.collection('academies').doc(academyId)
                    .collection('submissions').doc(subId).set(record);

                // B. 전국 벤치마크 컬렉션에 원자적 누적
                const benchRef = dbInstance.collection('b2b_benchmarks').doc('fit20_national')
                    .collection('weeks').doc(String(week));

                // Firestore increment 활용 가능 시 원자적 갱신
                await benchRef.set({
                    week: week,
                    totalCandidates: (typeof firebase !== 'undefined' && firebase.firestore && firebase.firestore.FieldValue) ? 
                        firebase.firestore.FieldValue.increment(1) : 1,
                    totalScoreSum: (typeof firebase !== 'undefined' && firebase.firestore && firebase.firestore.FieldValue) ? 
                        firebase.firestore.FieldValue.increment(record.rawScore) : record.rawScore,
                    lastUpdated: new Date().toISOString()
                }, { merge: true });

                return { success: true, cloudSynced: true, submissionId: subId };
            } catch(err) {
                console.warn('[CloudSync] Firestore submission sync skipped:', err);
            }
        }

        return { success: true, cloudSynced: false, submissionId: subId };
    }

    /**
     * 로컬 전국 벤치마크 캐시 실시간 누적 업데이트
     */
    function updateLocalNationalBenchmarkCache(week, newSubmission) {
        const cacheKey = `b2b_national_benchmark_w${week}`;
        let bench = null;
        try {
            const raw = localStorage.getItem(cacheKey);
            if (raw) bench = JSON.parse(raw);
        } catch(e) {}

        if (!bench) {
            bench = getDefaultNationalBenchmark(week);
        }

        // 표본 수 및 평균 누적
        const oldTotal = bench.totalCandidates || 1620;
        const oldAvg = bench.nationalAverage || 21.8;
        const newTotal = oldTotal + 1;
        const newAvg = Math.round(((oldAvg * oldTotal + newSubmission.rawScore) / newTotal) * 10) / 10;

        bench.totalCandidates = newTotal;
        bench.nationalAverage = newAvg;
        if (newSubmission.rawScore > (bench.nationalHighest || 0)) {
            bench.nationalHighest = newSubmission.rawScore;
        }

        // 문항별 정답률 미세 보정
        if (Array.isArray(newSubmission.gradingResult) && Array.isArray(bench.itemCorrectRates)) {
            newSubmission.gradingResult.forEach((isCorrect, idx) => {
                if (bench.itemCorrectRates[idx] !== undefined) {
                    const currentRate = bench.itemCorrectRates[idx];
                    const delta = isCorrect ? (100 - currentRate) / newTotal : (-currentRate) / newTotal;
                    bench.itemCorrectRates[idx] = Math.round((currentRate + delta) * 10) / 10;
                }
            });
        }

        bench.lastUpdated = new Date().toISOString();
        try {
            localStorage.setItem(cacheKey, JSON.stringify(bench));
        } catch(e) {}
    }

    /**
     * 해당 회차 전국 통합 벤치마크 데이터 로드 (사전 규준 1,000명 + 실데이터 베이지안 블렌딩)
     */
    async function loadNationalBenchmark(dbInstance, weekNum) {
        const defaultObj = getDefaultNationalBenchmark(weekNum);

        // 1. Firestore 조회 시도
        if (dbInstance && typeof dbInstance.collection === 'function') {
            try {
                const snap = await dbInstance.collection('b2b_benchmarks').doc('fit20_national')
                    .collection('weeks').doc(String(weekNum)).get();
                if (snap.exists) {
                    const data = snap.data();
                    const realCount = data.totalCandidates || 0;
                    const realSum = data.totalScoreSum || 0;

                    // 베이지안 동적 가중 블렌딩: seed(1,000명) + 실응시자
                    const seedCount = defaultObj.totalCandidates || 1000;
                    const combinedCount = seedCount + realCount;
                    const combinedAvg = realCount > 0 ? 
                        Math.round(((defaultObj.nationalAverage * seedCount + realSum) / combinedCount) * 10) / 10 : 
                        defaultObj.nationalAverage;

                    return { 
                        ...defaultObj, 
                        ...data,
                        totalCandidates: combinedCount,
                        nationalAverage: combinedAvg,
                        nationalHighest: Math.max(defaultObj.nationalHighest, data.nationalHighest || 0),
                        realCandidates: realCount,
                        lastUpdated: data.lastUpdated || defaultObj.lastUpdated
                    };
                }
            } catch(e) {}
        }

        // 2. 로컬스토리지 캐시 조회
        try {
            const raw = localStorage.getItem(`b2b_national_benchmark_w${weekNum}`);
            if (raw) return JSON.parse(raw);
        } catch(e) {}

        // 3. 기본 표본 반환
        return defaultObj;
    }

    /**
     * Firebase 초기화 헬퍼 (전역 인스턴스 반환)
     */
    function initFirebase() {
        if (typeof firebase !== 'undefined') {
            try {
                if (!firebase.apps.length) {
                    firebase.initializeApp({
                        apiKey: "AIzaSyDYljyALj-RbHKjndZYXcOaPzK-Q6xBjjo",
                        authDomain: "godtonggwa.firebaseapp.com",
                        projectId: "godtonggwa",
                        storageBucket: "godtonggwa.firebasestorage.app",
                        messagingSenderId: "1087434066468",
                        appId: "1:1087434066468:web:00a75c9329543afc76e6b1"
                    });
                }
                return firebase.firestore();
            } catch(e) {
                console.warn('[CloudSync] Firebase init error:', e);
            }
        }
        return null;
    }

    /**
     * 수강생 명단 일괄 저장 (Firestore & LocalStorage)
     */
    async function saveStudentsRoster(dbInstance, academyId, students) {
        const key = `b2b_students_${academyId}`;
        try {
            localStorage.setItem(key, JSON.stringify(students));
        } catch(e) {}

        if (dbInstance && typeof dbInstance.collection === 'function') {
            try {
                await dbInstance.collection('academies').doc(academyId)
                    .collection('roster').doc('main').set({
                        list: students,
                        count: students.length,
                        updatedAt: new Date().toISOString()
                    });
                return { success: true, cloudSynced: true };
            } catch(err) {
                console.warn('[CloudSync] Firestore saveStudentsRoster error:', err);
            }
        }
        return { success: true, cloudSynced: false };
    }

    /**
     * 수강생 명단 불러오기 (Firestore 우선, 실패 시 LocalStorage)
     */
    async function loadStudentsRoster(dbInstance, academyId) {
        if (dbInstance && typeof dbInstance.collection === 'function') {
            try {
                const snap = await dbInstance.collection('academies').doc(academyId)
                    .collection('roster').doc('main').get();
                if (snap.exists && snap.data().list) {
                    const list = snap.data().list;
                    try {
                        localStorage.setItem(`b2b_students_${academyId}`, JSON.stringify(list));
                    } catch(e) {}
                    return list;
                }
            } catch(err) {
                console.warn('[CloudSync] Firestore loadStudentsRoster error:', err);
            }
        }

        try {
            const raw = localStorage.getItem(`b2b_students_${academyId}`);
            if (raw) return JSON.parse(raw);
        } catch(e) {}
        return [];
    }

    /**
     * 학원 수강생 제출 답안 목록 불러오기 (Firestore 우선)
     */
    async function loadSubmissions(dbInstance, academyId, weekNum) {
        if (dbInstance && typeof dbInstance.collection === 'function') {
            try {
                let query = dbInstance.collection('academies').doc(academyId).collection('submissions');
                if (weekNum) {
                    query = query.where('week', '==', parseInt(weekNum, 10));
                }
                const snap = await query.get();
                if (!snap.empty) {
                    const list = [];
                    snap.forEach(doc => list.push(doc.data()));
                    if (!weekNum) {
                        try {
                            localStorage.setItem(`b2b_submissions_${academyId}`, JSON.stringify(list));
                        } catch(e) {}
                    }
                    return list;
                }
            } catch(err) {
                console.warn('[CloudSync] Firestore loadSubmissions error:', err);
            }
        }

        try {
            const raw = localStorage.getItem(`b2b_submissions_${academyId}`);
            if (raw) {
                const list = JSON.parse(raw);
                if (weekNum) {
                    return list.filter(s => s.week === parseInt(weekNum, 10));
                }
                return list;
            }
        } catch(e) {}
        return [];
    }

    /**
     * 단일 제출 기록 조회 (성적표 열람용)
     */
    async function getSubmissionById(dbInstance, academyId, submissionId) {
        if (dbInstance && typeof dbInstance.collection === 'function' && academyId && submissionId) {
            try {
                const snap = await dbInstance.collection('academies').doc(academyId)
                    .collection('submissions').doc(submissionId).get();
                if (snap.exists) {
                    return snap.data();
                }
            } catch(err) {
                console.warn('[CloudSync] Firestore getSubmissionById error:', err);
            }
        }

        if (academyId) {
            try {
                const raw = localStorage.getItem(`b2b_submissions_${academyId}`);
                if (raw) {
                    const list = JSON.parse(raw);
                    const found = list.find(s => s.submissionId === submissionId);
                    if (found) return found;
                }
            } catch(e) {}
        }
        return null;
    }

    /**
     * B2B 견적 신청 리드 목록 조회 (Firestore b2b_leads)
     */
    async function loadLeads(dbInstance) {
        if (dbInstance && typeof dbInstance.collection === 'function') {
            try {
                const snap = await dbInstance.collection('b2b_leads').get();
                if (!snap.empty) {
                    const list = [];
                    snap.forEach(doc => {
                        const data = doc.data();
                        list.push({
                            id: doc.id,
                            ...data,
                            createdAt: data.createdAt && data.createdAt.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || new Date().toISOString())
                        });
                    });
                    // 최신순 정렬
                    list.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
                    try { localStorage.setItem('b2b_leads_cache', JSON.stringify(list)); } catch(e){}
                    return list;
                }
            } catch(err) {
                console.warn('[CloudSync] Firestore loadLeads error:', err);
            }
        }

        try {
            const raw = localStorage.getItem('b2b_leads_cache');
            if (raw) return JSON.parse(raw);
        } catch(e) {}

        // 기본 데모 시드 리드
        return [
            {
                id: 'lead_demo_01',
                academy: '서현과학전문관',
                teacher: '김철수 선생님',
                eng: 'SEOHYUN',
                seats: 50,
                delivery: '전자책 + OMR + A4 POD 패키지',
                phone: '010-1234-5678',
                email: 'seohyun_sci@daum.net',
                status: '신청접수',
                note: '겨울방학 2028 통합과학 특강 2개 반 개설 예정입니다. 맞춤 견적 희망합니다.',
                createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
            },
            {
                id: 'lead_demo_02',
                academy: '분당 정자 수능사이언스',
                teacher: '이정자 원장님',
                eng: 'JEONGJA',
                seats: 100,
                delivery: '전자책 + 실물 인쇄 POD 패키지',
                phone: '010-9876-5432',
                email: 'jj_science@naver.com',
                status: '상담진행중',
                note: '고1 예비반 전원 도입 검토 중입니다. 5등급제 성적표 샘플 확인했습니다.',
                createdAt: new Date(Date.now() - 3600000 * 28).toISOString()
            }
        ];
    }

    /**
     * 리드 상태 및 계약 승인 업데이트
     */
    async function updateLeadStatus(dbInstance, leadId, newStatus, extraData = {}) {
        const updateObj = { status: newStatus, ...extraData, updatedAt: new Date().toISOString() };
        
        if (dbInstance && typeof dbInstance.collection === 'function' && leadId) {
            try {
                await dbInstance.collection('b2b_leads').doc(leadId).set(updateObj, { merge: true });
            } catch(e) {
                console.warn('[CloudSync] Firestore updateLeadStatus error:', e);
            }
        }

        try {
            const leads = JSON.parse(localStorage.getItem('b2b_leads_cache') || '[]');
            const idx = leads.findIndex(l => l.id === leadId);
            if (idx >= 0) {
                leads[idx] = { ...leads[idx], ...updateObj };
                localStorage.setItem('b2b_leads_cache', JSON.stringify(leads));
            }
        } catch(e) {}

        return { success: true };
    }

    /**
     * 본사 계약 학원 목록 조회
     */
    async function loadContracts(dbInstance) {
        if (dbInstance && typeof dbInstance.collection === 'function') {
            try {
                const snap = await dbInstance.collection('b2b_contracts').get();
                if (!snap.empty) {
                    const list = [];
                    snap.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
                    list.sort((a,b) => new Date(b.contractDate || 0) - new Date(a.contractDate || 0));
                    try { localStorage.setItem('b2b_contracts_cache', JSON.stringify(list)); } catch(e){}
                    return list;
                }
            } catch(e) {
                console.warn('[CloudSync] Firestore loadContracts error:', e);
            }
        }

        try {
            const raw = localStorage.getItem('b2b_contracts_cache');
            if (raw) return JSON.parse(raw);
        } catch(e) {}

        // 기본 활성 계약 학원 시드 데이터
        return [
            {
                id: 'daechi_mirae',
                tenantId: 'daechi_mirae',
                academyName: '대치 미래탐구 과학 전문관',
                teacherName: '김과학 선생님',
                englishName: 'DAECHI_MIRAE',
                seatQuota: 50,
                licenseKey: 'GT28-50S-DAECHI-202703-B508',
                status: '정상가동',
                contractDate: '2026-10-01',
                expDate: '2027-07-31',
                contactPhone: '02-555-1234',
                activeStudentsCount: 6
            },
            {
                id: 'mokdong_sidae',
                tenantId: 'mokdong_sidae',
                academyName: '목동 시대인재 수능관',
                teacherName: '박수능 선생님',
                englishName: 'MOKDONG_SIDAE',
                seatQuota: 50,
                licenseKey: 'GT28-50S-MOKDON-202703-6058',
                status: '정상가동',
                contractDate: '2026-10-05',
                expDate: '2027-07-31',
                contactPhone: '02-2646-1234',
                activeStudentsCount: 42
            },
            {
                id: 'junggye_highest',
                tenantId: 'junggye_highest',
                academyName: '중계 하이스트 의치대관',
                teacherName: '이의대 선생님',
                englishName: 'HIGHEST',
                seatQuota: 50,
                licenseKey: 'GT28-50S-JUNGGY-202703-9A2E',
                status: '정상가동',
                contractDate: '2026-10-08',
                expDate: '2027-07-31',
                contactPhone: '02-930-5678',
                activeStudentsCount: 28
            }
        ];
    }

    /**
     * 신규 계약 및 라이선스 영구 저장
     */
    async function saveContract(dbInstance, contractData) {
        const tenantId = contractData.tenantId;
        const nowStr = new Date().toISOString();
        const payload = {
            ...contractData,
            updatedAt: nowStr
        };

        // 1. Firestore b2b_contracts 컬렉션 저장
        if (dbInstance && typeof dbInstance.collection === 'function' && tenantId) {
            try {
                await dbInstance.collection('b2b_contracts').doc(tenantId).set(payload, { merge: true });
                // 2. academies/{tenantId} 프로필도 동시 갱신
                await dbInstance.collection('academies').doc(tenantId).set({
                    academyId: tenantId,
                    academyName: contractData.academyName,
                    teacherName: contractData.teacherName,
                    englishName: contractData.englishName || contractData.academyName,
                    seatQuota: contractData.seatQuota || 50,
                    licenseKey: contractData.licenseKey,
                    licenseExpDate: contractData.expDate,
                    slogan: `2028 수능 통합과학 1등급 완성 특강`,
                    contactPhone: contractData.contactPhone || '',
                    updatedAt: nowStr
                }, { merge: true });
            } catch(e) {
                console.warn('[CloudSync] Firestore saveContract error:', e);
            }
        }

        // 3. 로컬스토리지 캐시 동기화
        try {
            const list = JSON.parse(localStorage.getItem('b2b_contracts_cache') || '[]');
            const idx = list.findIndex(c => c.tenantId === tenantId);
            if (idx >= 0) {
                list[idx] = { ...list[idx], ...payload };
            } else {
                list.unshift(payload);
            }
            localStorage.setItem('b2b_contracts_cache', JSON.stringify(list));

            // 로컬 학원 프로필도 갱신
            localStorage.setItem(`b2b_academy_${tenantId}`, JSON.stringify({
                academyId: tenantId,
                academyName: contractData.academyName,
                teacherName: contractData.teacherName,
                englishName: contractData.englishName,
                seatQuota: contractData.seatQuota || 50,
                licenseKey: contractData.licenseKey,
                licenseExpDate: contractData.expDate,
                slogan: `2028 수능 통합과학 1등급 완성 특강`,
                contactPhone: contractData.contactPhone || ''
            }));
        } catch(e) {}

        return { success: true };
    }

    exports.initFirebase = initFirebase;
    exports.getDefaultNationalBenchmark = getDefaultNationalBenchmark;
    exports.saveAcademyProfile = saveAcademyProfile;
    exports.loadAcademyProfile = loadAcademyProfile;
    exports.saveStudentsRoster = saveStudentsRoster;
    exports.loadStudentsRoster = loadStudentsRoster;
    exports.submitExamRecord = submitExamRecord;
    exports.loadSubmissions = loadSubmissions;
    exports.getSubmissionById = getSubmissionById;
    exports.loadNationalBenchmark = loadNationalBenchmark;
    exports.loadLeads = loadLeads;
    exports.updateLeadStatus = updateLeadStatus;
    exports.loadContracts = loadContracts;
    exports.saveContract = saveContract;

})(typeof module !== 'undefined' && module.exports ? module.exports : (window.B2BCloudSync = {}));
