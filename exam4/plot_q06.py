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

fig, ax = plt.subplots(figsize=(5.0, 5.0), dpi=600)
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.axis('off')

# KICE arrow marker definition
verts_up = [(-0.2, -0.4), (0.2, -0.4), (0, 0.5), (-0.2, -0.4)]
arrow_up = mpath.Path(verts_up)

# Star Body
center = (5, 5)
radius_star = 4.0
radius_core = 1.5

ax.add_patch(patches.Circle(center, radius_star, facecolor='#eeeeee', edgecolor='black', lw=1.5, zorder=1))
ax.add_patch(patches.Circle(center, radius_core, facecolor='#cccccc', edgecolor='black', lw=1.5, zorder=2))

ax.text(center[0], center[1], '중심부\n(핵융합 반응)', fontsize=12, ha='center', va='center', zorder=3, fontfamily='Malgun Gothic')

# Draw arrows (Gravity Inward, Pressure Outward)
angles = [0, 90, 180, 270]
for angle in angles:
    rad = np.deg2rad(angle)
    # Gravity (Inward) - from surface to core
    # We will use ax.annotate for standard arrows to be simpler, or simple lines with markers
    start_g = (center[0] + (radius_star + 0.2) * np.cos(rad), center[1] + (radius_star + 0.2) * np.sin(rad))
    end_g = (center[0] + (radius_star - 1.2) * np.cos(rad), center[1] + (radius_star - 1.2) * np.sin(rad))
    
    # Pressure (Outward) - from core to surface
    start_p = (center[0] + (radius_core + 0.2) * np.cos(rad), center[1] + (radius_core + 0.2) * np.sin(rad))
    end_p = (center[0] + (radius_core + 1.2) * np.cos(rad), center[1] + (radius_core + 1.2) * np.sin(rad))
    
    ax.annotate('', xy=end_g, xytext=start_g, arrowprops=dict(arrowstyle="->", color='black', lw=2), zorder=4)
    ax.annotate('', xy=end_p, xytext=start_p, arrowprops=dict(arrowstyle="->", color='#555555', lw=2, ls='--'), zorder=4)

# Labels
ax.text(9.5, 5, '㉠', fontsize=14, ha='left', va='center') # Gravity arrow
ax.text(7.0, 4.5, '㉡', fontsize=14, ha='left', va='center') # Pressure arrow (dotted)

# Title
ax.text(5, 9.5, '주계열성의 내부 구조', fontsize=14, ha='center', va='center', fontfamily='Malgun Gothic')

plt.tight_layout()
out_path_project = r'C:\Users\user\godtonggwa\exam4\plot_q06.png'
plt.savefig(out_path_project, dpi=600, bbox_inches='tight')
