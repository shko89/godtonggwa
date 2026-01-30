// common_nav.js

/**
 * 하단 네비게이션을 렌더링하는 함수
 * @param {string} activePage - 현재 페이지 이름 ('home', 'exam', 'bank', 'report', 'my')
 * @param {string} basePath - 링크 이동시 사용할 기본 경로 (상위 폴더로 가야할 경우 '../' 등 입력, 기본값은 '')
 */
function renderCommonNav(activePage, basePath = '') {
    const navContainer = document.getElementById('common-nav-container');
    
    // 각 메뉴 아이템 정의 (링크 경로는 필요에 따라 수정하세요)
    const navItems = [
        { id: 'home', icon: 'home', label: '홈', link: 'index.html' },
        { id: 'exam', icon: 'file-text', label: '시험응시', link: 'STEST/exam.html' },
        { id: 'bank', icon: 'brain-circuit', label: '문제은행', link: 'Q-Bank/student_quiz.html', isSpecial: true },
        { id: 'report', icon: 'bar-chart-2', label: '성적분석', link: 'STEST/exam.html?view=report' },
        { id: 'my', icon: 'user', label: '마이', link: 'mypage.html' } // 마이페이지 링크는 실제 파일명으로 수정 필요
    ];

    // HTML 생성
    let html = `<nav class="bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center fixed bottom-0 w-full max-w-[480px] z-50 pb-6 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">`;

    navItems.forEach(item => {
        // 경로 처리 (basePath가 있으면 앞에 붙임)
        // 주의: index.html 같은 경우 보통 루트에 있으므로 경로 조정이 필요할 수 있습니다.
        // 여기서는 단순히 basePath를 붙이는 로직입니다.
        const fullLink = item.link.startsWith('http') ? item.link : basePath + item.link;
        
        // 현재 페이지 활성화 스타일 처리
        const isActive = activePage === item.id;
        const colorClass = isActive ? 'text-indigo-600' : 'text-gray-400';
        
        if (item.isSpecial) {
            // 문제은행 (가운데 튀어나온 버튼)
            html += `
            <button onclick="location.href='${fullLink}'" class="nav-btn flex flex-col items-center gap-1 -mt-8 group">
                <div class="bg-gray-900 p-4 rounded-full shadow-lg shadow-gray-300 group-hover:scale-105 transition-transform group-active:scale-95 border-4 border-white">
                    <i data-lucide="${item.icon}" class="w-7 h-7 text-white"></i>
                </div>
                <span class="text-[10px] font-bold text-gray-600 mt-1">${item.label}</span>
            </button>`;
        } else {
            // 일반 버튼
            html += `
            <button onclick="location.href='${fullLink}'" class="nav-btn ${colorClass} flex flex-col items-center gap-1 transition-colors hover:text-gray-600">
                <i data-lucide="${item.icon}" class="w-6 h-6"></i>
                <span class="text-[10px] font-bold">${item.label}</span>
            </button>`;
        }
    });

    html += `</nav>`;

    // 컨테이너에 HTML 주입
    if (navContainer) {
        navContainer.innerHTML = html;
        
        // 아이콘 렌더링 (Lucide)
        if (window.lucide) {
            lucide.createIcons();
        }
    }
}