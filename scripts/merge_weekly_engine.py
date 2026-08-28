import os
import re
import sys
import base64
import shutil

sys.stdout.reconfigure(encoding='utf-8')

def scope_css_rules(css_text, scope_class):
    if not css_text:
        return ""
    
    # Remove comments
    clean = re.sub(r'/\*[\s\S]*?\*/', '', css_text)
    
    top_level_rules = []
    
    def extract_top(match):
        top_level_rules.append(match.group(0))
        return ''
    
    clean = re.sub(r'@(-webkit-|-moz-|-o-|-ms-)?keyframes\s+[^{]+\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}', extract_top, clean, flags=re.DOTALL)
    clean = re.sub(r'@font-face\s*\{[^{}]*\}', extract_top, clean, flags=re.DOTALL)
    clean = re.sub(r'@import\s+[^;]+;', extract_top, clean)

    def process_block(rules_text):
        out = []
        for match in re.finditer(r'([^{}]+)\{([^{}]*)\}', rules_text):
            selectors_str = match.group(1).strip()
            declarations = match.group(2).strip()
            if not selectors_str or not declarations:
                continue

            scoped_list = []
            selectors = selectors_str.split(',')
            for sel in selectors:
                sel = sel.strip()
                if not sel:
                    continue
                if re.match(r'^(html|body|:root)(\s|$|:|\.)', sel, re.I):
                    sub = re.sub(r'^(html|body|:root)', '', sel, flags=re.I).strip()
                    if sub:
                        scoped_list.append(f".{scope_class} {sub}")
                    scoped_list.append(f".{scope_class}")
                elif sel.startswith('.a4-page') or sel.startswith('.concept-page') or sel.startswith('.spread-page') or sel.startswith('.page-wrapper'):
                    scoped_list.append(f".{scope_class} {sel}")
                    scoped_list.append(f".{scope_class}{sel}")
                else:
                    scoped_list.append(f".{scope_class} {sel}")
            
            if scoped_list:
                out.append(f"{', '.join(sorted(list(set(scoped_list))))} {{\n  {declarations}\n}}")
        return '\n'.join(out)

    result_blocks = []
    media_matches = list(re.finditer(r'@media[^{]+\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}', clean, flags=re.DOTALL))
    last_idx = 0

    for mm in media_matches:
        start, end = mm.span()
        if start > last_idx:
            result_blocks.append(process_block(clean[last_idx:start]))
        media_text = mm.group(0)
        m_head = re.match(r'(@media[^{]+)\{([\s\S]*)\}', media_text)
        if m_head:
            header = m_head.group(1).strip()
            inner = m_head.group(2).strip()
            result_blocks.append(f"{header} {{\n{process_block(inner)}\n}}")
        last_idx = end

    if last_idx < len(clean):
        result_blocks.append(process_block(clean[last_idx:]))

    return f"{'\n'.join(top_level_rules)}\n{'\n'.join(result_blocks)}"

def merge_week(folder_path, sequence_files, vol_num, output_path):
    print(f"=== 주간지 {vol_num}주차 병합 시작 ===")
    print(f"소스 폴더: {folder_path}")
    print(f"출력 경로: {output_path}")

    # Load local images for auto base64 embedding
    img_cache = {}
    for f in os.listdir(folder_path):
        ext = os.path.splitext(f)[1].lower()
        if ext in ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif']:
            mime = 'image/svg+xml' if ext == '.svg' else f'image/{ext[1:]}'
            with open(os.path.join(folder_path, f), 'rb') as img_f:
                b64 = base64.b64encode(img_f.read()).decode('utf-8')
                img_cache[f] = f"data:{mime};base64,{b64}"
    print(f"캐싱된 로컬 이미지: {len(img_cache)}개")

    extracted_pages = [] # (file_name, sub_idx, title, page_html, raw_styles)

    for fname in sequence_files:
        fp = os.path.join(folder_path, fname)
        if not os.path.exists(fp):
            print(f"⚠ 파일 없음: {fname}")
            continue

        with open(fp, 'r', encoding='utf-8', errors='ignore') as file:
            content = file.read()

        # Extract styles
        styles = re.findall(r'<style[^>]*>([\s\S]*?)</style>', content, re.I)
        combined_styles = '\n'.join(styles)

        # Extract .a4-page elements
        # Using regex to find <div class="...a4-page..."> to </div>
        # A reliable way is finding each opening tag and matching to its closing tag or using BeautifulSoup/regex
        a4_starts = [m.start() for m in re.finditer(r'<div[^>]*class=[\'"][^\'"]*a4-page[^\'"]*[\'"]', content)]
        
        if not a4_starts:
            # Try concept-page or spread-page
            a4_starts = [m.start() for m in re.finditer(r'<div[^>]*class=[\'"][^\'"]*(?:concept-page|spread-page)[^\'"]*[\'"]', content)]

        if not a4_starts:
            # Fallback to entire body
            body_m = re.search(r'<body[^>]*>([\s\S]*?)</body>', content, re.I)
            if body_m:
                extracted_pages.append((fname, 1, fname, body_m.group(1).strip(), combined_styles))
            continue

        for i, start_pos in enumerate(a4_starts):
            # End pos is start of next page or </body> or end of file
            if i + 1 < len(a4_starts):
                end_pos = a4_starts[i + 1]
                # Slice backwards to find the last </div> before next start
                page_html = content[start_pos:end_pos].strip()
            else:
                body_end = content.find('</body>', start_pos)
                if body_end == -1:
                    body_end = len(content)
                page_html = content[start_pos:body_end].strip()

            # Clean extra closing divs at the very end of file if any
            # Detect title
            h_m = re.search(r'<h[1-4][^>]*>([\s\S]*?)</h[1-4]>', page_html)
            title = re.sub(r'<[^>]+>', '', h_m.group(1)).strip() if h_m else fname

            extracted_pages.append((fname, i + 1, title, page_html, combined_styles))

    print(f"총 추출된 페이지 수: {len(extracted_pages)} 페이지")

    # Build Merged Structure
    scoped_styles_list = []
    page_wrappers_list = []

    for seq, (fname, sub_idx, title, page_html, raw_styles) in enumerate(extracted_pages, start=1):
        scope_class = f"page-scope-p{seq:02d}"

        # Scope CSS
        if raw_styles:
            scoped_css = scope_css_rules(raw_styles, scope_class)
            scoped_styles_list.append(f"/* === [Style] Page {seq}: {fname} ({title}) === */\n{scoped_css}")

        # Embed local images if found
        for img_name, data_url in img_cache.items():
            if img_name in page_html:
                page_html = page_html.replace(f'"{img_name}"', f'"{data_url}"').replace(f"'{img_name}'", f"'{data_url}'").replace(f"./{img_name}", data_url)

        # Renumber bottom page numbers
        is_cover = (seq == 1 or 'cover' in page_html)
        final_num = "" if is_cover else f"- {seq:02d} -"

        if 'class="page-num"' in page_html or "class='page-num'" in page_html:
            page_html = re.sub(r'<div[^>]*class=[\'"][^\'"]*page-num[^\'"]*[\'"][^>]*>[\s\S]*?</div>', 
                               f'<div class="page-num">{final_num}</div>' if final_num else '', page_html)
        elif final_num:
            last_close = page_html.rfind('</div>')
            if last_close != -1:
                page_html = page_html[:last_close] + f'<div class="page-num">{final_num}</div></div>'

        # First page hard density
        if seq == 1 and 'data-density="hard"' not in page_html:
            page_html = re.sub(r'<div([^>]*class=[\'"][^\'"]*a4-page[^\'"]*[\'"])', r'<div\1 data-density="hard"', page_html)

        page_wrappers_list.append(f'    <div class="page-wrapper {scope_class}">\n        {page_html}\n    </div>')

    # Read template from weekly_merger.html template logic
    template = f"""<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>갓통과 주간지 {int(vol_num)}주차 [전자책]</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Noto+Sans+KR:wght@400;700;900&family=Roboto:wght@400;700;900&display=swap" rel="stylesheet">
    
    <!-- Base Reset & Flipbook Global Styles -->
    <style>
        * {{ box-sizing: border-box; }}
        body {{ 
            margin: 0 !important; 
            padding: 0 !important; 
            background-color: #cbd5e1 !important; 
            font-family: 'Noto Sans KR', sans-serif; 
            overflow: hidden !important;
        }}
        .page-wrapper {{ 
            margin: 0 !important; 
            padding: 0 !important; 
            width: 100% !important; 
            height: 100% !important; 
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
        }}
        .a4-page, .concept-page, .spread-page {{
            width: 500px !important;
            height: 707px !important;
            position: relative !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            background-color: #ffffff;
        }}

        #flipbook-container {{
            display: flex;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background-color: #cbd5e1 !important;
            z-index: 10000 !important;
            overflow: hidden !important;
            align-items: center !important;
            justify-content: center !important;
        }}

        #scale-wrapper {{
            position: absolute;
            top: 50%;
            left: 50%;
            transform-origin: center center;
            display: flex;
            align-items: center;
            justify-content: center;
        }}

        #flipbook {{
            width: 100% !important;
            height: 100% !important;
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            transform: none !important;
            margin: 0 !important;
        }}

        /* Master Page Number */
        .page-num, .a4-page .page-num, .concept-page .page-num, .spread-page .page-num {{
            position: absolute !important;
            bottom: 12px !important;
            left: 0 !important;
            width: 100% !important;
            text-align: center !important;
            font-size: 11px !important;
            line-height: 1 !important;
            color: #64748b !important;
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif !important;
            font-weight: 700 !important;
            letter-spacing: 2px !important;
            pointer-events: none !important;
            z-index: 50 !important;
        }}

        /* Floating Drawing Toolbar */
        #drawing-toolbar {{
            position: absolute;
            right: 20px;
            top: 100px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            z-index: 1100;
            background: rgba(255, 255, 255, 0.95);
            padding: 10px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            border: 1px solid #cbd5e1;
            backdrop-filter: blur(5px);
        }}
        .tool-btn {{
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            padding: 6px 10px;
            font-size: 12px;
            font-weight: bold;
            cursor: pointer;
            color: #334155;
            transition: all 0.2s;
        }}
        .tool-btn:hover {{ background: #e2e8f0; }}
        .tool-btn.active {{ background: #0284c7; color: white; border-color: #0284c7; }}
        .color-palette {{ display: flex; gap: 4px; }}
        .pen-btn {{ width: 22px; height: 22px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; }}
    </style>

    <!-- Scoped Component Styles -->
{chr(10).join([f'    <style>{s}</style>' for s in scoped_styles_list])}
</head>
<body>

<!-- Hidden Master Main Content (Source of Clone for PageFlip) -->
<div id="main-content" style="display: none;">
{chr(10).join(page_wrappers_list)}
</div>

<!-- Interactive Flipbook Viewport Container -->
<div id="flipbook-container">
    
    <!-- Top Left: Zoom In / Out Buttons -->
    <div style="position: absolute; top: 20px; left: 20px; display: flex; gap: 10px; z-index: 1100;">
        <button class="zoom-btn" onclick="zoomFlipbook(0.2)" style="padding: 10px 15px; font-size: 16px; background-color: #f8fafc; border: 2px solid #0284c7; border-radius: 8px; cursor: pointer; color: #0284c7; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">🔍 확대 (+)</button>
        <button class="zoom-btn" onclick="zoomFlipbook(-0.2)" style="padding: 10px 15px; font-size: 16px; background-color: #f8fafc; border: 2px solid #0284c7; border-radius: 8px; cursor: pointer; color: #0284c7; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">🔍 축소 (-)</button>
    </div>

    <!-- Top Right: Navigation Close Button -->
    <div style="position: absolute; top: 20px; right: 20px; z-index: 1100;">
        <button onclick="closeEbook(event)" style="background-color: #ef4444; color: white; border: none; padding: 10px 18px; font-size: 16px; font-weight: bold; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">✕ 닫기</button>
    </div>

    <!-- Centered Scale Wrapper -->
    <div id="scale-wrapper">
        <div id="flipbook">
            <!-- Cloned pages injected here -->
        </div>
    </div>

    <!-- Floating Drawing Toolbar -->
    <div id="drawing-toolbar">
        <button id="btn-mode-toggle" class="tool-btn" style="background: #38bdf8; color: white; border: none; padding: 8px 12px; border-radius: 8px; font-size: 13px; font-weight: bold;" onclick="toggleDrawingMode(event)">📖 보기 모드</button>
        
        <div id="drawing-tools" style="display: none; flex-direction: column; gap: 8px; align-items: center; margin-top: 5px;">
            <div class="color-palette">
                <button class="pen-btn" style="background: #0f172a; border-color: white;" onclick="setPen('#0f172a', this, false, event)"></button>
                <button class="pen-btn" style="background: #ef4444;" onclick="setPen('#ef4444', this, false, event)"></button>
                <button class="pen-btn" style="background: #0284c7;" onclick="setPen('#0284c7', this, false, event)"></button>
            </div>
            <button class="tool-btn" style="background: #fef08a; color: #854d0e; width: 100%;" onclick="setPen('rgba(253, 224, 71, 0.4)', this, true, event)">✏️ 형광펜</button>
            <div style="display: flex; gap: 4px; width: 100%;">
                <button class="tool-btn active" style="flex: 1; padding: 4px;" onclick="setThickness(2.5, this, event)">얇게</button>
                <button class="tool-btn" style="flex: 1; padding: 4px;" onclick="setThickness(5, this, event)">보통</button>
                <button class="tool-btn" style="flex: 1; padding: 4px;" onclick="setThickness(9, this, event)">두껍</button>
            </div>
            <button class="tool-btn" style="width: 100%;" onclick="setEraser(this, event)">부분지우개</button>
            <button class="tool-btn" style="background: #fee2e2; color: #dc2626; border-color: #fca5a5; width: 100%;" onclick="clearAllCanvas(event)">초기화</button>
        </div>
    </div>
</div>

<!-- External Scripts (PageFlip & MathJax) -->
<script src="https://cdn.jsdelivr.net/npm/page-flip/dist/js/page-flip.browser.js"></script>
<script>
// ==========================================
// 1. Close Button Logic
// ==========================================
window.closeEbook = function(e) {{
    if (e) {{ try {{ e.stopPropagation(); e.preventDefault(); }} catch(err){{}} }}
    if (window.opener && !window.opener.closed) {{ window.close(); return; }}
    if (window.history && window.history.length > 1) {{ window.history.back(); return; }}
    window.location.href = "../../exam.html";
}};

// ==========================================
// 2. Interactive Quiz Handlers
// ==========================================
window.checkOX = function(btn, choice, event) {{
    if (event) {{ try {{ e.stopPropagation(); }} catch(err){{}} }}
    var group = btn.closest('.btn-group') || btn.parentElement;
    if (!group || group.dataset.answered) return;
    var answer = group.dataset.answer;
    group.dataset.answered = "true";
    
    var btns = group.querySelectorAll('.ox-btn');
    if (choice === answer) {{
        btn.style.setProperty('background-color', '#dcfce7', 'important');
        btn.style.setProperty('color', '#16a34a', 'important');
        btn.style.setProperty('border-color', '#16a34a', 'important');
    }} else {{
        btn.style.setProperty('background-color', '#fee2e2', 'important');
        btn.style.setProperty('color', '#dc2626', 'important');
        btn.style.setProperty('border-color', '#dc2626', 'important');
        btns.forEach(function(b) {{
            if (b.textContent.trim() === answer) {{
                b.style.setProperty('background-color', '#dcfce7', 'important');
                b.style.setProperty('color', '#16a34a', 'important');
                b.style.setProperty('border-color', '#16a34a', 'important');
            }}
        }});
    }}
}};

window.revealBlank = function(el, event) {{
    if (event) {{ try {{ event.stopPropagation(); }} catch(err){{}} }}
    el.classList.add('revealed');
}};

// ==========================================
// 3. Drawing Engine
// ==========================================
let isDrawingMode = false;
let currentPenColor = '#0f172a';
let currentPenWidth = 2.5;
let isHighlighter = false;
let isEraserMode = false;

window.toggleDrawingMode = function(e) {{
    if (e) {{ try {{ e.stopPropagation(); }} catch(err){{}} }}
    isDrawingMode = !isDrawingMode;
    const btn = document.getElementById('btn-mode-toggle');
    const tools = document.getElementById('drawing-tools');
    const canvases = document.querySelectorAll('.draw-layer');

    if (isDrawingMode) {{
        btn.innerText = "✍️ 쓰기 모드";
        btn.style.background = "#f59e0b";
        tools.style.display = "flex";
        canvases.forEach(c => c.style.pointerEvents = "auto");
    }} else {{
        btn.innerText = "📖 보기 모드";
        btn.style.background = "#38bdf8";
        tools.style.display = "none";
        canvases.forEach(c => c.style.pointerEvents = "none");
    }}
}};

window.setPen = function(color, btnElem, isHl = false, e) {{
    if (e) {{ try {{ e.stopPropagation(); }} catch(err){{}} }}
    currentPenColor = color;
    isHighlighter = isHl;
    isEraserMode = false;
    document.querySelectorAll('.pen-btn').forEach(b => b.style.borderColor = 'transparent');
    document.querySelectorAll('.tool-btn').forEach(b => {{
        if (b.innerText === '부분지우개') b.classList.remove('active');
    }});
    btnElem.style.borderColor = 'white';
}};

window.setThickness = function(w, btnElem, e) {{
    if (e) {{ try {{ e.stopPropagation(); }} catch(err){{}} }}
    currentPenWidth = w;
    document.querySelectorAll('.tool-btn').forEach(b => {{
        if (['얇게', '보통', '두껍'].includes(b.innerText)) b.classList.remove('active');
    }});
    btnElem.classList.add('active');
}};

window.setEraser = function(btnElem, e) {{
    if (e) {{ try {{ e.stopPropagation(); }} catch(err){{}} }}
    isEraserMode = true;
    document.querySelectorAll('.pen-btn').forEach(b => b.style.borderColor = 'transparent');
    btnElem.classList.add('active');
}};

window.clearAllCanvas = function(e) {{
    if (e) {{ try {{ e.stopPropagation(); }} catch(err){{}} }}
    if (!confirm("모든 필기를 지우시겠습니까?")) return;
    document.querySelectorAll('.draw-layer').forEach(canvas => {{
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }});
}};

function setupCanvasDrawing(canvas) {{
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function getPos(e) {{
        const rect = canvas.getBoundingClientRect();
        return {{
            x: (e.clientX - rect.left) * (canvas.width / rect.width),
            y: (e.clientY - rect.top) * (canvas.height / rect.height)
        }};
    }}

    function handlePointerDown(e) {{
        if (!isDrawingMode || !e.isPrimary) return;
        if (e.pointerType === 'touch') return; 
        e.stopPropagation();
        if (e.cancelable) e.preventDefault();

        isDrawing = true;
        try {{ canvas.setPointerCapture(e.pointerId); }} catch(err){{}}

        if (isEraserMode) {{
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = currentPenWidth * 8; 
            ctx.strokeStyle = 'rgba(0,0,0,1)';
        }} else if (isHighlighter) {{
            ctx.globalCompositeOperation = 'multiply';
            ctx.lineWidth = 20;
            ctx.strokeStyle = currentPenColor;
        }} else {{
            ctx.globalCompositeOperation = 'source-over';
            ctx.lineWidth = currentPenWidth * 2; 
            ctx.strokeStyle = currentPenColor;
        }}

        const pos = getPos(e);
        lastX = pos.x;
        lastY = pos.y;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x + 0.01, pos.y);
        ctx.stroke();
    }}

    function handlePointerMove(e) {{
        if (!isDrawingMode || !isDrawing || !e.isPrimary) return;
        const pos = getPos(e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        lastX = pos.x;
        lastY = pos.y;
    }}

    function handlePointerUp(e) {{
        if (!isDrawing) return;
        isDrawing = false;
        try {{ canvas.releasePointerCapture(e.pointerId); }} catch(err){{}}
    }}

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointercancel', handlePointerUp);
}}

// ==========================================
// 4. St.PageFlip Engine Setup
// ==========================================
let pageFlip = null;
let currentZoom = 1.0;
let panX = 0;
let panY = 0;

function isPortraitMode() {{
    return window.innerWidth <= 768 || window.innerHeight > window.innerWidth;
}}

function initFlipbookEngine() {{
    const fbElement = document.getElementById('flipbook');
    if (!fbElement || pageFlip) return;

    const topWrappers = Array.from(document.querySelectorAll('#main-content > .page-wrapper'));
    fbElement.innerHTML = '';

    topWrappers.forEach(w => {{
        const a4Page = w.querySelector('.a4-page') || w.querySelector('.concept-page') || w.querySelector('.spread-page') || w.firstElementChild;
        if (!a4Page) return;

        const clone = a4Page.cloneNode(true);
        clone.style.boxShadow = "none";
        clone.style.margin = "0";
        if (clone.id) clone.id = clone.id + '-clone';

        // Preserve scoped class
        Array.from(w.classList).forEach(cls => {{
            if (cls.startsWith('page-scope-') && !clone.classList.contains(cls)) {{
                clone.classList.add(cls);
            }}
        }});
        
        const cvs = document.createElement('canvas');
        cvs.className = 'draw-layer';
        cvs.width = 1000;
        cvs.height = 1414;
        cvs.style.width = '100%';
        cvs.style.height = '100%';
        cvs.style.position = 'absolute';
        cvs.style.top = '0';
        cvs.style.left = '0';
        cvs.style.zIndex = '999';
        cvs.style.pointerEvents = isDrawingMode ? 'auto' : 'none';
        setupCanvasDrawing(cvs);
        clone.appendChild(cvs);

        fbElement.appendChild(clone);
    }});

    pageFlip = new St.PageFlip(fbElement, {{
        width: 500,
        height: 707,
        size: "fixed",
        minWidth: 300,
        maxWidth: 1000,
        minHeight: 400,
        maxHeight: 1000,
        maxShadowOpacity: 0.5,
        showCover: true,
        mobileScrollSupport: false,
        useMouseEvents: false,
        usePortrait: true
    }});

    pageFlip.loadFromHTML(Array.from(fbElement.children));
}}

function resizeFlipbook() {{
    const fbContainer = document.getElementById('flipbook-container');
    const scaleWrapper = document.getElementById('scale-wrapper');
    if (!fbContainer || fbContainer.style.display === 'none' || !scaleWrapper) return;

    const portrait = isPortraitMode();
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    
    const targetW = portrait ? 500 : 1000;
    const targetH = 707;

    if (currentZoom <= 1.05) {{ panX = 0; panY = 0; }}

    const scaleW = (winW * 0.95) / targetW;
    const scaleH = (winH * 0.95) / targetH;
    let baseScale = Math.min(scaleW, scaleH);
    let totalScale = baseScale * currentZoom;

    scaleWrapper.style.width = targetW + 'px';
    scaleWrapper.style.height = targetH + 'px';
    scaleWrapper.style.transform = `translate(calc(-50% + ${{panX}}px), calc(-50% + ${{panY}}px)) scale(${{totalScale}})`;

    if (pageFlip) pageFlip.update();
}}

window.zoomFlipbook = function(delta) {{
    currentZoom = Math.min(Math.max(0.6, currentZoom + delta), 2.5);
    resizeFlipbook();
}};

function setupViewerEvents() {{
    let isMouseDown = false;
    let startX = 0, startY = 0;

    const fbContainer = document.getElementById('flipbook-container');
    fbContainer.addEventListener('mousedown', (e) => {{
        if (e.target.closest('#drawing-toolbar') || e.target.closest('.zoom-btn') || e.target.closest('button')) return;
        isMouseDown = true;
        startX = e.clientX - panX;
        startY = e.clientY - panY;
    }});

    window.addEventListener('mousemove', (e) => {{
        if (!isMouseDown) return;
        if (currentZoom > 1.05 && !isDrawingMode) {{
            panX = e.clientX - startX;
            panY = e.clientY - startY;
            resizeFlipbook();
        }}
    }});

    window.addEventListener('mouseup', (e) => {{
        if (!isMouseDown) return;
        if (currentZoom <= 1.05 && !isDrawingMode && pageFlip) {{
            const clickX = e.clientX;
            const mid = window.innerWidth / 2;
            if (clickX < mid) pageFlip.flipPrev();
            else pageFlip.flipNext();
        }}
        isMouseDown = false;
    }});

    window.addEventListener('resize', resizeFlipbook);
    window.addEventListener('orientationchange', resizeFlipbook);

    window.addEventListener('keydown', (e) => {{
        if (!pageFlip) return;
        if (e.key === 'ArrowLeft' || e.key === 'PageUp') pageFlip.flipPrev();
        else if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') pageFlip.flipNext();
    }});
}}

document.addEventListener('DOMContentLoaded', () => {{
    initFlipbookEngine();
    setupViewerEvents();
    resizeFlipbook();
}});
</script>
</body>
</html>"""

    with open(output_path, 'w', encoding='utf-8') as out_f:
        out_f.write(template)

    print(f"✓ 주간지 완성본 생성 완료! ({len(template):,} bytes)")
    return template

if __name__ == '__main__':
    w4_folder = r'G:\내 드라이브\주간지\4주차'
    w4_files = [
        'page01.html',
        'page03.html',
        'page04.html',
        'page05.html',
        'page06.html',
        'page07.html',
        'page07-1.html',
        'page08.html',
        'page09.html',
        'page9-1.html',
        'page10.html',
        'page11.html',
        'page11-1.html',
        'page12.html',
        'page13.html',
        'page13-1.html',
        'quiz_04.html'
    ]
    out_drive = r'G:\내 드라이브\주간지\4주차\week_2028_04_final.html'
    out_public = r'C:\Users\shko8\godtonggwa\public\STEST\weekly\ebook\week_2028_04_final.html'

    merge_week(w4_folder, w4_files, "04", out_drive)
    
    if os.path.exists(r'C:\Users\shko8\godtonggwa\public\STEST\weekly\ebook'):
        shutil.copy2(out_drive, out_public)
        print(f"✓ 앱 public 디렉토리에도 동기화 완료: {out_public}")
