import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import numpy as np
import os

# 수능 스타일 폰트 설정 (맑은 고딕)
plt.rcParams['font.family'] = 'Malgun Gothic'
plt.rcParams['axes.unicode_minus'] = False

# 데이터 설정
weeks = np.arange(1, 13)
search_freq = [8, 7, 8, 16, 90, 50, 35, 25, 18, 14, 11, 9]
patients = [0, 0, 50, 100, 700, 1800, 4500, 3300, 2100, 1300, 800, 600]

# 피겨 생성 (수능 스타일: 보통 가로가 약간 긴 직사각형, 흑백)
fig, ax1 = plt.subplots(figsize=(6, 4))

# 1. 왼쪽 Y축 (검색어 빈도) - 실선, 검은색 둥근 점
line1 = ax1.plot(weeks, search_freq, color='black', linestyle='-', linewidth=1.5,
                 marker='o', markersize=5, markerfacecolor='black', markeredgecolor='black',
                 label='고열+기침 검색어 빈도')
ax1.set_xlabel('시간 (주)', fontsize=10, loc='right')
ax1.set_ylabel('검색어 빈도\n(상대값)', fontsize=10, loc='top', rotation=0, labelpad=20)
ax1.set_ylim(0, 100)
ax1.set_yticks(np.arange(0, 101, 20))
ax1.set_xlim(0, 13)
ax1.set_xticks(np.arange(1, 13, 1))

# 2. 오른쪽 Y축 (의사 환자 수) - 점선, 흰색 둥근 점
ax2 = ax1.twinx()
line2 = ax2.plot(weeks, patients, color='black', linestyle='--', linewidth=1.5,
                 marker='o', markersize=5, markerfacecolor='white', markeredgecolor='black',
                 label='질병 X 의사 환자 수')
ax2.set_ylabel('의사 환자 수\n(명)', fontsize=10, loc='top', rotation=0, labelpad=20)
ax2.set_ylim(0, 5000)
ax2.set_yticks(np.arange(0, 5001, 1000))

# 3. 축 스타일링 (수능 스타일: 상단 축 제거, 화살표 추가, 눈금 안쪽)
ax1.spines['top'].set_visible(False)
ax2.spines['top'].set_visible(False)
ax1.spines['right'].set_visible(False)
ax2.spines['left'].set_visible(False)

# 축 눈금 안쪽으로 설정
ax1.tick_params(axis='both', direction='in', labelsize=9)
ax2.tick_params(axis='both', direction='in', labelsize=9)

# 축 끝 화살표 그리기
# x축 화살표
ax1.plot((1), (0), ls="", marker=">", ms=5, color="k", transform=ax1.get_yaxis_transform(), clip_on=False)
# y축(왼쪽) 화살표
ax1.plot((0), (1), ls="", marker="^", ms=5, color="k", transform=ax1.get_xaxis_transform(), clip_on=False)
# y축(오른쪽) 화살표
ax2.plot((1), (1), ls="", marker="^", ms=5, color="k", transform=ax2.get_xaxis_transform(), clip_on=False)

# 4. 범례 추가 (테두리 없음)
lines = line1 + line2
labels = [l.get_label() for l in lines]
ax1.legend(lines, labels, loc='upper right', frameon=False, fontsize=9)

# 5. 후행 화살표 표시 (약 1~2주 후행)
# 검색어 정점(x=5)부터 환자수 정점(x=7)까지 양방향 화살표
ax1.annotate('', xy=(5, 90), xytext=(7, 90),
             arrowprops=dict(arrowstyle='<->', color='black', lw=1.2))
ax1.text(6, 93, '약 1~2주 후행', ha='center', va='bottom', fontsize=9, fontweight='bold')

plt.tight_layout()

# 이미지 저장
output_path = os.path.join(os.path.dirname(__file__), 'suneung_graph_converted.png')
plt.savefig(output_path, dpi=300, bbox_inches='tight')
print(f"Graph saved to {output_path}")
