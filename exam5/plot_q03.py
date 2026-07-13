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

fig, ax = plt.subplots(figsize=(7.5, 3.5), dpi=600)
ax.set_xlim(0, 10)
ax.set_ylim(0, 5)
ax.axis('off')

# Stage (가) - 38만년
ax.text(2.5, 4.2, '(가) 빅뱅 후 38만 년', ha='center', va='center', fontsize=13, fontfamily='Malgun Gothic')
rect_a = patches.Rectangle((1.0, 1.2), 3.0, 2.4, linewidth=1.5, edgecolor='black', facecolor='white')
ax.add_patch(rect_a)

# Draw a short wavelength wave inside (가)
x_a = np.linspace(1.2, 3.8, 200)
y_a = 2.4 + 0.6 * np.sin(2 * np.pi * (x_a - 1.2) / 0.5)
ax.plot(x_a, y_a, 'k-', lw=1.5)

# Wavelength label for (가)
ax.annotate('', xy=(1.2+0.5, 3.2), xytext=(1.2, 3.2), arrowprops=dict(arrowstyle='<->', lw=1.2, color='black'))
ax.text(1.45, 3.3, r'$\lambda_1$', ha='center', va='bottom', fontsize=12)

# Stage (나) - 현재
ax.text(7.5, 4.2, '(나) 현재 우주', ha='center', va='center', fontsize=13, fontfamily='Malgun Gothic')
rect_b = patches.Rectangle((5.5, 0.4), 4.0, 3.2, linewidth=1.5, edgecolor='black', facecolor='white')
ax.add_patch(rect_b)

# Draw a long wavelength wave inside (나)
x_b = np.linspace(5.7, 9.3, 200)
y_b = 2.0 + 0.6 * np.sin(2 * np.pi * (x_b - 5.7) / 1.5)
ax.plot(x_b, y_b, 'k-', lw=1.5)

# Wavelength label for (나)
ax.annotate('', xy=(5.7+1.5, 2.8), xytext=(5.7, 2.8), arrowprops=dict(arrowstyle='<->', lw=1.2, color='black'))
ax.text(6.45, 2.9, r'$\lambda_2$', ha='center', va='bottom', fontsize=12)

# Arrow from (가) to (나)
ax.annotate('', xy=(5.2, 2.4), xytext=(4.3, 2.4),
            arrowprops=dict(arrowstyle='->', lw=2, color='black'))
ax.text(4.75, 2.6, '공간의 팽창', ha='center', va='bottom', fontsize=12, fontweight='bold', fontfamily='Malgun Gothic')

plt.tight_layout()
out_path = r'C:\Users\user\godtonggwa\exam5\plot_q03.png'
plt.savefig(out_path, dpi=600, bbox_inches='tight')
