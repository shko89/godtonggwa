import matplotlib.pyplot as plt
import matplotlib.patches as patches
import platform
from matplotlib import rc

if platform.system() == 'Windows':
    rc('font', family=['Malgun Gothic', 'Segoe UI Symbol'])
else:
    rc('font', family=['NanumGothic', 'Segoe UI Symbol'])
plt.rcParams['axes.unicode_minus'] = False 

fig, ax = plt.subplots(figsize=(7.0, 4.0), dpi=600)
ax.set_xlim(0, 11.5)
ax.set_ylim(0, 8)
ax.axis('off')

def draw_box(x, y, w, h, text):
    ax.add_patch(patches.Rectangle((x-w/2, y-h/2), w, h, fill=True, facecolor='white', edgecolor='black', lw=1.5))
    ax.text(x, y, text, ha='center', va='center', fontsize=12, fontfamily='Malgun Gothic')

def draw_diamond(x, y, w, h, text):
    pts = [(x, y+h/2), (x+w/2, y), (x, y-h/2), (x-w/2, y)]
    ax.add_patch(patches.Polygon(pts, fill=True, facecolor='white', edgecolor='black', lw=1.5))
    ax.text(x, y, text, ha='center', va='center', fontsize=12, fontfamily='Malgun Gothic')

def draw_arrow(x1, y1, x2, y2, text='', text_offset=(0,0)):
    ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                arrowprops=dict(arrowstyle='->', lw=1.5, color='black'))
    if text:
        ax.text((x1+x2)/2 + text_offset[0], (y1+y2)/2 + text_offset[1], text, ha='center', va='center', fontsize=11, fontfamily='Malgun Gothic', bbox=dict(facecolor='white', edgecolor='none', pad=2))

# Elements
draw_box(2.5, 7.3, 4.2, 0.8, '물, 염화 나트륨, 이산화 탄소')
draw_arrow(2.5, 6.9, 2.5, 5.8)

draw_diamond(2.5, 4.5, 4.0, 2.6, '(가)')
draw_arrow(2.5, 3.2, 2.5, 1.8, '예', (0.3, 0))
draw_arrow(4.5, 4.5, 5.8, 4.5, '아니요', (0, 0.3))

draw_box(2.5, 1.3, 1.5, 1.0, 'A')

draw_diamond(7.5, 4.5, 3.4, 2.6, '실온에서\n기체인가?')
draw_arrow(7.5, 3.2, 7.5, 1.8, '예', (0.3, 0))
draw_arrow(9.2, 4.5, 10.1, 4.5, '아니요', (0, 0.3))

draw_box(7.5, 1.3, 1.5, 1.0, 'B')
draw_box(10.6, 4.5, 1.0, 1.0, 'C') 

plt.tight_layout()
out_path = r'C:\Users\user\godtonggwa\exam4\plot_q18.png'
plt.savefig(out_path, dpi=600, bbox_inches='tight')
