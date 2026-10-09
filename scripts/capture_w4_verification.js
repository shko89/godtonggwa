const fs = require('fs');
const { execSync } = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

let baseHtml = fs.readFileSync('C:/Users/shko8/godtonggwa/public/STEST/weekly/ebook/week_2028_04_final.html', 'utf8');
baseHtml = baseHtml.replace(/alert\([^)]*\);/g, '// alert();');
baseHtml = baseHtml.replace(/window\.location\.href\s*=\s*[^;]+;/g, '// redirect();');
baseHtml = baseHtml.replace('window.toggleFlipbook();', '// window.toggleFlipbook();');

console.log('Capturing screenshots of verified week 4 pages...');
const pagesToCapture = [
  // 4 Practice Pages
  { nth: 12, name: 'shot_w4_p12.png', title: '12p (Practice 01)' },
  { nth: 18, name: 'shot_w4_p18.png', title: '18p (Practice 02)' },
  { nth: 25, name: 'shot_w4_p25.png', title: '25p (Practice 03)' },
  { nth: 31, name: 'shot_w4_p31.png', title: '31p (Practice 04)' },
  // Section Pages
  { nth: 6, name: 'shot_w4_p06.png', title: '06p (Section 01)' },
  { nth: 7, name: 'shot_w4_p07.png', title: '07p (Section 01 p2)' },
  { nth: 13, name: 'shot_w4_p13.png', title: '13p (Section 02)' },
  { nth: 19, name: 'shot_w4_p19.png', title: '19p (Section 03)' },
  { nth: 26, name: 'shot_w4_p26.png', title: '26p (Section 04)' },
  // Notes Pages
  { nth: 8, name: 'shot_w4_p08.png', title: '08p (Notes 01)' },
  { nth: 14, name: 'shot_w4_p14.png', title: '14p (Notes 02)' },
  { nth: 21, name: 'shot_w4_p21.png', title: '21p (Notes 03)' },
  { nth: 27, name: 'shot_w4_p27.png', title: '27p (Notes 04)' },
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
  fs.writeFileSync('C:/Users/shko8/godtonggwa/tmp_single_w4.html', singleHtml);
  execSync(`"${chromePath}" --headless=new --window-size=600,800 --screenshot="C:/Users/shko8/godtonggwa/${p.name}" "file:///C:/Users/shko8/godtonggwa/tmp_single_w4.html"`);
  console.log('Captured ' + p.name + ' (' + p.title + ')');
});

if (fs.existsSync('C:/Users/shko8/godtonggwa/tmp_single_w4.html')) {
  fs.unlinkSync('C:/Users/shko8/godtonggwa/tmp_single_w4.html');
}
console.log('All captures done!');
