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

fig, axes = plt.subplots(1, 2, figsize=(7.5, 3.8), dpi=600)

for ax in axes:
    ax.set_xlim(0, 6)
    ax.set_ylim(0, 10)
    ax.spines['right'].set_visible(False)
    ax.spines['top'].set_visible(False)
    ax.spines['left'].set_bounds(0, 9.5)
    ax.spines['bottom'].set_bounds(0, 5.5)
    
    ax.plot(0, 9.5, marker=arrow_up, color='black', markersize=10, clip_on=False)
    ax.plot(5.5, 0, marker=arrow_right, color='black', markersize=10, clip_on=False)
    
    ax.set_xticks([1, 2, 3, 4, 5])
    ax.set_xticklabels(['10', '20', '30', '40', '50'])
    ax.set_yticks([])
    
    ax.text(5.5, -0.8, '시간\n(억 년)', ha='center', va='top', fontsize=11, fontfamily='Malgun Gothic')
    ax.text(-0.5, 9.5, '누적\n발생\n횟수', ha='right', va='center', fontsize=11, fontfamily='Malgun Gothic', rotation=0)

# Panel 1: 영역 A (Observed)
ax = axes[0]
ax.text(2.5, 10.5, '[관측 영역 X]', ha='center', va='center', fontsize=12, bbox=dict(facecolor='white', edgecolor='black', pad=3))

x = np.array([1, 2, 3, 4, 5])
y1 = np.array([2, 4, 6, 8, 9])
y2 = np.array([0, 0, 0, 3, 5])

ax.plot(x, y1, 'k--', label='태양 질량 별의 누적 소멸 횟수')
ax.plot(x, y2, 'k-.', label='누적 초신성 폭발 횟수')

ax2 = ax.twinx()
ax2.set_ylim(0, 10)
ax2.spines['left'].set_visible(False)
ax2.spines['top'].set_visible(False)
ax2.spines['bottom'].set_visible(False)
ax2.spines['right'].set_bounds(0, 9.5)
ax2.plot(1.0, 9.5, marker=arrow_up, color='black', markersize=10, clip_on=False, transform=ax2.get_yaxis_transform())
ax2.set_yticks([])
ax2.text(1.1, 9.5, '무\n거\n운\n\n원\n소\n\n비\n율', ha='left', va='center', fontsize=11, fontfamily='Malgun Gothic', rotation=0, transform=ax2.get_yaxis_transform())

y3 = np.array([0.5, 0.5, 0.5, 4.5, 7.5])
ax2.plot(x, y3, 'k-', label='무거운 원소 비율')

lines_1, labels_1 = ax.get_legend_handles_labels()
lines_2, labels_2 = ax2.get_legend_handles_labels()
ax.legend(lines_1 + lines_2, labels_1 + labels_2, loc='upper left', fontsize=9, frameon=True, edgecolor='black')

# Panel 2: 영역 B (Predicted)
ax = axes[1]
ax.text(2.5, 10.5, '[관측 영역 Y 예측]', ha='center', va='center', fontsize=12, bbox=dict(facecolor='white', edgecolor='black', pad=3))

y1_pred = np.array([1, 3, 5, 7, 9])
y2_pred = np.array([0, 0, 2, 4, 6]) # Jumps at 30억 년
ax.plot(x, y1_pred, 'k--', label='태양 질량 별의 누적 소멸 횟수')
ax.plot(x, y2_pred, 'k-.', label='누적 초신성 폭발 횟수')

ax.legend(loc='upper left', fontsize=9, frameon=True, edgecolor='black')

plt.tight_layout()
out_path = r'C:\Users\user\godtonggwa\exam4\plot_q07_v2.png'
plt.savefig(out_path, dpi=600, bbox_inches='tight')
