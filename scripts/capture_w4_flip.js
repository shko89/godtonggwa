const fs = require('fs');
const { execSync } = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

let baseHtml = fs.readFileSync('C:/Users/shko8/godtonggwa/public/STEST/weekly/ebook/week_2028_04_final.html', 'utf8');
baseHtml = baseHtml.replace(/alert\([^)]*\);/g, '// alert();');
baseHtml = baseHtml.replace(/window\.location\.href\s*=\s*[^;]+;/g, '// redirect();');

const spreads = [
  { pageTarget: 6, filename: 'flip_w4_spread_p6_p7.png', title: '6-7p (Section 01 Spread)' },
  { pageTarget: 11, filename: 'flip_w4_spread_p11_p12.png', title: '11-12p (Practice 01 Spread)' },
  { pageTarget: 17, filename: 'flip_w4_spread_p17_p18.png', title: '17-18p (Practice 02 Spread)' }
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
  fs.writeFileSync('C:/Users/shko8/godtonggwa/tmp_flip_w4.html', html);

  try {
      execSync(`"${chromePath}" --headless=new --window-size=1200,900 --virtual-time-budget=4000 --screenshot="C:/Users/shko8/godtonggwa/${sp.filename}" "file:///C:/Users/shko8/godtonggwa/tmp_flip_w4.html"`);
      console.log('Captured ' + sp.filename + ' (' + sp.title + ')');
  } catch (e) {
      console.error('Flip capture error:', e.message);
  } finally {
      if (fs.existsSync('C:/Users/shko8/godtonggwa/tmp_flip_w4.html')) {
          fs.unlinkSync('C:/Users/shko8/godtonggwa/tmp_flip_w4.html');
      }
  }
});
console.log('All flip spreads captured!');
