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

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(8.0, 3.5), dpi=600)

def draw_particles_a(ax):
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis('off')
    ax.text(5, 10.5, '(가) 불투명한 우주', fontsize=14, ha='center', fontfamily='Malgun Gothic')
    
    # Protons and Electrons scattered
    np.random.seed(42)
    px = np.random.uniform(1, 9, 8)
    py = np.random.uniform(1, 9, 8)
    ex = np.random.uniform(1, 9, 8)
    ey = np.random.uniform(1, 9, 8)
    
    for x, y in zip(px, py):
        ax.add_patch(patches.Circle((x, y), 0.4, facecolor='white', edgecolor='black', lw=1.5, zorder=2))
        ax.text(x, y, '+', fontsize=10, ha='center', va='center', zorder=3)
    for x, y in zip(ex, ey):
        ax.add_patch(patches.Circle((x, y), 0.2, facecolor='#dddddd', edgecolor='black', lw=1.5, zorder=2))
        ax.text(x, y, '-', fontsize=8, ha='center', va='center', zorder=3)
        
    # Bouncing photon
    ax.plot([0, px[0], ex[1], px[2], ex[3]], [5, py[0], ey[1], py[2], ey[3]], color='#ff9900', linestyle='-', lw=2, zorder=1)
    
def draw_particles_b(ax):
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis('off')
    ax.text(5, 10.5, '(나) 투명한 우주', fontsize=14, ha='center', fontfamily='Malgun Gothic')
    
    # Atoms (Proton + Electron close)
    np.random.seed(43)
    ax_x = np.random.uniform(2, 8, 8)
    ax_y = np.random.uniform(1, 9, 8)
    
    for x, y in zip(ax_x, ax_y):
        ax.add_patch(patches.Circle((x, y), 0.4, facecolor='white', edgecolor='black', lw=1.5, zorder=2))
        ax.text(x, y, '+', fontsize=10, ha='center', va='center', zorder=3)
        ax.add_patch(patches.Circle((x+0.6, y+0.6), 0.2, facecolor='#dddddd', edgecolor='black', lw=1.5, zorder=2))
        ax.text(x+0.6, y+0.6, '-', fontsize=8, ha='center', va='center', zorder=3)
        # Orbit dotted line
        ax.add_patch(patches.Circle((x, y), 0.85, facecolor='none', edgecolor='gray', linestyle='--', lw=1.0, zorder=1))
        
    # Straight photons
    for y_pos in [2, 5, 8]:
        ax.plot([0, 10], [y_pos, y_pos], color='#ff9900', linestyle='-', lw=2, zorder=1)
        ax.plot(9.5, y_pos, marker='>', color='#ff9900', markersize=8)

draw_particles_a(ax1)
draw_particles_b(ax2)

# Legend
leg_ax = fig.add_axes([0.4, 0.0, 0.2, 0.15])
leg_ax.axis('off')
leg_ax.add_patch(patches.Rectangle((0,0), 1, 1, facecolor='white', edgecolor='black', lw=1.0, transform=leg_ax.transAxes))
leg_ax.add_patch(patches.Circle((0.2, 0.5), 0.15, facecolor='white', edgecolor='black', lw=1.5, transform=leg_ax.transAxes))
leg_ax.text(0.2, 0.5, '+', fontsize=8, ha='center', va='center', transform=leg_ax.transAxes)
leg_ax.text(0.3, 0.5, '원자핵', fontsize=10, va='center', transform=leg_ax.transAxes, fontfamily='Malgun Gothic')

leg_ax.add_patch(patches.Circle((0.7, 0.5), 0.1, facecolor='#dddddd', edgecolor='black', lw=1.5, transform=leg_ax.transAxes))
leg_ax.text(0.7, 0.5, '-', fontsize=6, ha='center', va='center', transform=leg_ax.transAxes)
leg_ax.text(0.75, 0.5, '전자', fontsize=10, va='center', transform=leg_ax.transAxes, fontfamily='Malgun Gothic')

plt.tight_layout()
out_path_project = r'C:\Users\user\godtonggwa\exam4\plot_q03.png'
plt.savefig(out_path_project, dpi=600, bbox_inches='tight')
