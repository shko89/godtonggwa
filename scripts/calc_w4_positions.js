const fs = require('fs');
const { execSync } = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

let baseHtml = fs.readFileSync('C:/Users/shko8/godtonggwa/public/STEST/weekly/ebook/week_2028_04_final.html', 'utf8');
baseHtml = baseHtml.replace(/alert\([^)]*\);/g, '// alert();');
baseHtml = baseHtml.replace(/window\.location\.href\s*=\s*[^;]+;/g, '// redirect();');
baseHtml = baseHtml.replace('window.toggleFlipbook();', '// window.toggleFlipbook();');

// Inject test compression CSS
const testCss = `
<style>
body { display: flex !important; }
#flipbook-container { display: none !important; }
#main-content { display: block !important; }
.page-wrapper { display: block !important; position: static !important; }
.a4-page { display: flex !important; flex-direction: column !important; width: 500px !important; height: 707px !important; position: relative !important; margin: 20px auto !important; }

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
    margin-top: 10px !important;
}
</style>
<script>
window.addEventListener('load', () => {
  const pages = [
    { pNum: 12, scope: 'section01_ans' },
    { pNum: 18, scope: 'section02_ans' },
    { pNum: 25, scope: 'section05_ans' },
    { pNum: 31, scope: 'section06_ans' }
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
    const lBoxH = lBoxR ? Math.round(lBoxR.height) : null;
    const rBoxH = rBoxR ? Math.round(rBoxR.height) : null;
    const maxBoxH = Math.max(lBoxH || 0, rBoxH || 0);

    const maxExpBottom = Math.max(leftExpBottom, rightExpBottom);
    const targetTop = maxExpBottom + 10;
    const leftMargin = targetTop - leftExpBottom;
    const rightMargin = targetTop - rightExpBottom;
    const finalBoxBottom = targetTop + maxBoxH;
    const pnumTop = pnumR ? Math.round(pnumR.top - pageRect.top) : 686;

    results[p.pNum] = {
      leftExpBottom,
      rightExpBottom,
      diff: rightExpBottom - leftExpBottom,
      targetTop,
      leftMargin,
      rightMargin,
      leftBoxHeight: lBoxH,
      rightBoxHeight: rBoxH,
      maxBoxH,
      finalBoxBottom,
      pageNumTop: pnumTop,
      gapToPageNum: pnumTop - finalBoxBottom
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
fs.writeFileSync('C:/Users/shko8/godtonggwa/tmp_calc_w4.html', html);
const out = execSync(`"${chromePath}" --headless=new --dump-dom --virtual-time-budget=2000 "file:///C:/Users/shko8/godtonggwa/tmp_calc_w4.html"`, { maxBuffer: 10 * 1024 * 1024 }).toString();
const m = out.match(/<div id="report">([\s\S]*?)<\/div>/);
if (m) console.log('WEEK 4 PRACTICE COMPRESSED CALCULATIONS:\n', m[1]);
fs.unlinkSync('C:/Users/shko8/godtonggwa/tmp_calc_w4.html');
