const fs = require('fs');
const { execSync } = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

let baseHtml = fs.readFileSync('C:/Users/shko8/godtonggwa/public/STEST/weekly/ebook/week_2028_05_final.html', 'utf8');
baseHtml = baseHtml.replace(/alert\([^)]*\);/g, '// alert();');
baseHtml = baseHtml.replace(/window\.location\.href\s*=\s*[^;]+;/g, '// redirect();');
baseHtml = baseHtml.replace('window.toggleFlipbook();', '// window.toggleFlipbook();');

const testCss = `
<style>
body { display: flex !important; }
#flipbook-container { display: none !important; }
#main-content { display: block !important; }
.page-wrapper { display: block !important; position: static !important; }
.a4-page { display: flex !important; flex-direction: column !important; width: 500px !important; height: 707px !important; position: relative !important; margin: 20px auto !important; }

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
</style>
<script>
window.addEventListener('load', () => {
  const pages = [
    { pNum: 11, scope: 'section01_ans' },
    { pNum: 15, scope: 'section02_ans' },
    { pNum: 22, scope: 'section03_ans' },
    { pNum: 28, scope: 'section04_ans' },
    { pNum: 33, scope: 'section05_ans' }
  ];

  const results = {};

  pages.forEach(p => {
    const pageEl = document.querySelector('.page-scope-' + p.scope + ' .a4-page') ||
                   document.querySelector('[data-scope="' + p.scope + '"] .a4-page');
    if (!pageEl) {
      results[p.pNum] = { error: 'page not found' };
      return;
    }
    const pageRect = pageEl.getBoundingClientRect();
    const cols = pageEl.querySelectorAll('.practice-col');
    if (cols.length < 2) {
      results[p.pNum] = { error: 'cols < 2' };
      return;
    }

    const leftCol = cols[0];
    const rightCol = cols[1];
    const leftBox = leftCol.querySelector('.learning-method');
    const rightBox = rightCol.querySelector('.learning-method');
    const leftExp = leftBox ? leftBox.previousElementSibling : null;
    const rightExp = rightBox ? rightBox.previousElementSibling : null;
    const pageNum = pageEl.querySelector('.page-num');

    const lExpR = leftExp ? leftExp.getBoundingClientRect() : null;
    const rExpR = rightExp ? rightExp.getBoundingClientRect() : null;
    const lBoxR = leftBox ? leftBox.getBoundingClientRect() : null;
    const rBoxR = rightBox ? rightBox.getBoundingClientRect() : null;
    const pnumR = pageNum ? pageNum.getBoundingClientRect() : null;

    const leftExpBottom = lExpR ? Math.round(lExpR.bottom - pageRect.top) : null;
    const rightExpBottom = rExpR ? Math.round(rExpR.bottom - pageRect.top) : null;
    const maxExpBottom = Math.max(leftExpBottom, rightExpBottom);

    const lBoxH = lBoxR ? Math.round(lBoxR.height) : 74;
    const rBoxH = rBoxR ? Math.round(rBoxR.height) : 74;
    const maxBoxH = Math.max(lBoxH, rBoxH);

    // Baseline bottom: 637px (same as trap box on left page)
    const baselineBottom = 637;
    const baselineTop = baselineBottom - maxBoxH;

    // Check collision: if maxExpBottom + 10 > baselineTop
    const isCollision = (maxExpBottom + 10) > baselineTop;
    const targetTop = isCollision ? (maxExpBottom + 10) : baselineTop;

    results[p.pNum] = {
      leftExpBottom,
      rightExpBottom,
      maxExpBottom,
      maxBoxH,
      baselineBottom,
      baselineTop,
      isCollision,
      targetTop,
      leftMargin: targetTop - leftExpBottom,
      rightMargin: targetTop - rightExpBottom,
      finalBoxBottom: targetTop + maxBoxH,
      gapToPageNum: (pnumR ? Math.round(pnumR.top - pageRect.top) : 686) - (targetTop + maxBoxH)
    };
  });

  const div = document.createElement('div');
  div.id = 'report';
  div.textContent = JSON.stringify(results, null, 2);
  document.body.appendChild(div);
});
</script>
`;

let html = baseHtml.replace('</head>', testCss + '</head>');
fs.writeFileSync('C:/Users/shko8/godtonggwa/tmp_calc_w5.html', html);
const out = execSync(`"${chromePath}" --headless=new --dump-dom --virtual-time-budget=2000 "file:///C:/Users/shko8/godtonggwa/tmp_calc_w5.html"`, { maxBuffer: 10 * 1024 * 1024 }).toString();
const m = out.match(/<div id="report">([\s\S]*?)<\/div>/);
if (m) console.log('WEEK 5 PRACTICE POSITIONS:\n', m[1]);
fs.unlinkSync('C:/Users/shko8/godtonggwa/tmp_calc_w5.html');
