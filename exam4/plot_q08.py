import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np
import platform
from matplotlib import rc

if platform.system() == 'Windows':
    rc('font', family=['Malgun Gothic', 'Segoe UI Symbol'])
else:
    rc('font', family=['NanumGothic', 'Segoe UI Symbol'])
plt.rcParams['axes.unicode_minus'] = False 

fig, (ax1, ax2, ax3) = plt.subplots(1, 3, figsize=(7.0, 3.0), dpi=150)

for ax in [ax1, ax2, ax3]:
    ax.set_xlim(0, 10)
    ax.set_ylim(-2, 10)
    ax.axis('off')

# (가) 성운
ax1.text(5, -1, '(가) 태양계 성운 형성', fontsize=12, ha='center', fontfamily='Malgun Gothic')
np.random.seed(0)
for _ in range(60):
    cx = 5 + np.random.normal(0, 1.5)
    cy = 4.5 + np.random.normal(0, 1.5)
    ax1.add_patch(patches.Circle((cx, cy), 0.3, facecolor='#dddddd', edgecolor='none', alpha=0.7))

# (나) 원시 태양과 원반
ax2.text(5, -1, '(나) 원시 태양과 회전 원반', fontsize=12, ha='center', fontfamily='Malgun Gothic')
ax2.add_patch(patches.Ellipse((5, 4.5), 8, 2.5, facecolor='#eeeeee', edgecolor='black', lw=1.0, zorder=1))
ax2.add_patch(patches.Circle((5, 4.5), 1.2, facecolor='white', edgecolor='black', lw=1.5, zorder=2))
ax2.text(5, 4.5, '원시\n태양', fontsize=10, ha='center', va='center', zorder=3, fontfamily='Malgun Gothic')

# (다) 미행성체와 원시 행성
ax3.text(5, -1, '(다) 원시 태양계 형성', fontsize=12, ha='center', fontfamily='Malgun Gothic')
ax3.add_patch(patches.Circle((5, 4.5), 0.8, facecolor='white', edgecolor='black', lw=1.5, zorder=2))
ax3.text(5, 4.5, '태양', fontsize=10, ha='center', va='center', zorder=3, fontfamily='Malgun Gothic')

# Orbits and planets
for r in [2.0, 3.5]:
    ax3.add_patch(patches.Ellipse((5, 4.5), r*2, r*0.8, fill=False, edgecolor='gray', linestyle='--', lw=1.0, zorder=1))

# Planets
ax3.add_patch(patches.Circle((5 - 2.0, 4.5), 0.25, facecolor='white', edgecolor='black', lw=1.5, zorder=4))
ax3.text(5 - 2.0, 3.7, '미행성체', fontsize=9, ha='center', va='top', fontfamily='Malgun Gothic')

ax3.add_patch(patches.Circle((5 + 3.5, 4.5), 0.4, facecolor='white', edgecolor='black', lw=1.5, zorder=4))
ax3.text(5 + 3.5, 3.5, '원시 행성', fontsize=9, ha='center', va='top', fontfamily='Malgun Gothic')

# Removed buggy global arrows

plt.tight_layout()
out_path_project = r'C:\Users\user\godtonggwa\exam4\plot_q08_v3.png'
plt.savefig(out_path_project, dpi=600, bbox_inches='tight')
plt.show()