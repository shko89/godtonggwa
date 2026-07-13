const admin = require('firebase-admin'); 
admin.initializeApp({ credential: admin.credential.applicationDefault(), projectId: 'godtonggwa' }); 
const db = admin.firestore(); 

async function inspect() { 
    const exams = await db.collection('exams').get(); 
    exams.forEach(doc => console.log('Exam:', doc.id, doc.data().title)); 
    const q1 = await db.collection('questions').where('exam_id', '==', 'exam_01').get(); 
    console.log('Questions in exam_01:', q1.size); 
} 
inspect().catch(console.error);
