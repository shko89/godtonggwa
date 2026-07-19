import os
import re
import math

base_dir = 'g:/내 드라이브/주간지'
folders = [f"{i}주차" for i in range(3, 9)] + ["9회차", "10회차"]

theme_desc_dict = {
    "물질의 규칙성과 결합": "화학 결합부터 지각과 생명체의 규칙성까지",
    "지구 시스템 Ⅰ": "지구 시스템의 구성부터 역동적인 지각 변동까지",
    "지구 시스템 Ⅱ": "생태계를 움직이는 역학 법칙과 생명체의 기초",
    "변화와 다양성 Ⅰ": "오랜 시간 진화해 온 생물과 환경의 상호작용",
    "변화와 다양성 Ⅱ": "물질의 변화를 이끄는 핵심 화학 반응의 이해",
    "생태계와 환경 변화": "생물과 환경의 유기적 관계와 지구 환경 보전",
    "에너지 전환과 활용": "다양한 에너지의 전환 과정과 인류의 미래",
    "과학과 미래 사회": "첨단 과학 기술이 이끄는 현대 사회의 변화 양상"
}

subs_dict = {
    "물질의 규칙성과 결합": [
        ("화학 결합의 원리", "전자를 주고받거나 공유하는 과정"),
        ("주변의 다양한 물질", "지각, 생명체, 그리고 신소재까지")
    ],
    "지구 시스템 Ⅰ": [
        ("지구 시스템과 상호 작용", "각 권역의 물질 순환과 에너지 흐름"),
        ("판 구조론과 중력장", "지각 변동의 원리와 생명체를 보호하는 힘")
    ],
    "지구 시스템 Ⅱ": [
        ("역학적 시스템과 안전", "물체의 충돌과 충격량을 줄이는 원리"),
        ("생명 시스템의 유지", "세포의 구조부터 단백질 합성까지")
    ],
    "변화와 다양성 Ⅰ": [
        ("지질 시대와 환경 변화", "화석으로 풀어내는 지구의 장엄한 역사"),
        ("생물 다양성과 진화", "자연선택과 생물이 환경에 적응하는 방식")
    ],
    "변화와 다양성 Ⅱ": [
        ("전자의 이동: 산화와 환원", "산소를 얻고 잃거나 전자가 이동하는 반응"),
        ("이온의 결합: 산 염기와 중화", "수소 이온과 수산화 이온의 만남과 중화열")
    ],
    "생태계와 환경 변화": [
        ("생태계의 평형과 유지", "생물과 환경의 상호작용 및 먹이 사설"),
        ("지구 환경 변화와 대응", "기후 변화, 엘니뇨, 그리고 사막화 현상")
    ],
    "에너지 전환과 활용": [
        ("에너지의 전환과 보존", "다양한 형태의 에너지 변환 및 효율성"),
        ("발전과 전력 수송", "전기 에너지의 생산과 안전한 수송 원리")
    ],
    "과학과 미래 사회": [
        ("첨단 과학과 생명", "질병의 진단과 빅데이터, 인공지능의 융합"),
        ("미래 기술과 윤리", "로봇, 신소재 기술 발전과 과학적 쟁점")
    ]
}

def get_desc(title):
    mapping = {
        "이온 결합": "금속과 비금속의 만남. 필수 출제!",
        "공유 결합": "비금속 원소들이 전자를 공유하는 결합",
        "지각을 구성하는 물질": "Si-O 사면체 기본 골격과 쪼개짐 규칙",
        "규산염 광물": "Si-O 사면체 기본 골격과 쪼개짐 규칙",
        "단백질과 핵산": "단위체의 끝없는 연결 구조",
        "물질의 전기적 성질": "에너지 띠 간격에 따른 전기 전도성 차이 이해",
        "지구 시스템의 구성요소": "지권, 수권, 기권, 생물권, 외권의 특징",
        "물질 순환과 에너지 흐름": "물과 탄소의 순환, 태양 에너지의 역할",
        "판구조론과 지각 변동": "판 경계의 종류와 화산, 지진 활동",
        "중력장 내의 운동": "자유 낙하와 포물선 운동의 역학적 분석",
        "충격량과 운동량": "힘과 시간에 따른 물체의 운동 상태 변화",
        "충돌과 안전장치": "일상생활과 자동차에 적용된 충격 흡수 원리",
        "생명 시스템의 기본 단위": "세포 소기관의 역할과 유기적 상호작용",
        "물질대사": "효소가 관여하는 생체 내 화학 반응",
        "유전자와 단백질": "DNA의 유전 정보가 번역되는 과정",
        "지질시대의 생물과 화석": "표준 화석과 시상 화석으로 과거 환경 유추",
        "지질시대 환경 변화와 대멸종": "급격한 환경 변화와 생물계의 위기 및 도약",
        "변이의 발생과 자연선택": "다윈의 진화론과 생존 경쟁에 의한 진화",
        "진화와 생물다양성": "유전적, 종, 생태계 다양성과 보전의 중요성",
        "산화와 환원": "광합성, 철의 제련 등 일상 속 산화 환원",
        "산과 염기": "이온화 특성과 지시약의 색 변화",
        "중화 반응": "산과 염기가 만나 물과 염을 생성하는 과정",
        "에너지 출입": "발열 반응과 흡열 반응의 활용",
        "감염병의 진단과 추적": "항원-항체 반응과 감염병 확산 방지 원리",
        "빅데이터의 활용": "데이터 기반 예측의 가치와 정보 보호",
        "인공지능, 로봇, 사물 인터넷": "미래 산업을 이끄는 초연결 융합 기술",
        "과학 윤리": "기술 발전이 가져오는 윤리적 딜레마"
    }
    for k, v in mapping.items():
        if k in title:
            return v
    return "해당 단원의 핵심 원리와 필수 출제 포인트"

html_template_start = """<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="../weekly_common.css">
    <style>
        .bridge-sub {
            font-size: 14px;
            font-weight: 700;
            color: #334155;
            margin-top: 5px;
        }
        .node.main {
            top: 10px; left: 50%; transform: translateX(-50%); width: 260px;
            background-color: #0f172a; border-radius: 8px; padding: 12px;
            text-align: center; position: absolute; z-index: 10;
        }
        .node.main .node-title { color: #ffffff; font-size: 14px; font-weight: 900; margin-bottom: 4px; }
        .node.main .node-desc { color: #94a3b8; font-size: 10.5px; }
        
        .node.sub {
            top: 100px; width: 190px;
            background-color: #ffffff; border: 2px solid #0ea5e9; border-radius: 8px; padding: 10px;
            text-align: center; position: absolute; z-index: 10;
        }
        .node.sub .node-title { color: #1d4ed8; font-size: 13px; font-weight: 900; margin-bottom: 4px; }
        .node.sub .node-desc { color: #64748b; font-size: 10px; }
        
        .node.leaf {
            top: 200px; width: 110px;
            background-color: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 8px;
            text-align: center; position: absolute; z-index: 10;
        }
        .node.leaf .font-bold { color: #0f172a; font-size: 11px; font-weight: 900; margin-bottom: 5px; line-height: 1.2; word-break: keep-all; }
        .node.leaf .desc { color: #64748b; font-size: 9px; line-height: 1.35; word-break: keep-all; }
        
        .node.leaf.red { border-color: #fca5a5; background-color: #fef2f2; }
        .node.leaf.red .font-bold { color: #dc2626; }
    </style>
</head>
<body>
<div class="a4-page bridge-page" id="bridge-page">
<div class="page-header" style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; margin-bottom: 20px;">
<div class="header-brand" style="font-family: 'Roboto'; font-weight: 900; font-size: 13px; letter-spacing: 2px; color: #94a3b8;">GOTONGGWA WEEKLY</div>
<div class="header-vol editable toc-vol-val" contenteditable="true">VOL. {weekNum}</div>
</div>
<div>
<h2 class="bridge-title" style="font-size: 36px; font-weight: 900; color: #0284c7; margin: 0; letter-spacing: -1px;">CONCEPT BRIDGE</h2>
<div class="bridge-sub">단원의 큰 그림 그리기 : {theme_desc}</div>
</div>
"""

html_template_end = """
<div class="insight-box" style="margin-top: 30px; background-color: #0f172a; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
<span style="background-color: #3b82f6; color: white; font-size: 12px; font-weight: 700; padding: 3px 8px; border-radius: 4px;">출제자의 시선</span>
<span style="font-weight: 700; font-size: 14px; color: #ffffff;">왜 이것을 배울까?</span>
</div>
<p class="editable" contenteditable="true" style="font-size: 10px; color: #cbd5e1; line-height: 1.5; margin: 0; text-align: justify; word-break: keep-all;">
    {learningGoal}
</p>
</div>
<div class="page-num" style="text-align: center; color: #64748b; font-weight: 700; margin-top: 15px; font-size: 12px;">- 04 -</div>
</div>
</body>
</html>
"""

def build_schematic(theme, chapters):
    if len(chapters) == 0: return ""
    
    sub1_title, sub1_desc = subs_dict.get(theme, [("전반부 핵심 개념", "전반부 학습 내용"), ("후반부 핵심 개념", "후반부 학습 내용")])[0]
    sub2_title, sub2_desc = subs_dict.get(theme, [("전반부 핵심 개념", "전반부 학습 내용"), ("후반부 핵심 개념", "후반부 학습 내용")])[1]
    
    mid = math.ceil(len(chapters) / 2)
    
    # Check if the user merged "이온결합" and "공유결합" into "이온과 공유 결합"
    chap_titles = [c['title'] for c in chapters]
    
    if theme == "물질의 규칙성과 결합":
        chaps1 = chapters[:2]
        chaps2 = chapters[2:]
        if len(chapters) >= 5 and "이온 결합" in chapters[0]['title']:
            # Assume 2 for sub1, 3 for sub2
            chaps1 = chapters[:2]
            chaps2 = chapters[2:]
    else:
        chaps1 = chapters[:mid]
        chaps2 = chapters[mid:]
    
    lines_html = ""
    lines_html += '<path d="M 210 70 C 210 90, 105 80, 105 100" fill="none" stroke="#cbd5e1" stroke-width="2"></path>\n'
    lines_html += '<path d="M 210 70 C 210 90, 315 80, 315 100" fill="none" stroke="#cbd5e1" stroke-width="2"></path>\n'
    
    nodes_html = f'''<div class="node main">
<div class="node-title">{theme}</div>
<div class="node-desc">원소들이 모여 만드는 정교한 시스템</div>
</div>'''

    nodes_html += f'''<div class="node sub" style="left: 10px;">
<div class="node-title">{sub1_title}</div>
<div class="node-desc">{sub1_desc}</div>
</div>'''

    nodes_html += f'''<div class="node sub" style="left: 220px;">
<div class="node-title">{sub2_title}</div>
<div class="node-desc">{sub2_desc}</div>
</div>'''

    def get_leaf_layout(k, center_x):
        positions = []
        y1 = 200
        y2 = 310
        w = 110
        gap = 10
        if k == 1:
            positions.append((center_x, y1))
        elif k == 2:
            positions.append((center_x - (w/2 + gap/2), y1))
            positions.append((center_x + (w/2 + gap/2), y1))
        elif k == 3:
            positions.append((center_x - (w/2 + gap/2), y1))
            positions.append((center_x + (w/2 + gap/2), y1))
            positions.append((center_x, y2))
        elif k >= 4:
            positions.append((center_x - (w/2 + gap/2), y1))
            positions.append((center_x + (w/2 + gap/2), y1))
            positions.append((center_x - (w/2 + gap/2), y2))
            positions.append((center_x + (w/2 + gap/2), y2))
        return positions

    pos1 = get_leaf_layout(len(chaps1), 105)
    for i, chap in enumerate(chaps1):
        x, y = pos1[i]
        if y == 200:
            lines_html += f'<path d="M 105 160 C 105 180, {x} 180, {x} 200" fill="none" stroke="#e2e8f0" stroke-dasharray="4,4" stroke-width="2"></path>\n'
        else:
            lines_html += f'<path d="M 105 160 L 105 {y-10}" fill="none" stroke="#e2e8f0" stroke-dasharray="4,4" stroke-width="2"></path>\n'
            
        left = x - 55
        c_title = chap['title']
        c_desc = get_desc(c_title)
        
        red_class = " red" if "이온과 공유" in c_title or "결합" in c_title and "필수 출제" in c_desc else ""
        if "필수 출제" in c_desc and "🚨" not in c_title:
            title_html = f"🚨 {c_title}"
            red_class = " red"
        else:
            title_html = c_title
            
        nodes_html += f'''<div class="node leaf{red_class}" style="top: {y}px; left: {left}px;">
<div class="font-bold">{title_html}</div>
<div class="desc">{c_desc}</div>
</div>'''

    pos2 = get_leaf_layout(len(chaps2), 315)
    for i, chap in enumerate(chaps2):
        x, y = pos2[i]
        if y == 200:
            lines_html += f'<path d="M 315 160 C 315 180, {x} 180, {x} 200" fill="none" stroke="#e2e8f0" stroke-dasharray="4,4" stroke-width="2"></path>\n'
        else:
            lines_html += f'<path d="M 315 160 L 315 {y-10}" fill="none" stroke="#e2e8f0" stroke-dasharray="4,4" stroke-width="2"></path>\n'
            
        left = x - 55
        c_title = chap['title']
        c_desc = get_desc(c_title)
        
        red_class = " red" if "필수 출제" in c_desc else ""
        if "필수 출제" in c_desc and "🚨" not in c_title:
            title_html = f"🚨 {c_title}"
            red_class = " red"
        else:
            title_html = c_title
            
        nodes_html += f'''<div class="node leaf{red_class}" style="top: {y}px; left: {left}px;">
<div class="font-bold">{title_html}</div>
<div class="desc">{c_desc}</div>
</div>'''

    return f'''<div class="map-container" style="position: relative; height: 430px; margin-top: 15px;">
<svg class="lines" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;" viewBox="0 0 420 430">
{lines_html}
</svg>
{nodes_html}
</div>'''

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
            
            theme_desc = theme_desc_dict.get(mainTheme, "단원의 기초부터 심화까지 한눈에 파악하기")
            
            final_html = html_template_start.replace("{weekNum}", weekNum).replace("{theme_desc}", theme_desc)
            
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
                        chapters.append({'title': title})
                        
            final_html += build_schematic(mainTheme, chapters)
            final_html += html_template_end.replace("{learningGoal}", learningGoal)
            
            out_path = os.path.join(folder_path, "page04.html")
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(final_html)
            print(f"Created {out_path} with perfect layout")
