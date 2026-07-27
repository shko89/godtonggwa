const fs = require('fs');
const filepath = 'C:\\\\Users\\\\shko8\\\\godtonggwa\\\\public\\\\STEST\\\\weekly\\\\timeattack\\\\assets\\\\index-C5nGwdB3.js';
let text = fs.readFileSync(filepath, 'utf8');

// 1. Rewrite tx component to use direct URL
const oldTx = 'function tx({examId:e,fileName:t}){let[n,r]=(0,x.useState)(``);return(0,x.useEffect)(()=>{(async()=>{try{if(!t||!e)return;let n=e.split(`_`)[1],i=await yi(bi(Kb,`questions/week/${n}/${e}/${t}`));r(i)}catch(e){console.error(`Failed to load image from Firebase`,e)}})()},[t]),';
const newTx = 'function tx({examId:e,fileName:t}){let[n,r]=(0,x.useState)(``);return(0,x.useEffect)(()=>{if(!t||!e)return;let y=e.split(`_`)[1];r(`https://firebasestorage.googleapis.com/v0/b/godtonggwa.firebasestorage.app/o/questions%2Fweek%2F${y}%2F${e}%2F${t}?alt=media`);},[t]),';
text = text.replace(oldTx, newTx);

// 2. Add preloading loop when the 20 questions array is generated
const oldInit = 'return{id:t+1,answer:String(n[t]||`1`),score:Number(r[t])||2,fileName:`${i}.webp`}});p(i)}';
const newInit = 'return{id:t+1,answer:String(n[t]||`1`),score:Number(r[t])||2,fileName:`${i}.webp`}});i.forEach(q=>{let y=a.split(`_`)[1];new Image().src=`https://firebasestorage.googleapis.com/v0/b/godtonggwa.firebasestorage.app/o/questions%2Fweek%2F${y}%2F${a}%2F${q.fileName}?alt=media`});p(i)}';
text = text.replace(oldInit, newInit);

// 3. Add preloading loop for the fallback catch block as well
const oldFallback = 'return{id:t+1,answer:`1`,score:2.5,fileName:`${n}.webp`}});p(t)}';
const newFallback = 'return{id:t+1,answer:`1`,score:2.5,fileName:`${n}.webp`}});t.forEach(q=>{let y=a.split(`_`)[1];new Image().src=`https://firebasestorage.googleapis.com/v0/b/godtonggwa.firebasestorage.app/o/questions%2Fweek%2F${y}%2F${a}%2F${q.fileName}?alt=media`});p(t)}';
text = text.replace(oldFallback, newFallback);

fs.writeFileSync(filepath, text, 'utf8');
console.log('Patched for preloading and direct URL successfully!');
