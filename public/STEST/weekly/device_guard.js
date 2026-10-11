/**
 * 갓통과 (GODTONGGWA) B2B & B2C 지능형 디바이스 가드 & 다중 기기 바인딩 모듈
 * (Smart Device Fingerprint Binding & Multi-Device Anti-Piracy Guard)
 * 
 * [목적]
 * 1. 학생 간 이름/전화번호 공유 및 B2C 계정 공유를 통한 불법 무단 열람 원천 차단
 * 2. 1인당 최대 2대 기기(예: 스마트폰 1대 + PC/태블릿 1대)까지만 자동 등록 허용
 * 3. 3번째 기기(친구 폰, 친구 PC 등) 접속 시 즉각 열람 차단 및 등록 기기 안내 모달 노출
 * 4. 학원 관리자(B2B) 및 마이페이지(B2C)에서 기기 교체 시 즉시 1초 '기기 초기화' 지원
 */

(function(global) {
    'use strict';

    const MAX_ALLOWED_DEVICES = 2; // 1인당 최대 허용 기기 수 (스마트폰 1대 + PC/태블릿 1대)
    const STORAGE_KEY_DEVICE_ID = 'gtg_device_guard_id_v1';

    /**
     * 1. 안정적인 브라우저 고유 디바이스 식별자 (Device Fingerprint) 생성 및 복원
     */
    function getOrCreateDeviceId() {
        let devId = null;
        try {
            devId = localStorage.getItem(STORAGE_KEY_DEVICE_ID);
        } catch(e) {}

        if (!devId) {
            try {
                // 쿠키 폴백 확인
                const match = document.cookie.match(new RegExp('(^|;\\s*)' + STORAGE_KEY_DEVICE_ID + '=([^;]*)'));
                if (match) devId = decodeURIComponent(match[2]);
            } catch(e) {}
        }

        if (!devId) {
            // 하드웨어 및 브라우저 지문 해시 생성
            const screenInfo = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
            const navInfo = `${navigator.userAgent || ''}_${navigator.language || ''}_${navigator.hardwareConcurrency || 2}`;
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
            const randSalt = Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
            
            // 경량 해시
            let hash = 0;
            const fullStr = `${screenInfo}#${navInfo}#${timeZone}#${randSalt}`;
            for (let i = 0; i < fullStr.length; i++) {
                hash = ((hash << 5) - hash) + fullStr.charCodeAt(i);
                hash |= 0;
            }
            devId = `dev_${Math.abs(hash).toString(36)}_${randSalt.substring(0, 6)}`;

            // 영구 저장
            try {
                localStorage.setItem(STORAGE_KEY_DEVICE_ID, devId);
            } catch(e) {}
            try {
                const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
                document.cookie = `${STORAGE_KEY_DEVICE_ID}=${encodeURIComponent(devId)}; expires=${expires}; path=/; SameSite=Lax`;
            } catch(e) {}
        }

        return devId;
    }

    /**
     * 2. 사용자 친화적인 기기명 분석 (예: "아이폰 (iOS Safari)", "Windows PC (Chrome)")
     */
    function getDeviceDescription() {
        const ua = navigator.userAgent || '';
        let os = '기타 기기';
        let browser = '웹 브라우저';

        if (/iPhone/i.test(ua)) os = 'iPhone';
        else if (/iPad/i.test(ua)) os = 'iPad';
        else if (/Android/i.test(ua)) {
            os = /Mobile/i.test(ua) ? 'Android 스마트폰' : 'Android 태블릿';
        } else if (/Macintosh|Mac OS X/i.test(ua)) os = 'Mac PC';
        else if (/Windows NT/i.test(ua)) os = 'Windows PC';

        if (/KAKAOTALK/i.test(ua)) browser = '카카오톡 인앱';
        else if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = 'Chrome';
        else if (/Edg/i.test(ua)) browser = 'Edge';
        else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
        else if (/Whale/i.test(ua)) browser = '웨일 브라우저';

        return `${os} (${browser})`;
    }

    /**
     * 3. [B2B 전용] 학생 명단 기반 기기 바인딩 검증
     * @param {string} tenantId 학원 고유 ID
     * @param {string} studentName 학생 이름
     * @param {string} studentPhoneLast4 휴대폰 번호 뒷 4자리
     * @returns {Object} { allowed: boolean, reason?: string, devices: Array, isNew?: boolean }
     */
    function checkB2BStudentDevice(tenantId, studentName, studentPhoneLast4) {
        const devId = getOrCreateDeviceId();
        const devDesc = getDeviceDescription();
        const nowIso = new Date().toISOString();

        const rosterKey = `b2b_students_${tenantId}`;
        let roster = [];
        try {
            const raw = localStorage.getItem(rosterKey);
            if (raw) roster = JSON.parse(raw);
        } catch(e) {}

        const student = roster.find(s => s.studentName === studentName && String(s.studentPhoneLast4) === String(studentPhoneLast4));
        
        // 데모 환경이거나 명단에 없는 가상 수강생일 경우
        if (!student) {
            // 가상 세션용 로컬 기기 저장소
            const demoKey = `b2b_devguard_demo_${tenantId}_${studentName}_${studentPhoneLast4}`;
            let demoDevices = [];
            try {
                demoDevices = JSON.parse(localStorage.getItem(demoKey) || '[]');
            } catch(e) {}

            const existingIdx = demoDevices.findIndex(d => d.deviceId === devId);
            if (existingIdx >= 0) {
                demoDevices[existingIdx].lastActiveAt = nowIso;
                try { localStorage.setItem(demoKey, JSON.stringify(demoDevices)); } catch(e) {}
                return { allowed: true, isNew: false, count: demoDevices.length, max: MAX_ALLOWED_DEVICES, devices: demoDevices };
            }

            if (demoDevices.length < MAX_ALLOWED_DEVICES) {
                demoDevices.push({
                    deviceId: devId,
                    desc: devDesc,
                    registeredAt: nowIso,
                    lastActiveAt: nowIso
                });
                try { localStorage.setItem(demoKey, JSON.stringify(demoDevices)); } catch(e) {}
                return { allowed: true, isNew: true, count: demoDevices.length, max: MAX_ALLOWED_DEVICES, devices: demoDevices };
            }

            // 한도 초과
            return {
                allowed: false,
                reason: 'MAX_DEVICES_EXCEEDED',
                count: demoDevices.length,
                max: MAX_ALLOWED_DEVICES,
                devices: demoDevices
            };
        }

        // 실제 수강생 레코드 검증
        if (!Array.isArray(student.registeredDevices)) {
            student.registeredDevices = [];
        }

        const matchIdx = student.registeredDevices.findIndex(d => d.deviceId === devId);
        if (matchIdx >= 0) {
            // 이미 등록된 정품 기기
            student.registeredDevices[matchIdx].lastActiveAt = nowIso;
            saveB2BRoster(tenantId, roster);
            return {
                allowed: true,
                isNew: false,
                count: student.registeredDevices.length,
                max: MAX_ALLOWED_DEVICES,
                devices: student.registeredDevices
            };
        }

        // 미등록 신규 기기인 경우
        if (student.registeredDevices.length < MAX_ALLOWED_DEVICES) {
            student.registeredDevices.push({
                deviceId: devId,
                desc: devDesc,
                registeredAt: nowIso,
                lastActiveAt: nowIso
            });
            saveB2BRoster(tenantId, roster);
            return {
                allowed: true,
                isNew: true,
                count: student.registeredDevices.length,
                max: MAX_ALLOWED_DEVICES,
                devices: student.registeredDevices
            };
        }

        // 2대 한도 초과 (친구 폰 등 3번째 기기 접속 시도 차단)
        return {
            allowed: false,
            reason: 'MAX_DEVICES_EXCEEDED',
            count: student.registeredDevices.length,
            max: MAX_ALLOWED_DEVICES,
            devices: student.registeredDevices
        };
    }

    /**
     * B2B 수강생 명단 로컬 저장 및 동기화 헬퍼
     */
    function saveB2BRoster(tenantId, roster) {
        try {
            localStorage.setItem(`b2b_students_${tenantId}`, JSON.stringify(roster));
        } catch(e) {}
    }

    /**
     * [B2B 관리자 전용] 특정 학생의 등록 기기 초기화
     */
    function resetB2BStudentDevices(tenantId, studentIdentifier) {
        const rosterKey = `b2b_students_${tenantId}`;
        let roster = [];
        try {
            const raw = localStorage.getItem(rosterKey);
            if (raw) roster = JSON.parse(raw);
        } catch(e) {}

        const student = roster.find(s => s.studentId === studentIdentifier || s.studentName === studentIdentifier || s.studentPhoneLast4 === studentIdentifier);
        if (student) {
            student.registeredDevices = [];
            saveB2BRoster(tenantId, roster);
            return { success: true, studentName: student.studentName };
        }

        // 데모 키 초기화
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (k && k.startsWith(`b2b_devguard_demo_${tenantId}`)) {
                    localStorage.removeItem(k);
                }
            }
        } catch(e) {}

        return { success: true, studentName: studentIdentifier };
    }

    /**
     * 4. [B2C 전용] Firebase Firestore 기반 유료 회원 기기 바인딩 검증
     * @param {Object} dbInstance Firestore Database 인스턴스 (Modular or Compat)
     * @param {string} userUid 사용자 고유 UID
     * @returns {Promise<Object>} { allowed: boolean, reason?: string, devices: Array }
     */
    async function checkB2CDevice(dbInstance, userUid) {
        const devId = getOrCreateDeviceId();
        const devDesc = getDeviceDescription();
        const nowIso = new Date().toISOString();

        if (!dbInstance || !userUid) {
            // 오프라인 / 캐시 기반 검증
            return checkB2CDeviceLocalFallback(userUid, devId, devDesc, nowIso);
        }

        try {
            // Modular SDK vs Compat SDK 호환 처리
            let userDocSnap = null;
            let isModular = false;

            if (typeof dbInstance.collection === 'function') {
                // Compat SDK
                userDocSnap = await dbInstance.collection('users').doc(userUid).get();
            } else {
                // Modular SDK (Modular Firestore instance)
                isModular = true;
                const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
                userDocSnap = await getDoc(doc(dbInstance, "users", userUid));
            }

            const userData = (userDocSnap && userDocSnap.exists) ? (typeof userDocSnap.data === 'function' ? userDocSnap.data() : userDocSnap.data) : {};
            let devices = Array.isArray(userData.registeredDevices) ? [...userData.registeredDevices] : [];

            // 관리자는 무제한 허용
            if (userData.role === 'admin') {
                return { allowed: true, isAdmin: true, count: devices.length, max: MAX_ALLOWED_DEVICES, devices: devices };
            }

            const matchIdx = devices.findIndex(d => d.deviceId === devId);
            if (matchIdx >= 0) {
                // 이미 등록된 기기
                devices[matchIdx].lastActiveAt = nowIso;
                await updateB2CDevicesInFirestore(dbInstance, userUid, devices, isModular);
                return { allowed: true, isNew: false, count: devices.length, max: MAX_ALLOWED_DEVICES, devices: devices };
            }

            // 신규 기기 등록 가능 여부
            if (devices.length < MAX_ALLOWED_DEVICES) {
                devices.push({
                    deviceId: devId,
                    desc: devDesc,
                    registeredAt: nowIso,
                    lastActiveAt: nowIso
                });
                await updateB2CDevicesInFirestore(dbInstance, userUid, devices, isModular);
                return { allowed: true, isNew: true, count: devices.length, max: MAX_ALLOWED_DEVICES, devices: devices };
            }

            // 2대 한도 초과
            return {
                allowed: false,
                reason: 'MAX_DEVICES_EXCEEDED',
                count: devices.length,
                max: MAX_ALLOWED_DEVICES,
                devices: devices
            };

        } catch (err) {
            console.warn('[DeviceGuard] Firestore verification error, falling back to local:', err);
            return checkB2CDeviceLocalFallback(userUid, devId, devDesc, nowIso);
        }
    }

    async function updateB2CDevicesInFirestore(dbInstance, userUid, devices, isModular) {
        try {
            if (isModular) {
                const { doc, updateDoc, setDoc } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
                const uRef = doc(dbInstance, "users", userUid);
                await setDoc(uRef, { registeredDevices: devices, lastDeviceCheckedAt: new Date().toISOString() }, { merge: true });
            } else {
                await dbInstance.collection('users').doc(userUid).set({
                    registeredDevices: devices,
                    lastDeviceCheckedAt: new Date().toISOString()
                }, { merge: true });
            }
        } catch(e) {
            console.warn('[DeviceGuard] Firestore update error:', e);
        }
    }

    function checkB2CDeviceLocalFallback(userUid, devId, devDesc, nowIso) {
        const localKey = `b2c_devguard_${userUid}`;
        let devices = [];
        try {
            devices = JSON.parse(localStorage.getItem(localKey) || '[]');
        } catch(e) {}

        const matchIdx = devices.findIndex(d => d.deviceId === devId);
        if (matchIdx >= 0) {
            devices[matchIdx].lastActiveAt = nowIso;
            try { localStorage.setItem(localKey, JSON.stringify(devices)); } catch(e) {}
            return { allowed: true, isNew: false, count: devices.length, max: MAX_ALLOWED_DEVICES, devices };
        }

        if (devices.length < MAX_ALLOWED_DEVICES) {
            devices.push({ deviceId: devId, desc: devDesc, registeredAt: nowIso, lastActiveAt: nowIso });
            try { localStorage.setItem(localKey, JSON.stringify(devices)); } catch(e) {}
            return { allowed: true, isNew: true, count: devices.length, max: MAX_ALLOWED_DEVICES, devices };
        }

        return { allowed: false, reason: 'MAX_DEVICES_EXCEEDED', count: devices.length, max: MAX_ALLOWED_DEVICES, devices };
    }

    /**
     * 5. 공통 기기 한도 초과 차단 안내 모달 UI 생성 및 렌더링
     */
    function renderDeviceLimitBlockModal(options) {
        const opts = Object.assign({
            title: '⚠️ 기기 등록 한도 초과 (최대 2대)',
            studentName: '수강생',
            devices: [],
            isB2B: true,
            onClose: null
        }, options || {});

        // 기존 모달 제거
        const exist = document.getElementById('gtgDeviceBlockOverlay');
        if (exist) exist.remove();

        const overlay = document.createElement('div');
        overlay.id = 'gtgDeviceBlockOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(15, 23, 42, 0.88);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 9999999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 18px;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, "Noto Sans KR", sans-serif;
            animation: gtgFadeIn 0.25s ease-out;
        `;

        const deviceListHtml = opts.devices.map((d, idx) => `
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:10px 14px; margin-bottom:8px; display:flex; align-items:center; justify-content:space-between;">
                <div style="text-align:left;">
                    <div style="font-size:13px; font-weight:800; color:#0f172a;">
                        📱 등록 기기 ${idx + 1}: <span style="color:#0284c7;">${d.desc || '스마트폰/PC'}</span>
                    </div>
                    <div style="font-size:11px; color:#64748b; margin-top:2px;">
                        최초 등록: ${d.registeredAt ? d.registeredAt.substring(0, 10) : '확인됨'}
                    </div>
                </div>
                <span style="background:#dcfce7; color:#15803d; font-size:11px; font-weight:800; padding:2px 8px; border-radius:12px;">인증완료</span>
            </div>
        `).join('');

        const supportNotice = opts.isB2B ? `
            <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:10px; padding:12px; font-size:12px; color:#991b1b; line-height:1.45; text-align:left; margin-top:14px;">
                💡 <strong>스마트폰 교체 등 기기 변경이 필요하신가요?</strong><br>
                담당 선생님이나 학원 데스크로 <strong>[기기 초기화]</strong>를 요청하시면 즉시 새 기기에서 이용하실 수 있습니다.
            </div>
        ` : `
            <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:10px; padding:12px; font-size:12px; color:#991b1b; line-height:1.45; text-align:left; margin-top:14px;">
                💡 <strong>기기 변경이 필요하신가요?</strong><br>
                마이페이지 또는 갓통과 카카오톡 채널로 기기 초기화를 요청해 주시기 바랍니다.
            </div>
        `;

        overlay.innerHTML = `
            <style>
                @keyframes gtgFadeIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
            </style>
            <div style="background:#ffffff; border-radius:20px; max-width:440px; width:100%; padding:26px 22px; text-align:center; box-shadow:0 20px 40px rgba(0,0,0,0.3); box-sizing:border-box;">
                <div style="width:56px; height:56px; background:#fee2e2; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:26px; margin-bottom:14px;">
                    🛡️
                </div>
                <h3 style="font-size:19px; font-weight:900; color:#0f172a; margin:0 0 8px 0;">${opts.title}</h3>
                <p style="font-size:13px; color:#475569; line-height:1.5; margin:0 0 16px 0;">
                    [${opts.studentName}] 수강생님, 본 주간지는<br>
                    <strong>1인 1계약 정품 라이선스 보호</strong>를 위해<br>
                    <strong>최대 2대</strong>(예: 스마트폰 1대 + 태블릿/PC 1대)까지만 열람이 허용됩니다.<br>
                    <span style="color:#ef4444; font-weight:700;">현재 접속하신 기기는 3번째 신규 기기로 감지되었습니다.</span>
                </p>

                <div style="margin:16px 0 10px 0;">
                    <div style="font-size:12px; font-weight:800; color:#334155; text-align:left; margin-bottom:8px;">
                        🔒 현재 등록 완료된 기기 (${opts.devices.length}/2대 마감):
                    </div>
                    ${deviceListHtml}
                </div>

                ${supportNotice}

                <button type="button" id="btnGtgDeviceBlockClose" style="width:100%; height:46px; background:#0f172a; color:#ffffff; border:none; border-radius:12px; font-size:14.5px; font-weight:800; cursor:pointer; margin-top:16px;">
                    확인 및 닫기
                </button>
            </div>
        `;

        document.body.appendChild(overlay);

        const btnClose = overlay.querySelector('#btnGtgDeviceBlockClose');
        if (btnClose) {
            btnClose.addEventListener('click', () => {
                overlay.remove();
                if (typeof opts.onClose === 'function') opts.onClose();
            });
        }
    }

    // 전역 API 노출
    global.DeviceGuard = {
        MAX_ALLOWED_DEVICES: MAX_ALLOWED_DEVICES,
        getOrCreateDeviceId: getOrCreateDeviceId,
        getDeviceDescription: getDeviceDescription,
        checkB2BStudentDevice: checkB2BStudentDevice,
        resetB2BStudentDevices: resetB2BStudentDevices,
        checkB2CDevice: checkB2CDevice,
        renderDeviceLimitBlockModal: renderDeviceLimitBlockModal
    };

})(typeof window !== 'undefined' ? window : this);
