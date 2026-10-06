/**
 * 화이트레이블(White-Label) B2B 상용 배포용 DRM & 동적 워터마크 모듈
 * (Teacher Custom Branding & Anti-Copy DRM System)
 */

(function() {
    'use strict';

    // 1. 보안 및 방제 기능 (우클릭, 복사, 드래그, 인쇄 차단)
    function applyAntiCopyGuards() {
        // 우클릭 차단
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        }, false);

        // 복사, 잘라내기, 선택 차단
        document.addEventListener('copy', function(e) { e.preventDefault(); });
        document.addEventListener('cut', function(e) { e.preventDefault(); });
        document.addEventListener('selectstart', function(e) {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
            }
        });

        // 인쇄 및 캡처 단축키 차단 (Ctrl+P, Ctrl+S)
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P' || e.key === 's' || e.key === 'S')) {
                e.preventDefault();
                alert('무단 전재, 인쇄 및 다운로드는 금지되어 있습니다.');
            }
        });

        // CSS 동적 주입: 드래그 금지 및 인쇄 화면 블러 처리
        const style = document.createElement('style');
        style.textContent = `
            body {
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
            }
            @media print {
                body {
                    display: none !important;
                }
            }
            .drm-watermark-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                pointer-events: none !important;
                z-index: 999999;
                overflow: hidden;
                opacity: 0.20;
            }
        `;
        document.head.appendChild(style);
    }

    // 2. 화이트레이블 동적 워터마크 생성 (선생님/학원 맞춤 브랜딩 + 학생 정보 각인)
    function initDynamicWatermark(userConfig) {
        const config = Object.assign({
            brandName: '통합과학 전문관', // 선생님/학원이 설정한 자체 브랜드명 (갓통과 명칭 노출 안 됨)
            teacherName: '김철수 선생님',
            studentName: '수강생',
            studentId: 'student_demo',
            ipAddress: ''
        }, userConfig || {});

        const now = new Date();
        const dateStr = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
        
        // 갓통과 브랜드 명칭을 전면 제거하고 구매한 선생님/학원의 브랜드 + 학생 유출 추적 정보로 각인
        const watermarkText = `${config.brandName}(${config.teacherName}) | 수강생: ${config.studentName}(${config.studentId}) | ${dateStr}`;

        // Create overlay canvas
        const overlay = document.createElement('div');
        overlay.className = 'drm-watermark-overlay';

        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        overlay.appendChild(canvas);
        document.body.appendChild(overlay);

        const ctx = canvas.getContext('2d');

        function renderWatermark() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.font = 'bold 12.5px "Noto Sans KR", sans-serif';
            ctx.fillStyle = '#334155';

            const stepX = 300;
            const stepY = 170;

            ctx.rotate(-20 * Math.PI / 180);

            for (let y = -canvas.height; y < canvas.height * 2; y += stepY) {
                for (let x = -canvas.width; x < canvas.width * 2; x += stepX) {
                    ctx.fillText(watermarkText, x, y);
                }
            }
        }

        renderWatermark();
        window.addEventListener('resize', renderWatermark);
    }

    // 전역 API 노출
    window.WhiteLabelDRM = {
        init: function(userConfig) {
            applyAntiCopyGuards();
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                    initDynamicWatermark(userConfig);
                });
            } else {
                initDynamicWatermark(userConfig);
            }
        }
    };
})();
