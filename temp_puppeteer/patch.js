const fs = require('fs');
const filepath = 'C:\\\\Users\\\\shko8\\\\godtonggwa\\\\public\\\\STEST\\\\weekly\\\\timeattack\\\\assets\\\\index-C5nGwdB3.js';
let text = fs.readFileSync(filepath, 'utf8');
text = text.replace(/fileName:\`\$\{i\}\.png\`/g, 'fileName:`${i}.webp`');
text = text.replace(/fileName:\`\$\{n\}\.png\`/g, 'fileName:`${n}.webp`');
fs.writeFileSync(filepath, text, 'utf8');
console.log('Patched successfully!');
