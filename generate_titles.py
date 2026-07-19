import os
import re

base_dir = 'g:/내 드라이브/주간지'
cover_template = """<div class="a4-page cover-page" id="cover-page">
<div class="top-section">
<div class="brand">GOTONGGWA</div>
<h1 class="title">갓통과<br/>WEEKLY</h1>
<div class="subtitle">2028 통합과학 완전 정복</div>
</div>
<div class="mid-section">
<svg style="width: 100%; height: 250px;" viewbox="0 0 300 200">
<line stroke="#475569" stroke-width="2" x1="30" x2="270" y1="170" y2="170"></line>
<line stroke="#475569" stroke-width="2" x1="30" x2="30" y1="170" y2="30"></line>
<polygon fill="#475569" points="270,166 278,170 270,174"></polygon>
<polygon fill="#475569" points="26,30 30,22 34,30"></polygon>
<!-- Data Points -->
<circle cx="50" cy="150" fill="#0284c7" r="4"></circle><circle cx="80" cy="130" fill="#0284c7" r="5"></circle>
<circle cx="110" cy="110" fill="#0284c7" r="6"></circle><circle cx="140" cy="90" fill="#0284c7" r="7"></circle>
<circle cx="170" cy="70" fill="#0284c7" r="6"></circle><circle cx="200" cy="50" fill="#0284c7" r="5"></circle>
<circle cx="230" cy="40" fill="#0284c7" r="4"></circle>
<circle cx="200" cy="130" fill="#94a3b8" opacity="0.6" r="10"></circle><circle cx="230" cy="140" fill="#94a3b8" opacity="0.6" r="8"></circle>
<circle cx="240" cy="110" fill="#94a3b8" opacity="0.6" r="12"></circle>
<circle cx="70" cy="50" fill="#475569" r="3"></circle><circle cx="90" cy="60" fill="#475569" r="3"></circle>
<circle cx="100" cy="40" fill="#475569" r="4"></circle>
</svg>
</div>
<div class="bottom-section">
<div class="week-num editable cover-week-val" contenteditable="true">{weekNum}</div>
<div class="week-theme">

<strong class="editable cover-theme-val" contenteditable="true" style="display:inline-block; min-width: 150px;">{coverKeywords}</strong><br/>

<span class="editable" contenteditable="true" style="display:inline-block; min-width: 150px; display:none;"></span><br/>

<span style="font-size:12px; color:#64748b; margin-top:5px; display:inline-block;">Data-driven Learning System</span>
</div>
</div>
</div>"""

html_page = """<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="../weekly_common.css">
</head>
<body>
""" + cover_template + """
</body>
</html>"""

for i in range(3, 11):
    folder_name = f"{i}주차"
    folder_path = os.path.join(base_dir, folder_name)
    js_path = os.path.join(folder_path, "weekly_part1.js")
    
    if os.path.exists(js_path):
        with open(js_path, 'r', encoding='utf-8') as f:
            js_text = f.read()
            
        match_week = re.search(r'weekNum:\s*"([^"]+)"', js_text)
        match_keys = re.search(r'coverKeywords:\s*"([^"]+)"', js_text)
        
        if match_week and match_keys:
            weekNum = match_week.group(1)
            coverKeywords = match_keys.group(1)
            
            final_html = html_page.replace("{weekNum}", weekNum).replace("{coverKeywords}", coverKeywords)
            
            title_path = os.path.join(folder_path, "title.html")
            with open(title_path, 'w', encoding='utf-8') as f:
                f.write(final_html)
            print(f"Created {title_path}")
        else:
            print(f"Failed to extract meta from {js_path}")
    else:
        print(f"JS not found: {js_path}")
