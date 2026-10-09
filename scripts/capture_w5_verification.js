const fs = require('fs');
const { execSync } = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

let baseHtml = fs.readFileSync('C:/Users/shko8/godtonggwa/public/STEST/weekly/ebook/week_2028_05_final.html', 'utf8');
baseHtml = baseHtml.replace(/alert\([^)]*\);/g, '// alert();');
baseHtml = baseHtml.replace(/window\.location\.href\s*=\s*[^;]+;/g, '// redirect();');
baseHtml = baseHtml.replace('window.toggleFlipbook();', '// window.toggleFlipbook();');

console.log('Capturing screenshots of verified week 5 pages...');
const pagesToCapture = [
  // 5 Practice Pages
  { nth: 11, name: 'shot_w5_p11.png', title: '11p (Practice 01)' },
  { nth: 15, name: 'shot_w5_p15.png', title: '15p (Practice 02)' },
  { nth: 22, name: 'shot_w5_p22.png', title: '22p (Practice 03)' },
  { nth: 28, name: 'shot_w5_p28.png', title: '28p (Practice 04)' },
  { nth: 33, name: 'shot_w5_p33.png', title: '33p (Practice 05)' },
  // Section Pages
  { nth: 6, name: 'shot_w5_p06.png', title: '06p (Section 01)' },
  { nth: 12, name: 'shot_w5_p12.png', title: '12p (Section 02)' },
  { nth: 16, name: 'shot_w5_p16.png', title: '16p (Section 03 p1)' },
  { nth: 17, name: 'shot_w5_p17.png', title: '17p (Section 03 p2)' },
  { nth: 23, name: 'shot_w5_p23.png', title: '23p (Section 04)' },
  { nth: 29, name: 'shot_w5_p29.png', title: '29p (Section 05 p1)' },
  // Notes Pages
  { nth: 7, name: 'shot_w5_p07.png', title: '07p (Notes 01)' },
  { nth: 13, name: 'shot_w5_p13.png', title: '13p (Notes 02)' },
  { nth: 18, name: 'shot_w5_p18.png', title: '18p (Notes 03)' },
  { nth: 24, name: 'shot_w5_p24.png', title: '24p (Notes 04)' },
  { nth: 31, name: 'shot_w5_p31.png', title: '31p (Notes 05)' },
];

pagesToCapture.forEach(p => {
  let singleHtml = baseHtml.replace('</head>', `
<style>
body { display: flex !important; justify-content: center; align-items: center; background: #cbd5e1; margin: 0; padding: 20px; }
#flipbook-container { display: none !important; }
#main-content { display: block !important; }
.page-wrapper { display: none !important; }
.page-wrapper:nth-of-type(${p.nth}) { display: block !important; }
.a4-page { width: 500px !important; height: 707px !important; margin: 0 auto !important; box-shadow: 0 4px 15px rgba(0,0,0,0.15) !important; }
</style>
</head>`);
  fs.writeFileSync('C:/Users/shko8/godtonggwa/tmp_single_w5.html', singleHtml);
  execSync(`"${chromePath}" --headless=new --window-size=600,800 --screenshot="C:/Users/shko8/godtonggwa/${p.name}" "file:///C:/Users/shko8/godtonggwa/tmp_single_w5.html"`);
  console.log('Captured ' + p.name + ' (' + p.title + ')');
});

if (fs.existsSync('C:/Users/shko8/godtonggwa/tmp_single_w5.html')) {
  fs.unlinkSync('C:/Users/shko8/godtonggwa/tmp_single_w5.html');
}
console.log('All week 5 captures done!');
