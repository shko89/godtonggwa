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
<div class="a4-page bridge-page" id="bridge-page" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #f8fafc; padding: 40px; position: relative; overflow: hidden;">
    <!-- Abstract glowing circles in background for premium feel -->
    <div style="position: absolute; top: -50px; left: -50px; width: 200px; height: 200px; background: #0ea5e9; filter: blur(100px); opacity: 0.3; border-radius: 50%;"></div>
    <div style="position: absolute; bottom: 100px; right: -50px; width: 250px; height: 250px; background: #8b5cf6; filter: blur(120px); opacity: 0.2; border-radius: 50%;"></div>

    <!-- Header -->
    <div style="border-bottom: 2px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 40px; position: relative; z-index: 10;">
        <div style="font-family: 'Roboto'; font-weight: 900; font-size: 14px; letter-spacing: 3px; color: #38bdf8;">GODTONGGWA WEEKLY</div>
        <h2 style="font-size: 32px; font-weight: 900; margin: 10px 0 5px 0; color: #ffffff;">CONCEPT BRIDGE</h2>
        <div style="font-size: 16px; color: #94a3b8; font-weight: 700;">WEEK {weekNum}. <span style="color: #f8fafc;">{mainTheme}</span></div>
    </div>

    <!-- Timeline Container -->
    <div style="position: relative; margin-left: 10px; z-index: 10;">
        <!-- Vertical Line -->
        <div style="position: absolute; top: 15px; bottom: 30px; left: 10px; width: 2px; background: linear-gradient(to bottom, #38bdf8, #8b5cf6); opacity: 0.6;"></div>
"""

timeline_item_template = """
        <div style="position: relative; margin-bottom: 30px; display: flex; align-items: flex-start; gap: 20px;">
            <div style="flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%; background: #0f172a; border: 3px solid #38bdf8; position: relative; z-index: 2; margin-top: 0px; box-shadow: 0 0 10px rgba(56, 189, 248, 0.5);"></div>
            <div style="padding-top: 0px;">
                <div style="font-family: 'Roboto'; font-size: 11px; font-weight: 900; color: #8b5cf6; margin-bottom: 4px;">CHAPTER {num}</div>
                <div class="editable" contenteditable="true" style="font-size: 15px; font-weight: 800; color: #ffffff; margin-bottom: 5px;">{title}</div>
                <div class="editable" contenteditable="true" style="font-size: 11px; color: #cbd5e1; line-height: 1.5; text-align: justify; word-break: keep-all;">{desc}</div>
            </div>
        </div>
"""

html_template_end = """
    </div>
    
    <!-- Footer quote or note -->
    <div style="position: absolute; bottom: 40px; left: 40px; right: 40px; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; border-left: 4px solid #38bdf8; backdrop-filter: blur(4px); z-index: 10;">
        <div style="font-size: 11px; font-weight: 700; color: #38bdf8; margin-bottom: 6px;">🎯 핵심 관통 포인트</div>
        <p style="font-size: 10px; color: #e2e8f0; margin: 0; line-height: 1.6; text-align: justify; word-break: keep-all;">
            이 단원에서 배우는 각 개념들은 독립적이지 않으며 하나의 스토리로 긴밀하게 연결되어 있습니다. 위 흐름도를 따라가며 전체적인 <strong>큰 그림(Big Picture)</strong>을 먼저 머릿속에 그린 뒤 세부 개념을 학습해 보세요. 유기적인 연결고리를 이해하는 것이 고득점의 열쇠입니다.
        </p>
    </div>
    
    <div class="page-num" style="color: rgba(255,255,255,0.4); bottom: 15px; right: 20px; position: absolute; font-size: 10px; font-family: 'Roboto'; font-weight: 700;">- 04 -</div>
</div>
</body>
</html>
"""

folders = [f"{i}주차" for i in range(3, 9)] + ["9회차", "10회차"]

for folder_name in folders:
    folder_path = os.path.join(base_dir, folder_name)
    js_path = os.path.join(folder_path, "weekly_part1.js")
    
    if os.path.exists(js_path):
        with open(js_path, 'r', encoding='utf-8') as f:
            js_text = f.read()
            
        match_week = re.search(r'weekNum:\s*"([^"]*)"', js_text)
        match_theme = re.search(r'mainTheme:\s*"([^"]*)"', js_text)
        
        if match_week and match_theme:
            weekNum = match_week.group(1)
            mainTheme = match_theme.group(1)
            
            final_html = html_template_start.replace("{weekNum}", weekNum).replace("{mainTheme}", mainTheme)
            
            # Extract toc array
            toc_start = js_text.find('toc:')
            toc_end = js_text.find('],', toc_start)
            if toc_start != -1 and toc_end != -1:
                toc_chunk = js_text[toc_start:toc_end]
                items = re.findall(r'{[^{}]+}', toc_chunk)
                for item in items:
                    m_num = re.search(r'num:\s*"([^"]*)"', item)
                    m_title = re.search(r'title:\s*"([^"]*)"', item)
                    m_desc = re.search(r'desc:\s*"([^"]*)"', item)
                    
                    # Ignore Fit 20 mock exam as a concept bridge item
                    if m_title and "Fit 20" in m_title.group(1):
                        continue
                        
                    if m_num and m_title:
                        num = m_num.group(1)
                        title = m_title.group(1)
                        desc = m_desc.group(1) if m_desc else "본 개념의 세부 내용을 학습합니다."
                        if not desc.strip():
                            desc = f"{title}의 핵심 원리와 필수 출제 포인트를 완벽하게 체화합니다."
                            
                        final_html += timeline_item_template.replace("{num}", num) \
                                                          .replace("{title}", title) \
                                                          .replace("{desc}", desc)
                                                          
            final_html += html_template_end
            
            out_path = os.path.join(folder_path, "page04.html")
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(final_html)
            print(f"Created {out_path}")
        else:
            print(f"Failed to extract meta from {js_path}")
    else:
        print(f"JS not found: {js_path}")
