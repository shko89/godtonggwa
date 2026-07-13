import matplotlib.pyplot as plt
import matplotlib.patches as patches
import platform
from matplotlib import rc

if platform.system() == 'Windows':
    rc('font', family=['Malgun Gothic', 'Segoe UI Symbol'])
else:
    rc('font', family=['NanumGothic', 'Segoe UI Symbol'])
plt.rcParams['axes.unicode_minus'] = False 

fig, ax = plt.subplots(figsize=(8.0, 4.0), dpi=600)
ax.set_xlim(0, 10)
ax.set_ylim(0, 5)
ax.axis('off')

# Box properties
props = dict(boxstyle='round,pad=0.4', facecolor='white', edgecolor='black', lw=1.5)

# (가) Path
ax.text(0.5, 3.5, '(가)', fontsize=14, va='center', fontfamily='Malgun Gothic')
boxes_a = [
    (1.5, 3.5, '성운'),
    (3.5, 3.5, '주계열성'),
    (5.5, 3.5, '㉠'),
    (8.0, 3.5, '행성상 성운\n백색 왜성')
]

# (나) Path
ax.text(0.5, 1.5, '(나)', fontsize=14, va='center', fontfamily='Malgun Gothic')
boxes_b = [
    (1.5, 1.5, '성운'),
    (3.5, 1.5, '주계열성'),
    (5.5, 1.5, '초거성'),
    (8.0, 1.5, '㉡')
]

for b_list in [boxes_a, boxes_b]:
    for x, y, text in b_list:
        ax.text(x, y, text, fontsize=12, ha='center', va='center', bbox=props, zorder=3, fontfamily='Malgun Gothic')

# Draw arrows
def draw_arrow(ax, x1, y1, x2, y2):
    ax.annotate('', xy=(x2-0.8, y2), xytext=(x1+0.8, y1), arrowprops=dict(arrowstyle="->", color='black', lw=1.5), zorder=1)

draw_arrow(ax, 1.5, 3.5, 3.5, 3.5)
draw_arrow(ax, 3.5, 3.5, 5.5, 3.5)
draw_arrow(ax, 5.5, 3.5, 8.0, 3.5)

draw_arrow(ax, 1.5, 1.5, 3.5, 1.5)
draw_arrow(ax, 3.5, 1.5, 5.5, 1.5)
draw_arrow(ax, 5.5, 1.5, 8.0, 1.5)

# Title
ax.text(5, 4.8, '별의 진화 경로', fontsize=14, ha='center', va='center', fontfamily='Malgun Gothic')

plt.tight_layout()
out_path_project = r'C:\Users\user\godtonggwa\exam4\plot_q07.png'
plt.savefig(out_path_project, dpi=600, bbox_inches='tight')
