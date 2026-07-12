import matplotlib.pyplot as plt
import matplotlib.patches as patches
import matplotlib.path as mpath
import numpy as np
import platform
from matplotlib import rc

if platform.system() == 'Windows':
    rc('font', family=['Malgun Gothic', 'Segoe UI Symbol'])
else:
    rc('font', family=['NanumGothic', 'Segoe UI Symbol'])
plt.rcParams['axes.unicode_minus'] = False 
plt.rcParams['mathtext.fontset'] = 'cm'

fig, ax = plt.subplots(figsize=(7.0, 3.5), dpi=600)
ax.set_xlim(0, 10)
ax.set_ylim(-0.5, 5.5)
ax.axis('off')

# KICE right-pointing arrow marker
verts_right = [(-0.3, 0.2), (-0.3, -0.2), (0.4, 0), (-0.3, 0.2)]
arrow_right = mpath.Path(verts_right)

def draw_proton(ax, x, y):
    ax.add_patch(patches.Circle((x, y), 0.25, facecolor='white', edgecolor='black', lw=1.5, zorder=2))
    ax.text(x, y, '+', fontsize=12, ha='center', va='center', zorder=3)

def draw_neutron(ax, x, y):
    ax.add_patch(patches.Circle((x, y), 0.25, facecolor='#aaaaaa', edgecolor='black', lw=1.5, zorder=2))

# Trumpet Shape Expanding Universe
x_curve = np.linspace(1, 9, 100)
y_top = 2.5 + 0.8 * np.sqrt(x_curve - 1)
y_bot = 2.5 - 0.8 * np.sqrt(x_curve - 1)

ax.plot(x_curve, y_top, 'k-', lw=2)
ax.plot(x_curve, y_bot, 'k-', lw=2)

# Big Bang Point
ax.plot([1.0], [2.5], marker='*', markersize=20, color='black', markerfacecolor='white')
ax.text(1.0, 3.2, '빅뱅', fontsize=14, ha='center', va='center', fontfamily='Malgun Gothic')

# Time Slices
slices = [
    (2.5, '(A)\n기본 입자'),
    (4.5, '(B)\n㉠'),
    (6.5, '(C)\n헬륨 원자핵'),
    (8.5, '(D)\n㉡')
]

for sx, text in slices:
    yt = 2.5 + 0.8 * np.sqrt(sx - 1)
    yb = 2.5 - 0.8 * np.sqrt(sx - 1)
    # Dotted line for slice
    ax.plot([sx, sx], [yb, yt], color='#888888', linestyle='--', lw=1.5, zorder=1)
    # Text
    ax.text(sx, 2.5, text, fontsize=14, ha='center', va='center', 
            bbox=dict(boxstyle='round,pad=0.3', facecolor='white', edgecolor='black', lw=1.0), zorder=3, fontfamily='Malgun Gothic')

# Time arrow below
ax.plot([1.0, 9.0], [0.1, 0.1], 'k-', lw=1.5)
ax.plot([9.0], [0.1], marker=arrow_right, markersize=12, color='black')
ax.text(5.0, -0.3, '시간 흐름 (우주 팽창 및 냉각)', fontsize=12, ha='center', va='center', fontfamily='Malgun Gothic')

plt.tight_layout()
out_path_project = r'C:\Users\user\godtonggwa\exam4\plot_q01_trumpet_fixed.png'
plt.savefig(out_path_project, dpi=600, bbox_inches='tight')
