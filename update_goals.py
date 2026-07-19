import os
import re

base_dir = 'g:/내 드라이브/주간지'

goals = {
    "4주차": "지구 시스템을 구성하는 요소들과 그들 사이의 상호작용 및 에너지 흐름을 이해하고, 이를 바탕으로 일어나는 다양한 지각 변동 현상의 원리를 파악하는 것이 핵심입니다.",
    "5주차": "지구 시스템 내에서의 물질 순환과 에너지 흐름에 대해 깊이 탐구하며, 생명체를 포함한 지구 환경이 어떻게 유지되고 변화하는지 그 복합적인 상호작용을 이해합니다.",
    "6주차": "화학 반응에서의 산화와 환원, 그리고 중화 반응의 기본 개념을 이해하고, 이러한 물질의 화학적 변화가 일상 생활과 생명 현상에 어떻게 적용되는지 파악합니다.",
    "7주차": "생물 다양성의 중요성과 진화의 과정을 이해하며, 자연 선택과 환경 변화에 따른 생물의 적응 메커니즘을 탐구하여 생태계의 다양성을 이해하는 것이 핵심입니다.",
    "8주차": "생태계를 구성하는 요소들과 환경 요인의 관계를 분석하고, 기후 변화를 포함한 지구 환경 변화가 생태계에 미치는 영향 및 보전 방안을 탐구합니다.",
    "9회차": "에너지의 의미와 다양한 형태를 알아보고, 에너지가 전환되는 과정과 그 효율, 그리고 신재생 에너지 기술을 통해 지속 가능한 발전을 어떻게 모색할 수 있는지 파악합니다.",
    "10회차": "첨단 과학 기술이 현대 사회에 미치는 영향을 다각도로 분석하고, 이를 바탕으로 미래 사회의 변화 양상과 인류가 직면한 과제를 해결하기 위한 과학적 소양을 기릅니다."
}

for folder, goal in goals.items():
    js_path = os.path.join(base_dir, folder, 'weekly_part1.js')
    if os.path.exists(js_path):
        with open(js_path, 'r', encoding='utf-8') as f:
            js_text = f.read()
            
        # Replace learningGoal: "..." or learningGoal: "" with the new goal
        # Use re.sub
        updated_text = re.sub(r'learningGoal:\s*"[^"]*"', f'learningGoal: "{goal}"', js_text)
        
        with open(js_path, 'w', encoding='utf-8') as f:
            f.write(updated_text)
        print(f"Updated JS in {folder}")
