import matplotlib.pyplot as plt
import matplotlib.patches as patches
import platform
from matplotlib import rc

if platform.system() == 'Windows':
    rc('font', family=['Malgun Gothic', 'Segoe UI Symbol'])
else:
    rc('font', family=['NanumGothic', 'Segoe UI Symbol'])
plt.rcParams['axes.unicode_minus'] = False 

fig, ax = plt.subplots(figsize=(5.0, 3.5), dpi=600)
ax.set_xlim(0, 8)
ax.set_ylim(0, 6)
ax.axis('off')

# Circle A (Left, Conductor)
circle_A = patches.Circle((3.2, 3), 2.2, fill=False, edgecolor='black', lw=1.5)
ax.add_patch(circle_A)

# Circle B (Right, Semiconductor)
circle_B = patches.Circle((4.8, 3), 2.2, fill=False, edgecolor='black', lw=1.5)
ax.add_patch(circle_B)

# Labels
ax.text(1.5, 4.7, '도체', ha='center', va='center', fontsize=14, fontweight='bold', fontfamily='Malgun Gothic')
ax.text(6.5, 4.7, '반도체', ha='center', va='center', fontsize=14, fontweight='bold', fontfamily='Malgun Gothic')

ax.text(2.0, 3, '(가)', ha='center', va='center', fontsize=14, fontfamily='Malgun Gothic')
ax.text(4.0, 3, '(나)', ha='center', va='center', fontsize=14, fontfamily='Malgun Gothic')
ax.text(6.0, 3, '(다)', ha='center', va='center', fontsize=14, fontfamily='Malgun Gothic')

plt.tight_layout()
out_path = r'C:\Users\user\godtonggwa\exam4\plot_q22.png'
plt.savefig(out_path, dpi=600, bbox_inches='tight')
