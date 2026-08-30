import os
import re
import sys
import base64
import shutil

sys.stdout.reconfigure(encoding='utf-8')

# Read common CSS from scratch or from backup
common_css_path = r'C:\Users\shko8\.gemini\antigravity\brain\e4b02453-8135-4547-97df-6cd778ef4f3e\scratch\common_css.css'
with open(common_css_path, 'r', encoding='utf-8') as f:
    WEEKLY_COMMON_CSS = f.read()

def scope_css_rules(css_text, scope_class):
    if not css_text:
        return ""
    
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
                is_page_root = any(s in selectors_str for s in ['.a4-page', '.concept-page', '.spread-page', 'body', 'html'])
                clean_decl = declarations
                if is_page_root:
                    clean_decl = re.sub(r'(display|position)\s*:\s*([^;!]+)\s*!important', r'\1: \2', clean_decl, flags=re.I)

                out.append(f"{', '.join(sorted(list(set(scoped_list))))} {{\n  {clean_decl}\n}}")
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

    wrapper_std = f"""
.{scope_class} html, .{scope_class} body {{
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans KR', sans-serif !important;
}}
#main-content .{scope_class} .a4-page, #main-content .{scope_class}.a4-page {{
    width: 500px !important;
    height: 707px !important;
    background-color: #ffffff;
    box-sizing: border-box;
    margin: 0;
    overflow: hidden;
}}
"""
    return f"{'\n'.join(top_level_rules)}\n{wrapper_std}\n{'\n'.join(result_blocks)}"

def merge_week_perfect(folder_path, sequence_files, vol_num, output_path):
    print(f"=== 주간지 {vol_num}주차 완벽 동기화 병합 시작 ===")
    
    img_cache = {}
    for f in os.listdir(folder_path):
        ext = os.path.splitext(f)[1].lower()
        if ext in ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif']:
            mime = 'image/svg+xml' if ext == '.svg' else f'image/{ext[1:]}'
            with open(os.path.join(folder_path, f), 'rb') as img_f:
                b64 = base64.b64encode(img_f.read()).decode('utf-8')
                img_cache[f] = f"data:{mime};base64,{b64}"
    print(f"캐싱된 로컬 이미지: {len(img_cache)}개")

    raw_extracted = [] # (fname, sub_idx, title, page_html, raw_styles)

    for fname in sequence_files:
        fp = os.path.join(folder_path, fname)
        if not os.path.exists(fp):
            print(f"⚠ 파일 없음: {fname}")
            continue

        with open(fp, 'r', encoding='utf-8', errors='ignore') as file:
            content = file.read()

        styles = re.findall(r'<style[^>]*>([\s\S]*?)</style>', content, re.I)
        combined_styles = '\n'.join(styles)

        # 1. Find only top-level a4-page elements
        matches = list(re.finditer(r'<div[^>]*class=["\'][^"\']*\ba4-page\b[^"\']*["\'][^>]*>', content))
        if not matches:
            matches = list(re.finditer(r'<div[^>]*class=["\'][^"\']*(?:concept-page|spread-page)[^"\']*["\'][^>]*>', content))

        if not matches:
            body_m = re.search(r'<body[^>]*>([\s\S]*?)</body>', content, re.I)
            if body_m:
                raw_extracted.append((fname, 1, fname, body_m.group(1).strip(), combined_styles))
            continue

        for i, m in enumerate(matches):
            start_pos = m.start()
            depth = 0
            end_pos = start_pos
            idx_scan = start_pos
            while idx_scan < len(content):
                if content[idx_scan:idx_scan+4] == '<div':
                    depth += 1
                    idx_scan += 4
                elif content[idx_scan:idx_scan+6] == '</div>':
                    depth -= 1
                    idx_scan += 6
                    if depth == 0:
                        end_pos = idx_scan
                        break
                else:
                    idx_scan += 1
            
            if depth != 0:
                if i + 1 < len(matches):
                    end_pos = matches[i+1].start()
                else:
                    b_end = content.find('</body>', start_pos)
                    end_pos = b_end if b_end != -1 else len(content)

            page_html = content[start_pos:end_pos].strip()
            h_m = re.search(r'<h[1-4][^>]*>(.*?)</h[1-4]>', page_html)
            title = re.sub(r'<[^>]+>', '', h_m.group(1)).strip() if h_m else fname

            raw_extracted.append((fname, i + 1, title, page_html, combined_styles))

    print(f"총 추출된 원본 페이지 수: {len(raw_extracted)} 페이지")

    # Arrange Pages into Flipbook:
    # 1. Page 1: Cover (page01.html)
    # 2. Page 2: Inside Blank Cover (blank-inside-cover) -> Guaranteed 2-page spread!
    # 3. Subsequent pages
    final_pages = []
    
    # 1. Add Cover
    cover_item = raw_extracted[0]
    final_pages.append(cover_item)

    # 2. Add Inside Blank Cover (Page 02)
    blank_p02_html = '<div class="a4-page blank-inside-cover" style="background-color: #ffffff; width: 500px; height: 707px;"></div>'
    final_pages.append(('inside_cover_blank', 1, '면지 (Inside Cover)', blank_p02_html, ''))

    # 3. Add rest of pages
    for item in raw_extracted[1:]:
        final_pages.append(item)

    print(f"최종 플립북 페이지 수 (면지 포함): {len(final_pages)} 페이지")

    scoped_styles_list = []
    page_wrappers_list = []

    for seq, (fname, sub_idx, title, page_html, raw_styles) in enumerate(final_pages, start=1):
        scope_class = f"page-scope-p{seq:02d}"

        if raw_styles:
            scoped_css = scope_css_rules(raw_styles, scope_class)
            scoped_styles_list.append(f"/* === [Style] Page {seq}: {fname} ({title}) === */\n{scoped_css}")

        for img_name, data_url in img_cache.items():
            if img_name in page_html:
                page_html = page_html.replace(f'"{img_name}"', f'"{data_url}"').replace(f"'{img_name}'", f"'{data_url}'").replace(f"./{img_name}", data_url)

        # Page numbering: Cover (P01) and Blank (P02) have NO page number
        is_cover_or_blank = (seq <= 2 or 'cover' in page_html or 'blank-inside-cover' in page_html)
        final_num = "" if is_cover_or_blank else f"- {seq:02d} -"

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

        page_wrappers_list.append(f'    <div class="page-wrapper {scope_class}" style="margin-top: 40px; display: flex; justify-content: center;">\n        {page_html}\n    </div>')

    # Master template exactly matching Week 3
    master_template = f"""<!DOCTYPE html>
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
            margin: 0; 
            padding: 0; 
            background-color: #f1f5f9; 
            font-family: 'Noto Sans KR', sans-serif; 
            display: none; /* Authenticated user check before showing */
        }}
        .page-wrapper {{ margin: 0; padding: 0; width: 100%; height: 100%; }}
        .a4-page, .concept-page, .spread-page {{
            width: 500px !important;
            height: 707px !important;
            position: relative;
            background: #ffffff;
            box-sizing: border-box !important;
            overflow: hidden;
            margin: 0 !important;
        }}

        #flipbook-container {{
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: #cbd5e1;
            z-index: 1000;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }}
        #zoom-wrapper {{
            position: relative;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
        }}
        #scale-wrapper {{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(1);
            transform-origin: center center;
            width: 1000px;
            height: 707px;
        }}
        #flipbook {{
            width: 100%;
            height: 100%;
            position: relative;
            top: 0;
            left: 0;
            transform: none;
            margin: 0;
        }}

        /* Floating Drawing Toolbar Styling */
        #drawing-toolbar {{
            display: flex !important; 
            position: fixed !important; 
            bottom: 25px; 
            left: 50%; 
            transform: translateX(-50%); 
            background-color: #1e293b !important; 
            padding: 10px 16px !important; 
            border-radius: 30px !important; 
            box-shadow: 0 10px 25px rgba(0,0,0,0.4) !important; 
            z-index: 2000 !important; 
            gap: 10px !important; 
            align-items: center !important; 
            max-width: 95vw !important; 
            overflow-x: auto !important;
        }}
        #drawing-tools {{
            display: none; 
            align-items: center; 
            gap: 8px; 
            flex-wrap: nowrap;
        }}
        .pen-btn {{
            width: 30px !important; 
            height: 30px !important; 
            border-radius: 50% !important; 
            border: 2px solid transparent !important; 
            cursor: pointer !important; 
            flex-shrink: 0 !important;
        }}
        .tool-btn {{
            background: transparent !important; 
            color: white !important; 
            border: 1px solid #475569 !important; 
            padding: 6px 12px !important; 
            border-radius: 6px !important; 
            font-size: 13px !important; 
            cursor: pointer !important; 
            white-space: nowrap !important; 
            flex-shrink: 0 !important;
        }}
        .tool-btn.active {{
            background: #475569 !important;
        }}
        #drawing-toolbar::-webkit-scrollbar {{ display: none; }}
        #drawing-toolbar {{ -ms-overflow-style: none; scrollbar-width: none; }}
    </style>
    
    <!-- Weekly Master Common Styles -->
    <style id="weekly-common-styles">
{WEEKLY_COMMON_CSS}
    </style>

    <!-- Master Transparent Page Number Style -->
    <style id="master-page-num-style">
/* Global Master Page Number Styling (100% Seamless & Transparent) */
.page-num, .a4-page .page-num, .concept-page .page-num, .spread-page .page-num {{
    position: absolute !important;
    bottom: 12px !important;
    left: 0 !important;
    width: 100% !important;
    text-align: center !important;
    font-size: 11px !important;
    line-height: 1 !important;
    color: #64748b !important;
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
    font-weight: 700 !important;
    letter-spacing: 1px !important;
    background: transparent !important;
    background-color: transparent !important;
    box-shadow: none !important;
    border: none !important;
    padding: 0 !important;
    margin: 0 !important;
    z-index: 10 !important;
    pointer-events: none !important;
}}

/* Ensure PageFlip inactive pages remain strictly hidden */
.stf__item[style*="display: none"], .stf__item[style*="display:none"] {{
    display: none !important;
}}

/* Force absolute positioning, strict 500x707 dimensions, zero margins on all PageFlip items */
.stf__item, .stf__item.a4-page, .stf__item.concept-page, .stf__item.spread-page, .stf__item[class*="page-scope-"] {{
    position: absolute !important;
    top: 0 !important;
    width: 500px !important;
    height: 707px !important;
    margin: 0 !important;
    box-sizing: border-box !important;
}}
    </style>

    <!-- Scoped Component Styles -->
{chr(10).join([f'    <style>{s}</style>' for s in scoped_styles_list])}
</head>
<body>

<!-- Interactive Flipbook Viewport Container -->
<div id="flipbook-container">
    
    <!-- Top Left: Zoom In / Out Buttons -->
    <div style="position: absolute; top: 20px; left: 20px; display: flex; gap: 10px; z-index: 1100;">
        <button class="zoom-btn" onclick="zoomFlipbook(0.2)" style="padding: 10px 15px; font-size: 16px; background-color: #f8fafc; border: 2px solid #0284c7; border-radius: 8px; cursor: pointer; color: #0284c7; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">🔍 확대 (+)</button>
        <button class="zoom-btn" onclick="zoomFlipbook(-0.2)" style="padding: 10px 15px; font-size: 16px; background-color: #f8fafc; border: 2px solid #0284c7; border-radius: 8px; cursor: pointer; color: #0284c7; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">🔍 축소 (-)</button>
    </div>

    <!-- Top Right: Red Close Button -->
    <button id="close-flipbook-btn" onclick="window.closeEbook(event)" ontouchstart="window.closeEbook(event)" style="position: absolute; top: 20px; right: 20px; padding: 10px 18px; font-size: 16px; background-color: #ef4444; border: none; border-radius: 10px; cursor: pointer; color: white; font-weight: 800; box-shadow: 0 4px 10px rgba(239, 68, 68, 0.35); z-index: 1100; display: flex; align-items: center; gap: 6px; letter-spacing: -0.5px;">
        <span style="font-size: 16px; font-weight: 900;">✖</span> 닫기
    </button>

    <!-- Flipbook Canvas Wrapper -->
    <div id="zoom-wrapper">
        <div id="scale-wrapper">
            <div id="flipbook">
                <!-- Cloned pages injected here -->
            </div>
        </div>
    </div>

    <!-- Floating Drawing Toolbar (보기 모드 / 쓰기 모드) inside Container -->
    <div id="drawing-toolbar">
        <div class="drag-handle" style="cursor: move; padding: 0 8px; color: #94a3b8; font-size: 20px; user-select: none; display: flex; align-items: center; justify-content: center; touch-action: none;">⠿</div>
        <button id="btn-mode-toggle" onclick="toggleDrawingMode(event)" style="background: #38bdf8; color: #0f172a; border: none; padding: 8px 16px; border-radius: 20px; font-weight: 900; font-size: 14px; cursor: pointer; flex-shrink: 0; white-space: nowrap;">📖 보기 모드</button>
        <div id="drawing-tools">
            <div style="width: 2px; height: 24px; background: #475569; margin: 0 5px; flex-shrink: 0;"></div>
            <button class="pen-btn" onclick="setPen('#0f172a', this, false, event)" style="background: #0f172a; border-color: white;"></button>
            <button class="pen-btn" onclick="setPen('#dc2626', this, false, event)" style="background: #dc2626;"></button>
            <button class="pen-btn" onclick="setPen('#0284c7', this, false, event)" style="background: #0284c7;"></button>
            <button class="pen-btn" onclick="setPen('rgba(253, 224, 71, 0.4)', this, true, event)" style="background: #fef08a; display: flex; align-items: center; justify-content: center; font-size: 14px;">🖍️</button>
            <div style="width: 2px; height: 24px; background: #475569; margin: 0 5px; flex-shrink: 0;"></div>
            <button class="tool-btn" onclick="setThickness(1, this, event)">얇게</button>
            <button class="tool-btn active" onclick="setThickness(2.5, this, event)">보통</button>
            <button class="tool-btn" onclick="setThickness(5, this, event)">두껍</button>
            <div style="width: 2px; height: 24px; background: #475569; margin: 0 5px; flex-shrink: 0;"></div>
            <button class="tool-btn" onclick="setEraser(this, event)">부분지우개</button>
            <button onclick="clearAllCanvas(event)" style="background: #ef4444; color: white; border: none; padding: 6px 10px; border-radius: 4px; font-size: 12px; cursor: pointer; font-weight: bold; flex-shrink: 0; white-space: nowrap;">초기화</button>
        </div>
    </div>
</div>

<!-- Hidden Master Main Content (Source of Clone for PageFlip) -->
<div id="main-content" style="display: none;">
{chr(10).join(page_wrappers_list)}
</div>

<!-- External Scripts (PageFlip & MathJax) -->
<script src="https://cdn.jsdelivr.net/npm/page-flip/dist/js/page-flip.browser.js"></script>
<script>
// ==========================================
// 1. Close Button Logic (Reliable Navigation)
// ==========================================
window.closeEbook = function(e) {{
    if (e) {{
        try {{ e.stopPropagation(); }} catch(err){{}}
        try {{ e.preventDefault(); }} catch(err){{}}
    }}
    if (window.opener && !window.opener.closed) {{
        window.close();
        return;
    }}
    if (document.referrer && (document.referrer.indexOf(window.location.host) !== -1 || document.referrer.indexOf('exam') !== -1)) {{
        window.location.href = document.referrer;
        return;
    }}
    if (window.history && window.history.length > 1) {{
        window.history.back();
        setTimeout(function() {{
            window.location.href = "../../exam.html";
        }}, 300);
        return;
    }}
    window.location.href = "../../exam.html";
}};

// ==========================================
// 2. Interactive Quiz Handlers (OX & Blanks)
// ==========================================
window.checkOX = function(btn, choice, event) {{
    if (event) {{
        try {{ event.stopPropagation(); }} catch(err){{}}
    }}
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
    if (event) {{
        try {{ event.stopPropagation(); }} catch(err){{}}
    }}
    el.classList.add('revealed');
}};

// ==========================================
// 3. Drawing Engine (보기 모드 & 쓰기/필기 모드)
// ==========================================
let isDrawingMode = false;
let currentPenColor = '#0f172a';
let currentPenWidth = 2.5;
let isHighlighter = false;
let isEraserMode = false;

window.toggleDrawingMode = function(e) {{
    if (e) {{
        try {{ e.stopPropagation(); }} catch(err){{}}
    }}
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
    document.querySelectorAll('.tool-btn').forEach(b => {{
        if (b.innerText === '부분지우개') b.classList.remove('active');
    }});
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
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {{
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        }};
    }}

    function handlePointerDown(e) {{
        if (!isDrawingMode) return;
        if (!e.isPrimary) return; 

        // 손가락 터치는 줌/이동을 위해 필기 무시 (펜/마우스만 허용)
        if (e.pointerType === 'touch') return; 

        e.stopPropagation();
        if (e.cancelable) e.preventDefault();

        isDrawing = true;
        try {{ canvas.setPointerCapture(e.pointerId); }} catch(err){{}}

        if (isEraserMode) {{
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = currentPenWidth * 8; 
            ctx.strokeStyle = 'rgba(0,0,0,1)';
        }} else {{
            if (isHighlighter) {{
                ctx.globalCompositeOperation = 'multiply';
                ctx.lineWidth = 20;
                ctx.strokeStyle = currentPenColor;
            }} else {{
                ctx.globalCompositeOperation = 'source-over';
                ctx.lineWidth = currentPenWidth * 2; 
                ctx.strokeStyle = currentPenColor;
            }}
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
        if (!isDrawingMode || !isDrawing) return;
        if (!e.isPrimary) return;
        
        if (e.pointerType === 'touch') {{
            isDrawing = false;
            return;
        }}
        
        e.stopPropagation();
        if (e.cancelable) e.preventDefault();
        
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
        e.stopPropagation();
    }}

    let lastPenDownTime = 0;
    let isStylusActive = false;

    canvas.addEventListener('pointerdown', (e) => {{
        if (e.pointerType === 'pen' || e.pointerType === 'mouse') {{
            lastPenDownTime = Date.now();
        }}
        handlePointerDown(e);
    }}, {{passive: false}});
    canvas.addEventListener('pointermove', handlePointerMove, {{passive: false}});
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointercancel', handlePointerUp);
    
    canvas.addEventListener('touchstart', (e) => {{
        if (!isDrawingMode) return;
        let isIOSStylus = (e.touches.length > 0 && e.touches[0].touchType === 'stylus');
        let isWinStylus = (Date.now() - lastPenDownTime) < 100;
        
        if (isIOSStylus || isWinStylus) {{
            isStylusActive = true;
            e.stopPropagation();
            if (e.cancelable) e.preventDefault();
        }} else {{
            isStylusActive = false;
        }}
    }}, {{passive: false}});
    
    function blockStylusTouch(e) {{
        if (isDrawingMode && isStylusActive) {{
            e.stopPropagation();
            if (e.cancelable && e.type === 'touchmove') e.preventDefault();
        }}
    }}
    
    canvas.addEventListener('touchmove', blockStylusTouch, {{passive: false}});
    canvas.addEventListener('touchend', blockStylusTouch);
    canvas.addEventListener('touchcancel', blockStylusTouch);
    
    function blockMouse(e) {{
        if (isDrawingMode) e.stopPropagation();
    }}
    canvas.addEventListener('mousedown', blockMouse);
    canvas.addEventListener('mousemove', blockMouse);
    canvas.addEventListener('mouseup', blockMouse);
    canvas.addEventListener('click', blockMouse);
}}

// ==========================================
// 4. Toolbar Drag Logic
// ==========================================
document.addEventListener('DOMContentLoaded', () => {{
    const dragToolbar = document.getElementById('drawing-toolbar');
    if (!dragToolbar) return;

    let isDraggingTb = false;
    let tbStartX = 0, tbStartY = 0, tbInitX = 0, tbInitY = 0;

    function startDragTb(e) {{
        // 버튼 클릭 시에는 드래그 대신 버튼 기능 실행
        if (e.target.closest('button, input, select, textarea')) return;

        isDraggingTb = true;
        let clientX = e.clientX;
        let clientY = e.clientY;
        if (e.touches && e.touches.length > 0) {{
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }}
        tbStartX = clientX;
        tbStartY = clientY;
        const rect = dragToolbar.getBoundingClientRect();
        tbInitX = rect.left;
        tbInitY = rect.top;
        
        dragToolbar.style.setProperty('transform', 'none', 'important');
        dragToolbar.style.setProperty('bottom', 'auto', 'important');
        dragToolbar.style.setProperty('left', tbInitX + 'px', 'important');
        dragToolbar.style.setProperty('top', tbInitY + 'px', 'important');
        
        e.stopPropagation();
        if (e.cancelable) e.preventDefault();
    }}

    function moveDragTb(e) {{
        if (!isDraggingTb) return;
        let clientX = e.clientX;
        let clientY = e.clientY;
        if (e.touches && e.touches.length > 0) {{
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }}
        const dx = clientX - tbStartX;
        const dy = clientY - tbStartY;
        
        const rect = dragToolbar.getBoundingClientRect();
        let newLeft = Math.max(5, Math.min(window.innerWidth - rect.width - 5, tbInitX + dx));
        let newTop = Math.max(5, Math.min(window.innerHeight - rect.height - 5, tbInitY + dy));
        
        dragToolbar.style.setProperty('left', newLeft + 'px', 'important');
        dragToolbar.style.setProperty('top', newTop + 'px', 'important');
        
        e.stopPropagation();
        if (e.cancelable) e.preventDefault();
    }}

    function stopDragTb(e) {{
        if (isDraggingTb) {{
            isDraggingTb = false;
            if (e) {{
                try {{ e.stopPropagation(); }} catch(err){{}}
            }}
        }}
    }}

    dragToolbar.addEventListener('mousedown', startDragTb);
    window.addEventListener('mousemove', moveDragTb, {{passive: false}});
    window.addEventListener('mouseup', stopDragTb);
    
    dragToolbar.addEventListener('touchstart', startDragTb, {{passive: false}});
    window.addEventListener('touchmove', moveDragTb, {{passive: false}});
    window.addEventListener('touchend', stopDragTb);
    window.addEventListener('touchcancel', stopDragTb);
}});

// ==========================================
// ==========================================
// 5. Standard 1·2 Week Standardized Flipbook & Zoom Engine
// ==========================================
let pageFlip = null;
let currentZoom = 1.0;
let panX = 0;
let panY = 0;

function isPortraitMode() {{
    const w = window.innerWidth;
    const h = window.innerHeight;
    return (h > w) || (w < 900) || (h < 500);
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

    if (currentZoom <= 1.05) {{
        panX = 0;
        panY = 0;
    }}

    const scaleW = (winW * 0.95) / targetW;
    const scaleH = (winH * 0.95) / targetH;
    let baseScale = Math.min(scaleW, scaleH);
    let totalScale = baseScale * currentZoom;

    scaleWrapper.style.width = targetW + 'px';
    scaleWrapper.style.height = targetH + 'px';
    scaleWrapper.style.transform = 'translate(calc(-50% + ' + panX + 'px), calc(-50% + ' + panY + 'px)) scale(' + totalScale + ')';

    if (pageFlip) {{
        pageFlip.update();
    }}
}}

function zoomFlipbook(delta) {{
    currentZoom += delta;
    if (currentZoom < 0.6) currentZoom = 0.6;
    if (currentZoom > 3.5) currentZoom = 3.5;
    resizeFlipbook();
}}

function initFlipbookEngine() {{
    const fbElement = document.getElementById('flipbook');
    if (!fbElement || pageFlip) return;

    // Use strictly top-level page-wrappers from #main-content to guarantee exactly 41 pages without nested duplicate extraction
    const topWrappers = Array.from(document.querySelectorAll('#main-content > .page-wrapper'));

    fbElement.innerHTML = '';

    topWrappers.forEach(w => {{
        const a4Page = w.querySelector('.a4-page') || w.querySelector('.concept-page') || w.querySelector('.spread-page') || w.firstElementChild;
        if (!a4Page) return;

        const clone = a4Page.cloneNode(true);
        clone.style.boxShadow = "none";
        clone.style.margin = "0";
        if (clone.id) clone.id = clone.id + '-clone';

        // Preserve page-scope class from parent wrapper
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
        cvs.style.touchAction = 'pinch-zoom';
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

function setupViewerEvents() {{
    const scaleWrapper = document.getElementById('scale-wrapper');
    if (!scaleWrapper) return;

    let touchMode = null;
    let touchStartTime = 0;
    let startTouchX = 0, startTouchY = 0;
    let startPanX = 0, startPanY = 0;
    let initialPinchDist = 0;
    let zoomAtPinchStart = 1;

    function getDistance(t1, t2) {{
        const dx = t1.clientX - t2.clientX;
        const dy = t1.clientY - t2.clientY;
        return Math.hypot(dx, dy);
    }}

    scaleWrapper.addEventListener('touchstart', (e) => {{
        touchStartTime = Date.now();

        if (e.touches.length === 2) {{
            touchMode = 'pinch';
            initialPinchDist = getDistance(e.touches[0], e.touches[1]);
            zoomAtPinchStart = currentZoom;
        }} else if (e.touches.length === 1) {{
            touchMode = 'single';
            startTouchX = e.touches[0].clientX;
            startTouchY = e.touches[0].clientY;
            startPanX = panX;
            startPanY = panY;
        }}
    }}, {{ passive: false }});

    scaleWrapper.addEventListener('touchmove', (e) => {{
        if (e.touches.length === 2 && touchMode === 'pinch') {{
            e.preventDefault();
            const currentDist = getDistance(e.touches[0], e.touches[1]);
            if (initialPinchDist > 0) {{
                const ratio = currentDist / initialPinchDist;
                currentZoom = Math.min(Math.max(zoomAtPinchStart * ratio, 0.6), 3.5);
                resizeFlipbook();
            }}
        }} else if (e.touches.length === 1 && touchMode === 'single') {{
            const moveX = e.touches[0].clientX - startTouchX;
            const moveY = e.touches[0].clientY - startTouchY;
            const dist = Math.hypot(moveX, moveY);

            if (currentZoom > 1.1 || dist > 15) {{
                if (currentZoom > 1.1) {{
                    e.preventDefault();
                    panX = startPanX + moveX;
                    panY = startPanY + moveY;
                    resizeFlipbook();
                }}
            }}
        }}
    }}, {{ passive: false }});

    scaleWrapper.addEventListener('touchend', (e) => {{
        const touchDuration = Date.now() - touchStartTime;

        if (touchMode === 'single' && e.changedTouches.length === 1) {{
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const dist = Math.hypot(endX - startTouchX, endY - startTouchY);

            if (dist < 15 && touchDuration < 300 && pageFlip) {{
                const target = document.elementFromPoint(endX, endY);
                if (target && target.closest('.ox-btn, .blank, button, input, select, textarea, a, .zoom-btn, #close-flipbook-btn, #drawing-toolbar')) {{
                    touchMode = null;
                    return;
                }}
                const rect = scaleWrapper.getBoundingClientRect();
                const relativeX = endX - rect.left;

                if (relativeX < rect.width / 2) {{
                    pageFlip.flipPrev();
                }} else {{
                    pageFlip.flipNext();
                }}
                e.preventDefault();
            }}
        }}
        touchMode = null;
    }});

    let isMouseDown = false, mouseStartX = 0, mouseStartY = 0, mouseStartPanX = 0, mouseStartPanY = 0, isMouseDrag = false;

    scaleWrapper.addEventListener('mousedown', (e) => {{
        isMouseDown = true;
        isMouseDrag = false;
        mouseStartX = e.clientX;
        mouseStartY = e.clientY;
        mouseStartPanX = panX;
        mouseStartPanY = panY;
    }});

    window.addEventListener('mousemove', (e) => {{
        if (!isMouseDown) return;
        const moveX = e.clientX - mouseStartX;
        const moveY = e.clientY - mouseStartY;
        if (Math.hypot(moveX, moveY) > 5) {{
            isMouseDrag = true;
            if (currentZoom > 1.1) {{
                panX = mouseStartPanX + moveX;
                panY = mouseStartPanY + moveY;
                resizeFlipbook();
            }}
        }}
    }});

    window.addEventListener('mouseup', (e) => {{
        if (isMouseDown && !isMouseDrag && pageFlip) {{
            if (e.target.closest('.ox-btn, .blank, button, input, select, textarea, a, .zoom-btn, #close-flipbook-btn, #drawing-toolbar')) {{
                isMouseDown = false;
                return;
            }}
            const rect = scaleWrapper.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            if (relativeX < rect.width / 2) pageFlip.flipPrev();
            else pageFlip.flipNext();
        }}
        isMouseDown = false;
    }});

    window.addEventListener('resize', resizeFlipbook);
    window.addEventListener('orientationchange', resizeFlipbook);

    // Keyboard Arrow Keys
    window.addEventListener('keydown', (e) => {{
        if (!pageFlip) return;
        if (e.key === 'ArrowLeft' || e.key === 'PageUp') pageFlip.flipPrev();
        else if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') pageFlip.flipNext();
    }});
}}

window.toggleFlipbook = function() {{
    const fbContainer = document.getElementById('flipbook-container');
    if (!fbContainer) return;

    fbContainer.style.display = "flex";
    document.body.style.overflow = "hidden";

    if (!pageFlip) {{
        initFlipbookEngine();
        setupViewerEvents();
    }}

    currentZoom = 1.0;
    panX = 0;
    panY = 0;
    resizeFlipbook();
}};

document.addEventListener('DOMContentLoaded', () => {{
    window.toggleFlipbook();
}});
</script>
</body>
</html>"""

    with open(output_path, 'w', encoding='utf-8') as out_f:
        out_f.write(master_template)

    print(f"✓ 주간지 완성본 생성 완료! ({len(master_template):,} bytes)")
    return master_template

if __name__ == '__main__':
    w4_folder = r'G:\내 드라이브\주간지\4주차'
    w4_files = [
        'page01.html',
        'page03.html',
        'page04.html',
        'page05.html',
        'page06.html',
        'page07.html',
        'section01_prob.html',
        'section01_ans.html',
        'page08.html',
        'page09.html',
        'section02_prob.html',
        'section02_ans.html',
        'page10.html',
        'page11.html',
        'section05_prob.html',
        'section05_ans.html',
        'page12.html',
        'page13.html',
        'section06_prob.html',
        'section06_ans.html',
        'quiz_04.html'
    ]
    out_drive = r'G:\내 드라이브\주간지\4주차\week_2028_04_final.html'
    out_public = r'C:\Users\shko8\godtonggwa\public\STEST\weekly\ebook\week_2028_04_final.html'

    merge_week_perfect(w4_folder, w4_files, "04", out_drive)
    shutil.copy2(out_drive, out_public)
    print(f"✓ 복사 완료: {out_public}")
