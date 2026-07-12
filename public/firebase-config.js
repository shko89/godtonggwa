// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TODO: 아래 내용을 본인의 Firebase 설정으로 바꿔치기 하세요!
const firebaseConfig = {
  apiKey: "AIzaSyD5axOHuQQ9Y5VmIqvN1AeuVyAVivQlTXs",
  authDomain: "godtonggwa.firebaseapp.com",
  projectId: "godtonggwa",
  storageBucket: "godtonggwa.firebasestorage.app",
  messagingSenderId: "1087434066468",
  appId: "1:1087434066468:web:00a75c9329543afc76e6b1",
  measurementId: "G-YVYHR5SJZL"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 다른 파일에서 쓸 수 있게 내보내기
export { auth, db, signInWithEmailAndPassword, signOut, onAuthStateChanged, doc, getDoc };