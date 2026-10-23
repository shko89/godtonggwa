// STEST 공통 코어 비즈니스 로직 모듈 (exam.html & explanation.html 공유)

export function normalizeExamId(rawExamId, title = '') {
    if (!rawExamId && !title) return 'mock_2028_s0_01';
    const examId = String(rawExamId || '').replace(/_\d{13}$/, '').trim();
    const t = String(title || '').trim();
    if (
        examId === 'mock_2028_s0' || examId === 'mock_2028_s0_01' ||
        examId === 'exam_01' || examId === 'exam_02' || examId === 'exam_2028001' || examId === '2028_s0_01' ||
        t.includes('제 1회') || t.includes('제1회') || t.includes('예시문항 완벽 분석')
    ) {
        return 'mock_2028_s0_01';
    }
    if (examId === '2028_pretest' || examId === 'past_예비문항' || examId === 'exam_00' || examId.includes('pretest') || examId.includes('예비문항') || examId.startsWith('past_') || t.includes('예시문항') || t.includes('예비문항')) {
        return '2028_pretest';
    }
    return examId;
}

const _examScriptDataCache = {};

export function loadExamDataScript(rawExamId, title = '') {
    return new Promise((resolve) => {
        if (!rawExamId && !title) return resolve(null);
        const examId = normalizeExamId(rawExamId, title);
        if (_examScriptDataCache[examId]) return resolve(_examScriptDataCache[examId]);

        let fileName = '';
        if (examId === '2028_pretest' || examId === 'past_예비문항' || examId.includes('pretest') || examId.includes('예비문항') || examId.startsWith('past_')) {
            fileName = `../archive/kice_2028/2028_pretest.js`;
        } else if (examId.includes('week_')) {
            const parts = examId.split('_');
            const year = parts[1];
            const baseId = parts.slice(0, 3).join('_');
            fileName = `./weekly/${year}/${baseId}.js`;
        } else if (examId.includes('mock_')) {
            const parts = examId.split('_');
            const year = parts[1];
            const folderName = parts.slice(0, 3).join('_');
            fileName = `./mock/${year}/${folderName}/${examId}.js`;
        } else {
            return resolve(null);
        }
        const fetchUrl = fileName + `?v=20261022`;

        // Fetch first to safely avoid 404 HTML fallback causing SyntaxError: Unexpected token '<'
        fetch(fetchUrl)
            .then(res => {
                if (!res.ok) return null;
                const ctype = res.headers.get('content-type') || '';
                if (ctype.includes('text/html')) return null;
                return res.text();
            })
            .then(code => {
                if (!code || code.trim().startsWith('<')) return resolve(null);
                try {
                    window.globalExamData = null;
                    const script = document.createElement('script');
                    script.textContent = code;
                    document.head.appendChild(script);
                    // [중요] .js 파일 내부의 폰트 사이즈 재정의를 원래대로 복구
                    document.documentElement.style.fontSize = "";
                    const result = window.globalExamData || null;
                    if (result) _examScriptDataCache[examId] = result;
                    resolve(result);
                } catch (err) {
                    console.warn("Script execution error:", err);
                    resolve(null);
                }
            })
            .catch(() => resolve(null));
    });
}

export function getEstimatedAccuracyRate(qNum, score, examId) {
    const sc = Number(score) || 2.0;
    // 1.5점(기본/개념 난이도): 78%, 2.0점(표준 응용): 58%, 2.5점(고난도/변별력): 38%
    const baseRate = sc <= 1.5 ? 78 : (sc >= 2.5 ? 38 : 58);
    // 문항 번호와 examId 기반 결정론적 정규분포 분산 (±6%)
    const str = (examId || 'godtonggwa') + '_' + qNum;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    const offset = (Math.abs(hash) % 13) - 6; // -6 ~ +6
    return Math.max(26, Math.min(94, baseRate + offset));
}

export function resolveDomainFromTopic(topic, chapter) {
    if (chapter && ['과학의 기초', '물질과 규칙성', '시스템과 상호작용', '변화와 다양성', '환경과 에너지'].includes(chapter)) {
        return chapter;
    }
    if (!topic) return chapter || '과학의 기초';
    const t = String(topic).toLowerCase();

    // 1. 환경과 에너지
    if (t.includes('온난화') || t.includes('생태계') || t.includes('환경') || t.includes('에너지') ||
        t.includes('핵융합') || t.includes('발전') || t.includes('송전') || t.includes('신재생') ||
        t.includes('엘니뇨') || t.includes('라니냐') || t.includes('온실') || t.includes('기후')) {
        return '환경과 에너지';
    }
    // 2. 변화와 다양성
    if (t.includes('산화') || t.includes('환원') || t.includes('중화') || t.includes('산과 염기') ||
        t.includes('지질') || t.includes('화석') || t.includes('대멸종') || t.includes('진화') ||
        t.includes('다양성') || t.includes('에너지 출입') || t.includes('변화')) {
        return '변화와 다양성';
    }
    // 3. 시스템과 상호작용
    if (t.includes('역학') || t.includes('중력') || t.includes('운동량') || t.includes('충격량') ||
        t.includes('시스템') || t.includes('판 구조론') || t.includes('유전') || t.includes('세포') ||
        t.includes('전자기 유도') || t.includes('효소') || t.includes('지구 시스템') || t.includes('생명 시스템')) {
        return '시스템과 상호작용';
    }
    // 4. 물질과 규칙성
    if (t.includes('원소') || t.includes('주기') || t.includes('스펙트럼') || t.includes('빅뱅') ||
        t.includes('결합') || t.includes('규산염') || t.includes('dna') || t.includes('rna') ||
        t.includes('전자 배치') || t.includes('전기적 성질') || t.includes('물질')) {
        return '물질과 규칙성';
    }
    // 5. 과학의 기초
    if (t.includes('기본량') || t.includes('단위') || t.includes('측정') || t.includes('어림') ||
        t.includes('표준') || t.includes('정보') || t.includes('신호') || t.includes('빅데이터') ||
        t.includes('인공지능') || t.includes('로봇') || t.includes('과학 윤리') || t.includes('감염병') || t.includes('시공간')) {
        return '과학의 기초';
    }

    return chapter || '과학의 기초';
}
