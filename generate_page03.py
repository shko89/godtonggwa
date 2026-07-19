import os
import re

base_dir = 'g:/내 드라이브/주간지'

toc_template_start = """<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="../weekly_common.css">
</head>
<body>
<div class="a4-page toc-page" id="toc-page">
<div class="page-header">
<div class="header-brand">GOTONGGWA WEEKLY</div>
<div class="header-vol editable toc-vol-val" contenteditable="true">VOL. {weekNum}</div>
</div>
<div class="title-section">
<h2 class="index-title">INDEX</h2>
<div class="week-sub editable toc-theme-val" contenteditable="true">WEEK {weekNum}. {mainTheme}</div>
</div>
<!-- New Intro Section -->
<div class="intro-section" style="background-color: #f0f9ff; border-left: 4px solid #0284c7; padding: 10px 15px; border-radius: 4px; margin-bottom: 15px;">
<h3 style="font-size: 12px; font-weight: 900; color: #0284c7; margin: 0 0 4px 0;">WEEK {weekNum} 학습 목표 &amp; 출제 포인트</h3>
<p class="editable" contenteditable="true" style="font-size: 10px; color: #334155; margin: 0; line-height: 1.5; font-weight: 500; text-align: justify; word-break: keep-all;">
                    {learningGoal}
                </p>
</div>
<div class="toc-list">
"""

toc_item_template = """<div class="toc-item">
<div class="item-left">
<div class="item-num">{num}</div>
<div class="item-text">
<h3 class="editable" contenteditable="true">{title}</h3>
<p class="editable" contenteditable="true">{desc}</p>
</div>
</div>
<div class="dots"></div>
<div class="item-page editable" contenteditable="true">{page}</div>
</div>
"""

toc_template_end = """</div>
<br/>
<div class="system-guide">
<div class="guide-title"><span>⚡</span> GODTONGGWA 100% 활용 가이드</div>
<p class="guide-desc editable" contenteditable="true" style="text-align: justify; word-break: keep-all;">
                    본 주간지는 단순 문제집이 아닙니다. 모의고사 풀이 후 하단의 <strong>QR코드</strong>를 갓통과 앱에 입력하세요. 약점 분석 시스템이 취약 행동 영역을 실시간으로 분석하여 <strong>개별 맞춤형 성적 리포트</strong>를 제공합니다.
                </p>
</div>
<div class="page-num">- 03 -</div>
</div>
</body>
</html>
"""

folders = [f"{i}주차" for i in range(4, 9)] + ["9회차", "10회차"]

for folder_name in folders:
    folder_path = os.path.join(base_dir, folder_name)
    js_path = os.path.join(folder_path, "weekly_part1.js")
    
    if os.path.exists(js_path):
        with open(js_path, 'r', encoding='utf-8') as f:
            js_text = f.read()
            
        # extract meta
        match_week = re.search(r'weekNum:\s*"([^"]*)"', js_text)
        match_theme = re.search(r'mainTheme:\s*"([^"]*)"', js_text)
        match_goal = re.search(r'learningGoal:\s*"([^"]*)"', js_text)
        
        if match_week and match_theme and match_goal:
            weekNum = match_week.group(1)
            mainTheme = match_theme.group(1)
            learningGoal = match_goal.group(1)
            
            # Start building HTML
            final_html = toc_template_start.replace("{weekNum}", weekNum).replace("{mainTheme}", mainTheme).replace("{learningGoal}", learningGoal)
            
            # Extract toc array
            toc_start = js_text.find('toc:')
            toc_end = js_text.find('],', toc_start)
            if toc_start != -1 and toc_end != -1:
                toc_chunk = js_text[toc_start:toc_end]
                # find all objects
                items = re.findall(r'{[^{}]+}', toc_chunk)
                for item in items:
                    m_num = re.search(r'num:\s*"([^"]*)"', item)
                    m_title = re.search(r'title:\s*"([^"]*)"', item)
                    m_desc = re.search(r'desc:\s*"([^"]*)"', item)
                    m_page = re.search(r'page:\s*"([^"]*)"', item)
                    
                    if m_num and m_title and m_page:
                        final_html += toc_item_template.replace("{num}", m_num.group(1)) \
                                                      .replace("{title}", m_title.group(1)) \
                                                      .replace("{desc}", m_desc.group(1) if m_desc else "") \
                                                      .replace("{page}", m_page.group(1))
                                                      
            final_html += toc_template_end
            
            out_path = os.path.join(folder_path, "page03.html")
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(final_html)
            print(f"Created {out_path}")
        else:
            print(f"Failed to extract meta from {js_path}")
    else:
        print(f"JS not found: {js_path}")
