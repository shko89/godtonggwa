const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('G:\\내 드라이브\\godtonggwa\\scripts\\firebase_service_key.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function check() {
  const doc = await db.collection('exams').doc('week_2028_01').get();
  const data = doc.data();
  console.log(JSON.stringify(data.questions[0], null, 2));
}

check();
