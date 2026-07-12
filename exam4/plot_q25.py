import matplotlib.pyplot as plt
import matplotlib.patches as patches
import platform
from matplotlib import rc

if platform.system() == 'Windows':
    rc('font', family=['Malgun Gothic', 'Segoe UI Symbol'])
else:
    rc('font', family=['NanumGothic', 'Segoe UI Symbol'])
plt.rcParams['axes.unicode_minus'] = False 

fig, ax = plt.subplots(figsize=(5.0, 3.0), dpi=600)
ax.set_xlim(-1.2, 4.2)
ax.set_ylim(-0.5, 3.0)
ax.axis('off')

cols = ['13족', '14족', '15족', '16족']
rows = ['2주기', '3주기']

# Draw grid lines
for i in range(3):
    ax.plot([0, 4], [i, i], color='black', lw=1.2)
for i in range(5):
    ax.plot([i, i], [0, 2], color='black', lw=1.2)

# Headers
for i in range(4):
    ax.text(i+0.5, 2.3, cols[i], ha='center', va='center', fontsize=12, fontfamily='Malgun Gothic')
for i in range(2):
    ax.text(-0.6, 1.5-i, rows[i], ha='center', va='center', fontsize=12, fontfamily='Malgun Gothic')

# Fill elements
ax.text(3.5, 1.5, 'X', ha='center', va='center', fontsize=16, fontfamily='Malgun Gothic')
ax.text(0.5, 0.5, 'Y', ha='center', va='center', fontsize=16, fontfamily='Malgun Gothic')
ax.text(1.5, 0.5, 'Z', ha='center', va='center', fontsize=16, fontfamily='Malgun Gothic')

plt.tight_layout()
out_path = r'C:\Users\user\godtonggwa\exam4\plot_q25.png'
plt.savefig(out_path, dpi=600, bbox_inches='tight')
