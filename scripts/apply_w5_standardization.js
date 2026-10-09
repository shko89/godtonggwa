const fs = require('fs');

const filePath = 'C:/Users/shko8/godtonggwa/public/STEST/weekly/ebook/week_2028_05_final.html';
let html = fs.readFileSync(filePath, 'utf8');

console.log('Original HTML size:', html.length);

// 1. T1: 암기장(Notes) 배경 그리드 제거 및 화이트 통일 (기존 스타일 태그 내 교체)
// 대상: page-scope-page07 (P7), page-scope-page09 (P13), page-scope-page11 (P18), page-scope-page13 (P24), page-scope-page16 (P31)
const notesScopes = ['page-scope-page07', 'page-scope-page09', 'page-scope-page11', 'page-scope-page13', 'page-scope-page16'];

notesScopes.forEach(scope => {
  // Replace concept-page styles
  const conceptRegex = new RegExp(`(\\.${scope}\\s+\\.concept-page[^{]*\\{[^}]*?)background-color:\\s*#fafaf9\\s*!important;[^}]*?background-image:[^;]+;[^}]*?background-size:[^;]+;([^}]*?)padding:[^;]+;([^{}]*?\\})`, 'g');
  
  if (conceptRegex.test(html)) {
    html = html.replace(conceptRegex, (m, p1, p2, p3) => {
      console.log(`Replaced concept-page style in ${scope}`);
      return `${p1}background-color: #ffffff !important;\n            background-image: none !important;${p2}padding: 20px 25px 35px 25px !important;${p3}`;
    });
  } else {
    console.log(`WARN: conceptRegex did not match for ${scope}`);
  }
});

// 2. T3: 실전 체화 정답 박스 인라인 패딩 슬림화 (30px 기준에 최적화)
// .ans-box 의 패딩 5px -> 2px 5px 로 슬림화
html = html.replace(/class="ans-box" style="margin-top: 2px; background: #eff6ff; border: 2px solid #bfdbfe; border-radius: 8px; padding: 5px; display: flex; align-items: center; justify-content: center; gap: 10px;"/g,
  'class="ans-box" style="margin-top: 2px; background: #eff6ff; border: 2px solid #bfdbfe; border-radius: 8px; padding: 2px 5px; height: 30px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; gap: 10px;"'
);

// 3. Inject Standardized CSS Block
const standardizedCss = `
<!-- ==========================================================================
     WEEK 5 STANDARDIZED DESIGN SYSTEM (MATCHING WEEKS 1, 2, 3, 4 STANDARDS)
     - T1: 실전 암기장(Notes) 모눈 그리드 완전 제거 및 순백색(#ffffff) 통일
     - T2: Section 및 Notes 헤더 6p 규격 통일 (컨테이너 패딩 20px 25px 35px 25px, 헤더 55px, 블루밑줄, 폰트 20px/10px)
     - T3: 실전 체화 상단 압축 (상단여백 30px, 헤더마진 10px, 정답박스 30px)
     - T4: 실전 체화 코칭 상자 하단 기준 우선 배치 + 해설 텍스트 닿을 때만 [방안 3] 스마트 자동 전환
     ========================================================================== -->
<style id="week5-standardized-system">
/* --- T2: Section 개념 페이지 컨테이너 패딩 통일 --- */
:is(.page-scope-page06, .page-scope-page08, .page-scope-page10, .page-scope-page12, .page-scope-page14, .page-scope-page15) :is(.page-left, .page-right, .page-full, .concept-page),
:is(.page-scope-page06, .page-scope-page08, .page-scope-page10, .page-scope-page12, .page-scope-page14, .page-scope-page15).page-left,
:is(.page-scope-page06, .page-scope-page08, .page-scope-page10, .page-scope-page12, .page-scope-page14, .page-scope-page15) .a4-page {
    padding: 20px 25px 35px 25px !important;
    width: 100% !important;
    box-sizing: border-box !important;
    display: flex !important;
    flex-direction: column !important;
}

/* --- T2: Section 헤더 55px, 블루 밑줄, 하단 정렬 --- */
:is(.page-scope-page06, .page-scope-page08, .page-scope-page10, .page-scope-page12, .page-scope-page14, .page-scope-page15) .data-header {
    border-bottom: 2px solid #0284c7 !important;
    padding-bottom: 6px !important;
    margin-bottom: 10px !important;
    height: 55px !important;
    box-sizing: border-box !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-end !important;
    flex-shrink: 0 !important;
}

/* --- T2: Section 라벨 볼드 10px --- */
:is(.page-scope-page06, .page-scope-page08, .page-scope-page10, .page-scope-page12, .page-scope-page14, .page-scope-page15) .data-header > div:first-child,
:is(.page-scope-page06, .page-scope-page08, .page-scope-page10, .page-scope-page12, .page-scope-page14, .page-scope-page15) .section-label {
    font-size: 10px !important;
    font-weight: 900 !important;
    color: #0284c7 !important;
    margin-bottom: 3px !important;
    line-height: normal !important;
}

/* --- T2: Section 메인 타이틀 볼드 20px --- */
:is(.page-scope-page06, .page-scope-page08, .page-scope-page10, .page-scope-page12, .page-scope-page14, .page-scope-page15) .data-title {
    font-size: 20px !important;
    font-weight: 900 !important;
    color: #0f172a !important;
    letter-spacing: -1px !important;
    margin: 0 !important;
    line-height: 1.2 !important;
}

/* --- T1 & T2: 암기장(Notes) 컨테이너 모눈 그리드 완전 제거, 화이트 배경, 6p 패딩 --- */
:is(.page-scope-page07, .page-scope-page09, .page-scope-page11, .page-scope-page13, .page-scope-page16) .concept-page,
:is(.page-scope-page07, .page-scope-page09, .page-scope-page11, .page-scope-page13, .page-scope-page16).concept-page {
    padding: 20px 25px 35px 25px !important;
    width: 100% !important;
    box-sizing: border-box !important;
    background-color: #ffffff !important;
    background-image: none !important;
    display: flex !important;
    flex-direction: column !important;
}

/* --- T2: 암기장(Notes) 헤더 55px, 블루 밑줄, 폰트 20px --- */
:is(.page-scope-page07, .page-scope-page09, .page-scope-page11, .page-scope-page13, .page-scope-page16) .schema-title {
    font-size: 20px !important;
    font-weight: 900 !important;
    color: #0f172a !important;
    letter-spacing: -1px !important;
    margin: 0 0 10px 0 !important;
    padding: 0 0 6px 0 !important;
    border-bottom: 2px solid #0284c7 !important;
    height: 55px !important;
    box-sizing: border-box !important;
    display: flex !important;
    align-items: flex-end !important;
    line-height: normal !important;
    flex-shrink: 0 !important;
}

/* --- T3: 실전 체화 문항 정답 및 해설 페이지 상단 여백 및 정답 박스 최적화 --- */
:is(.page-scope-section01_ans, .page-scope-section02_ans, .page-scope-section03_ans, .page-scope-section04_ans, .page-scope-section05_ans) .full-page-content,
.full-page-content:is([data-scope="section01_ans"], [data-scope="section02_ans"], [data-scope="section03_ans"], [data-scope="section04_ans"], [data-scope="section05_ans"]) {
    padding-top: 30px !important;
}

:is(.page-scope-section01_ans, .page-scope-section02_ans, .page-scope-section03_ans, .page-scope-section04_ans, .page-scope-section05_ans) :is(.header, .prob-header),
:is(.header, .prob-header):is([data-scope="section01_ans"], [data-scope="section02_ans"], [data-scope="section03_ans"], [data-scope="section04_ans"], [data-scope="section05_ans"]) {
    margin-bottom: 10px !important;
}

:is(.page-scope-section01_ans, .page-scope-section02_ans, .page-scope-section03_ans, .page-scope-section04_ans, .page-scope-section05_ans) .ans-box,
.ans-box:is([data-scope="section01_ans"], [data-scope="section02_ans"], [data-scope="section03_ans"], [data-scope="section04_ans"], [data-scope="section05_ans"]) {
    height: 30px !important;
    box-sizing: border-box !important;
    padding: 2px 5px !important;
}

/* --- T4: 실전 체화 코칭 상자 하단 기준 우선 배치 (기본값) --- */
:is(.page-scope-section01_ans, .page-scope-section02_ans, .page-scope-section03_ans, .page-scope-section04_ans, .page-scope-section05_ans) .practice-col {
    position: relative !important;
    padding-bottom: 80px !important;
}

:is(.page-scope-section01_ans, .page-scope-section02_ans, .page-scope-section03_ans, .page-scope-section04_ans, .page-scope-section05_ans) .learning-method {
    position: absolute !important;
    bottom: 0px !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    box-sizing: border-box !important;
    margin-top: 0 !important;
}
</style>
`;

if (html.includes('id="week5-standardized-system"')) {
  console.log('week5-standardized-system style already present, skipping injection');
} else {
  html = html.replace('</head>', `${standardizedCss}\n</head>`);
  console.log('Injected standardizedCss block into <head>');
}

// 4. Inject alignCoachingBoxes() JS with smart bottom-first + collision-fallback logic
const jsBlock = `
function alignCoachingBoxes() {
    const pages = document.querySelectorAll('.a4-page');
    pages.forEach(page => {
        const pageRect = page.getBoundingClientRect();
        if (pageRect.height === 0 || pageRect.width === 0) return;

        const cols = page.querySelectorAll('.practice-col');
        if (cols.length < 2) return;
        const leftCol = cols[0];
        const rightCol = cols[1];
        const leftBox = leftCol.querySelector('.learning-method');
        const rightBox = rightCol.querySelector('.learning-method');
        if (!leftBox || !rightBox) return;

        const leftExp = leftBox.previousElementSibling;
        const rightExp = rightBox.previousElementSibling;
        if (!leftExp || !rightExp) return;

        const leftExpBottom = leftExp.getBoundingClientRect().bottom - pageRect.top;
        const rightExpBottom = rightExp.getBoundingClientRect().bottom - pageRect.top;
        const maxExpBottom = Math.max(leftExpBottom, rightExpBottom);

        const leftBoxRect = leftBox.getBoundingClientRect();
        const rightBoxRect = rightBox.getBoundingClientRect();
        const maxBoxHeight = Math.max(leftBoxRect.height, rightBoxRect.height);

        // 하단 기준선: 637px (왼쪽 문제 페이지 함정 주의보와 대칭)
        const baselineBottom = 637;
        const baselineTop = baselineBottom - maxBoxHeight;

        // 해설 텍스트가 하단 기준 상자에 닿는지 검사 (마진 10px 미만 또는 겹침)
        if (maxExpBottom + 10 > baselineTop) {
            // [방안 3 적용]: 긴 해설 텍스트 바닥 + 10px 위치로 밀어내고 좌우 상단 일치
            const targetTop = maxExpBottom + 10;
            const leftMargin = Math.max(10, Math.round(targetTop - leftExpBottom));
            const rightMargin = Math.max(10, Math.round(targetTop - rightExpBottom));
            
            leftCol.style.setProperty('position', 'static', 'important');
            rightCol.style.setProperty('position', 'static', 'important');
            leftCol.style.setProperty('padding-bottom', '0px', 'important');
            rightCol.style.setProperty('padding-bottom', '0px', 'important');
            
            leftBox.style.setProperty('position', 'static', 'important');
            rightBox.style.setProperty('position', 'static', 'important');
            leftBox.style.setProperty('margin-top', leftMargin + 'px', 'important');
            leftBox.style.setProperty('margin-bottom', '5px', 'important');
            rightBox.style.setProperty('margin-top', rightMargin + 'px', 'important');
            rightBox.style.setProperty('margin-bottom', '5px', 'important');
        } else {
            // [하단 기준 우선 배치]: 해설 텍스트가 닿지 않으므로 바닥(637px)에 단정하게 배치
            leftCol.style.setProperty('position', 'relative', 'important');
            rightCol.style.setProperty('position', 'relative', 'important');
            leftCol.style.setProperty('padding-bottom', '80px', 'important');
            rightCol.style.setProperty('padding-bottom', '80px', 'important');
            
            leftBox.style.setProperty('position', 'absolute', 'important');
            rightBox.style.setProperty('position', 'absolute', 'important');
            leftBox.style.setProperty('bottom', '0px', 'important');
            rightBox.style.setProperty('bottom', '0px', 'important');
            leftBox.style.setProperty('left', '0px', 'important');
            rightBox.style.setProperty('right', '0px', 'important');
            leftBox.style.setProperty('width', '100%', 'important');
            rightBox.style.setProperty('width', '100%', 'important');
            leftBox.style.setProperty('margin-top', '0px', 'important');
            rightBox.style.setProperty('margin-top', '0px', 'important');
        }
    });
}
`;

if (!html.includes('function alignCoachingBoxes()')) {
  // Inject before initFlipbookEngine
  html = html.replace('function initFlipbookEngine() {', `${jsBlock}\nfunction initFlipbookEngine() {\n    try { alignCoachingBoxes(); } catch(e){}`);
  console.log('Injected alignCoachingBoxes() and hooked into initFlipbookEngine()');
} else {
  console.log('alignCoachingBoxes() already present in JS');
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Finished writing updated week_2028_05_final.html, new size:', html.length);
