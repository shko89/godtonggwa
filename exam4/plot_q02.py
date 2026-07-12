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
plt.rcParams['mathtext.fontset'] = 'cm'

fig, ax = plt.subplots(figsize=(7.0, 4.0), dpi=600)
ax.set_xlim(380, 720)
ax.set_ylim(-0.5, 4.5)
ax.axis('off')

# Wavelength lines
lines_X = [450, 550, 650]
lines_Y = [480, 500, 600]
all_lines = lines_X + lines_Y

# Plot (가) Absorption (Bright background, black lines)
ax.text(385, 3.5, '(가)', fontsize=14, ha='right', va='center')
ax.add_patch(patches.Rectangle((400, 3.0), 300, 1.0, facecolor='lightgray', edgecolor='black', lw=1.5, zorder=1))
for wl in all_lines:
    ax.plot([wl, wl], [3.0, 4.0], 'k-', lw=3, zorder=2)

# Plot (나) Emission X (Dark background, white lines)
ax.text(385, 2.0, '(나)', fontsize=14, ha='right', va='center')
ax.add_patch(patches.Rectangle((400, 1.5), 300, 1.0, facecolor='#333333', edgecolor='black', lw=1.5, zorder=1))
for wl in lines_X:
    ax.plot([wl, wl], [1.5, 2.5], color='white', lw=3, zorder=2)

# Plot (다) Emission Y (Dark background, white lines)
ax.text(385, 0.5, '(다)', fontsize=14, ha='right', va='center')
ax.add_patch(patches.Rectangle((400, 0.0), 300, 1.0, facecolor='#333333', edgecolor='black', lw=1.5, zorder=1))
for wl in lines_Y:
    ax.plot([wl, wl], [0.0, 1.0], color='white', lw=3, zorder=2)

# Vertical alignment dotted lines (KICE standard)
for wl in all_lines:
    ax.plot([wl, wl], [0.0, 4.0], color='gray', linestyle='--', lw=1.0, zorder=0)

# Wavelength scale axis (KICE standard)
ax.plot([400, 700], [-0.3, -0.3], 'k-', lw=1.5)
ax.plot([400, 400], [-0.3, -0.4], 'k-', lw=1.5)
ax.plot([700, 700], [-0.3, -0.4], 'k-', lw=1.5)
ax.text(400, -0.5, r'$\mathrm{400}$', fontsize=12, ha='center', va='top')
ax.text(700, -0.5, r'$\mathrm{700}$', fontsize=12, ha='center', va='top')
ax.text(550, -0.55, r'파장$\mathrm{(nm)}$', fontsize=12, ha='center', va='top', fontfamily='Malgun Gothic')

plt.tight_layout()
out_path_project = r'C:\Users\user\godtonggwa\exam4\plot_q02.png'
plt.savefig(out_path_project, dpi=600, bbox_inches='tight')
