import matplotlib.pyplot as plt
import numpy as np
import platform
import matplotlib.path as mpath
from matplotlib import rc

if platform.system() == 'Windows':
    rc('font', family=['Malgun Gothic', 'Segoe UI Symbol'])
else:
    rc('font', family=['NanumGothic', 'Segoe UI Symbol'])
plt.rcParams['axes.unicode_minus'] = False 
plt.rcParams['xtick.direction'] = 'in'
plt.rcParams['ytick.direction'] = 'in'

fig, ax = plt.subplots(figsize=(6.5, 3.5), dpi=600)
ax.set_xlim(0, 19.5)
ax.set_ylim(-0.5, 8.5)

x = np.arange(1, 19)
# Valence electrons (H to Ar)
y = [1, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0]

# Draw the main connecting line
ax.plot(x, y, color='lightgray', marker='o', markersize=4, linestyle='-', lw=1.5, zorder=1)

# Highlight A(8, 6), B(9, 7), C(11, 1), D(17, 7)
pts = {8: 'A', 9: 'B', 11: 'C', 17: 'D'}
for px, label in pts.items():
    py = y[px-1]
    ax.plot(px, py, marker='o', color='black', markersize=7, zorder=2)
    ax.text(px, py + 0.4, label, ha='center', va='bottom', fontsize=12, fontfamily='Malgun Gothic', zorder=3)

# Add custom CSAT-style arrows at the end of axes
verts_up = [(-0.15, -0.3), (0.15, -0.3), (0, 0.4), (-0.15, -0.3)]
arrow_up = mpath.Path(verts_up)
verts_right = [(-0.3, -0.15), (-0.3, 0.15), (0.4, 0), (-0.3, -0.15)]
arrow_right = mpath.Path(verts_right)

ax.scatter(19.5, 0, marker=arrow_right, s=80, color='black', clip_on=False, zorder=10)
ax.scatter(0, 8.5, marker=arrow_up, s=80, color='black', clip_on=False, zorder=10)

ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['bottom'].set_bounds(0, 19.5)
ax.spines['left'].set_bounds(0, 8.5)

ax.set_xlabel('원자 번호', fontsize=12, fontfamily='Malgun Gothic')
ax.set_ylabel('원자가 전자 수', fontsize=12, fontfamily='Malgun Gothic')
ax.xaxis.set_label_coords(0.5, -0.1)
ax.yaxis.set_label_coords(-0.08, 0.5)

ax.set_yticks(np.arange(0, 8))
ax.set_xticks([1, 5, 10, 15, 18])

plt.tight_layout()
out_path_project = r'C:\Users\user\godtonggwa\exam4\plot_q15.png'
plt.savefig(out_path_project, dpi=600, bbox_inches='tight')
