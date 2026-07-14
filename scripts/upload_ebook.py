import os
import re
from bs4 import BeautifulSoup

def process_ebook():
    html_path = r"g:\내 드라이브\주간지\2주차\week_2028_02_final.html"
    if not os.path.exists(html_path):
        print(f"File not found: {html_path}")
        return

    with open(html_path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    # Remove pages from mock exam onwards (starting at id="page-29")
    mock_start = soup.find('div', id='page-29')
    if mock_start:
        wrapper = mock_start.find_parent('div', class_='page-wrapper')
        if wrapper:
            # Remove this wrapper and all its following page-wrappers
            next_wrappers = wrapper.find_next_siblings('div', class_='page-wrapper')
            for w in next_wrappers:
                w.decompose()
            wrapper.decompose()

    # Remove the mock exam TOC item (05) from the table of contents
    for toc_item in soup.find_all('div', class_='toc-item'):
        item_num = toc_item.find('div', class_='item-num')
        if item_num and item_num.get_text(strip=True) == '05':
            toc_item.decompose()

    # Also we might need to remove anything after that is part of the mock exam.
    # Like a specific closing comment or elements. The decompose on siblings handles most of it.
    
    # Remove UI elements (header title and all download/toggle buttons)
    header = soup.find('div', class_='header-title')
    if header:
        header.decompose()
        
    for btn in soup.find_all('button', class_='btn-download'):
        btn_parent = btn.find_parent('div', style=re.compile(r'display:\s*flex'))
        if btn_parent and 'gap: 10px' in btn_parent.get('style', ''):
            btn_parent.decompose()
        else:
            btn.decompose()
            
    # Inject Close Button into body
    close_btn_html = """
    <div style="position: fixed; top: 15px; right: 20px; z-index: 9999;">
        <button onclick="window.history.back()" style="background-color: #0f172a; color: white; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 20px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; opacity: 0.9;">✕</button>
    </div>
    """
    body = soup.find('body')
    if body:
        body.insert(0, BeautifulSoup(close_btn_html, 'html.parser'))
    
    security_script = """
    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
        
        const firebaseConfig = {
            apiKey: "AIzaSyD5axOHuQQ9Y5VmIqvN1AeuVyAVivQlTXs",
            authDomain: "godtonggwa.firebaseapp.com",
            projectId: "godtonggwa",
            storageBucket: "godtonggwa.firebasestorage.app",
            messagingSenderId: "1087434066468",
            appId: "1:1087434066468:web:00a75c9329543afc76e6b1"
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        onAuthStateChanged(auth, (user) => {
            if (!user || user.isAnonymous) {
                alert("로그인이 필요하거나 접근 권한이 없습니다.");
                window.location.href = "../../exam.html";
            } else {
                document.body.style.display = 'flex';
            }
        });

        // Anti-copy measures
        document.addEventListener('contextmenu', event => event.preventDefault());
        document.addEventListener('keydown', event => {
            if (event.ctrlKey && (event.key === 's' || event.key === 'c' || event.key === 'u' || event.key === 'a')) {
                event.preventDefault();
            }
            if (event.key === 'F12') {
                event.preventDefault();
            }
        });

        // Auto-start Flipbook mode
        window.addEventListener('load', () => {
            if(typeof toggleFlipbook === 'function') {
                const fbContainer = document.getElementById('flipbook-container');
                if (fbContainer && fbContainer.style.display === "none") {
                    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                    if (!isMobile && window.innerWidth > 768) {
                        toggleFlipbook();
                    } else {
                        // On mobile, show vertical scroll mode by making body flex to keep centering
                        document.body.style.display = 'flex'; 
                    }
                }
            }
        });
    </script>
    <style>
        body {
            user-select: none;
            -webkit-user-select: none;
            display: none;
            padding-top: 60px !important; /* 모바일에서 X버튼에 가리지 않도록 여백 추가 */
        }
        img {
            pointer-events: none;
        }
    </style>
    """

    head = soup.find('head')
    if head:
        head.append(BeautifulSoup(security_script, 'html.parser'))

    out_dir = r"C:\Users\user\godtonggwa\public\STEST\weekly\ebook"
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "week_2028_02_final.html")
    
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(str(soup))
        
    print(f"Ebook successfully processed and saved to {out_path}")

if __name__ == '__main__':
    process_ebook()
