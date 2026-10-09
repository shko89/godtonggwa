const fs = require('fs');

const filePath = 'C:/Users/shko8/godtonggwa/public/STEST/weekly/ebook/week_2028_04_final.html';
let html = fs.readFileSync(filePath, 'utf8');

console.log('Original HTML size:', html.length);

// 1. T1: 암기장(Notes) 배경 그리드 제거 및 화이트 통일 (기존 스타일 태그 내 교체)
// 대상: page-scope-page07 (P8), page-scope-page09 (P14), page-scope-page11 (P21), page-scope-page13 (P27)
const notesScopes = ['page-scope-page07', 'page-scope-page09', 'page-scope-page11', 'page-scope-page13'];

notesScopes.forEach(scope => {
  // Replace concept-page styles
  const conceptRegex = new RegExp(`(\\.${scope}\\s+\\.concept-page[^{]*\\{[^}]*?)background-color:\\s*#fafaf9\\s*!important;[^}]*?background-image:[^;]+;[^}]*?background-size:[^;]+;([^}]*?)padding:[^;]+;([^{}]*?\\})`, 'g');
  
  if (conceptRegex.test(html)) {
    html = html.replace(conceptRegex, (m, p1, p2, p3) => {
      console.log(`Replaced concept-page style in ${scope}`);
      return `${p1}background-color: #ffffff !important;\n            background-image: none !important;${p2}padding: 20px 25px 35px 25px !important;${p3}`;
    });
  } else {
    console.log(`WARN: conceptRegex did not match for ${scope}, trying fallback`);
  }
});

// 2. T3 & T4: 실전 체화 해설 페이지 (P12, P18, P25, P31) 인라인 스타일 정상화
// P12 (section01_ans): 양측 10px / 10px
// P18 (section02_ans): 좌측 10px / 우측 63px
// P25 (section05_ans): 좌측 37px / 우측 10px
// P31 (section06_ans): 좌측 63px / 우측 10px

const practiceReplacements = [
  {
    scope: 'section01_ans',
    leftMargin: '10px',
    rightMargin: '10px'
  },
  {
    scope: 'section02_ans',
    leftMargin: '10px',
    rightMargin: '63px'
  },
  {
    scope: 'section05_ans',
    leftMargin: '37px',
    rightMargin: '10px'
  },
  {
    scope: 'section06_ans',
    leftMargin: '63px',
    rightMargin: '10px'
  }
];

// For each practice page, locate its wrapper chunk and normalize inline styles
const wrapperRegex = /<div class="[^"]*page-wrapper[^"]*"[^>]*>/g;
let match;
const wrappers = [];
while ((match = wrapperRegex.exec(html)) !== null) {
  wrappers.push({ tag: match[0], index: match.index });
}

practiceReplacements.forEach(pr => {
  let foundIdx = -1;
  for (let i = 0; i < wrappers.length; i++) {
    if (wrappers[i].tag.includes(pr.scope)) {
      foundIdx = i;
      break;
    }
  }
  if (foundIdx === -1) {
    console.log(`WARN: Practice wrapper not found for ${pr.scope}`);
    return;
  }

  const start = wrappers[foundIdx].index;
  const end = (foundIdx + 1 < wrappers.length) ? wrappers[foundIdx + 1].index : html.length;
  let chunk = html.slice(start, end);

  // Normalize left practice-col
  chunk = chunk.replace(
    /style="flex: 1; border-right: 1px dashed #cbd5e1; padding-right: 15px; display: flex; flex-direction: column;;? position: relative; padding-bottom: 80px;"/,
    'style="flex: 1; border-right: 1px dashed #cbd5e1; padding-right: 15px; display: flex; flex-direction: column;"'
  );

  // Normalize right practice-col
  chunk = chunk.replace(
    /style="flex: 1; padding-left: 10px; display: flex; flex-direction: column;;? position: relative; padding-bottom: 80px;"/,
    'style="flex: 1; padding-left: 10px; display: flex; flex-direction: column;"'
  );

  // Find the two learning-methods in chunk
  const lmRegex = /<div class="learning-method prac-coach-container"[^>]*>/g;
  let lmMatches = [];
  let lmMatch;
  while ((lmMatch = lmRegex.exec(chunk)) !== null) {
    lmMatches.push({ str: lmMatch[0], index: lmMatch.index });
  }

  if (lmMatches.length === 2) {
    const leftLm = `<div class="learning-method prac-coach-container" style="margin-top: ${pr.leftMargin}; margin-bottom: 5px; width: 100%; box-sizing: border-box;">`;
    const rightLm = `<div class="learning-method prac-coach-container" style="margin-top: ${pr.rightMargin}; margin-bottom: 5px; width: 100%; box-sizing: border-box;">`;

    // Replace right first (so index of left doesn't change)
    chunk = chunk.slice(0, lmMatches[1].index) + rightLm + chunk.slice(lmMatches[1].index + lmMatches[1].str.length);
    chunk = chunk.slice(0, lmMatches[0].index) + leftLm + chunk.slice(lmMatches[0].index + lmMatches[0].str.length);
    console.log(`Successfully normalized inline coaching boxes for ${pr.scope}`);
  } else {
    console.log(`WARN: Found ${lmMatches.length} learning-method in ${pr.scope}`);
  }

  // Put chunk back into html
  html = html.slice(0, start) + chunk + html.slice(end);
  // Re-sync wrappers for next iteration
  wrappers.length = 0;
  while ((match = wrapperRegex.exec(html)) !== null) {
    wrappers.push({ tag: match[0], index: match.index });
  }
});

// 3. Inject Standardized CSS Block
const standardizedCss = `
<!-- ==========================================================================
     WEEK 4 STANDARDIZED DESIGN SYSTEM (MATCHING WEEKS 1, 2, 3 STANDARDS)
     - T1: 실전 암기장(Notes) 모눈 그리드 완전 제거 및 순백색(#ffffff) 통일
     - T2: Section 및 Notes 헤더 6p 규격 통일 (컨테이너 패딩 20px 25px 35px 25px, 헤더 55px, 블루밑줄, 폰트 20px/10px)
     - T3: 실전 체화 상단 압축 (상단여백 30px, 헤더마진 10px, 정답박스 30px, flex flow 복원)
     - T4: 실전 체화 코칭 상자 [방안 3] 좌/우 상단 높이 100% 일치 정밀 마진 부여
     ========================================================================== -->
<style id="week4-standardized-system">
/* --- T2: Section 개념 페이지 컨테이너 패딩 통일 --- */
:is(.page-scope-page06, .page-scope-page08, .page-scope-page10, .page-scope-page12) :is(.page-left, .page-right, .page-full, .concept-page),
:is(.page-scope-page06, .page-scope-page08, .page-scope-page10, .page-scope-page12).page-left,
:is(.page-scope-page06, .page-scope-page08, .page-scope-page10, .page-scope-page12) .a4-page {
    padding: 20px 25px 35px 25px !important;
    width: 100% !important;
    box-sizing: border-box !important;
    display: flex !important;
    flex-direction: column !important;
}

/* --- T2: Section 헤더 55px, 블루 밑줄, 하단 정렬 --- */
:is(.page-scope-page06, .page-scope-page08, .page-scope-page10, .page-scope-page12) .data-header {
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
:is(.page-scope-page06, .page-scope-page08, .page-scope-page10, .page-scope-page12) .data-header > div:first-child,
:is(.page-scope-page06, .page-scope-page08, .page-scope-page10, .page-scope-page12) .section-label {
    font-size: 10px !important;
    font-weight: 900 !important;
    color: #0284c7 !important;
    margin-bottom: 3px !important;
    line-height: normal !important;
}

/* --- T2: Section 메인 타이틀 볼드 20px --- */
:is(.page-scope-page06, .page-scope-page08, .page-scope-page10, .page-scope-page12) .data-title {
    font-size: 20px !important;
    font-weight: 900 !important;
    color: #0f172a !important;
    letter-spacing: -1px !important;
    margin: 0 !important;
    line-height: 1.2 !important;
}

/* --- T1 & T2: 암기장(Notes) 컨테이너 모눈 그리드 완전 제거, 화이트 배경, 6p 패딩 --- */
:is(.page-scope-page07, .page-scope-page09, .page-scope-page11, .page-scope-page13) .concept-page,
:is(.page-scope-page07, .page-scope-page09, .page-scope-page11, .page-scope-page13).concept-page {
    padding: 20px 25px 35px 25px !important;
    width: 100% !important;
    box-sizing: border-box !important;
    background-color: #ffffff !important;
    background-image: none !important;
    display: flex !important;
    flex-direction: column !important;
}

/* --- T2: 암기장(Notes) 헤더 55px, 블루 밑줄, 폰트 20px --- */
:is(.page-scope-page07, .page-scope-page09, .page-scope-page11, .page-scope-page13) .schema-title {
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
:is(.page-scope-section01_ans, .page-scope-section02_ans, .page-scope-section05_ans, .page-scope-section06_ans) .full-page-content,
.full-page-content:is([data-scope="section01_ans"], [data-scope="section02_ans"], [data-scope="section05_ans"], [data-scope="section06_ans"]) {
    padding-top: 30px !important;
}

:is(.page-scope-section01_ans, .page-scope-section02_ans, .page-scope-section05_ans, .page-scope-section06_ans) :is(.header, .prob-header),
:is(.header, .prob-header):is([data-scope="section01_ans"], [data-scope="section02_ans"], [data-scope="section05_ans"], [data-scope="section06_ans"]) {
    margin-bottom: 10px !important;
}

:is(.page-scope-section01_ans, .page-scope-section02_ans, .page-scope-section05_ans, .page-scope-section06_ans) .ans-box,
.ans-box:is([data-scope="section01_ans"], [data-scope="section02_ans"], [data-scope="section05_ans"], [data-scope="section06_ans"]) {
    height: 30px !important;
    box-sizing: border-box !important;
    padding: 2px 5px !important;
}

:is(.page-scope-section01_ans, .page-scope-section02_ans, .page-scope-section05_ans, .page-scope-section06_ans) .practice-col {
    position: static !important;
    padding-bottom: 0 !important;
}

:is(.page-scope-section01_ans, .page-scope-section02_ans, .page-scope-section05_ans, .page-scope-section06_ans) .learning-method {
    position: static !important;
    width: 100% !important;
    box-sizing: border-box !important;
}

/* --- T4: 실전 체화 코칭 상자 [방안 3] 좌/우 상단 높이 일치 정밀 마진 --- */
/* Page 12 (Section 01, P12): 양측 동일(456px) -> 좌 10px, 우 10px (상단 466px 통일) */
:is(.page-scope-section01_ans, [data-scope="section01_ans"]) .practice-col:first-child .learning-method {
    margin-top: 10px !important;
    margin-bottom: 5px !important;
}
:is(.page-scope-section01_ans, [data-scope="section01_ans"]) .practice-col:last-child .learning-method {
    margin-top: 10px !important;
    margin-bottom: 5px !important;
}

/* Page 18 (Section 02, P18): 좌측이 53px 더 긺 -> 좌 10px, 우 63px (상단 466px 통일) */
:is(.page-scope-section02_ans, [data-scope="section02_ans"]) .practice-col:first-child .learning-method {
    margin-top: 10px !important;
    margin-bottom: 5px !important;
}
:is(.page-scope-section02_ans, [data-scope="section02_ans"]) .practice-col:last-child .learning-method {
    margin-top: 63px !important;
    margin-bottom: 5px !important;
}

/* Page 25 (Section 03, P25): 우측이 27px 더 긺 -> 좌 37px, 우 10px (상단 453px 통일) */
:is(.page-scope-section05_ans, [data-scope="section05_ans"]) .practice-col:first-child .learning-method {
    margin-top: 37px !important;
    margin-bottom: 5px !important;
}
:is(.page-scope-section05_ans, [data-scope="section05_ans"]) .practice-col:last-child .learning-method {
    margin-top: 10px !important;
    margin-bottom: 5px !important;
}

/* Page 31 (Section 04, P31): 우측이 53px 더 긺 -> 좌 63px, 우 10px (상단 519px 통일) */
:is(.page-scope-section06_ans, [data-scope="section06_ans"]) .practice-col:first-child .learning-method {
    margin-top: 63px !important;
    margin-bottom: 5px !important;
}
:is(.page-scope-section06_ans, [data-scope="section06_ans"]) .practice-col:last-child .learning-method {
    margin-top: 10px !important;
    margin-bottom: 5px !important;
}
</style>
`;

if (html.includes('id="week4-standardized-system"')) {
  console.log('week4-standardized-system style already present, skipping injection');
} else {
  html = html.replace('</head>', `${standardizedCss}\n</head>`);
  console.log('Injected standardizedCss block into <head>');
}

// 4. Inject alignCoachingBoxes() JS and call inside initFlipbookEngine
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

        const leftBottom = leftExp.getBoundingClientRect().bottom - pageRect.top;
        const rightBottom = rightExp.getBoundingClientRect().bottom - pageRect.top;

        const maxBottom = Math.max(leftBottom, rightBottom);
        if (maxBottom > 350) {
            const targetTop = maxBottom + 10;
            const leftMargin = Math.max(10, Math.round(targetTop - leftBottom));
            const rightMargin = Math.max(10, Math.round(targetTop - rightBottom));
            
            leftBox.style.setProperty('margin-top', leftMargin + 'px', 'important');
            leftBox.style.setProperty('margin-bottom', '5px', 'important');
            rightBox.style.setProperty('margin-top', rightMargin + 'px', 'important');
            rightBox.style.setProperty('margin-bottom', '5px', 'important');
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
console.log('Finished writing updated week_2028_04_final.html, new size:', html.length);
