import matplotlib.pyplot as plt
import matplotlib.path as mpath
import numpy as np
import platform
from matplotlib import rc

if platform.system() == 'Windows':
    rc('font', family=['Malgun Gothic', 'Segoe UI Symbol'])
else:
    rc('font', family=['NanumGothic', 'Segoe UI Symbol'])
plt.rcParams['axes.unicode_minus'] = False 

verts_up = [(-0.2, -0.4), (0.2, -0.4), (0, 0.5), (-0.2, -0.4)]
verts_right = [(-0.4, -0.2), (-0.4, 0.2), (0.5, 0), (-0.4, -0.2)]
arrow_up = mpath.Path(verts_up)
arrow_right = mpath.Path(verts_right)

fig, ax = plt.subplots(figsize=(4.0, 3.2), dpi=600)
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)

ax.spines['right'].set_visible(False)
ax.spines['top'].set_visible(False)
ax.spines['left'].set_bounds(0, 9.5)
ax.spines['bottom'].set_bounds(0, 9.5)

ax.plot(0, 9.5, marker=arrow_up, color='black', markersize=10, clip_on=False)
ax.plot(9.5, 0, marker=arrow_right, color='black', markersize=10, clip_on=False)

ax.set_xticks([])
ax.set_yticks([])

ax.text(9.5, -0.8, '온도', ha='center', va='top', fontsize=13, fontfamily='Malgun Gothic')
ax.text(-0.8, 9.5, '전\n기\n\n저\n항', ha='right', va='center', fontsize=13, fontfamily='Malgun Gothic', rotation=0)

# Graph A: Conductor (Linear increase, starts low)
x_A = np.linspace(0, 8, 100)
y_A = 1.5 + 0.3 * x_A
ax.plot(x_A, y_A, color='black', lw=1.5, label='물질 A')

# Graph B: Semiconductor (Exponential decrease)
x_B = np.linspace(0, 8, 100)
y_B = 8.0 * np.exp(-0.5 * x_B) + 1.0
ax.plot(x_B, y_B, color='black', ls='--', lw=1.5, label='물질 B')

ax.legend(frameon=True, edgecolor='black', facecolor='white', framealpha=1.0, loc='upper right', fontsize=11)

plt.tight_layout()
out_path = r'C:\Users\user\godtonggwa\exam4\plot_q24.png'
plt.savefig(out_path, dpi=600, bbox_inches='tight')
