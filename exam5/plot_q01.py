import matplotlib.pyplot as plt
import matplotlib.patches as patches
import platform
from matplotlib import rc

if platform.system() == 'Windows':
    rc('font', family=['Malgun Gothic', 'Segoe UI Symbol'])
else:
    rc('font', family=['NanumGothic', 'Segoe UI Symbol'])
plt.rcParams['axes.unicode_minus'] = False 

fig, ax = plt.subplots(figsize=(7.5, 3.5), dpi=600)
ax.set_xlim(0, 10)
ax.set_ylim(0, 5)
ax.axis('off')

# Arrow for timeline
ax.annotate('', xy=(9.5, 2.0), xytext=(0.5, 2.0),
            arrowprops=dict(arrowstyle='->', lw=1.5, color='black'))

ax.text(9.5, 2.2, '시간', ha='center', va='bottom', fontsize=12, fontfamily='Malgun Gothic')

points = [1.5, 3.8, 6.1, 8.4]
labels_top = ['(가)', '(나)', '(다)\n빅뱅 후 3분', '(라)\n빅뱅 후 38만 년']
labels_bot = ['기본 입자\n생성', '양성자와\n중성자 생성', '헬륨\n원자핵 생성', '원자 생성']

for i in range(4):
    ax.plot([points[i], points[i]], [1.8, 2.2], color='black', lw=1.5)
    ax.text(points[i], 2.5, labels_top[i], ha='center', va='bottom', fontsize=11, fontfamily='Malgun Gothic')
    ax.text(points[i], 1.5, labels_bot[i], ha='center', va='top', fontsize=11, fontfamily='Malgun Gothic')
    ax.plot(points[i], 2.0, 'ko', markersize=5)

ax.text(5.0, 4.0, '빅뱅 우주론의 입자 생성 모식도', ha='center', va='center', fontsize=14, fontweight='bold', fontfamily='Malgun Gothic', bbox=dict(facecolor='white', edgecolor='black', pad=5))

plt.tight_layout()
out_path = r'C:\Users\user\godtonggwa\exam5\plot_q01.png'
plt.savefig(out_path, dpi=600, bbox_inches='tight')
