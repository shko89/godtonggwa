import os
import re

base_dir = 'g:/내 드라이브/주간지'
folders = [f"{i}주차" for i in range(3, 9)] + ["9회차", "10회차"]

# Dictionary containing creative and context-accurate content for all weeks
page5_data = {
    "3": {
        "flow": "이온과 공유 결합 <span>➔</span> 규산염 광물과 탄소 화합물 <span>➔</span> 신소재의 활용",
        "q1": {
            "title": "Q1. 화학 결합의 원리",
            "subtitle": "안정해지려는 원자들의 본능과 옥텟 규칙",
            "tutor": '"금속과 비금속이 만나면 전자를 주고받는 이온 결합, 비금속끼리 만나면 전자를 공유하는 공유 결합이 형성된다는 점이 핵심이야!"',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <!-- 이온 결합 -->
                <circle cx="50" cy="45" r="20" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
                <text x="50" y="50" font-size="16" text-anchor="middle" font-weight="bold" fill="#ef4444">+</text>
                <circle cx="95" cy="45" r="20" fill="#f0fdfa" stroke="#0ea5e9" stroke-width="2"/>
                <text x="95" y="50" font-size="16" text-anchor="middle" font-weight="bold" fill="#0ea5e9">-</text>
                <!-- 공유 결합 -->
                <circle cx="170" cy="45" r="20" fill="none" stroke="#0ea5e9" stroke-width="2"/>
                <circle cx="200" cy="45" r="20" fill="none" stroke="#0ea5e9" stroke-width="2"/>
                <circle cx="185" cy="45" r="4" fill="#0ea5e9"/>
                <circle cx="185" cy="35" r="4" fill="#0ea5e9"/>
                <text x="72.5" y="85" font-size="11" text-anchor="middle" fill="#64748b" font-weight="bold">이온 결합</text>
                <text x="185" y="85" font-size="11" text-anchor="middle" fill="#64748b" font-weight="bold">공유 결합</text>
            </svg>'''
        },
        "q2": {
            "title": "Q2. 지각과 생명체의 구성",
            "subtitle": "규산염 사면체와 탄소 화합물의 골격",
            "tutor": '"지각은 산소와 규소 중심의 규산염 광물로, 생명체는 탄소 중심의 유기물로 이루어져 있다는 사실! 골격의 구조를 비교해봐."',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <!-- Si-O 사면체 -->
                <polygon points="60,20 30,70 90,70" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="2,2"/>
                <circle cx="60" cy="45" r="8" fill="#0ea5e9"/>
                <circle cx="60" cy="20" r="6" fill="#ef4444"/>
                <circle cx="30" cy="70" r="6" fill="#ef4444"/>
                <circle cx="90" cy="70" r="6" fill="#ef4444"/>
                <!-- 탄소 골격 -->
                <circle cx="160" cy="45" r="8" fill="#334155"/>
                <line x1="168" y1="45" x2="182" y2="45" stroke="#334155" stroke-width="2"/>
                <circle cx="190" cy="45" r="8" fill="#334155"/>
                <line x1="198" y1="45" x2="212" y2="45" stroke="#334155" stroke-width="2"/>
                <circle cx="220" cy="45" r="8" fill="#334155"/>
                <text x="60" y="90" font-size="11" text-anchor="middle" fill="#64748b" font-weight="bold">규산염 사면체</text>
                <text x="190" y="90" font-size="11" text-anchor="middle" fill="#64748b" font-weight="bold">탄소 사슬 구조</text>
            </svg>'''
        },
        "q3": {
            "title": "Q3. 물질의 전기적 성질",
            "subtitle": "에너지 띠와 도체, 반도체, 절연체",
            "tutor": '"전기가 통하려면 전자가 이동할 수 있는 빈 공간(전도띠)으로 쉽게 올라갈 수 있어야 해. 띠 간격을 기준으로 물질을 분류하는 문제가 나와!"',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <rect x="30" y="60" width="30" height="20" fill="#3b82f6" opacity="0.8"/>
                <rect x="30" y="30" width="30" height="30" fill="#bae6fd" opacity="0.5"/>
                <text x="45" y="95" font-size="11" text-anchor="middle" fill="#64748b" font-weight="bold">도체</text>
                
                <rect x="110" y="60" width="30" height="20" fill="#3b82f6" opacity="0.8"/>
                <rect x="110" y="20" width="30" height="20" fill="#bae6fd" opacity="0.5"/>
                <line x1="105" y1="50" x2="145" y2="50" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="2,2"/>
                <text x="125" y="95" font-size="11" text-anchor="middle" fill="#64748b" font-weight="bold">반도체 (좁음)</text>
                
                <rect x="190" y="60" width="30" height="20" fill="#3b82f6" opacity="0.8"/>
                <rect x="190" y="10" width="30" height="10" fill="#bae6fd" opacity="0.5"/>
                <text x="205" y="95" font-size="11" text-anchor="middle" fill="#64748b" font-weight="bold">절연체 (넓음)</text>
            </svg>'''
        }
    },
    "4": {
        "flow": "지구 시스템의 구성 <span>➔</span> 상호 작용과 순환 <span>➔</span> 판 구조론과 지각 변동",
        "q1": {
            "title": "Q1. 지구 시스템의 구성",
            "subtitle": "지권, 수권, 기권, 생물권, 외권",
            "tutor": '"지구는 5개의 권역으로 나뉘며 서로 에너지를 주고받아. 각 권역의 층상 구조(예: 기권의 대류권, 성층권) 특징을 정확히 매칭해야 해!"',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <circle cx="125" cy="50" r="40" fill="#f0f9ff" stroke="#0ea5e9" stroke-width="2"/>
                <circle cx="125" cy="50" r="30" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
                <circle cx="125" cy="50" r="15" fill="#1d4ed8"/>
                <path d="M 125 10 Q 150 10 165 50" fill="none" stroke="#0ea5e9" stroke-width="1.5" stroke-dasharray="3,3"/>
                <text x="65" y="55" font-size="12" font-weight="bold" fill="#0ea5e9">외권</text>
                <text x="125" y="105" font-size="11" text-anchor="middle" fill="#64748b" font-weight="bold">권역의 층상 구조 모식도</text>
            </svg>'''
        },
        "q2": {
            "title": "Q2. 물질 순환과 에너지",
            "subtitle": "물과 탄소의 끊임없는 이동 경로",
            "tutor": '"태양 에너지는 물의 순환을 일으키는 근원이야. 특히 탄소가 각 권역에서 어떤 형태(CO2, 탄산 이온, 석회암 등)로 존재하는지 묻는 문제가 단골이야!"',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <path d="M 80 40 Q 125 10 170 40" fill="none" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow_blue)"/>
                <path d="M 170 60 Q 125 90 80 60" fill="none" stroke="#10b981" stroke-width="2" marker-end="url(#arrow_green)"/>
                <circle cx="70" cy="50" r="18" fill="#f8fafc" stroke="#64748b"/>
                <text x="70" y="54" font-size="11" text-anchor="middle" fill="#334155" font-weight="bold">기권</text>
                <circle cx="180" cy="50" r="18" fill="#f8fafc" stroke="#64748b"/>
                <text x="180" y="54" font-size="11" text-anchor="middle" fill="#334155" font-weight="bold">지권</text>
                <text x="125" y="54" font-size="12" font-weight="bold" text-anchor="middle" fill="#0ea5e9">탄소 순환</text>
                <defs>
                    <marker id="arrow_blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" /></marker>
                    <marker id="arrow_green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" /></marker>
                </defs>
            </svg>'''
        },
        "q3": {
            "title": "Q3. 판 구조론과 지각 변동",
            "subtitle": "발산형, 수렴형, 보존형 판의 경계",
            "tutor": '"판이 멀어지면 해령(발산형), 부딪히면 해구(수렴형), 어긋나면 변환 단층(보존형)이 생겨. 지진과 화산 발생 여부 표를 100% 암기할 것!"',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <rect x="50" y="30" width="40" height="20" fill="#cbd5e1"/>
                <rect x="95" y="30" width="40" height="20" fill="#94a3b8"/>
                <path d="M 65 20 L 55 20 L 60 15 M 55 20 L 60 25" fill="none" stroke="#ef4444" stroke-width="2"/>
                <path d="M 120 20 L 130 20 L 125 15 M 130 20 L 125 25" fill="none" stroke="#ef4444" stroke-width="2"/>
                <text x="92" y="75" font-size="11" text-anchor="middle" fill="#334155" font-weight="bold">발산형 (해령)</text>
                
                <rect x="170" y="30" width="40" height="20" fill="#cbd5e1"/>
                <rect x="210" y="30" width="40" height="20" fill="#94a3b8"/>
                <path d="M 185 20 L 195 20 L 190 15 M 195 20 L 190 25" fill="none" stroke="#3b82f6" stroke-width="2"/>
                <path d="M 235 20 L 225 20 L 230 15 M 225 20 L 230 25" fill="none" stroke="#3b82f6" stroke-width="2"/>
                <text x="210" y="75" font-size="11" text-anchor="middle" fill="#334155" font-weight="bold">수렴형 (해구)</text>
            </svg>'''
        }
    },
    "5": {
        "flow": "역학적 시스템(중력) <span>➔</span> 운동량과 충격량 <span>➔</span> 물질대사와 정보의 흐름",
        "q1": {
            "title": "Q1. 중력장 내의 운동",
            "subtitle": "자유 낙하 운동과 수평으로 던진 물체",
            "tutor": '"수평으로 던진 물체는 수직 방향으로는 자유 낙하(가속도 운동), 수평 방향으로는 등속 직선 운동을 해. 두 방향을 철저히 분리해서 해석하는 게 비법!"',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <path d="M 60 20 Q 110 20 140 80" fill="none" stroke="#0ea5e9" stroke-width="2.5" stroke-dasharray="4,4"/>
                <circle cx="60" cy="20" r="5" fill="#ef4444"/>
                <circle cx="100" cy="35" r="5" fill="#ef4444"/>
                <circle cx="140" cy="80" r="5" fill="#ef4444"/>
                <line x1="140" y1="20" x2="140" y2="80" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="2,2"/>
                <circle cx="140" cy="20" r="4" fill="#94a3b8"/>
                <text x="125" y="95" font-size="11" text-anchor="middle" fill="#64748b" font-weight="bold">수평 방향과 수직 방향의 독립성</text>
            </svg>'''
        },
        "q2": {
            "title": "Q2. 충돌과 안전장치",
            "subtitle": "충격량(I) = 평균 힘(F) × 시간(t)",
            "tutor": '"달걀이 푹신한 방석에 떨어질 때 안 깨지는 이유는? 충격량(그래프 면적)은 같아도, 푹신해서 충돌 시간(t)이 길어져 평균 힘(F)이 뚝 떨어지기 때문이야!"',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <line x1="30" y1="80" x2="220" y2="80" stroke="#334155" stroke-width="1.5"/>
                <line x1="30" y1="80" x2="30" y2="20" stroke="#334155" stroke-width="1.5"/>
                <!-- 단단한 바닥 (빨강) -->
                <path d="M 50 80 Q 60 10 70 80" fill="rgba(239,68,68,0.2)" stroke="#ef4444" stroke-width="2"/>
                <!-- 푹신한 방석 (파랑) -->
                <path d="M 90 80 Q 140 40 190 80" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" stroke-width="2"/>
                <text x="30" y="15" font-size="11" fill="#334155" font-weight="bold">F</text>
                <text x="225" y="85" font-size="11" fill="#334155" font-weight="bold">t</text>
                <text x="130" y="95" font-size="11" text-anchor="middle" fill="#64748b" font-weight="bold">F-t 그래프 (면적 = 충격량 동일)</text>
            </svg>'''
        },
        "q3": {
            "title": "Q3. 물질대사와 효소",
            "subtitle": "생체 촉매의 역할과 활성화 에너지",
            "tutor": '"효소는 화학 반응에 필요한 초기 장벽인 \'활성화 에너지\'를 낮춰 반응 속도를 높여줘. 그래프에서 효소가 있을 때와 없을 때 에너지 언덕의 높이 차이를 꼭 확인해!"',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <line x1="30" y1="80" x2="220" y2="80" stroke="#334155" stroke-width="1.5"/>
                <line x1="30" y1="80" x2="30" y2="20" stroke="#334155" stroke-width="1.5"/>
                <path d="M 40 60 Q 100 0 160 80" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>
                <path d="M 40 60 Q 100 40 160 80" fill="none" stroke="#10b981" stroke-width="2"/>
                <text x="110" y="35" font-size="11" fill="#10b981" font-weight="bold">효소 작용 (언덕 감소)</text>
                <text x="130" y="95" font-size="11" text-anchor="middle" fill="#64748b" font-weight="bold">반응 경로에 따른 에너지 변화</text>
            </svg>'''
        }
    },
    "6": {
        "flow": "지질 시대와 화석 <span>➔</span> 환경 변화와 대멸종 <span>➔</span> 다윈 진화와 자연선택",
        "q1": {
            "title": "Q1. 지질 시대와 화석",
            "subtitle": "표준 화석(시대 유추)과 시상 화석(환경 유추)",
            "tutor": '"생존 기간이 짧고 널리 분포하면 표준 화석(공룡, 암모나이트)! 생존 기간이 길고 특정 환경에만 살면 시상 화석(고사리, 산호)이야. 그래프 위치로 꼭 구분해!"',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <line x1="40" y1="80" x2="200" y2="80" stroke="#334155" stroke-width="1.5"/>
                <line x1="40" y1="80" x2="40" y2="20" stroke="#334155" stroke-width="1.5"/>
                <text x="40" y="15" font-size="10" fill="#334155" font-weight="bold">분포 면적</text>
                <text x="210" y="85" font-size="10" fill="#334155" font-weight="bold">생존 기간</text>
                
                <rect x="50" y="30" width="40" height="40" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" stroke-width="1.5"/>
                <text x="70" y="55" font-size="11" text-anchor="middle" font-weight="bold" fill="#1d4ed8">표준</text>
                
                <rect x="120" y="60" width="60" height="20" fill="rgba(16,185,129,0.2)" stroke="#10b981" stroke-width="1.5"/>
                <text x="150" y="75" font-size="11" text-anchor="middle" font-weight="bold" fill="#047857">시상</text>
            </svg>'''
        },
        "q2": {
            "title": "Q2. 대멸종과 진화",
            "subtitle": "급격한 환경 변화와 생물계의 위기",
            "tutor": '"지구 역사상 5번의 대멸종이 있었어. 가장 규모가 컸던 고생대 말(판게아 형성)과 공룡이 멸종한 중생대 말(운석 충돌)의 원인을 표에서 매칭하는 훈련을 해!"',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <path d="M 30 70 L 60 70 L 80 40 L 100 75 L 140 75 L 160 20 L 180 80 L 220 80" fill="none" stroke="#ef4444" stroke-width="2"/>
                <circle cx="80" cy="40" r="4" fill="#ef4444"/>
                <circle cx="160" cy="20" r="4" fill="#ef4444"/>
                <text x="80" y="30" font-size="11" text-anchor="middle" fill="#dc2626" font-weight="bold">고생대 말</text>
                <text x="160" y="10" font-size="11" text-anchor="middle" fill="#dc2626" font-weight="bold">중생대 말</text>
                <text x="125" y="95" font-size="11" text-anchor="middle" fill="#64748b" font-weight="bold">생물 과(Family)의 수 변화</text>
            </svg>'''
        },
        "q3": {
            "title": "Q3. 자연선택과 다양성",
            "subtitle": "다윈의 진화론과 항생제 내성 세균",
            "tutor": '"자연선택은 \'과잉 생산 ➔ 개체 변이 ➔ 생존 경쟁 ➔ 자연 선택 ➔ 진화\' 순서로 진행돼. 핀치새 부리 모양의 변화나 내성 세균 발생 사례를 이 순서에 대입해봐!"',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <circle cx="60" cy="40" r="10" fill="#cbd5e1"/>
                <circle cx="80" cy="40" r="10" fill="#fca5a5"/>
                <circle cx="100" cy="40" r="10" fill="#cbd5e1"/>
                <path d="M 120 40 L 145 40 L 140 35 M 145 40 L 140 45" fill="none" stroke="#334155" stroke-width="1.5"/>
                <circle cx="165" cy="40" r="10" fill="#fca5a5"/>
                <circle cx="185" cy="40" r="10" fill="#fca5a5"/>
                <circle cx="205" cy="40" r="10" fill="#fca5a5"/>
                <text x="80" y="70" font-size="10" text-anchor="middle" fill="#64748b" font-weight="bold">변이 발생</text>
                <text x="185" y="70" font-size="10" text-anchor="middle" fill="#dc2626" font-weight="bold">환경 적응 개체 생존</text>
            </svg>'''
        }
    },
    "7": {
        "flow": "전자의 이동(산화/환원) <span>➔</span> 이온의 쪼개짐(산/염기) <span>➔</span> 중화 반응과 열",
        "q1": {
            "title": "Q1. 산화와 환원 반응",
            "subtitle": "산소와 전자의 이동을 통한 화학 반응",
            "tutor": '"산소를 얻거나 전자를 잃으면 산화! 반대는 환원이야. 광합성이나 철의 제련 화학식에서 반응 전후에 산소가 어떻게 이동했는지 정확히 화살표로 연결해봐!"',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <rect x="50" y="30" width="50" height="25" rx="5" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
                <text x="75" y="46" font-size="12" font-weight="bold" text-anchor="middle" fill="#1d4ed8">물질 A</text>
                <rect x="150" y="30" width="50" height="25" rx="5" fill="#fef2f2" stroke="#ef4444" stroke-width="1.5"/>
                <text x="175" y="46" font-size="12" font-weight="bold" text-anchor="middle" fill="#dc2626">물질 B</text>
                <path d="M 105 35 Q 125 20 145 35" fill="none" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow_gray)"/>
                <text x="125" y="22" font-size="11" text-anchor="middle" fill="#334155" font-weight="bold">전자 (e⁻)</text>
                <text x="75" y="75" font-size="11" font-weight="bold" text-anchor="middle" fill="#1d4ed8">산화 (잃음)</text>
                <text x="175" y="75" font-size="11" font-weight="bold" text-anchor="middle" fill="#dc2626">환원 (얻음)</text>
                <defs><marker id="arrow_gray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" /></marker></defs>
            </svg>'''
        },
        "q2": {
            "title": "Q2. 산과 염기의 이온화",
            "subtitle": "수소 이온(H+)과 수산화 이온(OH-)",
            "tutor": '"산성은 수용액에서 H+ 이온을 내놓고, 염기성은 OH- 이온을 내놓아 공통적인 성질이 나타나. 지시약(페놀프탈레인, BTB)을 넣었을 때 무슨 색으로 변하는지 암기 필수!"',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <circle cx="80" cy="45" r="25" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
                <text x="80" y="52" font-size="16" font-weight="bold" text-anchor="middle" fill="#dc2626">H⁺</text>
                <circle cx="170" cy="45" r="25" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
                <text x="170" y="52" font-size="16" font-weight="bold" text-anchor="middle" fill="#1d4ed8">OH⁻</text>
                <text x="80" y="90" font-size="11" font-weight="bold" text-anchor="middle" fill="#64748b">산성 (신맛)</text>
                <text x="170" y="90" font-size="11" font-weight="bold" text-anchor="middle" fill="#64748b">염기성 (쓴맛)</text>
            </svg>'''
        },
        "q3": {
            "title": "Q3. 중화 반응과 열 에너지",
            "subtitle": "물(H2O) 생성과 혼합 용액의 온도",
            "tutor": '"산과 염기가 완전히 만나는 지점(중화점)에서 중화열이 최대로 발생해 온도가 가장 높아! 혼합 용액에 들어있는 총 이온 수를 묻는 킬러 문제에 철저히 대비해야 해."',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <path d="M 60 70 L 125 20 L 190 70" fill="none" stroke="#ef4444" stroke-width="2"/>
                <circle cx="125" cy="20" r="5" fill="#dc2626"/>
                <line x1="50" y1="80" x2="200" y2="80" stroke="#334155" stroke-width="1.5"/>
                <text x="125" y="10" font-size="11" font-weight="bold" text-anchor="middle" fill="#dc2626">중화점 (최고 온도)</text>
                <text x="125" y="95" font-size="11" font-weight="bold" text-anchor="middle" fill="#64748b">혼합 용액 부피 비율에 따른 온도</text>
            </svg>'''
        }
    },
    "8": {
        "flow": "생태계의 구성 <span>➔</span> 먹이 사슬과 생태계 평형 <span>➔</span> 지구 환경 보전",
        "q1": {
            "title": "Q1. 생태계의 구성과 상호작용",
            "subtitle": "생물적 요인과 비생물적 요인의 관계",
            "tutor": '"빛, 온도, 물이 생물에 미치는 영향을 \'작용\', 생물이 환경을 변화시키는 것을 \'반작용\'이라고 해. 단풍이 드는 건 작용, 지렁이가 흙을 비옥하게 하는 건 반작용!"',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <rect x="40" y="30" width="60" height="40" rx="5" fill="#f8fafc" stroke="#64748b" stroke-width="1.5"/>
                <text x="70" y="54" font-size="11" font-weight="bold" text-anchor="middle" fill="#334155">비생물</text>
                <rect x="150" y="30" width="60" height="40" rx="5" fill="#f0fdf4" stroke="#10b981" stroke-width="1.5"/>
                <text x="180" y="54" font-size="11" font-weight="bold" text-anchor="middle" fill="#047857">생물 군집</text>
                <path d="M 105 40 L 140 40 L 135 35 M 140 40 L 135 45" fill="none" stroke="#3b82f6" stroke-width="1.5"/>
                <path d="M 145 60 L 110 60 L 115 55 M 110 60 L 115 65" fill="none" stroke="#ef4444" stroke-width="1.5"/>
                <text x="125" y="33" font-size="10" font-weight="bold" text-anchor="middle" fill="#3b82f6">작용</text>
                <text x="125" y="75" font-size="10" font-weight="bold" text-anchor="middle" fill="#ef4444">반작용</text>
            </svg>'''
        },
        "q2": {
            "title": "Q2. 먹이 사슬과 생태계 평형",
            "subtitle": "에너지 흐름과 피라미드 구조",
            "tutor": '"에너지는 상위 영양 단계로 갈수록 감소하며, 순환하지 않고 최종적으로 열에너지로 빠져나가. 생태계 피라미드가 일시적으로 파괴되었다가 회복되는 원리를 그려봐."',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <polygon points="125,10 90,40 160,40" fill="#fef2f2" stroke="#ef4444" stroke-width="1"/>
                <polygon points="90,40 60,70 190,70" fill="#fff7ed" stroke="#f97316" stroke-width="1"/>
                <polygon points="60,70 30,100 220,100" fill="#f0fdf4" stroke="#10b981" stroke-width="1"/>
                <text x="125" y="33" font-size="10" font-weight="bold" text-anchor="middle" fill="#dc2626">2차</text>
                <text x="125" y="60" font-size="10" font-weight="bold" text-anchor="middle" fill="#ea580c">1차 소비자</text>
                <text x="125" y="90" font-size="10" font-weight="bold" text-anchor="middle" fill="#047857">생산자 (식물)</text>
            </svg>'''
        },
        "q3": {
            "title": "Q3. 기후 변화와 지구 환경",
            "subtitle": "지구 온난화와 엘니뇨 현상의 파급력",
            "tutor": '"엘니뇨가 발생하면 무역풍이 약해져서 따뜻한 해수가 동태평양에 머물러. 그 결과 동태평양(페루) 연안에는 폭우가, 서태평양에는 가뭄이 생긴다는 것을 기계적으로 연결해!"',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <path d="M 50 45 Q 125 25 200 45" fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4,4"/>
                <text x="125" y="40" font-size="11" font-weight="bold" text-anchor="middle" fill="#3b82f6">무역풍 약화 (엘니뇨)</text>
                <rect x="30" y="60" width="80" height="25" fill="#fef2f2" rx="4"/>
                <rect x="140" y="60" width="80" height="25" fill="#f0f9ff" rx="4"/>
                <text x="70" y="76" font-size="11" font-weight="bold" text-anchor="middle" fill="#dc2626">서태평양 (가뭄)</text>
                <text x="180" y="76" font-size="11" font-weight="bold" text-anchor="middle" fill="#0369a1">동태평양 (폭우)</text>
            </svg>'''
        }
    },
    "9": {
        "flow": "역학적 에너지 보존 <span>➔</span> 전자기 유도와 발전기 <span>➔</span> 전력 수송 원리",
        "q1": {
            "title": "Q1. 에너지 전환과 보존",
            "subtitle": "다양한 형태의 에너지와 에너지 보존 법칙",
            "tutor": '"마찰이나 공기 저항이 없다면 역학적 에너지는 항상 보존돼! 만약 마찰이 있다면 일부가 열에너지로 바뀌지만, 모든 에너지를 합친 \'총 에너지\'는 우주 어디서나 일정해."',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <circle cx="60" cy="45" r="25" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
                <text x="60" y="50" font-size="11" font-weight="bold" text-anchor="middle" fill="#dc2626">퍼텐셜 E</text>
                <circle cx="110" cy="45" r="25" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
                <text x="110" y="50" font-size="11" font-weight="bold" text-anchor="middle" fill="#1d4ed8">운동 E</text>
                <text x="85" y="90" font-size="11" font-weight="bold" text-anchor="middle" fill="#334155">합은 항상 일정 (역학적 에너지 보존)</text>
            </svg>'''
        },
        "q2": {
            "title": "Q2. 발전의 원리: 전자기 유도",
            "subtitle": "자석이 코일을 통과할 때 생기는 유도 전류",
            "tutor": '"코일은 자석이 오면 밀어내려 하고, 멀어지면 당기려 해(렌츠의 법칙). 자석을 빠르게, 센 자석을 쓸수록 유도 전류(패러데이 법칙)가 커지는 발전기의 기본 원리야!"',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <path d="M 100 20 Q 130 50 100 80" fill="none" stroke="#f59e0b" stroke-width="3"/>
                <path d="M 120 20 Q 150 50 120 80" fill="none" stroke="#f59e0b" stroke-width="3"/>
                <path d="M 140 20 Q 170 50 140 80" fill="none" stroke="#f59e0b" stroke-width="3"/>
                <rect x="20" y="40" width="40" height="20" fill="#ef4444"/>
                <rect x="60" y="40" width="20" height="20" fill="#3b82f6"/>
                <text x="40" y="54" font-size="11" fill="white" font-weight="bold">N</text>
                <text x="65" y="54" font-size="11" fill="white" font-weight="bold">S</text>
                <path d="M 85 50 L 105 50 M 100 45 L 105 50 L 100 55" fill="none" stroke="#334155" stroke-width="2"/>
                <text x="125" y="95" font-size="11" font-weight="bold" text-anchor="middle" fill="#64748b">전자기 유도 (자기장의 변화)</text>
            </svg>'''
        },
        "q3": {
            "title": "Q3. 전력 수송과 손실 전력",
            "subtitle": "송전 전압을 높여 전력 손실을 줄이는 방법",
            "tutor": '"발전소에서 만든 전력을 보낼 때, 전압(V)을 10배 높이면 전류(I)는 1/10이 돼. 손실 전력은 전류의 제곱(I²)에 비례하니까 무려 1/100로 대폭 줄어든다는 점이 핵심이야!"',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <rect x="30" y="25" width="45" height="40" rx="3" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
                <text x="52" y="50" font-size="11" font-weight="bold" text-anchor="middle">발전소</text>
                <rect x="175" y="25" width="45" height="40" rx="3" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
                <text x="197" y="50" font-size="11" font-weight="bold" text-anchor="middle">가정</text>
                <line x1="75" y1="35" x2="175" y2="35" stroke="#ef4444" stroke-width="2"/>
                <line x1="75" y1="55" x2="175" y2="55" stroke="#ef4444" stroke-width="2"/>
                <text x="125" y="30" font-size="11" font-weight="bold" text-anchor="middle" fill="#dc2626">송전선 (저항 R)</text>
                <text x="125" y="85" font-size="12" font-weight="bold" text-anchor="middle" fill="#0ea5e9">손실 전력 ∝ I²R</text>
            </svg>'''
        }
    },
    "10": {
        "flow": "감염병의 진단과 면역 <span>➔</span> 정보 시대의 빅데이터 <span>➔</span> 과학 기술과 윤리",
        "q1": {
            "title": "Q1. 감염병 진단 키트의 원리",
            "subtitle": "항원-항체 반응의 특이적 결합 특성",
            "tutor": '"코로나19 진단 키트처럼 특정 항체는 오직 특정 항원(병원체)하고만 결합해! 진단 키트의 대조선(C)과 검사선(T)에 어떤 성분이 작용하여 두 줄이 나타나는지 원리를 분석해봐."',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <path d="M 125 70 L 125 40 L 115 30 M 125 40 L 135 30" fill="none" stroke="#3b82f6" stroke-width="3"/>
                <circle cx="115" cy="25" r="5" fill="#ef4444"/>
                <text x="80" y="30" font-size="11" font-weight="bold" fill="#dc2626">항원 (병원체)</text>
                <text x="155" y="55" font-size="11" font-weight="bold" fill="#1d4ed8">항체</text>
                <text x="125" y="95" font-size="11" font-weight="bold" text-anchor="middle" fill="#64748b">항원-항체 특이적 결합</text>
            </svg>'''
        },
        "q2": {
            "title": "Q2. 빅데이터와 인공지능",
            "subtitle": "방대한 데이터의 처리 과정과 생활 속 응용",
            "tutor": '"숫자뿐만 아니라 텍스트, 이미지 같은 비정형 데이터를 처리하는 것이 빅데이터야. 기계 학습으로 패턴을 찾아내 질병 예측이나 맞춤형 추천 알고리즘에 어떻게 쓰이는지 연결해둬."',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <circle cx="125" cy="45" r="30" fill="#f8fafc" stroke="#64748b" stroke-dasharray="4,4" stroke-width="1.5"/>
                <circle cx="105" cy="35" r="6" fill="#0ea5e9"/>
                <circle cx="145" cy="40" r="6" fill="#10b981"/>
                <circle cx="125" cy="60" r="6" fill="#f59e0b"/>
                <line x1="105" y1="35" x2="145" y2="40" stroke="#cbd5e1" stroke-width="1.5"/>
                <line x1="145" y1="40" x2="125" y2="60" stroke="#cbd5e1" stroke-width="1.5"/>
                <line x1="125" y1="60" x2="105" y2="35" stroke="#cbd5e1" stroke-width="1.5"/>
                <text x="125" y="90" font-size="11" font-weight="bold" text-anchor="middle" fill="#64748b">네트워크 노드와 데이터 융합</text>
            </svg>'''
        },
        "q3": {
            "title": "Q3. 과학 관련 사회적 쟁점(SSI)",
            "subtitle": "과학 기술 발전이 낳은 현대 사회의 윤리적 딜레마",
            "tutor": '"유전자 조작 식품(GMO)이나 인공지능 자율 주행차의 사고 책임 등 과학 지식만으론 풀기 힘든 쟁점들이 등장했어. 여러 가치가 충돌할 때 합리적인 근거로 의사결정을 내리는 게 필수적이야."',
            "svg": '''<svg width="250" height="100" viewBox="0 0 250 100">
                <path d="M 90 60 L 160 60 L 125 30 Z" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
                <circle cx="125" cy="45" r="3" fill="#dc2626"/>
                <rect x="123" y="50" width="4" height="4" fill="#dc2626"/>
                <text x="125" y="85" font-size="11" font-weight="bold" text-anchor="middle" fill="#ef4444">위험 분석과 합리적 의사결정</text>
            </svg>'''
        }
    }
}

html_template = """<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="../weekly_common.css">
    <style>
        body {{ background-color: #ffffff; }}
        .a4-page {{ width: 794px; height: 1123px; padding: 45px 55px; box-sizing: border-box; background-color: white; margin: 0 auto; position: relative; }}
        
        .header-theme {{ font-size: 34px; font-weight: 900; color: #0284c7; margin: 0 0 15px 0; letter-spacing: -1.5px; }}
        .header-flow {{ font-size: 16px; font-weight: 700; color: #334155; margin-bottom: 40px; word-break: keep-all; }}
        .header-flow span {{ color: #94a3b8; font-weight: 900; margin: 0 6px; font-size: 18px; }}

        .q-box {{ 
            border: 1.5px solid #f1f5f9; 
            border-radius: 12px; 
            padding: 22px 28px; 
            margin-bottom: 25px; 
            display: flex; 
            align-items: center; 
            justify-content: space-between;
            box-shadow: 0 4px 6px rgba(0,0,0,0.02);
            background-color: #ffffff;
        }}
        .q-box.reverse {{ flex-direction: row-reverse; }}

        .q-text {{ width: 50%; }}
        .q-title {{ font-size: 22px; font-weight: 900; color: #0284c7; margin: 0 0 6px 0; letter-spacing: -1px; }}
        .q-subtitle {{ font-size: 13px; color: #64748b; font-weight: 500; margin: 0 0 20px 0; word-break: keep-all; }}

        .tutor-schema {{
            background-color: #f8fafc;
            background-image: linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px);
            background-size: 15px 15px;
            border: 1.5px solid #cbd5e1;
            border-radius: 0 8px 8px 8px;
            padding: 16px 20px;
            position: relative;
        }}
        .tutor-badge {{
            position: absolute;
            top: -12px;
            left: -1.5px;
            background-color: #0284c7;
            color: white;
            font-weight: 900;
            font-size: 11px;
            padding: 3px 10px;
            font-family: 'Roboto', sans-serif;
            letter-spacing: 0.5px;
        }}
        .tutor-text {{
            font-size: 13px;
            color: #334155;
            line-height: 1.55;
            margin: 0;
            font-weight: 600;
            word-break: keep-all;
            text-align: justify;
        }}

        .q-diagram {{
            width: 44%;
            height: 150px;
            border: 1.5px dashed #cbd5e1;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #ffffff;
        }}
    </style>
</head>
<body>
<div class="a4-page" id="page-05">
    <h2 class="header-theme">{mainTheme}</h2>
    <div class="header-flow">{flow}</div>

    <!-- Q1 -->
    <div class="q-box">
        <div class="q-text">
            <h3 class="q-title">{q1_title}</h3>
            <p class="q-subtitle">{q1_subtitle}</p>
            <div class="tutor-schema">
                <div class="tutor-badge">Tutor's Schema</div>
                <p class="tutor-text">{q1_tutor}</p>
            </div>
        </div>
        <div class="q-diagram">
            {q1_svg}
        </div>
    </div>

    <!-- Q2 (Reverse) -->
    <div class="q-box reverse">
        <div class="q-text">
            <h3 class="q-title">{q2_title}</h3>
            <p class="q-subtitle">{q2_subtitle}</p>
            <div class="tutor-schema">
                <div class="tutor-badge">Tutor's Schema</div>
                <p class="tutor-text">{q2_tutor}</p>
            </div>
        </div>
        <div class="q-diagram">
            {q2_svg}
        </div>
    </div>

    <!-- Q3 -->
    <div class="q-box">
        <div class="q-text">
            <h3 class="q-title">{q3_title}</h3>
            <p class="q-subtitle">{q3_subtitle}</p>
            <div class="tutor-schema">
                <div class="tutor-badge">Tutor's Schema</div>
                <p class="tutor-text">{q3_tutor}</p>
            </div>
        </div>
        <div class="q-diagram">
            {q3_svg}
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
            
        match_week = re.search(r'weekNum:\s*"([^"]*)"', js_text)
        match_theme = re.search(r'mainTheme:\s*"([^"]*)"', js_text)
        
        if match_week and match_theme:
            weekNum = match_week.group(1)
            mainTheme = match_theme.group(1)
            
            # Map "9", "10" properly
            idx = str(int(weekNum))
            if idx not in page5_data:
                print(f"Skipping week {idx}, no data")
                continue
                
            p_data = page5_data[idx]
            
            final_html = html_template.format(
                mainTheme=mainTheme,
                flow=p_data['flow'],
                q1_title=p_data['q1']['title'],
                q1_subtitle=p_data['q1']['subtitle'],
                q1_tutor=p_data['q1']['tutor'],
                q1_svg=p_data['q1']['svg'],
                q2_title=p_data['q2']['title'],
                q2_subtitle=p_data['q2']['subtitle'],
                q2_tutor=p_data['q2']['tutor'],
                q2_svg=p_data['q2']['svg'],
                q3_title=p_data['q3']['title'],
                q3_subtitle=p_data['q3']['subtitle'],
                q3_tutor=p_data['q3']['tutor'],
                q3_svg=p_data['q3']['svg']
            )
            
            out_path = os.path.join(folder_path, "page05.html")
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(final_html)
            print(f"Created {out_path}")
