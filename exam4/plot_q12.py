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

fig, axes = plt.subplots(1, 3, figsize=(9.0, 3.5), dpi=600)

def draw_bohr_model(ax, name, shells, label):
    ax.set_xlim(-4, 4)
    ax.set_ylim(-4, 4)
    ax.axis('off')
    
    # Nucleus (기호 배제, 무지 구체)
    nucleus = patches.Circle((0, 0), 0.6, facecolor='lightgray', edgecolor='black', lw=1.2, zorder=2)
    ax.add_patch(nucleus)
    
    # Shells and electrons
    for i, num_e in enumerate(shells):
        r = 1.2 + i * 0.9
        shell = patches.Circle((0, 0), r, fill=False, edgecolor='black', lw=1.0, zorder=1)
        ax.add_patch(shell)
        
        for j in range(num_e):
            angle = np.pi / 2 + j * (2 * np.pi / num_e)
            x = r * np.cos(angle)
            y = r * np.sin(angle)
            electron = patches.Circle((x, y), 0.15, facecolor='black', edgecolor='none', zorder=4)
            ax.add_patch(electron)
            
    # 라벨은 하단 배치
    ax.text(0, -3.8, f'{label} 원자 {name}', ha='center', va='center', fontsize=14, fontfamily='Malgun Gothic')

draw_bohr_model(axes[0], 'A', [2, 6], '(가)')
draw_bohr_model(axes[1], 'B', [2, 7], '(나)')
draw_bohr_model(axes[2], 'C', [2, 8, 1], '(다)')

plt.tight_layout()
out_path = r'C:\Users\user\godtonggwa\exam4\plot_q12_fixed.png'
plt.savefig(out_path, dpi=600, bbox_inches='tight')
