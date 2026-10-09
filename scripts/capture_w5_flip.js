const fs = require('fs');
const { execSync } = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

let baseHtml = fs.readFileSync('C:/Users/shko8/godtonggwa/public/STEST/weekly/ebook/week_2028_05_final.html', 'utf8');
baseHtml = baseHtml.replace(/alert\([^)]*\);/g, '// alert();');
baseHtml = baseHtml.replace(/window\.location\.href\s*=\s*[^;]+;/g, '// redirect();');

const spreads = [
  { pageTarget: 10, filename: 'flip_w5_spread_p10_p11.png', title: '10-11p (Practice 01 Spread - Trap vs Coach)' },
  { pageTarget: 14, filename: 'flip_w5_spread_p14_p15.png', title: '14-15p (Practice 02 Spread - Trap vs Coach)' },
  { pageTarget: 16, filename: 'flip_w5_spread_p16_p17.png', title: '16-17p (Section 03 Spread)' }
];

spreads.forEach(sp => {
  const testFlipScript = `
<script>
window.addEventListener('load', () => {
    setTimeout(() => {
        try {
            if (pageFlip) {
                pageFlip.turnToPage(${sp.pageTarget});
            }
        } catch(e) {}
    }, 1500);
});
</script>
`;

  let html = baseHtml.replace('</head>', testFlipScript + '</head>');
  fs.writeFileSync('C:/Users/shko8/godtonggwa/tmp_flip_w5.html', html);

  try {
      execSync(`"${chromePath}" --headless=new --window-size=1200,900 --virtual-time-budget=4000 --screenshot="C:/Users/shko8/godtonggwa/${sp.filename}" "file:///C:/Users/shko8/godtonggwa/tmp_flip_w5.html"`);
      console.log('Captured ' + sp.filename + ' (' + sp.title + ')');
  } catch (e) {
      console.error('Flip capture error:', e.message);
  } finally {
      if (fs.existsSync('C:/Users/shko8/godtonggwa/tmp_flip_w5.html')) {
          fs.unlinkSync('C:/Users/shko8/godtonggwa/tmp_flip_w5.html');
      }
  }
});
console.log('All week 5 flip spreads captured!');
