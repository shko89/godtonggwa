import matplotlib.pyplot as plt
import matplotlib.patches as patches
import platform
from matplotlib import rc

if platform.system() == 'Windows':
    rc('font', family=['Malgun Gothic', 'Segoe UI Symbol'])
else:
    rc('font', family=['NanumGothic', 'Segoe UI Symbol'])
plt.rcParams['axes.unicode_minus'] = False 

fig, axes = plt.subplots(1, 3, figsize=(8.0, 3.0), dpi=600)

for ax in axes:
    ax.axis('off')

# (가) 양성자와 중성자
ax = axes[0]
ax.text(0.5, 1.05, '(가)', ha='center', va='bottom', fontsize=12, fontfamily='Malgun Gothic')

# Protons (uud)
circle_p = patches.Circle((0.3, 0.6), 0.25, edgecolor='black', facecolor='white', lw=1.5)
ax.add_patch(circle_p)
ax.text(0.2, 0.7, 'u', ha='center', va='center', fontsize=11, fontfamily='Malgun Gothic')
ax.text(0.4, 0.7, 'u', ha='center', va='center', fontsize=11, fontfamily='Malgun Gothic')
ax.text(0.3, 0.45, 'd', ha='center', va='center', fontsize=11, fontfamily='Malgun Gothic')
ax.text(0.3, 0.2, '입자 A', ha='center', va='top', fontsize=12, fontfamily='Malgun Gothic')

# Neutrons (udd)
circle_n = patches.Circle((0.7, 0.6), 0.25, edgecolor='black', facecolor='lightgray', lw=1.5)
ax.add_patch(circle_n)
ax.text(0.6, 0.7, 'u', ha='center', va='center', fontsize=11, fontfamily='Malgun Gothic')
ax.text(0.8, 0.7, 'd', ha='center', va='center', fontsize=11, fontfamily='Malgun Gothic')
ax.text(0.7, 0.45, 'd', ha='center', va='center', fontsize=11, fontfamily='Malgun Gothic')
ax.text(0.7, 0.2, '입자 B', ha='center', va='top', fontsize=12, fontfamily='Malgun Gothic')
ax.set_xlim(0, 1)
ax.set_ylim(0, 1.2)

# (나) 헬륨 원자핵
ax = axes[1]
ax.text(0.5, 1.05, '(나)', ha='center', va='bottom', fontsize=12, fontfamily='Malgun Gothic')

# 2 protons (white), 2 neutrons (gray) clumped
c1 = patches.Circle((0.42, 0.55), 0.15, edgecolor='black', facecolor='white', lw=1.2)
c2 = patches.Circle((0.58, 0.68), 0.15, edgecolor='black', facecolor='white', lw=1.2)
c3 = patches.Circle((0.42, 0.75), 0.15, edgecolor='black', facecolor='lightgray', lw=1.2)
c4 = patches.Circle((0.58, 0.48), 0.15, edgecolor='black', facecolor='lightgray', lw=1.2)
# Draw them such that they overlap nicely
ax.add_patch(c3)
ax.add_patch(c4)
ax.add_patch(c1)
ax.add_patch(c2)
ax.text(0.5, 0.2, '입자 C', ha='center', va='top', fontsize=12, fontfamily='Malgun Gothic')
ax.set_xlim(0, 1)
ax.set_ylim(0, 1.2)

# (다) 헬륨 원자
ax = axes[2]
ax.text(0.5, 1.05, '(다)', ha='center', va='bottom', fontsize=12, fontfamily='Malgun Gothic')

# Nucleus
c1_d = patches.Circle((0.47, 0.57), 0.06, edgecolor='black', facecolor='white', lw=1)
c2_d = patches.Circle((0.53, 0.63), 0.06, edgecolor='black', facecolor='white', lw=1)
c3_d = patches.Circle((0.47, 0.67), 0.06, edgecolor='black', facecolor='lightgray', lw=1)
c4_d = patches.Circle((0.53, 0.53), 0.06, edgecolor='black', facecolor='lightgray', lw=1)

ax.add_patch(c3_d)
ax.add_patch(c4_d)
ax.add_patch(c1_d)
ax.add_patch(c2_d)

# Electron orbit
orbit = patches.Circle((0.5, 0.6), 0.35, edgecolor='black', facecolor='none', lw=1.0, ls='--')
ax.add_patch(orbit)

# Electrons
e1 = patches.Circle((0.5, 0.95), 0.03, edgecolor='black', facecolor='black')
e2 = patches.Circle((0.5, 0.25), 0.03, edgecolor='black', facecolor='black')
ax.add_patch(e1)
ax.add_patch(e2)
ax.text(0.5, 1.0, '전자', ha='center', va='bottom', fontsize=10, fontfamily='Malgun Gothic')
ax.text(0.5, 0.2, '입자 D', ha='center', va='top', fontsize=12, fontfamily='Malgun Gothic')
ax.set_xlim(0, 1)
ax.set_ylim(0, 1.2)

plt.tight_layout()
out_path = r'C:\Users\user\godtonggwa\exam5\plot_q02.png'
plt.savefig(out_path, dpi=600, bbox_inches='tight')
