import sys
import glob
import os

sys.stdout.reconfigure(encoding='utf-8')

inject_script = """
<script>
// 데스크탑에서 모바일 레이아웃(480px) 바깥의 회색 배경에서 마우스 휠을 돌릴 때, 
// 내부 스크롤 영역이 대신 스크롤되도록 이벤트를 위임합니다.
window.addEventListener('wheel', (e) => {
    if (!e.target.closest('.overflow-y-auto')) {
        const scrollContainers = document.querySelectorAll('.overflow-y-auto');
        // 화면에 보이는 스크롤 컨테이너 중 가장 나중에 나타나는(보통 모달이거나 메인 컨텐츠) 컨테이너를 찾습니다.
        const activeContainer = Array.from(scrollContainers).reverse().find(el => el.offsetParent !== null);
        if (activeContainer) {
            activeContainer.scrollTop += e.deltaY;
        }
    }
}, { passive: true });
</script>
"""

def inject_to_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    if "이벤트를 위임합니다." in text:
        return # Already injected
        
    # Inject right before </head>
    idx = text.find('</head>')
    if idx != -1:
        text = text[:idx] + inject_script + text[idx:]
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"Injected global wheel script to {filepath}")

# Inject to all html files
html_files = glob.glob('C:/Users/shko8/godtonggwa/public/**/*.html', recursive=True)
for file in html_files:
    inject_to_file(file)

print("Done.")
