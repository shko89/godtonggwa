// 갓통과(Godtonggwa) 글로벌 Firebase 초기화 및 설정 모듈
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export const APP_ID = 'godtonggwa_v1';

export const firebaseConfig = {
  apiKey: "AIzaSyDYljyALj-RbHKjndZYXcOaPzK-Q6xBjjo",
  authDomain: "godtonggwa.firebaseapp.com",
  projectId: "godtonggwa",
  storageBucket: "godtonggwa.firebasestorage.app",
  messagingSenderId: "1087434066468",
  appId: "1:1087434066468:web:00a75c9329543afc76e6b1",
  measurementId: "G-YVYHR5SJZL"
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let _appCheck = null;
try {
  _appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider('6LdgWWstAAAAAJiXWFVDDXeMOHocUBgmQdA62zCR'),
    isTokenAutoRefreshEnabled: true
  });
} catch (e) {
  // 이미 초기화된 경우 안전하게 무시
}
export const appCheck = _appCheck;

export const auth = getAuth(app);
export const db = getFirestore(app);

export { signInWithEmailAndPassword, signOut, onAuthStateChanged, doc, getDoc };
