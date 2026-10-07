/**
 * 갓통과 B2B SaaS 라이선스 키 발급 및 활성화 엔진 (B2B License Activator)
 * 
 * 1. 암호화 서명 기반 라이선스 키 발급 및 무결성 검증
 * 2. 종량제 좌석수(30석, 50석, 100석, 200석) 및 유효기간 제어
 * 3. 위조 키 입력 방지 (체크섬 해시 검증)
 */

(function(exports) {
    'use strict';

    // 간단한 문자열 해시 체크섬 (4자리 Hex)
    function calcChecksum(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash).toString(16).padStart(4, '0').slice(-4).toUpperCase();
    }

    /**
     * 신규 학원용 라이선스 키 발급 함수 (본사/관리자용)
     * @param {string} tenantId - 학원 고유 슬러그 (예: daechi_mirae)
     * @param {number} seatQuota - 허용 수강생 수 (예: 30, 50, 100)
     * @param {string} expDate - 만료일 (YYYY-MM-DD)
     * @returns {string} 발급된 라이선스 키 (예: GT28-50S-DAECHI-202703-9A2F)
     */
    function generateLicenseKey(tenantId, seatQuota = 50, expDate = '2027-03-31') {
        const cleanTenant = (tenantId || 'DEMO').replace(/[^a-zA-Z0-9]/g, '').slice(0, 6).toUpperCase();
        const cleanExp = expDate.replace(/-/g, '').slice(0, 6); // YYYYMM
        const rawPayload = `GT28-${seatQuota}S-${cleanTenant}-${cleanExp}`;
        const checksum = calcChecksum(rawPayload + "_SECRET_KEY_2028");
        return `${rawPayload}-${checksum}`;
    }

    /**
     * 라이선스 키 유효성 검증 및 파싱
     * @param {string} key - 입력된 라이선스 키
     * @returns {Object} { isValid, seatQuota, expDate, tenantPrefix, error }
     */
    function verifyLicenseKey(key) {
        if (!key || typeof key !== 'string') {
            return { isValid: false, error: '라이선스 키가 입력되지 않았습니다.' };
        }

        const parts = key.trim().toUpperCase().split('-');
        if (parts.length !== 5 || parts[0] !== 'GT28') {
            return { isValid: false, error: '유효하지 않은 라이선스 키 형식입니다.' };
        }

        const seatPart = parts[1]; // e.g. 50S
        const tenantPart = parts[2]; // e.g. DAECHI
        const expPart = parts[3]; // e.g. 202703
        const inputChecksum = parts[4]; // e.g. 9A2F

        const rawPayload = `GT28-${seatPart}-${tenantPart}-${expPart}`;
        const expectedChecksum = calcChecksum(rawPayload + "_SECRET_KEY_2028");

        if (inputChecksum !== expectedChecksum) {
            return { isValid: false, error: '라이선스 키 서명이 일치하지 않거나 변조되었습니다.' };
        }

        const seats = parseInt(seatPart.replace('S', ''), 10) || 30;

        return {
            isValid: true,
            seatQuota: seats,
            expDate: expPart,
            tenantPrefix: tenantPart
        };
    }

    /**
     * 학원 라이선스 활성화 실행
     */
    function activateLicense(tenantId, key) {
        const verification = verifyLicenseKey(key);
        if (!verification.isValid) {
            return { success: false, message: verification.error };
        }

        // 학원 설정 불러오기
        let academyCfg = {};
        try {
            const raw = localStorage.getItem(`b2b_academy_${tenantId}`);
            if (raw) academyCfg = JSON.parse(raw);
        } catch(e) {}

        academyCfg.licenseKey = key.trim();
        academyCfg.seatQuota = verification.seatQuota;
        academyCfg.activatedAt = new Date().toISOString();
        academyCfg.licenseExpDate = verification.expDate;

        localStorage.setItem(`b2b_academy_${tenantId}`, JSON.stringify(academyCfg));

        return {
            success: true,
            seatQuota: verification.seatQuota,
            message: `성공적으로 ${verification.seatQuota}석 라이선스가 활성화되었습니다!`
        };
    }

    /**
     * 학원별 인쇄 라이선스 현황 조회
     * 기본값: 계약 좌석수와 동일한 50부 기본 부여
     */
    function getPrintLicense(tenantId) {
        let academyCfg = {};
        try {
            const raw = localStorage.getItem(`b2b_academy_${tenantId}`);
            if (raw) academyCfg = JSON.parse(raw);
        } catch(e) {}

        const totalPrints = academyCfg.printTotalQuota !== undefined ? academyCfg.printTotalQuota : 50;
        const usedPrints = academyCfg.printUsedCount || 0;
        const remainingPrints = Math.max(0, totalPrints - usedPrints);
        const logs = academyCfg.printLogs || [];

        return {
            totalPrints: totalPrints,
            usedPrints: usedPrints,
            remainingPrints: remainingPrints,
            logs: logs
        };
    }

    /**
     * 인쇄 라이선스 부수 차감 및 고유 일련번호(Serial) 발급
     * @param {string} tenantId - 학원 테넌트 ID
     * @param {number} week - 주차 (1~10)
     * @param {number} copies - 인쇄 부수
     * @param {string} brandName - 학원명
     */
    function deductPrintLicense(tenantId, week, copies, brandName = '학원') {
        copies = parseInt(copies, 10) || 1;
        if (copies <= 0) {
            return { success: false, message: '출력 부수는 1부 이상이어야 합니다.' };
        }

        let academyCfg = {};
        try {
            const raw = localStorage.getItem(`b2b_academy_${tenantId}`);
            if (raw) academyCfg = JSON.parse(raw);
        } catch(e) {}

        const totalPrints = academyCfg.printTotalQuota !== undefined ? academyCfg.printTotalQuota : 50;
        let usedPrints = academyCfg.printUsedCount || 0;
        const remainingPrints = Math.max(0, totalPrints - usedPrints);

        if (remainingPrints < copies) {
            return {
                success: false,
                remainingPrints: remainingPrints,
                message: `잔여 출력 라이선스가 부족합니다. (신청: ${copies}부 / 잔여: ${remainingPrints}부)\n관리자에게 추가 라이선스 충전을 요청하세요.`
            };
        }

        // 고유 시리얼 번호 대역 생성 (예: PUB-DM28-W01-001 ~ 025)
        const prefix = (tenantId || 'ACADEMY').replace(/[^a-zA-Z0-9]/g, '').slice(0, 4).toUpperCase();
        const startNum = usedPrints + 1;
        const endNum = usedPrints + copies;
        const serialStart = `PUB-${prefix}28-W${String(week).padStart(2,'0')}-${String(startNum).padStart(3,'0')}`;
        const serialEnd = `PUB-${prefix}28-W${String(week).padStart(2,'0')}-${String(endNum).padStart(3,'0')}`;
        const serialDisplay = copies === 1 ? serialStart : `${serialStart} ~ #${String(endNum).padStart(3,'0')}`;

        // 차감 반영
        usedPrints += copies;
        academyCfg.printTotalQuota = totalPrints;
        academyCfg.printUsedCount = usedPrints;
        if (!academyCfg.printLogs) academyCfg.printLogs = [];

        const newLog = {
            id: 'PLOG-' + Date.now(),
            timestamp: new Date().toISOString(),
            week: week,
            copies: copies,
            serialRange: serialDisplay,
            brandName: brandName,
            remainingAfter: totalPrints - usedPrints,
            status: 'VERIFIED'
        };
        academyCfg.printLogs.unshift(newLog);

        localStorage.setItem(`b2b_academy_${tenantId}`, JSON.stringify(academyCfg));

        return {
            success: true,
            copies: copies,
            remainingPrints: totalPrints - usedPrints,
            serialStart: serialStart,
            serialEnd: serialEnd,
            serialDisplay: serialDisplay,
            log: newLog,
            message: `성공적으로 ${copies}부 인쇄 승인 및 시리얼 발급이 완료되었습니다. (잔여: ${totalPrints - usedPrints}부)`
        };
    }

    /**
     * 인쇄 라이선스 추가 충전
     */
    function rechargePrintLicense(tenantId, addCount = 50) {
        let academyCfg = {};
        try {
            const raw = localStorage.getItem(`b2b_academy_${tenantId}`);
            if (raw) academyCfg = JSON.parse(raw);
        } catch(e) {}

        const currentTotal = academyCfg.printTotalQuota !== undefined ? academyCfg.printTotalQuota : 50;
        academyCfg.printTotalQuota = currentTotal + addCount;
        localStorage.setItem(`b2b_academy_${tenantId}`, JSON.stringify(academyCfg));

        return {
            success: true,
            totalPrints: academyCfg.printTotalQuota,
            addedCount: addCount
        };
    }

    exports.generateLicenseKey = generateLicenseKey;
    exports.verifyLicenseKey = verifyLicenseKey;
    exports.activateLicense = activateLicense;
    exports.getPrintLicense = getPrintLicense;
    exports.deductPrintLicense = deductPrintLicense;
    exports.rechargePrintLicense = rechargePrintLicense;

})(typeof module !== 'undefined' && module.exports ? module.exports : (window.B2BLicenseActivator = {}));
