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

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(8.0, 4.0), dpi=600)

def draw_atom(ax, x, y, shells, draw_nucleus=True):
    if draw_nucleus:
        # 3D shaded small nucleus
        for r_nuc, color in zip([0.15, 0.11, 0.07, 0.03], ['#666666', '#999999', '#cccccc', '#ffffff']):
            ax.add_patch(patches.Circle((x - 0.02, y + 0.02), r_nuc, facecolor=color, edgecolor='none', zorder=2))
    for i, num_e in enumerate(shells):
        r = 0.5 + i * 0.5
        shell = patches.Circle((x, y), r, fill=False, edgecolor='black', lw=1.0, zorder=1)
        ax.add_patch(shell)
        for j in range(num_e):
            angle = np.pi / 2 + j * (2 * np.pi / num_e)
            ex = x + r * np.cos(angle)
            ey = y + r * np.sin(angle)
            electron = patches.Circle((ex, ey), 0.07, facecolor='black', edgecolor='none', zorder=4)
            ax.add_patch(electron)

def draw_bracket_tight(ax, x, y, r_out, label):
    w = 0.15
    h = r_out + 0.2
    gap = r_out + 0.25
    # Left bracket
    xs_L = [x - gap + w, x - gap, x - gap, x - gap + w]
    ys_L = [y + h, y + h, y - h, y - h]
    ax.plot(xs_L, ys_L, color='black', lw=1.2)
    # Right bracket
    xs_R = [x + gap - w, x + gap, x + gap, x + gap - w]
    ys_R = [y + h, y + h, y - h, y - h]
    ax.plot(xs_R, ys_R, color='black', lw=1.2)
    # Charge label
    if label:
        ax.text(x + gap + 0.08, y + h - 0.05, label, fontsize=16, va='center', ha='left', fontfamily='Malgun Gothic')

# (가) 이온 결합 XY
ax1.set_xlim(-4, 4)
ax1.set_ylim(-4, 4)
ax1.axis('off')
ax1.text(0, -3.5, '(가)', ha='center', va='center', fontsize=14, fontfamily='Malgun Gothic')

# X+ (Na+ with 2 shells: 2, 8)
draw_atom(ax1, -1.7, 0, [2, 8])
draw_bracket_tight(ax1, -1.7, 0, 1.0, r'$\mathrm{+}$')
ax1.text(-1.7, -1.6, r'$\mathrm{X^+}$', ha='center', va='center', fontsize=14, fontfamily='Malgun Gothic')

# Y- (F- with 2 shells: 2, 8)
draw_atom(ax1, 1.7, 0, [2, 8])
draw_bracket_tight(ax1, 1.7, 0, 1.0, r'$\mathrm{-}$')
ax1.text(1.7, -1.6, r'$\mathrm{Y^-}$', ha='center', va='center', fontsize=14, fontfamily='Malgun Gothic')


# (나) 공유 결합 Y2
ax2.set_xlim(-4, 4)
ax2.set_ylim(-4, 4)
ax2.axis('off')
ax2.text(0, -3.5, '(나)', ha='center', va='center', fontsize=14, fontfamily='Malgun Gothic')

# Y2 (F2)
r1 = 0.8
r2 = 1.4
d = 2.0
x_L = -1.0
x_R = 1.0
# Intersections for r2 outer shell
# Center at (-1, 0) and (1, 0), radius 1.4.
# Intersection x = 0. y = sqrt(1.4^2 - 1.0^2) = sqrt(1.96 - 1.0) = sqrt(0.96) = 0.9798
y_int = np.sqrt(r2**2 - (d/2)**2)

# Left Y
# 3D shaded small nucleus
for r_nuc, color in zip([0.15, 0.11, 0.07, 0.03], ['#666666', '#999999', '#cccccc', '#ffffff']):
    ax2.add_patch(patches.Circle((x_L - 0.02, 0 + 0.02), r_nuc, facecolor=color, edgecolor='none', zorder=2))
shell_L1 = patches.Circle((x_L, 0), r1, fill=False, edgecolor='black', lw=1.0, zorder=1)
ax2.add_patch(shell_L1)
shell_L2 = patches.Circle((x_L, 0), r2, fill=False, edgecolor='black', lw=1.0, zorder=1)
ax2.add_patch(shell_L2)

# Right Y
for r_nuc, color in zip([0.15, 0.11, 0.07, 0.03], ['#666666', '#999999', '#cccccc', '#ffffff']):
    ax2.add_patch(patches.Circle((x_R - 0.02, 0 + 0.02), r_nuc, facecolor=color, edgecolor='none', zorder=2))
shell_R1 = patches.Circle((x_R, 0), r1, fill=False, edgecolor='black', lw=1.0, zorder=1)
ax2.add_patch(shell_R1)
shell_R2 = patches.Circle((x_R, 0), r2, fill=False, edgecolor='black', lw=1.0, zorder=1)
ax2.add_patch(shell_R2)

ax2.text(0, -2.3, r'$\mathrm{Y_2}$', ha='center', va='center', fontsize=12, fontfamily='Malgun Gothic')

# Electrons
# Inner shells (2 each)
for j in range(2):
    angle = np.pi / 2 + j * np.pi
    ax2.add_patch(patches.Circle((x_L + r1 * np.cos(angle), r1 * np.sin(angle)), 0.07, facecolor='black', zorder=4))
    ax2.add_patch(patches.Circle((x_R + r1 * np.cos(angle), r1 * np.sin(angle)), 0.07, facecolor='black', zorder=4))

# Shared electrons
ax2.add_patch(patches.Circle((0, y_int), 0.07, facecolor='black', zorder=4))
ax2.add_patch(patches.Circle((0, -y_int), 0.07, facecolor='black', zorder=4))

# Outer non-shared electrons (6 each)
theta0 = np.arccos((d/2) / r2) # ~44.4 degrees
# Left Y: from theta0 to 2pi - theta0 (315.6 degrees). span = 360 - 2*theta0
span = 2 * np.pi - 2 * theta0
for k in range(1, 7):
    angle = theta0 + k * (span / 7)
    ex = x_L + r2 * np.cos(angle)
    ey = r2 * np.sin(angle)
    ax2.add_patch(patches.Circle((ex, ey), 0.07, facecolor='black', zorder=4))

# Right Y: from pi+theta0 to pi - theta0 (which means pi+theta0 to 3pi-theta0)
for k in range(1, 7):
    angle = np.pi - theta0 - k * (span / 7)
    ex = x_R + r2 * np.cos(angle)
    ey = r2 * np.sin(angle)
    ax2.add_patch(patches.Circle((ex, ey), 0.07, facecolor='black', zorder=4))

plt.tight_layout()
out_path = r'C:\Users\user\godtonggwa\exam4\plot_q16_v6.png'
plt.savefig(out_path, dpi=600, bbox_inches='tight')
