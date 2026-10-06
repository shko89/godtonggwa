/**
 * 갓통과 B2B 에듀테크 - 100% 화이트레이블(White-Label) 자동 치환 엔진
 * (White-Label Dynamic Branding & Terminology Replacement Engine)
 * 
 * 기능:
 * 1. 로컬 스토리지('godtonggwa_b2b_brand') 및 서버 API를 통한 학원 자체 브랜딩 영구 관리
 * 2. 화면의 모든 '갓통과', 'godtonggwa'/'GODTONGGWA', '갓쌤' 명칭을
 *    학원명, 영문 브랜드명, 선생님 이름으로 100% 자동 치환
 * 3. Fit 20 모의고사 첫 화면, 주간지 전자책 본문, 표지, 암기장, 목차, 팁 완벽 반영
 * 4. 원클릭 [🎨 학원 브랜딩 설정] 모달 및 플로팅 제어기 지원
 */

(function() {
    'use strict';

    const STORAGE_KEY = 'godtonggwa_b2b_brand';

    // 기본 브랜딩 설정 (설정되지 않았을 때의 기본값)
    const DEFAULT_CONFIG = {
        brandName: '대치 미래과학',         // '갓통과' 대체
        englishName: 'MIRAE SCIENCE',      // 'godtonggwa' / 'GODTONGGWA' 대체
        teacherName: '김철수 선생님'        // '갓쌤' 대체
    };

    // 1. 브랜딩 설정 불러오기
    function getBranding() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                return {
                    brandName: parsed.brandName || DEFAULT_CONFIG.brandName,
                    englishName: parsed.englishName || DEFAULT_CONFIG.englishName,
                    teacherName: parsed.teacherName || DEFAULT_CONFIG.teacherName
                };
            }
        } catch (e) {
            console.warn('[WhiteLabel] LocalStorage read failed:', e);
        }
        return Object.assign({}, DEFAULT_CONFIG);
    }

    // 2. 브랜딩 설정 저장하기
    function setBranding(cfg) {
        try {
            const current = getBranding();
            const updated = {
                brandName: (cfg.brandName !== undefined ? cfg.brandName : current.brandName).trim(),
                englishName: (cfg.englishName !== undefined ? cfg.englishName : current.englishName).trim(),
                teacherName: (cfg.teacherName !== undefined ? cfg.teacherName : current.teacherName).trim()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

            // 전역 이벤트 디스패치 (타 탭/창 및 iframe 동기화)
            window.dispatchEvent(new CustomEvent('whitelabel_brand_updated', { detail: updated }));

            // 즉시 현재 화면 재치환
            applyToDOM(document.body, updated);
            applyToTitle(updated);
            applyToIframes(updated);

            return updated;
        } catch (e) {
            console.error('[WhiteLabel] Failed to save branding:', e);
            return null;
        }
    }

    // 3. 브랜딩 기본값(초기화)
    function resetBranding() {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    }

    // 4. 안전한 DOM 텍스트 노드 순회 및 치환 (HTML/스크립트/스타일 태그 제외)
    function applyToDOM(rootElement, branding) {
        if (!rootElement) rootElement = document.body;
        if (!rootElement) return;
        if (!branding) branding = getBranding();

        const bName = branding.brandName || '갓통과';
        const eName = branding.englishName || bName;
        const tName = branding.teacherName || '담당 선생님';

        const walker = document.createTreeWalker(
            rootElement,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    if (!node.parentElement) return NodeFilter.FILTER_REJECT;
                    const tag = node.parentElement.tagName.toUpperCase();
                    // 스크립트, 스타일, 코드, 모달 내부, iframe은 제외
                    if (['SCRIPT', 'STYLE', 'LINK', 'NOSCRIPT', 'CODE', 'PRE'].includes(tag)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    if (node.parentElement.closest('#whitelabel-modal-overlay') || node.parentElement.closest('#whitelabel-floating-btn')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            },
            false
        );

        const nodesToUpdate = [];
        let currNode;
        while ((currNode = walker.nextNode())) {
            nodesToUpdate.push(currNode);
        }

        nodesToUpdate.forEach(node => {
            let val = node.nodeValue;
            if (!val) return;

            let updated = false;

            // '갓쌤의' -> `${tName}의`
            if (val.includes('갓쌤의')) {
                val = val.replace(/갓쌤의/g, `${tName}의`);
                updated = true;
            }
            // "갓쌤's" -> `${tName}'s`
            if (val.includes("갓쌤's") || val.includes("갓쌤’s")) {
                val = val.replace(/갓쌤['’]s/g, `${tName}'s`);
                updated = true;
            }
            // '갓쌤' -> `${tName}`
            if (val.includes('갓쌤')) {
                val = val.replace(/갓쌤/g, tName);
                updated = true;
            }

            // '갓통과' -> `${bName}`
            if (val.includes('갓통과')) {
                val = val.replace(/갓통과/g, bName);
                updated = true;
            }

            // 'GODTONGGWA' -> eName (대문자)
            if (val.includes('GODTONGGWA')) {
                val = val.replace(/GODTONGGWA/g, eName.toUpperCase());
                updated = true;
            }

            // 'GodTongGwa' -> eName
            if (val.includes('GodTongGwa')) {
                val = val.replace(/GodTongGwa/g, eName);
                updated = true;
            }

            // 'godtonggwa' -> eName (도메인/이메일 제외)
            if (/godtonggwa/i.test(val)) {
                if (!val.includes('.firebase') && !val.includes('@') && !val.includes('http')) {
                    val = val.replace(/godtonggwa/gi, eName);
                    updated = true;
                }
            }

            if (updated) {
                node.nodeValue = val;
            }
        });

        // input의 placeholder 및 title 속성도 치환
        const inputs = rootElement.querySelectorAll('input[placeholder], textarea[placeholder]');
        inputs.forEach(input => {
            if (input.closest('#whitelabel-modal-overlay')) return;
            let ph = input.getAttribute('placeholder');
            if (ph && (ph.includes('갓통과') || ph.includes('갓쌤'))) {
                input.setAttribute('placeholder', ph.replace(/갓통과/g, bName).replace(/갓쌤/g, tName));
            }
        });
    }

    // 5. 페이지 Title 치환
    function applyToTitle(branding) {
        if (!branding) branding = getBranding();
        const bName = branding.brandName || '갓통과';
        const eName = branding.englishName || bName;
        if (document.title.includes('갓통과')) {
            document.title = document.title.replace(/갓통과/g, bName);
        }
        if (document.title.includes('GodTongGwa')) {
            document.title = document.title.replace(/GodTongGwa/gi, eName);
        }
    }

    // 6. iframe 내부도 동시 치환
    function applyToIframes(branding) {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            try {
                if (iframe.contentDocument && iframe.contentDocument.body) {
                    applyToDOM(iframe.contentDocument.body, branding);
                    applyToTitle.call(iframe.contentWindow, branding);
                }
            } catch (e) {
                // cross-origin 무시
            }
        });
    }

    // 7. DOM 변경 감지 (React 렌더링, 페이지 넘김, 동적 컴포넌트 실시간 대응)
    let observerDebounce = null;
    function setupMutationObserver() {
        const observer = new MutationObserver((mutations) => {
            // 모달 조작으로 인한 변동은 무시
            for (let m of mutations) {
                if (m.target && m.target.closest && m.target.closest('#whitelabel-modal-overlay')) {
                    return;
                }
            }

            if (observerDebounce) clearTimeout(observerDebounce);
            observerDebounce = setTimeout(() => {
                applyToDOM(document.body);
                applyToTitle();
            }, 30);
        });

        observer.observe(document.body || document.documentElement, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }

    // 8. 설정 모달 UI 렌더링
    function openSettingsModal() {
        let existing = document.getElementById('whitelabel-modal-overlay');
        if (existing) {
            existing.style.display = 'flex';
            populateModalValues();
            return;
        }

        const overlay = document.createElement('div');
        overlay.id = 'whitelabel-modal-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(15, 23, 42, 0.75);
            backdrop-filter: blur(6px);
            z-index: 9999999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans KR', sans-serif;
        `;

        overlay.innerHTML = `
            <div style="background: #ffffff; width: 100%; max-width: 520px; border-radius: 20px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.4); border: 1.5px solid #e2e8f0; overflow: hidden; color: #0f172a;">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 22px 26px; color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #38bdf8;">
                    <div>
                        <div style="font-size: 11px; font-weight: 800; color: #38bdf8; letter-spacing: 0.5px; text-transform: uppercase;">100% White-Label Solution</div>
                        <h2 style="margin: 4px 0 0 0; font-size: 19px; font-weight: 900; letter-spacing: -0.5px;">🏫 자체 학원 브랜딩 및 명칭 치환 설정</h2>
                    </div>
                    <button id="whitelabel-close-btn" style="background: rgba(255,255,255,0.1); border: none; color: #94a3b8; width: 34px; height: 34px; border-radius: 50%; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center;">✕</button>
                </div>

                <!-- Body -->
                <div style="padding: 24px 26px;">
                    <p style="margin: 0 0 18px 0; font-size: 13px; color: #64748b; line-height: 1.5;">
                        설정하신 학원명과 선생님 성함으로 주간지 전자책과 Fit 20 모의고사의 <strong>'갓통과', 'GODTONGGWA', '갓쌤'</strong> 명칭이 100% 자동 치환됩니다.
                    </p>

                    <!-- Input 1: 학원명 -->
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-size: 13px; font-weight: 800; color: #1e293b; margin-bottom: 6px;">
                            🏛️ 학원명 / 자체 브랜드명 <span style="font-size: 11px; font-weight: normal; color: #0284c7;">('갓통과' 대체)</span>
                        </label>
                        <input type="text" id="wl-input-brand" placeholder="예: 대치 미래과학, 송파 대찬학원" style="width: 100%; padding: 11px 14px; font-size: 14px; border: 1.5px solid #cbd5e1; border-radius: 10px; box-sizing: border-box; outline: none; font-weight: bold; color: #0f172a;">
                    </div>

                    <!-- Input 2: 영문 브랜드명 -->
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-size: 13px; font-weight: 800; color: #1e293b; margin-bottom: 6px;">
                            🌐 영문 브랜드명 <span style="font-size: 11px; font-weight: normal; color: #0284c7;">('GODTONGGWA' 대체)</span>
                        </label>
                        <input type="text" id="wl-input-eng" placeholder="예: MIRAE SCIENCE, DAELI ACADEMY" style="width: 100%; padding: 11px 14px; font-size: 14px; border: 1.5px solid #cbd5e1; border-radius: 10px; box-sizing: border-box; outline: none; font-weight: bold; color: #0f172a;">
                    </div>

                    <!-- Input 3: 선생님 성함 -->
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-size: 13px; font-weight: 800; color: #1e293b; margin-bottom: 6px;">
                            👨‍🏫 선생님 성함 / 호칭 <span style="font-size: 11px; font-weight: normal; color: #0284c7;">('갓쌤' 대체)</span>
                        </label>
                        <input type="text" id="wl-input-teacher" placeholder="예: 김철수 선생님, 철수쌤, 박원장" style="width: 100%; padding: 11px 14px; font-size: 14px; border: 1.5px solid #cbd5e1; border-radius: 10px; box-sizing: border-box; outline: none; font-weight: bold; color: #0f172a;">
                    </div>

                    <!-- Preview Badge Box -->
                    <div style="background: #f8fafc; border: 1.5px dashed #cbd5e1; border-radius: 12px; padding: 14px 16px; margin-bottom: 22px;">
                        <div style="font-size: 11px; font-weight: 800; color: #64748b; margin-bottom: 8px;">🔍 실시간 화면 적용 예시 미리보기:</div>
                        <ul style="margin: 0; padding-left: 18px; font-size: 12.5px; color: #334155; line-height: 1.6;">
                            <li>Fit 20 첫화면: <strong>갓통과 WEEKLY</strong> ➔ <span id="wl-prev-fit" style="color: #0284c7; font-weight: 900;">대치 미래과학 WEEKLY</span></li>
                            <li>암기장/팁 코칭: <strong>갓쌤의 실전 암기장</strong> ➔ <span id="wl-prev-coach" style="color: #059669; font-weight: 900;">김철수 선생님의 실전 암기장</span></li>
                            <li>가이드 헤더: <strong>GODTONGGWA</strong> ➔ <span id="wl-prev-eng" style="color: #7c3aed; font-weight: 900;">MIRAE SCIENCE</span></li>
                        </ul>
                    </div>

                    <!-- Buttons -->
                    <div style="display: flex; gap: 10px;">
                        <button id="wl-reset-btn" style="flex: 1; background: #f1f5f9; color: #475569; border: 1.5px solid #cbd5e1; padding: 13px; font-size: 13.5px; font-weight: 800; border-radius: 10px; cursor: pointer;">
                            🔄 기본값 복원
                        </button>
                        <button id="wl-save-btn" style="flex: 2; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: white; border: none; padding: 13px; font-size: 14px; font-weight: 900; border-radius: 10px; cursor: pointer; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.4);">
                            💾 저장 및 화면 즉시 적용
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Event Listeners
        document.getElementById('whitelabel-close-btn').onclick = () => { overlay.style.display = 'none'; };
        overlay.onclick = (e) => { if (e.target === overlay) overlay.style.display = 'none'; };

        const bInp = document.getElementById('wl-input-brand');
        const eInp = document.getElementById('wl-input-eng');
        const tInp = document.getElementById('wl-input-teacher');

        function updatePreviews() {
            const b = bInp.value.trim() || '대치 미래과학';
            const e = eInp.value.trim() || 'MIRAE SCIENCE';
            const t = tInp.value.trim() || '김철수 선생님';
            document.getElementById('wl-prev-fit').textContent = `${b} WEEKLY`;
            document.getElementById('wl-prev-coach').textContent = `${t}의 실전 암기장`;
            document.getElementById('wl-prev-eng').textContent = e.toUpperCase();
        }

        bInp.oninput = updatePreviews;
        eInp.oninput = updatePreviews;
        tInp.oninput = updatePreviews;

        document.getElementById('wl-save-btn').onclick = () => {
            const brand = bInp.value.trim() || '대치 미래과학';
            const eng = eInp.value.trim() || 'MIRAE SCIENCE';
            const teacher = tInp.value.trim() || '김철수 선생님';

            setBranding({ brandName: brand, englishName: eng, teacherName: teacher });

            // 백엔드 API 서버가 켜져 있으면 비동기 동기화 시도
            try {
                fetch('http://localhost:8080/api/teacher/branding', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        academy_id: 'academy_daechi_01',
                        brand_name: brand,
                        english_name: eng,
                        teacher_name: teacher
                    })
                }).catch(() => {});
            } catch (err) {}

            overlay.style.display = 'none';
            alert(`✅ 학원 브랜딩이 성공적으로 적용되었습니다!\n\n• 학원명: ${brand}\n• 영문명: ${eng}\n• 선생님: ${teacher}\n\n화면의 모든 '갓통과'/'갓쌤' 명칭이 즉시 변경되었습니다.`);
        };

        document.getElementById('wl-reset-btn').onclick = () => {
            if (confirm('브랜딩을 기본값으로 초기화하시겠습니까?')) {
                resetBranding();
            }
        };

        populateModalValues();
    }

    function populateModalValues() {
        const cur = getBranding();
        const bInp = document.getElementById('wl-input-brand');
        const eInp = document.getElementById('wl-input-eng');
        const tInp = document.getElementById('wl-input-teacher');
        if (bInp) bInp.value = cur.brandName || '';
        if (eInp) eInp.value = cur.englishName || '';
        if (tInp) tInp.value = cur.teacherName || '';

        const pf = document.getElementById('wl-prev-fit');
        const pc = document.getElementById('wl-prev-coach');
        const pe = document.getElementById('wl-prev-eng');
        if (pf) pf.textContent = `${cur.brandName || '대치 미래과학'} WEEKLY`;
        if (pc) pc.textContent = `${cur.teacherName || '김철수 선생님'}의 실전 암기장`;
        if (pe) pe.textContent = (cur.englishName || 'MIRAE SCIENCE').toUpperCase();
    }

    // 9. 화면 우측 상단 플로팅 설정 버튼 렌더링
    function renderFloatingButton() {
        if (document.getElementById('whitelabel-floating-btn')) return;

        const btn = document.createElement('button');
        btn.id = 'whitelabel-floating-btn';
        btn.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 999999;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #38bdf8;
            border: 1.5px solid #38bdf8;
            padding: 10px 16px;
            border-radius: 50px;
            font-size: 13px;
            font-weight: 800;
            cursor: pointer;
            box-shadow: 0 10px 25px -5px rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s;
            font-family: inherit;
        `;
        btn.innerHTML = `<span>🎨</span> <span>학원 브랜딩 설정</span>`;
        btn.onmouseover = () => { btn.style.transform = 'scale(1.05)'; btn.style.color = '#ffffff'; };
        btn.onmouseout = () => { btn.style.transform = 'scale(1)'; btn.style.color = '#38bdf8'; };
        btn.onclick = openSettingsModal;

        document.body.appendChild(btn);
    }

    // 10. 공개 API 등록
    window.WhiteLabel = {
        getBranding: getBranding,
        setBranding: setBranding,
        resetBranding: resetBranding,
        applyToDOM: applyToDOM,
        applyToTitle: applyToTitle,
        openSettingsModal: openSettingsModal,
        renderFloatingButton: renderFloatingButton
    };

    window.getWhitelabelBrand = function() {
        return getBranding().brandName || '갓통과';
    };
    window.getWhitelabelTeacher = function() {
        return getBranding().teacherName || '갓쌤';
    };

    // 11. 초기화 실행
    function init() {
        const cur = getBranding();
        applyToDOM(document.body, cur);
        applyToTitle(cur);
        setupMutationObserver();

        // 관리/테스트 페이지 및 주간지/모의고사 페이지에서 플로팅 버튼 자동 활성화
        const path = window.location.pathname.toLowerCase();
        const shouldShowFloating = path.includes('weekly') || path.includes('timeattack') || path.includes('ebook') || path.includes('portal') || path.includes('student');
        if (shouldShowFloating && !window.NO_WHITELABEL_FLOATING) {
            renderFloatingButton();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
