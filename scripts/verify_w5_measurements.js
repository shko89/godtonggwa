const fs = require('fs');
const { execSync } = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

let baseHtml = fs.readFileSync('C:/Users/shko8/godtonggwa/public/STEST/weekly/ebook/week_2028_05_final.html', 'utf8');
baseHtml = baseHtml.replace(/alert\([^)]*\);/g, '// alert();');
baseHtml = baseHtml.replace(/window\.location\.href\s*=\s*[^;]+;/g, '// redirect();');
baseHtml = baseHtml.replace('window.toggleFlipbook();', '// window.toggleFlipbook();');

const measureScript = `
<style>
body { display: flex !important; }
#flipbook-container { display: none !important; }
#main-content { display: block !important; }
.page-wrapper { display: block !important; position: static !important; }
.a4-page { display: flex !important; flex-direction: column !important; width: 500px !important; height: 707px !important; position: relative !important; margin: 20px auto !important; }
</style>
<script>
window.addEventListener('load', () => {
  const results = {
    headers: {},
    notesBg: {},
    practice: {}
  };

  // 1. Headers (Sections & Notes)
  const headerPages = [
    { pNum: 6, selector: '.page-wrapper:nth-of-type(6)', type: 'SECTION' },
    { pNum: 7, selector: '.page-wrapper:nth-of-type(7)', type: 'NOTES' },
    { pNum: 12, selector: '.page-wrapper:nth-of-type(12)', type: 'SECTION' },
    { pNum: 13, selector: '.page-wrapper:nth-of-type(13)', type: 'NOTES' },
    { pNum: 16, selector: '.page-wrapper:nth-of-type(16)', type: 'SECTION' },
    { pNum: 17, selector: '.page-wrapper:nth-of-type(17)', type: 'SECTION' },
    { pNum: 18, selector: '.page-wrapper:nth-of-type(18)', type: 'NOTES' },
    { pNum: 23, selector: '.page-wrapper:nth-of-type(23)', type: 'SECTION' },
    { pNum: 24, selector: '.page-wrapper:nth-of-type(24)', type: 'NOTES' },
    { pNum: 29, selector: '.page-wrapper:nth-of-type(29)', type: 'SECTION' },
    { pNum: 30, selector: '.page-wrapper:nth-of-type(30)', type: 'SECTION' },
    { pNum: 31, selector: '.page-wrapper:nth-of-type(31)', type: 'NOTES' }
  ];

  headerPages.forEach(hp => {
    const wrap = document.querySelector(hp.selector);
    if (!wrap) return;
    const container = wrap.querySelector('.page-left') || wrap.querySelector('.page-right') || wrap.querySelector('.concept-page') || wrap.querySelector('.a4-page');
    const headerBox = wrap.querySelector('.data-header') || wrap.querySelector('.schema-title');
    const label = wrap.querySelector('.section-label');
    const title = wrap.querySelector('.data-title') || wrap.querySelector('h2') || wrap.querySelector('.schema-title');

    results.headers[hp.pNum] = {
      type: hp.type,
      containerPadding: container ? window.getComputedStyle(container).padding : null,
      headerHeight: headerBox ? Math.round(headerBox.getBoundingClientRect().height) : null,
      headerBorderBottom: headerBox ? window.getComputedStyle(headerBox).borderBottom : null,
      labelFontSize: label ? window.getComputedStyle(label).fontSize : 'N/A',
      titleFontSize: title ? window.getComputedStyle(title).fontSize : null,
    };
  });

  // 2. Notes Background
  [7, 13, 18, 24, 31].forEach(pNum => {
    const wrap = document.querySelector(\`.page-wrapper:nth-of-type(\${pNum})\`);
    if (!wrap) return;
    const cp = wrap.querySelector('.concept-page') || wrap.querySelector('.a4-page');
    if (cp) {
      const cs = window.getComputedStyle(cp);
      results.notesBg[pNum] = {
        bgColor: cs.backgroundColor,
        bgImage: cs.backgroundImage
      };
    }
  });

  // 3. Practice pages (P11, P15, P22, P28, P33)
  const practicePages = [
    { pNum: 11, scope: 'section01_ans' },
    { pNum: 15, scope: 'section02_ans' },
    { pNum: 22, scope: 'section03_ans' },
    { pNum: 28, scope: 'section04_ans' },
    { pNum: 33, scope: 'section05_ans' }
  ];

  practicePages.forEach(p => {
    const pageEl = document.querySelector('.page-scope-' + p.scope + ' .a4-page') ||
                   document.querySelector('[data-scope="' + p.scope + '"] .a4-page');
    if (!pageEl) {
      results.practice[p.pNum] = { error: 'page not found' };
      return;
    }
    const pageRect = pageEl.getBoundingClientRect();
    const cols = pageEl.querySelectorAll('.practice-col');
    if (cols.length < 2) {
      results.practice[p.pNum] = { error: 'cols < 2' };
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

    results.practice[p.pNum] = {
      pageNumTop: pnumR ? Math.round(pnumR.top - pageRect.top) : null,
      leftExpBottom: lExpR ? Math.round(lExpR.bottom - pageRect.top) : null,
      rightExpBottom: rExpR ? Math.round(rExpR.bottom - pageRect.top) : null,
      leftBoxTop: lBoxR ? Math.round(lBoxR.top - pageRect.top) : null,
      rightBoxTop: rBoxR ? Math.round(rBoxR.top - pageRect.top) : null,
      leftBoxBottom: lBoxR ? Math.round(lBoxR.bottom - pageRect.top) : null,
      rightBoxBottom: rBoxR ? Math.round(rBoxR.bottom - pageRect.top) : null,
      leftGap: (lBoxR && lExpR) ? Math.round(lBoxR.top - lExpR.bottom) : null,
      rightGap: (rBoxR && rExpR) ? Math.round(rBoxR.top - rExpR.bottom) : null,
      ansBoxHeights: Array.from(pageEl.querySelectorAll('.ans-box')).map(ab => Math.round(ab.getBoundingClientRect().height))
    };
  });

  const div = document.createElement('div');
  div.id = 'report';
  div.textContent = JSON.stringify(results, null, 2);
  document.body.appendChild(div);
});
</script>
`;

let html = baseHtml.replace('</head>', measureScript + '</head>');
fs.writeFileSync('C:/Users/shko8/godtonggwa/tmp_verify_w5.html', html);
const out = execSync(`"${chromePath}" --headless=new --dump-dom --virtual-time-budget=2000 "file:///C:/Users/shko8/godtonggwa/tmp_verify_w5.html"`, { maxBuffer: 10 * 1024 * 1024 }).toString();
const m = out.match(/<div id="report">([\s\S]*?)<\/div>/);
if (m) console.log('WEEK 5 FINAL VERIFICATION RESULTS:\n', m[1]);
fs.unlinkSync('C:/Users/shko8/godtonggwa/tmp_verify_w5.html');
