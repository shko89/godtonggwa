const fs = require('fs');

const filePath = 'C:/Users/shko8/godtonggwa/public/STEST/weekly/ebook/week_2028_05_final.html';

if (!fs.existsSync(filePath)) {
  console.log('File does NOT exist:', filePath);
  process.exit(1);
}

const html = fs.readFileSync(filePath, 'utf8');
console.log('Week 5 file found, length:', html.length);

const wrapperRegex = /<div class="[^"]*page-wrapper[^"]*"[^>]*>/g;
let match;
const wrappers = [];
while ((match = wrapperRegex.exec(html)) !== null) {
  wrappers.push({ tag: match[0], index: match.index });
}
console.log('Total wrappers found:', wrappers.length);

const pageInfo = [];
for (let i = 0; i < wrappers.length; i++) {
  const start = wrappers[i].index;
  const end = (i + 1 < wrappers.length) ? wrappers[i + 1].index : start + 4000;
  const chunk = html.slice(start, end);
  
  const scopeMatch = chunk.match(/page-scope-([a-zA-Z0-9_-]+)/);
  const dataScopeMatch = chunk.match(/data-scope="([^"]+)"/);
  const pageNumMatch = chunk.match(/class="page-num"[^>]*>([^<]+)<\/div>/);
  
  const isSection = chunk.includes('class="data-header"') || chunk.includes('SECTION');
  const isNotes = chunk.includes('실전 암기장') || chunk.includes('schema-title') || chunk.includes('memo-grid-wrapper') || chunk.includes('memo-container');
  const isPractice = chunk.includes('실전 체화 문항') || chunk.includes('learning-method') || chunk.includes('coaching-box');
  const hasGrid = chunk.includes('linear-gradient') && (chunk.includes('#e5e7eb') || chunk.includes('20px 20px') || chunk.includes('#f3f4f6'));
  
  pageInfo.push({
    index: i + 1,
    wrapperTag: wrappers[i].tag,
    scope: scopeMatch ? scopeMatch[1] : (dataScopeMatch ? dataScopeMatch[1] : 'unknown'),
    pageNum: pageNumMatch ? pageNumMatch[1].trim() : 'no page-num',
    isSection,
    isNotes,
    isPractice,
    hasGrid
  });
}

console.log('=== WEEK 5 PAGE SUMMARY ===');
pageInfo.forEach(p => {
  const tags = [];
  if (p.isSection) tags.push('SECTION');
  if (p.isNotes) tags.push('NOTES');
  if (p.isPractice) tags.push('PRACTICE');
  if (p.hasGrid) tags.push('GRID_BG');
  console.log(`[P${p.index}] scope=${p.scope} | num=${p.pageNum} | tags=[${tags.join(', ')}] | tag=${p.wrapperTag.slice(0, 60)}`);
});
