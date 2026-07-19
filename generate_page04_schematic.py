import os
import re

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
<div class="insight-box" style="margin-top: 30px;">
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

def build_schematic(theme, chapters):
    num = len(chapters)
    if num == 0: return ""
    
    MAP_WIDTH = 420
    spacing = MAP_WIDTH / num
    
    lines_html = ""
    # Main node
    nodes_html = f'''<div class="node main" style="top: 10px; left: 50%; transform: translateX(-50%); width: 220px;">
<div class="node-title" style="color: white;">{theme}</div>
<div class="node-desc" style="color: #cbd5e1;">이번 주차 핵심 개념 트리</div>
</div>'''

    for i, chap in enumerate(chapters):
        center_x = (i + 0.5) * spacing
        left = center_x - 50 # half of 100px width
        
        # SVG cubic bezier line
        lines_html += f'<path d="M 210 70 C 210 110, {center_x} 110, {center_x} 150" fill="none" stroke="#cbd5e1" stroke-width="2"></path>\n'
        
        nodes_html += f'''<div class="node leaf" style="top: 150px; left: {left}px; width: 100px;">
<div class="font-bold">{chap['title']}</div>
<div class="desc">{chap['desc']}</div>
</div>'''

    return f'''<div class="map-container" style="position: relative; height: 350px;">
<svg class="lines" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;" viewBox="0 0 420 350">
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
        match_goal = re.search(r'learningGoal:\s*"([^"]*)"', js_text)
        
        if match_week and match_theme and match_goal:
            weekNum = match_week.group(1)
            mainTheme = match_theme.group(1)
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
                        
            final_html += build_schematic(mainTheme, chapters)
            final_html += html_template_end.replace("{learningGoal}", learningGoal)
            
            out_path = os.path.join(folder_path, "page04.html")
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(final_html)
            print(f"Created {out_path} with schematic layout")
