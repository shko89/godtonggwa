import os
import re
import math

base_dir = 'g:/내 드라이브/주간지'

html_template_start = """<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="../weekly_common.css">
</head>
<body>
<div class="a4-page bridge-page" id="bridge-page">
<div class="page-header" style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; margin-bottom: 20px;">
<div class="header-brand" style="font-family: 'Roboto'; font-weight: 900; font-size: 13px; letter-spacing: 2px; color: #94a3b8;">GOTONGGWA WEEKLY</div>
<div class="header-vol editable toc-vol-val" contenteditable="true">VOL. {weekNum}</div>
</div>
<div>
<h2 class="bridge-title">CONCEPT BRIDGE</h2>
<div class="bridge-sub">단원의 큰 그림 그리기 : {mainTheme}</div>
</div>
"""

html_template_end = """
<div class="insight-box" style="margin-top: 20px;">
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<span style="background-color: #3b82f6; color: white; font-size: 12px; font-weight: 700; padding: 2px 8px; border-radius: 4px;">출제자의 시선</span>
<span style="font-weight: 700; font-size: 13px; color: #0f172a;">왜 이것을 배울까?</span>
</div>
<p class="editable" contenteditable="true" style="font-size: 10px; color: #334155; line-height: 1.5; margin: 0; text-align: justify; word-break: keep-all;">
    {learningGoal}
</p>
</div>
<div class="page-num">- 04 -</div>
</div>
</body>
</html>
"""

def split_keywords(keyword_str):
    kws = [k.strip() for k in keyword_str.split('<br>') if k.strip()]
    if len(kws) == 0:
        return "핵심 주제 1", "핵심 주제 2"
    elif len(kws) == 1:
        return kws[0], "심화 및 적용"
    elif len(kws) == 2:
        return kws[0], kws[1]
    else:
        return kws[0], " / ".join(kws[1:])

def get_leaf_layout(k, center_x):
    positions = []
    # returns list of (x, y)
    y1 = 190
    y2 = 290
    if k == 1:
        positions.append((center_x, y1))
    elif k == 2:
        positions.append((center_x - 55, y1))
        positions.append((center_x + 55, y1))
    elif k == 3:
        positions.append((center_x - 55, y1))
        positions.append((center_x + 55, y1))
        positions.append((center_x, y2))
    elif k >= 4:
        positions.append((center_x - 55, y1))
        positions.append((center_x + 55, y1))
        positions.append((center_x - 55, y2))
        positions.append((center_x + 55, y2))
    return positions

def build_schematic(theme, keywords_str, chapters):
    if len(chapters) == 0: return ""
    
    sub1_title, sub2_title = split_keywords(keywords_str)
    
    # Split chapters
    mid = math.ceil(len(chapters) / 2)
    chaps1 = chapters[:mid]
    chaps2 = chapters[mid:]
    
    lines_html = ""
    # Lines to subs
    lines_html += '<path d="M 210 50 C 210 70, 100 70, 100 90" fill="none" stroke="#cbd5e1" stroke-width="2"></path>\n'
    lines_html += '<path d="M 210 50 C 210 70, 320 70, 320 90" fill="none" stroke="#cbd5e1" stroke-width="2"></path>\n'
    
    nodes_html = f'''<div class="node main" style="top: 10px; left: 50%; transform: translateX(-50%); width: 220px;">
<div class="node-title" style="color: white;">{theme}</div>
<div class="node-desc" style="color: #cbd5e1;">단원의 전체 흐름도</div>
</div>'''

    nodes_html += f'''<div class="node sub" style="top: 90px; left: 0px; width: 200px;">
<div class="node-title">{sub1_title}</div>
<div class="node-desc">전반부 핵심 개념</div>
</div>'''

    nodes_html += f'''<div class="node sub" style="top: 90px; left: 220px; width: 200px;">
<div class="node-title">{sub2_title}</div>
<div class="node-desc">후반부 핵심 개념</div>
</div>'''

    # Leaves for sub 1
    pos1 = get_leaf_layout(len(chaps1), 100)
    for i, chap in enumerate(chaps1):
        x, y = pos1[i]
        # Line from (100, 150) to (x, y)
        if y == 190:
            lines_html += f'<path d="M 100 150 C 100 170, {x} 170, {x} 190" fill="none" stroke="#e2e8f0" stroke-dasharray="4,4" stroke-width="2"></path>\n'
        else:
            lines_html += f'<path d="M 100 150 C 100 {y-20}, {x} {y-20}, {x} {y}" fill="none" stroke="#e2e8f0" stroke-dasharray="4,4" stroke-width="2"></path>\n'
            
        left = x - 50
        nodes_html += f'''<div class="node leaf" style="top: {y}px; left: {left}px; width: 100px;">
<div class="font-bold">{chap['title']}</div>
<div class="desc">{chap['desc']}</div>
</div>'''

    # Leaves for sub 2
    pos2 = get_leaf_layout(len(chaps2), 320)
    for i, chap in enumerate(chaps2):
        x, y = pos2[i]
        if y == 190:
            lines_html += f'<path d="M 320 150 C 320 170, {x} 170, {x} 190" fill="none" stroke="#e2e8f0" stroke-dasharray="4,4" stroke-width="2"></path>\n'
        else:
            lines_html += f'<path d="M 320 150 C 320 {y-20}, {x} {y-20}, {x} {y}" fill="none" stroke="#e2e8f0" stroke-dasharray="4,4" stroke-width="2"></path>\n'
            
        left = x - 50
        nodes_html += f'''<div class="node leaf" style="top: {y}px; left: {left}px; width: 100px;">
<div class="font-bold">{chap['title']}</div>
<div class="desc">{chap['desc']}</div>
</div>'''

    return f'''<div class="map-container" style="position: relative; height: 380px;">
<svg class="lines" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;" viewBox="0 0 420 380">
{lines_html}
</svg>
{nodes_html}
</div>'''

folders = [f"{i}주차" for i in range(3, 9)] + ["9회차", "10회차"]

for folder_name in folders:
    folder_path = os.path.join(base_dir, folder_name)
    js_path = os.path.join(folder_path, "weekly_part1.js")
    
    if os.path.exists(js_path):
        with open(js_path, 'r', encoding='utf-8') as f:
            js_text = f.read()
            
        match_week = re.search(r'weekNum:\s*"([^"]*)"', js_text)
        match_theme = re.search(r'mainTheme:\s*"([^"]*)"', js_text)
        match_kw = re.search(r'coverKeywords:\s*"([^"]*)"', js_text)
        match_goal = re.search(r'learningGoal:\s*"([^"]*)"', js_text)
        
        if match_week and match_theme and match_kw and match_goal:
            weekNum = match_week.group(1)
            mainTheme = match_theme.group(1)
            keywords_str = match_kw.group(1)
            learningGoal = match_goal.group(1)
            
            final_html = html_template_start.replace("{weekNum}", weekNum).replace("{mainTheme}", mainTheme)
            
            chapters = []
            toc_start = js_text.find('toc:')
            toc_end = js_text.find('],', toc_start)
            if toc_start != -1 and toc_end != -1:
                toc_chunk = js_text[toc_start:toc_end]
                items = re.findall(r'{[^{}]+}', toc_chunk)
                for item in items:
                    m_title = re.search(r'title:\s*"([^"]*)"', item)
                    m_desc = re.search(r'desc:\s*"([^"]*)"', item)
                    
                    if m_title and "Fit 20" not in m_title.group(1):
                        title = m_title.group(1)
                        desc = m_desc.group(1) if m_desc else ""
                        if not desc.strip():
                            desc = f"{title}의 핵심 원리 학습"
                        chapters.append({'title': title, 'desc': desc})
                        
            final_html += build_schematic(mainTheme, keywords_str, chapters)
            final_html += html_template_end.replace("{learningGoal}", learningGoal)
            
            out_path = os.path.join(folder_path, "page04.html")
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(final_html)
            print(f"Created {out_path} with accurate original schematic")
