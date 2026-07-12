import matplotlib.pyplot as plt
import matplotlib.patches as patches
import platform
from matplotlib import rc

if platform.system() == 'Windows':
    rc('font', family=['Malgun Gothic', 'Segoe UI Symbol'])
else:
    rc('font', family=['NanumGothic', 'Segoe UI Symbol'])
plt.rcParams['axes.unicode_minus'] = False 

fig, ax = plt.subplots(figsize=(8.0, 3.5), dpi=600)
ax.set_xlim(-1.5, 19)
ax.set_ylim(-4, 1.5)
ax.axis('off')

cols = [1, 2, 13, 14, 15, 16, 17, 18]
rows = [1, 2, 3]

# Table Headers
for col in cols:
    ax.text(col, 0.5, str(col), ha='center', va='center', fontsize=11, fontfamily='Malgun Gothic')
ax.text(-0.8, 1.0, '족', ha='center', va='center', fontsize=10, fontfamily='Malgun Gothic')
ax.text(-0.8, 0.0, '주기', ha='center', va='center', fontsize=10, fontfamily='Malgun Gothic')
ax.plot([-1.2, -0.4], [1.3, -0.3], 'k-', lw=1.0) # diagonal line for corner cell

for row in rows:
    ax.text(-0.8, -row, str(row), ha='center', va='center', fontsize=11, fontfamily='Malgun Gothic')

# Draw grid
for row in rows:
    for col in cols:
        if row == 1 and col not in [1, 18]:
            continue
        ax.add_patch(patches.Rectangle((col-0.5, -row-0.5), 1, 1, fill=True, facecolor='white', edgecolor='black', lw=1.2))

# Fill empty space with a dotted line for period 1
ax.plot([2.5, 16.5], [-1.0, -1.0], color='gray', linestyle='--', lw=1.0)

elements = {(2, 1): 'A', (3, 1): 'B', (2, 17): 'C', (3, 17): 'D'}
for (r, c), name in elements.items():
    ax.text(c, -r, name, ha='center', va='center', fontsize=12, fontfamily='Malgun Gothic')

plt.tight_layout()
out_path_project = r'C:\Users\user\godtonggwa\exam4\plot_q11.png'
plt.savefig(out_path_project, dpi=600, bbox_inches='tight')
