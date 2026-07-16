

        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

        import { 

            getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,

            setPersistence, browserLocalPersistence, browserSessionPersistence, sendPasswordResetEmail 

        } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

        import { getFirestore, collection, getDocs, doc, setDoc, getDoc, addDoc, onSnapshot, query, orderBy, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";



        const firebaseConfig = {

            apiKey: "AIzaSyDYljyALj-RbHKjndZYXcOaPzK-Q6xBjjo",

            authDomain: "godtonggwa.firebaseapp.com",

            projectId: "godtonggwa",

            storageBucket: "godtonggwa.firebasestorage.app",

            messagingSenderId: "1087434066468",

            appId: "1:1087434066468:web:00a75c9329543afc76e6b1"

        };



        const app = initializeApp(firebaseConfig);

        const auth = getAuth(app);

        const db = getFirestore(app);



        let currentUser = null;

        let currentUserData = null;

        let masterExams = []; 

        let myExamData = {};  

        let myExamResults = {}; 

        let myWrongAnswers = []; 

        let masterPackages = []; 

        let myPackagesData = {};

        

        window.selectedPackageToOrder = null;

        window.selectedExamId = null; 

        window.pendingReportId = null;



        const loadingEl = document.getElementById('global-loading');

        const loadingText = document.getElementById('loading-text');



        // --- 로그인 로직 ---

        document.getElementById('login-form').addEventListener('submit', async (e) => {

            e.preventDefault();

            const email = document.getElementById('login-email').value;

            const pw = document.getElementById('login-pw').value;

            const isAutoLogin = document.getElementById('auto-login').checked;



            loadingEl.classList.remove('hidden');

            loadingText.innerText = "로그인 처리 중...";

            

            try {

                const persistenceMode = isAutoLogin ? browserLocalPersistence : browserSessionPersistence;

                await setPersistence(auth, persistenceMode);

                await signInWithEmailAndPassword(auth, email, pw);

                

                const urlParams = new URLSearchParams(window.location.search);

                if (urlParams.get('returnTo') === 'board_write') {

                    loadingText.innerText = "글쓰기 화면으로 돌아갑니다...";

                    window.location.href = '../Board/board.html?view=write';

                    return; 

                }

                if (urlParams.get('returnTo') === 'board') {

                    loadingText.innerText = "게시판으로 돌아갑니다...";

                    window.location.href = '../Board/board.html';

                    return; 

                }

                

            } catch (err) { 

                alert("로그인 실패: 아이디/비밀번호를 확인해주세요."); 

                loadingEl.classList.add('hidden'); 

            }

        });



        // --- Auth 리스너 ---

        onAuthStateChanged(auth, async (user) => {

            const authContainer = document.getElementById('auth-container');

            const appContent = document.getElementById('app-content');

            

            if (user) {

                if (user.isAnonymous) {

                    console.warn("익명 사용자는 모의고사 서비스에 접근할 수 없습니다. 로그아웃 처리합니다.");

                    await signOut(auth);

                    return;

                }



                const urlParams = new URLSearchParams(window.location.search);

                if (urlParams.get('returnTo') === 'board_write') {

                    loadingEl.classList.remove('hidden');

                    loadingText.innerText = "글쓰기 화면으로 돌아갑니다...";

                    window.location.href = '../Board/board.html?view=write';

                    return; 

                }

                if (urlParams.get('returnTo') === 'board') {

                    loadingEl.classList.remove('hidden');

                    loadingText.innerText = "게시판으로 돌아갑니다...";

                    window.location.href = '../Board/board.html';

                    return; 

                }



                currentUser = user;

                authContainer.classList.add('hidden');

                appContent.classList.remove('hidden');

                

                const userDoc = await getDoc(doc(db, "users", user.uid));

                if(userDoc.exists()) {

                    currentUserData = userDoc.data();

                    const emailId = user.email.split('@')[0];

                    document.getElementById('user-badge').innerText = emailId + "님";

                }

                await loadData();



                if (urlParams.get('view') === 'report') {

                    switchTab('report');

                } else if (urlParams.get('action') === 'order') {

                    switchTab('all');

                    window.history.replaceState({}, document.title, window.location.pathname);

                }

            } else {

                currentUser = null;

                currentUserData = null;

                appContent.classList.add('hidden');

                authContainer.classList.remove('hidden');

            }

            loadingEl.classList.add('hidden');

            lucide.createIcons();

        });



        window.openAllPassModal = () => {

            const m = document.getElementById('allPassModal');

            m.classList.remove('hidden');

            setTimeout(() => { m.children[1].classList.remove('translate-y-full'); }, 10);

        };

        window.closeAllPassModal = () => {

            const m = document.getElementById('allPassModal');

            m.children[1].classList.add('translate-y-full');

            setTimeout(() => { m.classList.add('hidden'); }, 300);

        };

        window.submitAllPassOrder = async (e) => {

            e.preventDefault();

            if(!currentUser) return alert("로그인이 필요합니다.");

            loadingEl.classList.remove('hidden');

            try {

                const depositor = document.getElementById('apOrderDepositor').value;

                const name = document.getElementById('apOrderName').value;

                const phone = document.getElementById('apOrderPhone').value;

                const address = document.getElementById('apOrderAddress').value;



                await addDoc(collection(db, "orders"), {

                    uid: currentUser.uid,

                    email: currentUser.email,

                    depositor: depositor,

                    name: name,

                    phone: phone,

                    address: address,

                    packageId: "pkg_allpass",

                    packageName: "2028 수능 All-Pass 정기구독권 (얼리버드)",

                    price: 176000,

                    status: 'pending',

                    createdAt: new Date().toISOString()

                });



                // Send Telegram Notification

                const botToken = "8418122948:AAGLh95SYa2Dj0HPQvFOe3zlHAAHj18b9ow";

                const chatId = "7703628247";

                const msg = `👑 [All-Pass 얼리버드 주문]\n\n학생: ${name} (${currentUser.email})\n입금자: ${depositor}\n연락처: ${phone}\n주소: ${address}\n\n관리자 콘솔에서 승인 시 시즌 0 무료 적용 요망!`;

                try {

                    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {

                        method: 'POST',

                        headers: { 'Content-Type': 'application/json' },

                        body: JSON.stringify({ chat_id: chatId, text: msg })

                    });

                } catch(err) { console.error("Telegram send failed:", err); }



                alert("All-Pass 얼리버드 주문이 완료되었습니다!\\n입금 확인 후 혜택(시즌 0 무료)이 적용됩니다.");

                closeAllPassModal();

            } catch(e) {

                console.error(e);

                alert("요청 중 오류가 발생했습니다.");

            } finally {

                loadingEl.classList.add('hidden');

            }

        };



        window.submitPackageOrder = async (e) => {

            e.preventDefault();

            if(!currentUser) return alert("로그인이 필요합니다.");

            

            const depositor = document.getElementById('orderDepositor').value;

            const name = document.getElementById('orderName').value;

            const phone = document.getElementById('orderPhone').value;

            const address = document.getElementById('orderAddress').value;

            

            loadingEl.classList.remove('hidden');

            loadingText.innerText = "주문 처리 중입니다...";

            try {

                const pkg = masterPackages.find(p => p.id === window.selectedPackageToOrder);

                if(!pkg) throw new Error("패키지 정보를 찾을 수 없습니다.");

                // Save order

                await addDoc(collection(db, "orders"), {

                    uid: currentUser.uid,

                    email: currentUser.email,

                    depositor: depositor,

                    name: name,

                    phone: phone,

                    address: address,

                    packageId: pkg.id,

                    packageName: pkg.title,

                    price: pkg.price,

                    status: 'pending',

                    createdAt: new Date().toISOString()

                });



                const botToken = "8418122948:AAGLh95SYa2Dj0HPQvFOe3zlHAAHj18b9ow";

                const chatId = "7703628247";

                const msg = `📦 [실물 패키지 주문]\n\n패키지: ${pkg.title}\n학생: ${name} (${currentUser.email})\n입금자: ${depositor}\n연락처: ${phone}\n주소: ${address}\n\n관리자 콘솔에서 확인 후 승인해주세요!`;

                try {

                    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(msg)}`);

                } catch(err) { console.error("Telegram send failed:", err); }



                alert("주문서 제출이 완료되었습니다.\n입금 확인 후 관리자가 승인하면 권한이 활성화됩니다.");

                closePackageOrderModal();

                switchTab('all');

            } catch(e) { 

                console.error(e); 

                alert("요청 중 오류가 발생했습니다."); 

            } finally { 

                loadingEl.classList.add('hidden'); 

            }

        };



        window.toggleAuthMode = (mode) => {

            document.getElementById('login-view').classList.toggle('hidden', mode !== 'login');

            document.getElementById('signup-view').classList.toggle('hidden', mode !== 'signup');

        };



        document.getElementById('signup-form').addEventListener('submit', async (e) => {

            e.preventDefault();

            const name = document.getElementById('signup-name').value;

            const email = document.getElementById('signup-email').value;

            const pw = document.getElementById('signup-pw').value;

            loadingEl.classList.remove('hidden');

            try {

                const cred = await createUserWithEmailAndPassword(auth, email, pw);

                await setDoc(doc(db, "users", cred.user.uid), { name: name, email: email, joinedAt: new Date().toISOString() });

                alert("가입 완료!");

            } catch (err) { alert("가입 실패: " + err.message); loadingEl.classList.add('hidden'); }

        });



        // 🌟 지워졌던 로그아웃 로직 복구

        window.logout = () => { if(confirm('로그아웃 하시겠습니까?')) signOut(auth); };



        // ==========================================

        // 데이터 로드 로직 (오답노트 콜렉션 연동 포함)

        // ==========================================

        async function loadData() {

            try {

                const q = query(collection(db, "public_exams"), orderBy("id", "asc"));

                const snapshot = await getDocs(q);

                masterExams = [];

                snapshot.forEach(doc => masterExams.push({ docId: doc.id, ...doc.data() }));



                const pkgSnap = await getDocs(collection(db, "packages"));

                masterPackages = [];

                pkgSnap.forEach(doc => masterPackages.push({ id: doc.id, ...doc.data() }));

                masterPackages.sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""));



                onSnapshot(collection(db, "users", currentUser.uid, "my_packages"), (snapshot) => {

                    myPackagesData = {};

                    snapshot.forEach(doc => myPackagesData[doc.id] = doc.data());

                    refreshCurrentTab();

                });



                onSnapshot(collection(db, "users", currentUser.uid, "my_exams"), (snapshot) => {

                    myExamData = {};

                    snapshot.forEach(doc => myExamData[doc.id] = doc.data());

                    refreshCurrentTab();

                });



                onSnapshot(collection(db, "users", currentUser.uid, "exam_results"), (snapshot) => {

                    myExamResults = {};

                    snapshot.forEach(doc => {

                        const d = doc.data();

                        if (d.percentile !== undefined) {

                            const rank = 100 - d.percentile;

                            if (rank <= 10) d.grade = 1;

                            else if (rank <= 34) d.grade = 2;

                            else if (rank <= 66) d.grade = 3;

                            else if (rank <= 90) d.grade = 4;

                            else d.grade = 5;

                        }

                        myExamResults[doc.id] = d;

                    });

                    if (window.currentTab === 'report') refreshCurrentTab();

                });



                // [추가] wrong_answers 컬렉션 실시간 동기화

                onSnapshot(collection(db, "users", currentUser.uid, "wrong_answers"), (snapshot) => {

                    myWrongAnswers = [];

                    snapshot.forEach(doc => myWrongAnswers.push(doc.data()));

                    if (window.currentTab === 'report') refreshCurrentTab();

                });



            } catch(e) { console.error(e); }

        }



        window.switchTab = (tab) => { window.currentTab = tab; refreshCurrentTab(); };

        window.currentTab = 'all';



        function refreshCurrentTab() {

            ['all', 'my', 'report'].forEach(t => {

                const el = document.getElementById(`tab-${t}`);

                if(!el) return;

                el.className = t === window.currentTab 

                    ? "pb-3 text-sm font-bold text-indigo-600 border-b-2 border-indigo-600 whitespace-nowrap transition-colors"

                    : "pb-3 text-sm font-medium text-gray-400 border-b-2 border-transparent hover:text-gray-600 whitespace-nowrap transition-colors";

            });



            const navExamBtn = document.getElementById('nav-exam-btn');

            const navReportBtn = document.getElementById('nav-report-btn');

            if (navExamBtn && navReportBtn) {

                if (window.currentTab === 'report') {

                    navExamBtn.className = "nav-btn text-gray-400 flex flex-col items-center gap-1 transition-colors";

                    navReportBtn.className = "nav-btn text-indigo-600 flex flex-col items-center gap-1 transition-colors";

                } else {

                    navExamBtn.className = "nav-btn text-indigo-600 flex flex-col items-center gap-1 transition-colors";

                    navReportBtn.className = "nav-btn text-gray-400 flex flex-col items-center gap-1 transition-colors";

                }

            }



            const contentDiv = document.getElementById('exam-content');

            

            if (window.currentTab === 'report') {

                // [수정] 보고서 진입 시 누적 분석(cumulative)을 기본값으로 사용

                const targetId = window.pendingReportId || 'cumulative';

                renderReportPage(contentDiv, targetId);

                window.pendingReportId = null;

            } else {

                renderExamList(contentDiv, window.currentTab);

            }

            lucide.createIcons();

        }



        function renderExamList(container, filterType) {

            let html = '';

            

            if (filterType === 'my') {

                const myPkgs = Object.keys(myPackagesData).map(pkgId => masterPackages.find(p => p.id === pkgId)).filter(Boolean);

                if (myPkgs.length === 0) return container.innerHTML = `<div class="text-center py-20 text-gray-400">보유한 패키지가 없습니다.</div>`;

                

                myPkgs.forEach(pkg => {

                    html += `

                    <div class="mb-8 bg-gray-50/50 rounded-2xl p-4 border border-gray-100">

                        <h3 class="text-md font-black text-indigo-900 mb-1 flex items-center gap-2"><i data-lucide="package" class="w-5 h-5 text-indigo-500"></i> ${pkg.title}</h3>

                        <p class="text-xs text-gray-500 mb-4 ml-7">${pkg.description || `${pkg.exams?.length || 0}회분 모의고사 포함`}</p>

                    `;

                    

                    const pkgStatus = myPackagesData[pkg.id].status;

                    

                    if(pkgStatus === 'pending') {

                        html += `<button disabled class="w-full py-3 mb-2 bg-yellow-50 text-yellow-600 rounded-xl text-sm font-bold border border-yellow-100 flex items-center justify-center gap-2 cursor-wait"><div class="animate-spin rounded-full h-3 w-3 border-2 border-yellow-600 border-t-transparent"></div>배송 및 승인 대기 중</button></div>`;

                        return;

                    }



                    if (pkg.exams && Array.isArray(pkg.exams) && pkg.exams.length > 0) {

                        pkg.exams.forEach(examId => {

                            const examMeta = masterExams.find(e => e.docId === examId);

                            if(examMeta) {

                                const rec = myExamData ? myExamData[examId] : null;

                                const examObj = { ...examMeta, status: rec ? rec.status : 'purchased', score: rec?.score, docId: examId };

                                html += createCard(examObj, false);

                            }

                        });

                    }

                    html += `</div>`;

                });

                container.innerHTML = html;

                return;

            }



            if (filterType === 'all') {

                const availablePkgs = masterPackages.filter(p => p.status === 'active' && !myPackagesData[p.id]);

                

                if (availablePkgs.length === 0) {

                    html += `<div class="text-center py-20 text-gray-400">현재 신청 가능한 패키지가 없습니다.</div>`;

                } else {

                    html += `<div class="mb-4"><h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2"><i data-lucide="shopping-cart" class="w-4 h-4 text-emerald-500"></i> 신청 가능한 패키지</h3>`;

                    availablePkgs.forEach(pkg => {

                        html += `

                        <div class="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 mb-4 relative">

                            <div class="relative z-10 mb-4">

                                <span class="text-[10px] font-bold text-indigo-600 block mb-1 uppercase tracking-wide">시즌 패키지</span>

                                <h4 class="text-lg font-black text-gray-900 leading-tight">${pkg.title}</h4>

                                <p class="text-xs text-gray-500 mt-2 font-medium">${pkg.description || `${pkg.exams?.length || 0}회분 모의고사 포함`}</p>

                            </div>

                            <div class="relative z-10">

                                <button onclick="openPackageOrderModal('${pkg.id}')" class="w-full py-3.5 rounded-xl text-sm font-bold flex justify-center items-center gap-2 active:scale-[0.98] transition-transform bg-gray-900 hover:bg-black text-white shadow"><i data-lucide="package" class="w-4 h-4 opacity-70"></i> 실물 패키지 신청 (${(pkg.price || 0).toLocaleString()}원)</button>

                            </div>

                        </div>

                        `;

                    });

                    html += `</div>`;

                }



                // --- 2028 수능 통합과학 연간 커리큘럼 UI 추가 ---

                html += `

                <div class="mt-10 pt-8 border-t border-gray-100">

                    <div class="mb-6">

                        <span class="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black rounded-full mb-2 tracking-widest">ROADMAP</span>

                        <h3 class="text-xl font-black text-gray-900 tracking-tight">2028 수능 통합과학 <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">연간 커리큘럼</span></h3>

                        <p class="text-xs text-gray-500 mt-2">평가원 완벽 분석부터 수능 파이널까지, 1등급을 향한 완벽한 여정</p>

                    </div>



                    <div class="space-y-4 pb-10">

                        <!-- All Pass Hook -->

                        <div class="bg-gradient-to-br from-gray-900 to-indigo-950 rounded-2xl p-6 relative overflow-hidden shadow-xl">

                            <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

                            <div class="relative z-10">

                                <div class="flex items-center gap-2 mb-2">

                                    <span class="bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">Premium</span>

                                    <span class="text-indigo-200 text-xs font-medium">시즌 1~4 (총 24회분)</span>

                                </div>

                                <h4 class="text-lg font-black text-white mb-2">[All-Pass] 2028 인피니티(Infinity) 정기구독권</h4>

                                <p class="text-sm text-indigo-100 leading-relaxed mb-4">

                                    <strong class="text-yellow-400">🚨 얼리버드 특별 혜택:</strong> 지금 구독 시 확정된 <strong class="text-white bg-indigo-900/50 px-1 rounded">[Season 0: 예비평가 완벽 분석 4회분] 즉시 무료 오픈!</strong><br>

                                    <span class="text-xs text-indigo-200 mt-1.5 block flex items-center gap-1"><i data-lucide="lock" class="w-3 h-3"></i> 6월 평가원 모의고사 직후 시즌 1, 2 단독 판매 영구 종료 (시즌 록인)</span>

                                </p>

                            </div>

                        </div>



                        <!-- Season 0 -->

                        <div class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm relative overflow-hidden group hover:border-indigo-100 transition-colors">

                            <div class="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 group-hover:bg-indigo-500 transition-colors"></div>

                            <span class="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wide group-hover:text-indigo-500 transition-colors">Season 0</span>

                            <h4 class="text-md font-bold text-gray-900 mb-1">2028 프리퀄(Prequel) : 예비평가 완전 해부 <span class="text-xs font-normal text-gray-400 ml-1">(4회분)</span></h4>

                            <p class="text-xs text-gray-500">2028 수능의 첫 번째 나침반. 교육과정 개편 후 유일한 평가원 공식 데이터 완벽 분석.</p>

                        </div>



                        <!-- Season 1 -->

                        <div class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm relative overflow-hidden group hover:border-indigo-100 transition-colors">

                            <div class="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 group-hover:bg-indigo-500 transition-colors"></div>

                            <span class="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wide group-hover:text-indigo-500 transition-colors">Season 1</span>

                            <h4 class="text-md font-bold text-gray-900 mb-1">파운데이션(Foundation) : 무너지지 않는 1등급 코어 <span class="text-xs font-normal text-gray-400 ml-1">(4회분)</span></h4>

                            <p class="text-xs text-gray-500">낯선 통합과학의 뼈대를 단단하게 세우는 필수 개념 완벽 적용 훈련.</p>

                        </div>



                        <!-- Season 2 -->

                        <div class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm relative overflow-hidden group hover:border-indigo-100 transition-colors">

                            <div class="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 group-hover:bg-indigo-500 transition-colors"></div>

                            <div class="absolute right-4 top-4">

                                <span class="bg-red-50 text-red-600 text-[9px] font-black px-2 py-1 rounded border border-red-100">6평 직후 단종</span>

                            </div>

                            <span class="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wide group-hover:text-indigo-500 transition-colors">Season 2</span>

                            <h4 class="text-md font-bold text-gray-900 mb-1">6평 리허설(Rehearsal) : 첫 평가원 완벽 타겟팅 <span class="text-xs font-normal text-gray-400 ml-1">(4회분)</span></h4>

                            <p class="text-xs text-gray-500">수능 출제 위원의 시선으로 미리 보는 6월 평가원. 약점을 찌르는 날카로운 문항들.</p>

                        </div>



                        <!-- Season 3 -->

                        <div class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm relative overflow-hidden group hover:border-indigo-100 transition-colors opacity-75">

                            <div class="absolute left-0 top-0 bottom-0 w-1 bg-gray-100 group-hover:bg-indigo-300 transition-colors"></div>

                            <span class="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wide">Season 3 <span class="text-gray-300 font-normal ml-1">· 예정</span></span>

                            <h4 class="text-md font-bold text-gray-800 mb-1">도미넌스(Dominance) : 9평 압살 고난도 융합 <span class="text-xs font-normal text-gray-400 ml-1">(4회분)</span></h4>

                            <p class="text-xs text-gray-500">킬러 문항과 낯선 자료 해석에 당황하지 않도록. 1등급을 굳히는 실전 융합 훈련.</p>

                        </div>



                        <!-- Season 4 -->

                        <div class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm relative overflow-hidden group hover:border-indigo-100 transition-colors opacity-75">

                            <div class="absolute left-0 top-0 bottom-0 w-1 bg-gray-100 group-hover:bg-indigo-300 transition-colors"></div>

                            <span class="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wide">Season 4 <span class="text-gray-300 font-normal ml-1">· 예정</span></span>

                            <h4 class="text-md font-bold text-gray-800 mb-1">피날레(Finale) : 2028 수능 절대 적중 <span class="text-xs font-normal text-gray-400 ml-1">(8회분)</span></h4>

                            <p class="text-xs text-gray-500">수능 전 마지막 담금질. 올해의 출제 트렌드가 모두 담긴 극비 모의고사로 완벽한 마무리.</p>

                        </div>

                    </div>

                </div>

                \`;

                

                container.innerHTML = html;

            }

        }



        function createCard(exam, isFeatured) {

            const dateStr = new Date(exam.date).toLocaleDateString();

            let btn;

            

            if (exam.status === 'graded') {

                btn = `

                    <div class="space-y-2">

                        <div class="bg-emerald-50 text-emerald-700 py-3 rounded-xl text-center font-bold border border-emerald-100">

                            ${exam.score}점 (채점완료)

                        </div>

                        

                        <div class="flex gap-2">

                            <button onclick="viewReportDetail('${exam.docId}')" class="flex-1 bg-white border border-gray-200 text-gray-600 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 flex items-center justify-center gap-1 transition-colors">

                                <i data-lucide="bar-chart-2" class="w-4 h-4"></i> 성적분석

                            </button>

                            <button onclick="location.href='explanation.html?id=${exam.docId}'" class="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1">

                                <i data-lucide="book-open" class="w-4 h-4"></i> 해설보기

                            </button>

                        </div>

                    </div>

                `;

            } else if (exam.status === 'purchased') {

                btn = `<button onclick="location.href='omr.html?id=${exam.docId}&title=${encodeURIComponent(exam.title)}'" class="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-sm shadow-md hover:bg-indigo-700 transition-colors flex justify-center items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4"></i> OMR 진행 (정답 제출)</button>`;

            } else if (exam.status === 'pending') {

                btn = `<button disabled class="w-full py-3 bg-yellow-50 text-yellow-600 rounded-xl text-sm font-bold border border-yellow-100 flex items-center justify-center gap-2 cursor-wait"><div class="animate-spin rounded-full h-3 w-3 border-2 border-yellow-600 border-t-transparent"></div>배송 및 승인 대기 중</button>`;

            } else {

                btn = `<button disabled class="w-full py-3 bg-gray-100 text-gray-400 rounded-xl text-sm font-bold border border-gray-200 flex items-center justify-center gap-2 cursor-not-allowed"><i data-lucide="lock" class="w-4 h-4"></i> 잠금 상태 (이용 불가)</button>`;

            }



            const style = isFeatured ? 'bg-white border-2 border-indigo-500 shadow-xl relative overflow-hidden' : 'bg-white border border-gray-100 shadow-sm';

            const bgDeco = isFeatured ? `<div class="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>` : '';

            

            return `<div class="${style} rounded-2xl p-5 mb-4 relative">

                ${bgDeco}

                <div class="relative z-10 mb-4">

                    <span class="text-[10px] font-bold ${isFeatured ? 'text-indigo-600' : 'text-gray-400'} block mb-1 uppercase tracking-wide">${exam.subTitle}</span>

                    <h4 class="text-lg font-black text-gray-900 leading-tight">${exam.title}</h4>

                    ${isFeatured ? '<p class="text-xs text-indigo-500 mt-2 font-medium">마감 임박 | 선착순 혜택 적용 중</p>' : `<span class="text-xs text-gray-400 block mt-1">${dateStr} 시행</span>`}

                </div>

                <div class="relative z-10">${btn}</div>

            </div>`;

        }



        // ==========================================

        // 성적 분석 리포트 화면 렌더링 라우터

        // ==========================================

        async function renderReportPage(container, selectedId = 'cumulative') {

            const results = Object.values(myExamResults).sort((a,b) => b.submittedAt?.seconds - a.submittedAt?.seconds);

            

            if (results.length === 0) {

                container.innerHTML = `<div class="text-center py-20 text-gray-400">

                    <i data-lucide="bar-chart-2" class="w-12 h-12 mx-auto mb-3 opacity-50"></i>

                    <p>아직 채점된 성적이 없습니다.</p>

                </div>`;

                return;

            }



            // [추가] 선택값이 누적 분석이거나, 기본값이면서 결과가 1개 이상일 때 누적 뷰 호출

            if (selectedId === 'cumulative' || (!selectedId && results.length > 0)) {

                await renderCumulativeReportPage(container, results);

                return;

            }



            // --- 단일 모의고사 리포트 로직 (기존 유지) ---

            let originalData = results.find(r => r.examId === selectedId) || results[0];

            let data = JSON.parse(JSON.stringify(originalData));



            if (!data.answers || data.answers.length === 0) {

                if (data.myAnswers && data.myAnswers.length > 0) {

                    try {

                        const restoredData = await hydrateMissingData(data.examId, data.myAnswers);

                        if (restoredData) {

                            data.answers = restoredData;

                        } else {

                            data.answers = data.myAnswers.map((mark, i) => ({

                                no: i + 1, studentMark: mark, correctAnswer: '?', isCorrect: false, score: 0, taxonomy: { topic: `문항 ${i+1}` }

                            }));

                        }

                    } catch (e) {

                        console.warn("데이터 복구 실패:", e);

                    }

                }

            }



            if (data.answers && data.answers.length > 0) {

                data.analysis = analyzeRestoredData(data.answers);

            }



            let feedback = {

                title: "학습 분석 리포트",

                message: "전반적으로 훌륭한 성적입니다!",

                color: "indigo"

            };



            const grade = data.grade;

            if (grade === 1) {

                feedback.message = "최상위권 실력입니다! 🏆 실수만 줄이면 만점도 가능해요.";

                feedback.color = "emerald";

            } else if (grade === 2) {

                feedback.message = "상위권 도약이 눈앞입니다. 취약 단원을 집중 공략해보세요.";

                feedback.color = "indigo";

            } else if (grade === 3) {

                feedback.message = "기초 개념을 다시 한 번 점검하면 점수가 크게 오를 거예요.";

                feedback.color = "blue";

            } else {

                feedback.message = "포기하지 마세요! 교과서 핵심 개념부터 차근차근 시작해봐요.";

                feedback.color = "orange";

            }



            const weaknesses = data.analysis?.weakness || [];

            if (weaknesses.length > 0) {

                feedback.message += `<br><span class="font-bold text-white/90">Tip: '${weaknesses[0]}' 파트를 복습하는 걸 추천해요.</span>`;

            }



            container.innerHTML = `

                <div class="space-y-6 animate-fade-in">

                    ${results.length > 0 ? `

                        <div class="flex justify-end">

                            <select id="report-selector" onchange="changeReport(this.value)" class="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white text-gray-600 outline-none shadow-sm font-bold">

                                <option value="cumulative">📊 누적 종합 분석 (오답노트)</option>

                                ${results.map(r => `<option value="${r.examId}" ${r.examId === data.examId ? 'selected' : ''}>${r.title} (${r.score}점)</option>`).join('')}

                            </select>

                        </div>

                    ` : ''}



                    <div id="report-detail-view">

                        <div class="bg-${feedback.color}-600 rounded-2xl p-4 text-white shadow-lg mb-4 flex items-start gap-3">

                            <div class="bg-white/20 p-2 rounded-lg shrink-0">

                                <i data-lucide="sparkles" class="w-5 h-5 text-white"></i>

                            </div>

                            <div>

                                <h4 class="font-bold text-sm mb-1">${feedback.title}</h4>

                                <p class="text-xs opacity-90 leading-relaxed">${feedback.message}</p>

                            </div>

                        </div>



                        <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden mb-4">

                            <div class="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full blur-3xl -mr-10 -mt-10"></div>

                            <div class="relative z-10">

                                <div class="flex justify-between items-start mb-1">

                                    <p class="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Score</p>

                                    <span class="bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">${data.grade}등급</span>

                                </div>

                                <div class="flex items-baseline gap-2 mb-6">

                                    <h2 class="text-5xl font-black tracking-tighter">${data.score}</h2>

                                    <span class="text-lg font-medium text-gray-400 mb-1">/ 50점</span>

                                </div>

                                <div class="grid grid-cols-3 gap-4 border-t border-white/10 pt-4 text-center">

                                    <div><p class="text-[10px] text-gray-400 mb-0.5">등급</p><p class="text-xl font-bold">${data.grade}</p></div>

                                    <div class="border-l border-white/10 border-r"><p class="text-[10px] text-gray-400 mb-0.5">표준점수</p><p class="text-xl font-bold">${data.standardScore}</p></div>

                                    <div><p class="text-[10px] text-gray-400 mb-0.5">상위</p><p class="text-xl font-bold">${100 - data.percentile}<span class="text-sm font-normal ml-0.5">%</span></p></div>

                                </div>

                            </div>

                        </div>



                        <section class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">

                            <div class="text-center mb-4">

                                <h3 class="text-sm font-bold text-gray-900 flex items-center justify-center gap-1">

                                    <i data-lucide="radar" class="w-4 h-4 text-indigo-500"></i> 단원별 성취도 밸런스

                                </h3>

                            </div>

                            <div class="relative h-64 w-full">

                                <canvas id="radarChart"></canvas>

                            </div>

                        </section>



                        <section class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 border-t-4 border-t-red-400 mb-4">

                            <div class="flex items-center mb-3">

                                <span class="text-xl mr-2">🚨</span>

                                <h3 class="text-sm font-bold text-gray-900">단원별 취약점 진단</h3>

                            </div>

                            <p class="text-[11px] text-gray-500 mb-4">오답률이 가장 높은 취약 소단원입니다. 개념 보완이 시급해요!</p>

                            

                            <div id="weakness-list" class="space-y-3">

                                <!-- Javascript로 렌더링 됨 -->

                            </div>

                        </section>



                        <section class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 border-t-4 border-t-blue-500 mb-4">

                            <div class="flex items-center mb-3">

                                <span class="text-xl mr-2">📝</span>

                                <h3 class="text-sm font-bold text-gray-900">해당 회차 오답 노트</h3>

                            </div>

                            <p class="text-[11px] text-gray-500 mb-4">틀린 문항을 복습하고 1타 강사의 해설을 확인하세요.<br><span class="text-indigo-500 font-bold">💡 정답률 배지의 색상(🔴어려움, 🟡보통, 🟢쉬움)으로 난이도를 한눈에 확인할 수 있습니다.</span></p>

                            

                            <div class="overflow-hidden rounded-xl border border-gray-200">

                                <table class="w-full text-left border-collapse">

                                    <thead class="bg-gray-50 text-gray-500 text-[10px] uppercase text-center">

                                        <tr>

                                            <th class="px-2 py-2 font-medium w-12">문항</th>

                                            <th class="px-2 py-2 font-medium text-left">단원</th>

                                            <th class="px-2 py-2 font-medium w-16 text-center">정답률</th>

                                            <th class="px-2 py-2 font-medium w-16 text-center">마킹/정답</th>

                                            <th class="px-2 py-2 font-medium w-20 whitespace-nowrap">학습</th>

                                        </tr>

                                    </thead>

                                    <tbody id="wrong-answers-list" class="divide-y divide-gray-200 text-xs">

                                        <!-- Javascript로 렌더링 됨 -->

                                    </tbody>

                                </table>

                            </div>

                        </section>



                        ${data.examId && data.examId.startsWith('past_') ? `

                        <div class="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-5 shadow-lg mb-4 text-white cursor-pointer hover:shadow-xl transition-all" onclick="switchTab('all')">

                            <div class="flex items-center justify-between">

                                <div>

                                    <h3 class="text-sm font-black mb-1 flex items-center gap-1"><i data-lucide="crown" class="w-4 h-4 text-yellow-300"></i> 갓통과 프리미엄 모의고사로 더 깊이 있는 학습을 해보세요!</h3>

                                    <p class="text-xs opacity-90 leading-relaxed">무료 기출 분석 완료! 더 완벽한 대비를 원한다면 유료 프리미엄 모의고사에 도전해보세요.</p>

                                </div>

                                <i data-lucide="chevron-right" class="w-6 h-6 shrink-0 opacity-70"></i>

                            </div>

                        </div>

                        ` : ''}



                    </div>

                </div>

            `;



            setTimeout(async () => {

                await renderChartsAndLists(data);

            }, 0);

        }



        // ==========================================

        // [신규 추가] 누적 종합 분석 (Cumulative View) 렌더링

        // ==========================================

        async function renderCumulativeReportPage(container, results) {

            const totalExams = results.length;

            const avgScore = (results.reduce((sum, r) => sum + r.score, 0) / totalExams).toFixed(1);

            const avgGrade = Math.round(results.reduce((sum, r) => sum + r.grade, 0) / totalExams);

            const bestScore = Math.max(...results.map(r => r.score));



            // 오답노트(myWrongAnswers) 데이터를 활용한 취약 단원 분석

            const topicStats = {};

            myWrongAnswers.forEach(wa => {

                const t = wa.topic || '기타';

                if(!topicStats[t]) topicStats[t] = 0;

                topicStats[t] += (wa.wrongCount || 1);

            });

            const weaknesses = Object.entries(topicStats).sort((a,b) => b[1] - a[1]).slice(0, 3); // 상위 3개



            // 차트 데이터 준비 (최근 5회차 데이터, 시간순(과거->현재) 정렬)

            const trendResults = [...results].reverse().slice(-5);

            const trendLabels = trendResults.map(r => r.title.length > 8 ? r.title.substring(0, 8) + '...' : r.title);

            const trendScores = trendResults.map(r => r.score);



            // 취약 단원 HTML 생성

            let wHtml = '';

            if (weaknesses.length > 0) {

                weaknesses.forEach((item, index) => {

                    const topic = item[0];

                    const count = item[1];

                    const aiPromptTitle = encodeURIComponent(`[${topic}] 단원 개념 학습법 질문합니다.`);

                    const aiPromptBody = encodeURIComponent(`이번 모의고사 누적 분석 결과, 제가 '${topic}' 단원 관련 문제를 총 ${count}번 틀렸습니다. 핵심 개념과 추천 학습법을 알려주세요.`);

                    const communityUrl = `../Board/board.html?view=write&category=qna&title=${aiPromptTitle}&body=${aiPromptBody}`;



                    wHtml += `

                        <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100 gap-3 mb-2 shadow-sm">

                            <div>

                                <span class="inline-block px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded mb-1 border border-red-200">오답 누적 ${count}회</span>

                                <h4 class="text-sm font-bold text-gray-900">${topic}</h4>

                            </div>

                            <a href="${communityUrl}" class="flex items-center justify-center gap-1 bg-white text-red-600 border border-red-200 hover:bg-red-50 px-3 py-2 rounded-lg text-[11px] font-bold shadow-sm transition shrink-0">

                                🤖 AI 맞춤 처방받기

                            </a>

                        </div>

                    `;

                });

            } else {

                wHtml = '<p class="text-center text-emerald-600 text-xs py-4 font-bold">누적된 약점이 없습니다! 🎉</p>';

            }



            // 오답 노트 리스트 HTML 생성

            let tableHtml = '';

            const sortedAnswers = [...myWrongAnswers].sort((a,b) => (b.wrongCount || 1) - (a.wrongCount || 1));

            

            // [신규 추가] 통계 데이터 일괄 조회

            const statsMap = {};

            if (sortedAnswers.length > 0) {

                try {

                    const statsPromises = sortedAnswers.map(ans => getDoc(doc(db, "questions", ans.qId)));

                    const snaps = await Promise.all(statsPromises);

                    snaps.forEach((snap, idx) => {

                        if(snap.exists()) {

                            const qData = snap.data();

                            if(qData.stats && qData.stats.totalAttempts > 0) {

                                statsMap[sortedAnswers[idx].qId] = Math.round(((qData.stats.correctCount || 0) / qData.stats.totalAttempts) * 100);

                            }

                        }

                    });

                } catch(e) { console.error(e); }

            }



            if (sortedAnswers.length > 0) {

                sortedAnswers.forEach(ans => {

                    const explanationUrl = `explanation.html?id=${ans.examId}&qId=${ans.qId}`;

                    const displayExamId = ans.examId ? ans.examId.replace('exam_', '') : '-';

                    

                    let rateHtml = '';

                    if (statsMap[ans.qId] !== undefined) {

                        const r = statsMap[ans.qId];

                        let color = r >= 70 ? 'bg-green-100 text-green-700' : r >= 40 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';

                        rateHtml = `<span class="${color} text-[10px] px-1.5 py-0.5 rounded font-bold ml-1">${r}%</span>`;

                    } else {

                        rateHtml = `<span class="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded font-bold ml-1">집계 중</span>`;

                    }



                    tableHtml += `

                        <tr class="hover:bg-gray-50 transition border-b border-gray-100 last:border-0">

                            <td class="px-2 py-3 text-center">

                                <span class="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded font-bold">${ans.wrongCount || 1}회</span>

                            </td>

                            <td class="px-2 py-3 text-gray-600 text-[11px] truncate max-w-[120px]" title="${ans.topic}">${ans.topic}</td>

                            <td class="px-2 py-3 text-center">${rateHtml}</td>

                            <td class="px-2 py-3 text-center text-[10px] text-gray-400 font-mono">${displayExamId}회차</td>

                            <td class="px-2 py-3 text-center">

                                <a href="${explanationUrl}" class="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1.5 rounded-md text-[10px] font-bold shadow-sm transition whitespace-nowrap">

                                    복습하기

                                </a>

                            </td>

                        </tr>

                    `;

                });

            } else {

                tableHtml = '<tr><td colspan="5" class="text-center py-6 text-gray-400 text-xs">기록된 오답이 없습니다.</td></tr>';

            }



            // 렌더링

            container.innerHTML = `

                <div class="space-y-6 animate-fade-in">

                    <div class="flex justify-end">

                        <select id="report-selector" onchange="changeReport(this.value)" class="text-xs border border-indigo-300 rounded-lg px-2 py-1 bg-indigo-50 text-indigo-700 font-bold outline-none shadow-sm">

                            <option value="cumulative" selected>📊 누적 종합 분석 (오답노트)</option>

                            ${results.map(r => `<option value="${r.examId}">${r.title} (${r.score}점)</option>`).join('')}

                        </select>

                    </div>



                    <div class="bg-indigo-600 rounded-2xl p-4 text-white shadow-lg mb-4 flex items-start gap-3">

                        <div class="bg-white/20 p-2 rounded-lg shrink-0">

                            <i data-lucide="database" class="w-5 h-5 text-white"></i>

                        </div>

                        <div>

                            <h4 class="font-bold text-sm mb-1">데이터 기반 종합 분석</h4>

                            <p class="text-xs opacity-90 leading-relaxed">총 ${totalExams}회의 모의고사 빅데이터를 바탕으로 도출된 취약점과 맞춤형 오답 노트입니다.</p>

                        </div>

                    </div>



                    <div class="grid grid-cols-3 gap-3 mb-4">

                        <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">

                            <p class="text-[10px] text-gray-400 font-bold mb-1">평균 점수</p>

                            <p class="text-xl font-black text-gray-900">${avgScore}<span class="text-xs font-normal ml-0.5">점</span></p>

                        </div>

                        <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">

                            <p class="text-[10px] text-gray-400 font-bold mb-1">평균 등급</p>

                            <p class="text-xl font-black text-indigo-600">${avgGrade}<span class="text-xs font-normal ml-0.5">등급</span></p>

                        </div>

                        <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">

                            <p class="text-[10px] text-gray-400 font-bold mb-1">최고 점수</p>

                            <p class="text-xl font-black text-gray-900">${bestScore}<span class="text-xs font-normal ml-0.5">점</span></p>

                        </div>

                    </div>



                    <!-- [신규 추가] 누적 성적 추이 라인 차트 -->

                    <section class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">

                        <div class="flex items-center mb-4">

                            <span class="text-xl mr-2">📈</span>

                            <h3 class="text-sm font-bold text-gray-900">최근 5회 성적 추이</h3>

                        </div>

                        <div class="relative h-48 w-full">

                            <canvas id="trendLineChart"></canvas>

                        </div>

                    </section>



                    <section class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 border-t-4 border-t-red-500 mb-4">

                        <div class="flex items-center mb-3">

                            <span class="text-xl mr-2">🔥</span>

                            <h3 class="text-sm font-bold text-gray-900">누적 취약 단원 TOP 3</h3>

                        </div>

                        <p class="text-[11px] text-gray-500 mb-4">모든 회차를 통틀어 가장 많이 틀린 단원입니다.</p>

                        <div class="space-y-1">

                            ${wHtml}

                        </div>

                    </section>



                    <section class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 border-t-4 border-t-indigo-500 mb-4">

                        <div class="flex items-center mb-3">

                            <span class="text-xl mr-2">📚</span>

                            <h3 class="text-sm font-bold text-gray-900">오답 집중 훈련</h3>

                        </div>

                        <p class="text-[11px] text-gray-500 mb-4">다시 틀리지 않도록 해설을 복습하세요.<br><span class="text-indigo-500 font-bold">💡 정답률 배지의 색상(🔴어려움, 🟡보통, 🟢쉬움)으로 난이도를 한눈에 확인할 수 있습니다.</span></p>

                        

                        <div class="overflow-hidden rounded-xl border border-gray-200">

                            <table class="w-full text-left border-collapse">

                                <thead class="bg-gray-50 text-gray-500 text-[10px] uppercase text-center">

                                    <tr>

                                        <th class="px-2 py-2 font-medium w-12">누적</th>

                                        <th class="px-2 py-2 font-medium text-left">단원 / 개념</th>

                                        <th class="px-2 py-2 font-medium w-16 text-center">정답률</th>

                                        <th class="px-2 py-2 font-medium w-16">출처</th>

                                        <th class="px-2 py-2 font-medium w-20 whitespace-nowrap">복습</th>

                                    </tr>

                                </thead>

                                <tbody class="divide-y divide-gray-200 text-xs">

                                    ${tableHtml}

                                </tbody>

                            </table>

                        </div>

                    </section>

                </div>

            `;

            lucide.createIcons();



            // 차트 렌더링 실행 (DOM 업데이트 후 안전하게 처리)

            setTimeout(() => {

                const ctxTrend = document.getElementById('trendLineChart');

                if (ctxTrend) {

                    if (window.myTrendChart) window.myTrendChart.destroy();

                    

                    window.myTrendChart = new Chart(ctxTrend.getContext('2d'), {

                        type: 'line',

                        data: {

                            labels: trendLabels,

                            datasets: [{

                                label: '총점',

                                data: trendScores,

                                borderColor: '#4F46E5', // indigo-600

                                backgroundColor: 'rgba(79, 70, 229, 0.1)',

                                borderWidth: 2,

                                pointBackgroundColor: '#fff',

                                pointBorderColor: '#4F46E5',

                                pointBorderWidth: 2,

                                pointRadius: 4,

                                fill: true,

                                tension: 0.3 // 부드러운 곡선 적용

                            }]

                        },

                        options: {

                            responsive: true,

                            maintainAspectRatio: false,

                            scales: {

                                y: {

                                    min: 0,

                                    max: 50, // 과학 탐구 영역 50점 만점 기준

                                    ticks: { stepSize: 10, font: { size: 10, family: 'Noto Sans KR' } }

                                },

                                x: {

                                    ticks: { font: { size: 10, family: 'Noto Sans KR' } }

                                }

                            },

                            plugins: {

                                legend: { display: false }

                            }

                        }

                    });

                }

            }, 0);

        }



        async function hydrateMissingData(examId, myAnswers) {

            try {

                const examDocRef = doc(db, "exams", examId);

                const examSnap = await getDoc(examDocRef);

                

                if (!examSnap.exists()) return null;

                const examData = examSnap.data();



                let questions = [];

                if (examData.questions && Array.isArray(examData.questions)) {

                    questions = examData.questions;

                } 

                else if (examData.score_map) {

                    questions = examData.score_map.map((s, i) => ({

                        no: i + 1, score: s, correctAnswer: examData.answer_key[i], qId: null

                    }));

                }



                const promises = questions.map(async (q, i) => {

                    const studentMark = myAnswers[i];

                    const isCorrect = studentMark === q.correctAnswer;

                    let taxonomy = {};



                    if (q.qId) {

                        try {

                            const qSnap = await getDoc(doc(db, "questions", q.qId));

                            if (qSnap.exists()) {

                                taxonomy = qSnap.data().taxonomy || {};

                            }

                        } catch(e) { console.warn("Question fetch error:", e); }

                    }



                    return {

                        no: i + 1,

                        studentMark: studentMark,

                        correctAnswer: q.correctAnswer,

                        isCorrect: isCorrect,

                        score: q.score,

                        taxonomy: taxonomy

                    };

                });



                return await Promise.all(promises);

            } catch(e) {

                console.error("Hydration Failed:", e);

                return null;

            }

        }

        

        function analyzeRestoredData(answers) {

            const domainStats = {

                '과학의 기초': { total: 0, earned: 0 },

                '물질과 규칙성': { total: 0, earned: 0 },

                '시스템과 상호작용': { total: 0, earned: 0 },

                '변화와 다양성': { total: 0, earned: 0 },

                '환경과 에너지': { total: 0, earned: 0 }

            };

            const topicStats = {};



            answers.forEach(ans => {

                const tax = ans.taxonomy || {};

                let domain = tax.chapter || '과학의 기초';



                if (!domainStats[domain]) {

                    const legacyMap = {

                        '물리': '시스템과 상호작용',

                        '화학': '물질과 규칙성',

                        '생명과학': '변화와 다양성',

                        '지구과학': '환경과 에너지'

                    };

                    domain = legacyMap[tax.domain] || '과학의 기초';

                }

                

                const score = ans.score || 2; 

                domainStats[domain].total += score;

                if (ans.isCorrect) domainStats[domain].earned += score;



                const topic = tax.topic || tax.chapter || domain;

                if (!topicStats[topic]) topicStats[topic] = { count: 0, wrong: 0 };

                topicStats[topic].count++;

                if (!ans.isCorrect) topicStats[topic].wrong++;

            });



            const domainScores = {};

            const defaultDomains = ['과학의 기초', '물질과 규칙성', '시스템과 상호작용', '변화와 다양성', '환경과 에너지'];

            defaultDomains.forEach(key => {

                domainScores[key] = domainStats[key].total > 0 ? Math.round((domainStats[key].earned / domainStats[key].total) * 100) : 0;

            });



            const weakness = Object.entries(topicStats)

                .filter(([_, val]) => val.wrong > 0)

                .sort((a, b) => {

                    const rateDiff = (b[1].wrong / b[1].count) - (a[1].wrong / a[1].count);

                    if (rateDiff === 0) {

                        return b[1].wrong - a[1].wrong; 

                    }

                    return rateDiff;

                })

                .slice(0, 2)

                .map(([key, _]) => key);



            return { domainScores, weakness };

        }



        async function renderChartsAndLists(data) {

            const rawDomainScores = data.analysis?.domainScores || {};

            const domainScores = {};

            const defaultDomains = ['과학의 기초', '물질과 규칙성', '시스템과 상호작용', '변화와 다양성', '환경과 에너지'];

            

            defaultDomains.forEach(key => {

                domainScores[key] = rawDomainScores[key] || 0;

            });



            const labels = Object.keys(domainScores);

            const scores = Object.values(domainScores);



            if (Object.keys(rawDomainScores).length > 0) {

                const ctx = document.getElementById('radarChart').getContext('2d');

                if(window.myRadarChart) window.myRadarChart.destroy();

                

                window.myRadarChart = new Chart(ctx, {

                    type: 'radar',

                    data: {

                        labels: labels,

                        datasets: [{

                            label: '나의 점수',

                            data: scores,

                            backgroundColor: 'rgba(79, 70, 229, 0.2)', 

                            borderColor: '#4F46E5',

                            pointBackgroundColor: '#4F46E5',

                            pointBorderColor: '#fff',

                            borderWidth: 2

                        }]

                    },

                    options: {

                        scales: { 

                            r: { 

                                suggestedMin: 0, 

                                suggestedMax: 100, 

                                ticks: { display: false }, 

                                pointLabels: { font: { size: 10, family: 'Noto Sans KR' }, color: '#4B5563' } 

                            } 

                        },

                        plugins: { legend: { display: false } },

                        maintainAspectRatio: false

                    }

                });

            } else {

                document.getElementById('radarChart').parentElement.innerHTML = '<p class="text-center text-gray-400 text-xs py-10">데이터 부족</p>';

            }



            const weaknessList = document.getElementById('weakness-list');

            const weaknesses = data.analysis?.weakness || [];

            let wHtml = '';

            

            if (weaknesses.length > 0) {

                weaknesses.forEach((topic, index) => {

                    const aiPromptTitle = encodeURIComponent(`[${topic}] 단원 개념 학습법 질문합니다.`);

                    const aiPromptBody = encodeURIComponent(`이번 모의고사에서 '${topic}' 단원 오답률이 너무 높습니다. 어떻게 개념을 잡고 공부해야 할까요? 도와주세요 봇튜터님!`);

                    const communityUrl = `../Board/board.html?view=write&category=qna&title=${aiPromptTitle}&body=${aiPromptBody}`;



                    wHtml += `

                        <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100 gap-3">

                            <div>

                                <span class="inline-block px-2 py-1 bg-red-100 text-red-700 text-[10px] font-bold rounded mb-1">Rank ${index + 1}</span>

                                <h4 class="text-sm font-bold text-gray-900">${topic}</h4>

                            </div>

                            <a href="${communityUrl}" class="flex items-center justify-center gap-1 bg-white text-red-600 border border-red-200 hover:bg-red-50 px-3 py-2 rounded-lg text-[11px] font-bold shadow-sm transition shrink-0">

                                🤖 AI 튜터에게 묻기

                            </a>

                        </div>

                    `;

                });

            } else {

                wHtml = '<p class="text-center text-emerald-600 text-xs py-4 font-bold">취약점이 없습니다. 완벽합니다! 🎉</p>';

            }

            weaknessList.innerHTML = wHtml;



            const wrongAnswersList = document.getElementById('wrong-answers-list');

            if (wrongAnswersList) {

                // 단일 모의고사 오답 목록

                const wrongAnswers = myWrongAnswers.filter(wa => wa.examId === data.examId);

                

                // [신규 추가] 통계 데이터 일괄 조회

                const statsMap = {};

                if (wrongAnswers.length > 0) {

                    try {

                        const statsPromises = wrongAnswers.map(ans => getDoc(doc(db, "questions", ans.qId)));

                        const snaps = await Promise.all(statsPromises);

                        snaps.forEach((snap, idx) => {

                            if(snap.exists()) {

                                const qData = snap.data();

                                if(qData.stats && qData.stats.totalAttempts > 0) {

                                    statsMap[wrongAnswers[idx].qId] = Math.round(((qData.stats.correctCount || 0) / qData.stats.totalAttempts) * 100);

                                }

                            }

                        });

                    } catch(e) { console.error(e); }

                }



                let tableHtml = '';

                if (wrongAnswers.length > 0) {

                    wrongAnswers.sort((a,b) => {

                        const noA = a.qId ? parseInt(a.qId.split('-').pop()) : 0;

                        const noB = b.qId ? parseInt(b.qId.split('-').pop()) : 0;

                        return noA - noB;

                    }).forEach(ans => {

                        const qNum = ans.qId ? ans.qId.split('-').pop() : '-';

                        const topicText = ans.topic || '-';

                        const explanationUrl = `explanation.html?id=${data.examId}&qId=${ans.qId}`;



                        let rateHtml = '';

                        if (statsMap[ans.qId] !== undefined) {

                            const r = statsMap[ans.qId];

                            let color = r >= 70 ? 'bg-green-100 text-green-700' : r >= 40 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';

                            rateHtml = `<span class="${color} text-[10px] px-1.5 py-0.5 rounded font-bold ml-1">${r}%</span>`;

                        } else {

                            rateHtml = `<span class="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded font-bold ml-1">집계 중</span>`;

                        }



                        tableHtml += `

                            <tr class="hover:bg-gray-50 transition">

                                <td class="px-2 py-3 text-center font-bold text-gray-900">${qNum}번</td>

                                <td class="px-2 py-3 text-gray-600 text-[11px] truncate max-w-[120px]" title="${topicText}">${topicText}</td>

                                <td class="px-2 py-3 text-center">${rateHtml}</td>

                                <td class="px-2 py-3 text-center">

                                    <span class="text-red-500 font-medium line-through mr-1 text-[11px]">${ans.studentMark || '-'}</span>

                                    <span class="text-green-600 font-bold text-[11px]">${ans.correctAnswer}</span>

                                </td>

                                <td class="px-2 py-3 text-center">

                                    <a href="${explanationUrl}" class="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1.5 rounded-md text-[10px] font-bold shadow-sm transition whitespace-nowrap">

                                        해설보기

                                    </a>

                                </td>

                            </tr>

                        `;

                    });

                    wrongAnswersList.innerHTML = tableHtml;

                } else {

                    wrongAnswersList.innerHTML = '<tr><td colspan="5" class="text-center py-6 text-gray-400 text-xs">틀린 문항이 없습니다. 완벽합니다! 🎉</td></tr>';

                }

            }

        }



        window.changeReport = (examId) => {

            const contentDiv = document.getElementById('exam-content');

            if(contentDiv) {

                renderReportPage(contentDiv, examId);

            }

        };

        

        window.viewReportDetail = (examId) => {

            window.pendingReportId = examId;

            switchTab('report');

        };



        window.openPackageOrderModal = (pkgId) => { 

            const pkg = masterPackages.find(p => p.id === pkgId);

            if(!pkg) return;

            window.selectedPackageToOrder = pkgId;

            document.getElementById('orderPackageTitle').innerText = pkg.title || '';

            document.getElementById('orderPackageDesc').innerText = pkg.description || '';

            document.getElementById('orderPackagePrice').innerText = Number(pkg.price || 0).toLocaleString() + '원';

            

            if(document.getElementById('orderName').value === '') document.getElementById('orderName').value = currentUserData?.name || '';

            if(document.getElementById('orderDepositor').value === '') document.getElementById('orderDepositor').value = currentUserData?.name || '';

            document.getElementById('packageOrderModal').classList.remove('hidden'); 

            setTimeout(()=>document.getElementById('packageOrderModal').children[1].classList.remove('translate-y-full'),10); 

        };

        window.closePackageOrderModal = () => { 

            document.getElementById('packageOrderModal').children[1].classList.add('translate-y-full'); 

            setTimeout(()=>document.getElementById('packageOrderModal').classList.add('hidden'),300); 

        };

        window.openScoreModal = (id) => { window.selectedExamId = id; document.getElementById('scoreInput').value = ''; document.getElementById('scoreModal').classList.remove('hidden'); };

        window.closeScoreModal = () => document.getElementById('scoreModal').classList.add('hidden');

        window.submitScore = async () => {

            const score = Number(document.getElementById('scoreInput').value);

            if(!window.selectedExamId || !currentUser) return;

            try { await setDoc(doc(db, "users", currentUser.uid, "my_exams", window.selectedExamId), { status: 'graded', score, gradedAt: new Date().toISOString() }, { merge: true }); alert("채점 완료!"); closeScoreModal(); switchTab('report'); } catch { alert("저장 실패"); }

        };

        window.copyToClipboard = (text) => { navigator.clipboard.writeText(text).then(() => alert('복사되었습니다.')).catch(() => alert('복사 실패')); };



        window.resetUserPassword = async () => {

            const email = prompt("가입하신 이메일 주소를 입력해주세요.\n비밀번호 재설정 링크를 보내드립니다.");

            if (!email) return;

            if (!email.includes('@')) return alert("올바른 이메일 형식이 아닙니다.");



            try {

                loadingEl.classList.remove('hidden');

                loadingText.innerText = "이메일 전송 중...";

                await sendPasswordResetEmail(auth, email);

                alert(`📧 전송 완료!\n\n${email} 로 재설정 메일을 보냈습니다.\n메일함을 확인하고 비밀번호를 변경해주세요.`);

            } catch (error) {

                console.error(error);

                if (error.code === 'auth/user-not-found') {

                    alert("가입되지 않은 이메일입니다.");

                } else {

                    alert("메일 전송 실패: " + error.message);

                }

            } finally {

                loadingEl.classList.add('hidden');

            }

        };



        window.findUserEmail = async () => {

            const name = prompt("가입하실 때 사용한 '이름'을 입력해주세요.");

            if (!name) return;



            try {

                loadingEl.classList.remove('hidden');

                loadingText.innerText = "사용자 검색 중...";

                

                const usersRef = collection(db, "users");

                const q = query(usersRef, where("name", "==", name));

                const querySnapshot = await getDocs(q);



                if (querySnapshot.empty) {

                    alert("해당 이름으로 가입된 계정이 없습니다.");

                } else {

                    let foundEmails = "";

                    querySnapshot.forEach((doc) => {

                        const data = doc.data();

                        const email = data.email;

                        const [local, domain] = email.split('@');

                        const maskedLocal = local.length > 3 ? local.substring(0, 3) + "*".repeat(local.length - 3) : local;

                        foundEmails += `• ${maskedLocal}@${domain}\n`;

                    });

                    alert(`'${name}'님의 정보로 찾은 이메일입니다:\n\n${foundEmails}`);

                }

            } catch (error) {

                console.error(error);

                alert("검색 중 오류가 발생했습니다.");

            } finally {

                loadingEl.classList.add('hidden');

            }

        };



        lucide.createIcons();

    