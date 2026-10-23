// 데스크탑에서 모바일 레이아웃(480px) 바깥의 회색 배경에서 마우스 휠을 돌릴 때,
// 내부 스크롤 영역이 대신 스크롤되도록 이벤트를 위임합니다.
if (!window._wheelDelegationRegistered) {
    window._wheelDelegationRegistered = true;
    window.addEventListener('wheel', (e) => {
        // 이벤트가 발생한 곳이 body이거나, 스크롤 가능한 내부 컨테이너 바깥일 때만 작동
        if (e.target === document.body || e.target === document.documentElement) {
            const scrollContainers = document.querySelectorAll('.overflow-y-auto');
            // 화면에 보이는 스크롤 컨테이너 중 가장 나중에 나타나는(보통 모달이거나 메인 컨텐츠) 컨테이너를 찾습니다.
            const activeContainer = Array.from(scrollContainers).reverse().find(el => el.offsetParent !== null);
            if (activeContainer) {
                activeContainer.scrollTop += e.deltaY;
            }
        }
    }, { passive: true });
}
