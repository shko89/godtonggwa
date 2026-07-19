import os
import re

base_dir = 'g:/내 드라이브/주간지'
folders = [f"{i}주차" for i in range(3, 9)] + ["9회차", "10회차"]

# Generic / Keyword-based Content Generator
def get_content(title):
    # Default generic
    svg1 = '''<svg width="250" height="120" viewBox="0 0 250 120">
        <rect x="50" y="30" width="60" height="40" rx="4" fill="#f0f9ff" stroke="#0284c7" stroke-width="2"/>
        <rect x="150" y="30" width="60" height="40" rx="4" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
        <path d="M 120 50 L 140 50 M 135 45 L 140 50 L 135 55" fill="none" stroke="#64748b" stroke-width="2"/>
        <text x="80" y="55" font-size="12" font-weight="bold" text-anchor="middle" fill="#0284c7">핵심 원리</text>
        <text x="180" y="55" font-size="12" font-weight="bold" text-anchor="middle" fill="#dc2626">실전 응용</text>
        <text x="130" y="90" font-size="10" font-weight="bold" text-anchor="middle" fill="#64748b">개념 간의 유기적 연결 관계</text>
    </svg>'''
    
    exp1 = f"<strong>{title}</strong> 단원에서는 기본 개념을 정확히 숙지하고, 이를 바탕으로 다양한 실전 문제에 적용하는 능력이 요구됩니다. 제시된 모식도는 개념 간의 상호 작용을 직관적으로 보여주며, 복합적인 상황에서도 원리를 잃지 않고 답을 도출할 수 있는 기초를 제공합니다."
    
    memo_text1 = f"가장 자주 출제되는 <strong>{title}</strong>의 정의와 필수 구성 요소를 반드시 암기할 것! 모의고사에서 오답률이 높은 함정 선지에 대비해야 해."
    
    svg2 = '''<svg width="250" height="80" viewBox="0 0 250 80">
        <circle cx="60" cy="40" r="20" fill="#f8fafc" stroke="#334155" stroke-width="2" stroke-dasharray="4,4"/>
        <circle cx="125" cy="40" r="20" fill="#f8fafc" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4,4"/>
        <circle cx="190" cy="40" r="20" fill="#f8fafc" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4"/>
        <line x1="80" y1="40" x2="105" y2="40" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="145" y1="40" x2="170" y2="40" stroke="#cbd5e1" stroke-width="2"/>
        <text x="60" y="45" font-size="11" font-weight="bold" text-anchor="middle" fill="#334155">암기</text>
        <text x="125" y="45" font-size="11" font-weight="bold" text-anchor="middle" fill="#3b82f6">이해</text>
        <text x="190" y="45" font-size="11" font-weight="bold" text-anchor="middle" fill="#ef4444">적용</text>
    </svg>'''
    
    table_rows = f'''<tr><td>핵심 개념</td><td style="text-align: left; padding-left: 10px;">{title}의 정의 및 원리</td><td style="color:#b91c1c;">★★★★★</td></tr>
    <tr><td>출제 포인트</td><td style="text-align: left; padding-left: 10px;">자료(표/그래프) 해석 유형</td><td style="color:#b91c1c;">★★★★☆</td></tr>
    <tr><td>함정 주의</td><td style="text-align: left; padding-left: 10px;">단위 변환 및 예외 사례</td><td style="color:#b91c1c;">★★★☆☆</td></tr>'''

    # Pattern Matching
    if "결합" in title:
        svg1 = '''<svg width="250" height="120" viewBox="0 0 250 120">
            <circle cx="70" cy="50" r="30" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
            <text x="70" y="55" font-size="16" font-weight="bold" text-anchor="middle" fill="#1d4ed8">+</text>
            <circle cx="150" cy="50" r="30" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
            <text x="150" y="55" font-size="16" font-weight="bold" text-anchor="middle" fill="#dc2626">-</text>
            <path d="M 100 50 L 120 50 M 115 45 L 120 50 L 115 55" fill="none" stroke="#64748b" stroke-width="2"/>
            <text x="110" y="100" font-size="11" font-weight="bold" text-anchor="middle" fill="#64748b">정전기적 인력에 의한 결합 모식도</text>
        </svg>'''
        exp1 = "금속 원소와 비금속 원소가 만날 때는 전자를 주고받아 이온 결합을 형성하고, 비금속 원소끼리는 전자를 공유하여 공유 결합을 형성합니다. 옥텟 규칙을 만족하기 위한 원자들의 본능적인 전자 배치를 완벽히 이해해야 합니다."
        memo_text1 = "이온 결합 물질은 고체 상태에서 전기가 통하지 않지만 수용액 상태에서는 전류가 흐른다는 점이 핵심 함정 포인트야! 반드시 구분해서 암기해."
        table_rows = '''<tr><td>이온 결합</td><td style="text-align: left; padding-left: 10px;">금속(+) + 비금속(-)</td><td style="color:#b91c1c;">★★★★★</td></tr>
        <tr><td>공유 결합</td><td style="text-align: left; padding-left: 10px;">비금속 + 비금속 (전자쌍 공유)</td><td style="color:#b91c1c;">★★★★★</td></tr>
        <tr><td>전기 전도성</td><td style="text-align: left; padding-left: 10px;">이온(수용액 O), 공유(수용액 X)</td><td style="color:#b91c1c;">★★★★☆</td></tr>'''

    elif "순환" in title or "시스템" in title:
        svg1 = '''<svg width="250" height="120" viewBox="0 0 250 120">
            <circle cx="125" cy="50" r="40" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
            <path d="M 125 10 A 40 40 0 0 1 165 50" fill="none" stroke="#3b82f6" stroke-width="3" marker-end="url(#arr)"/>
            <path d="M 165 50 A 40 40 0 0 1 125 90" fill="none" stroke="#10b981" stroke-width="3" marker-end="url(#arr)"/>
            <path d="M 125 90 A 40 40 0 0 1 85 50" fill="none" stroke="#ef4444" stroke-width="3" marker-end="url(#arr)"/>
            <path d="M 85 50 A 40 40 0 0 1 125 10" fill="none" stroke="#f59e0b" stroke-width="3" marker-end="url(#arr)"/>
            <text x="125" y="55" font-size="12" font-weight="bold" text-anchor="middle" fill="#334155">에너지 흐름</text>
            <defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#334155" /></marker></defs>
        </svg>'''
        exp1 = "지구 시스템은 기권, 수권, 지권, 생물권, 외권이 끊임없이 에너지를 주고받으며 물질을 순환시키는 거대한 유기체입니다. 물의 순환과 탄소의 순환을 일으키는 근원 에너지가 무엇인지 파악하는 것이 중요합니다."
        memo_text1 = "물 순환의 근원 에너지는 태양 에너지! 탄소는 기권(이산화 탄소), 수권(탄산 이온), 지권(석회암)의 형태로 각 권역을 순환한다는 점을 형태별로 암기해."
        table_rows = '''<tr><td>물의 순환</td><td style="text-align: left; padding-left: 10px;">태양 에너지가 주된 동력</td><td style="color:#b91c1c;">★★★★☆</td></tr>
        <tr><td>탄소 순환</td><td style="text-align: left; padding-left: 10px;">가장 많은 탄소는 지권(석회암)에 존재</td><td style="color:#b91c1c;">★★★★★</td></tr>
        <tr><td>권역 상호작용</td><td style="text-align: left; padding-left: 10px;">화산재가 햇빛 차단 (지권->기권)</td><td style="color:#b91c1c;">★★★☆☆</td></tr>'''

    elif "운동" in title or "충격" in title or "충돌" in title:
        svg1 = '''<svg width="250" height="120" viewBox="0 0 250 120">
            <line x1="40" y1="100" x2="220" y2="100" stroke="#334155" stroke-width="2"/>
            <line x1="40" y1="100" x2="40" y2="20" stroke="#334155" stroke-width="2"/>
            <path d="M 60 100 Q 80 20 100 100" fill="rgba(239,68,68,0.3)" stroke="#ef4444" stroke-width="2"/>
            <path d="M 120 100 Q 170 40 200 100" fill="rgba(59,130,246,0.3)" stroke="#3b82f6" stroke-width="2"/>
            <text x="40" y="15" font-size="11" fill="#334155" font-weight="bold">힘(F)</text>
            <text x="225" y="105" font-size="11" fill="#334155" font-weight="bold">시간(t)</text>
            <text x="130" y="115" font-size="10" font-weight="bold" text-anchor="middle" fill="#64748b">힘-시간 그래프 (면적 = 충격량)</text>
        </svg>'''
        exp1 = "물체에 힘이 가해질 때, 충격량은 힘의 크기와 힘이 작용한 시간의 곱으로 결정됩니다. F-t 그래프에서 곡선 아래의 면적은 충격량을 의미하며, 충돌 시간이 길어질수록 평균 충격력이 줄어드는 원리가 에어백 등에 적용됩니다."
        memo_text1 = "동일한 달걀을 단단한 바닥과 푹신한 방석에 떨어뜨릴 때, '충격량'은 같지만 '충돌 시간'이 달라서 '평균 충격력'이 달라진다는 점이 핵심 함정이야!"
        table_rows = '''<tr><td>운동량 (p)</td><td style="text-align: left; padding-left: 10px;">질량(m) × 속도(v)</td><td style="color:#b91c1c;">★★★★☆</td></tr>
        <tr><td>충격량 (I)</td><td style="text-align: left; padding-left: 10px;">힘(F) × 시간(t) = 운동량의 변화량</td><td style="color:#b91c1c;">★★★★★</td></tr>
        <tr><td>안전 장치</td><td style="text-align: left; padding-left: 10px;">충돌 시간을 늘려 힘(F)을 감소</td><td style="color:#b91c1c;">★★★★★</td></tr>'''

    elif "산화" in title or "환원" in title or "중화" in title or "산과 염기" in title:
        svg1 = '''<svg width="250" height="120" viewBox="0 0 250 120">
            <rect x="50" y="40" width="40" height="40" fill="#fef2f2" stroke="#ef4444" stroke-width="2" rx="4"/>
            <text x="70" y="65" font-size="14" font-weight="bold" text-anchor="middle" fill="#dc2626">A</text>
            <rect x="150" y="40" width="40" height="40" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" rx="4"/>
            <text x="170" y="65" font-size="14" font-weight="bold" text-anchor="middle" fill="#1d4ed8">B</text>
            <path d="M 100 45 Q 120 20 140 45" fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#arr2)"/>
            <text x="120" y="30" font-size="11" font-weight="bold" text-anchor="middle" fill="#334155">전자 (e-)</text>
            <text x="120" y="100" font-size="10" font-weight="bold" text-anchor="middle" fill="#64748b">전자 이동에 의한 산화 환원 반응</text>
            <defs><marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" /></marker></defs>
        </svg>'''
        exp1 = "산화와 환원은 항상 동시에 일어납니다! 한 물질이 전자를 잃고 산화되면, 다른 물질은 반드시 그 전자를 얻어 환원됩니다. 화학 반응식에서 산소와 전자의 이동 경로를 추적하는 연습이 필수적입니다."
        memo_text1 = "전자를 잃으면 산화, 전자를 얻으면 환원! 철의 제련 과정과 광합성 화학식에서 누가 산화되고 환원되었는지 정확히 짝을 지어 암기해."
        table_rows = '''<tr><td>산화 (Oxidation)</td><td style="text-align: left; padding-left: 10px;">산소를 얻음 / 전자를 잃음</td><td style="color:#b91c1c;">★★★★★</td></tr>
        <tr><td>환원 (Reduction)</td><td style="text-align: left; padding-left: 10px;">산소를 잃음 / 전자를 얻음</td><td style="color:#b91c1c;">★★★★★</td></tr>
        <tr><td>동시성</td><td style="text-align: left; padding-left: 10px;">산화와 환원은 항상 동시에 발생</td><td style="color:#b91c1c;">★★★★☆</td></tr>'''

    return {
        "svg1": svg1,
        "exp1": exp1,
        "memo_text1": memo_text1,
        "svg2": svg2,
        "table_rows": table_rows
    }

html_template_left = """<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="../weekly_common.css">
    <style>
        body {{ background-color: #ffffff; }}
        .a4-page {{ width: 794px; height: 1123px; padding: 50px 60px; box-sizing: border-box; background-color: white; margin: 0 auto; position: relative; }}
        .page-wrapper {{ display: flex; justify-content: center; width: 100%; height: 100%; }}
        .concept-spread {{ display: flex; width: 100%; height: 100%; }}
        .concept-page {{ width: 100%; height: 100%; position: relative; padding: 10px; }}
        
        .data-header {{ border-bottom: 2px solid #0284c7; padding-bottom: 12px; margin-bottom: 25px; }}
        .section-label {{ font-family: 'Roboto'; font-weight: 900; font-size: 14px; color: #0284c7; margin-bottom: 5px; }}
        .data-title {{ font-size: 28px; font-weight: 900; color: #0f172a; margin: 0; letter-spacing: -1px; }}
        
        .info-box {{ margin-top: 30px; }}
        .info-box-title {{ font-size: 15px; font-weight: 900; color: #1e293b; margin-bottom: 15px; }}
        .svg-container {{ height: 200px; display: flex; justify-content: center; align-items: center; background: #f8fafc; border-radius: 12px; border: 1.5px dashed #cbd5e1; margin-bottom: 20px; }}
        
        .explanation-box {{ padding: 20px 25px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #cbd5e1; font-size: 13px; color: #334155; line-height: 1.6; text-align: justify; word-break: keep-all; }}
        .page-num {{ position: absolute; bottom: 0px; width: 100%; text-align: center; color: #64748b; font-weight: 700; font-size: 13px; }}
    </style>
</head>
<body>
<div class="a4-page">
<div class="page-wrapper">
<div class="concept-spread">
<div class="concept-page page-left">
    
    <div class="data-header">
        <div class="section-label">{section_label}</div>
        <h2 class="data-title">{title}</h2>
    </div>
    
    <div class="info-box">
        <div class="info-box-title">■ [자료 1] 챕터 핵심 개념 모식도</div>
        <div class="svg-container">
            {svg1}
        </div>
        <div class="explanation-box">
            {exp1}
        </div>
    </div>
    
    <div class="page-num">- {page_num_str} -</div>
</div>
</div>
</div>
</div>
</body>
</html>
"""

html_template_right = """<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="../weekly_common.css">
    <style>
        body {{ background-color: #ffffff; }}
        .a4-page {{ width: 794px; height: 1123px; padding: 50px 60px; box-sizing: border-box; background-color: white; margin: 0 auto; position: relative; }}
        .page-wrapper {{ display: flex; justify-content: center; width: 100%; height: 100%; }}
        .concept-spread {{ display: flex; width: 100%; height: 100%; }}
        .concept-page {{ width: 100%; height: 100%; position: relative; padding: 10px; }}
        
        .schema-title {{ font-size: 24px; font-weight: 900; color: #0f172a; margin-bottom: 25px; border-bottom: 2px solid #94a3b8; padding-bottom: 12px; }}
        
        .handwriting {{ background-color: #f8fafc; background-image: linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px); background-size: 20px 20px; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 20px 25px; margin-bottom: 25px; font-size: 15px; color: #334155; line-height: 1.7; font-weight: 600; text-align: justify; word-break: keep-all; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }}
        
        .svg-container {{ height: 140px; display: flex; justify-content: center; align-items: center; margin-bottom: 25px; background: #ffffff; border-radius: 8px; border: 1.5px dashed #cbd5e1; }}
        
        .hw-table {{ width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }}
        .hw-table th {{ background-color: #f1f5f9; padding: 12px; border: 1px solid #cbd5e1; font-weight: 900; color: #334155; text-align: center; }}
        .hw-table td {{ padding: 12px; border: 1px solid #cbd5e1; color: #475569; font-weight: 600; text-align: center; }}
        
        .page-num {{ position: absolute; bottom: 0px; width: 100%; text-align: center; color: #64748b; font-weight: 700; font-size: 13px; }}
    </style>
</head>
<body>
<div class="a4-page">
<div class="page-wrapper">
<div class="concept-spread">
<div class="concept-page page-right">
    
    <h3 class="schema-title">갓쌤의 실전 암기장 ✍️</h3>
    
    <div class="handwriting">
        <span style="color:#b91c1c; font-weight:900; font-size:16px;">1. 핵심 키워드 정리</span><br/>
        {memo_text1}
    </div>
    
    <div class="svg-container">
        {svg2}
    </div>
    
    <div class="handwriting" style="padding-bottom: 10px;">
        <span style="color:#b91c1c; font-weight:900; font-size:16px;">2. 필수 암기 포인트</span>
    </div>
    
    <table class="hw-table">
        <tr><th>구분</th><th>특징 (설명)</th><th>중요도</th></tr>
        {table_rows}
    </table>
    
    <div class="page-num">- {page_num_str} -</div>
</div>
</div>
</div>
</div>
</body>
</html>
"""

for folder_name in folders:
    folder_path = os.path.join(base_dir, folder_name)
    js_path = os.path.join(folder_path, "weekly_part1.js")
    
    if os.path.exists(js_path):
        with open(js_path, 'r', encoding='utf-8') as f:
            js_text = f.read()
            
        toc_start = js_text.find('toc:')
        toc_end = js_text.find('],', toc_start)
        if toc_start != -1 and toc_end != -1:
            toc_chunk = js_text[toc_start:toc_end]
            items = re.findall(r'{[^{}]+}', toc_chunk)
            
            valid_titles = []
            for item in items:
                m_title = re.search(r'title:\s*"([^"]*)"', item)
                if m_title:
                    t = m_title.group(1)
                    if "갓통과" not in t and "Fit 20" not in t:
                        valid_titles.append(t)
            
            # Start generating pages (page06, 07, 08 ...)
            for i, title in enumerate(valid_titles):
                section_idx = i + 1
                section_label = f"SECTION {section_idx:02d}"
                
                left_page_num = 2 * section_idx + 4
                right_page_num = 2 * section_idx + 5
                
                left_page_str = f"{left_page_num:02d}"
                right_page_str = f"{right_page_num:02d}"
                
                content = get_content(title)
                
                html_left = html_template_left.format(
                    section_label=section_label,
                    title=title,
                    svg1=content["svg1"],
                    exp1=content["exp1"],
                    page_num_str=left_page_str
                )
                
                html_right = html_template_right.format(
                    memo_text1=content["memo_text1"],
                    svg2=content["svg2"],
                    table_rows=content["table_rows"],
                    page_num_str=right_page_str
                )
                
                left_path = os.path.join(folder_path, f"page{left_page_str}.html")
                right_path = os.path.join(folder_path, f"page{right_page_str}.html")
                
                with open(left_path, 'w', encoding='utf-8') as f:
                    f.write(html_left)
                with open(right_path, 'w', encoding='utf-8') as f:
                    f.write(html_right)
                    
            print(f"Generated {len(valid_titles)*2} pages for {folder_name}")
