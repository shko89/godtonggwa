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
ax.set_xlim(0, 12)
ax.set_ylim(0, 6)
ax.axis('off')

def draw_student(ax, x, y, name, text):
    # Student head and body (Line art)
    ax.add_patch(patches.Circle((x, y), 0.5, facecolor='white', edgecolor='black', lw=1.5, zorder=2))
    ax.add_patch(patches.PathPatch(
        plt.matplotlib.path.Path([(x-0.6, y-1.5), (x-0.4, y-0.5), (x+0.4, y-0.5), (x+0.6, y-1.5)]),
        facecolor='white', edgecolor='black', lw=1.5, zorder=1
    ))
    ax.text(x, y-1.8, f'학생 {name}', fontsize=14, ha='center', fontfamily='Malgun Gothic')
    
    # Speech bubble (Rectangle with pointer)
    bubble_y = y + 1.2
    bubble_w = 3.2
    bubble_h = 1.8
    ax.add_patch(patches.Rectangle((x - bubble_w/2, bubble_y), bubble_w, bubble_h, 
                                   facecolor='white', edgecolor='black', lw=1.2, zorder=2))
    # Pointer
    ax.plot([x-0.2, x, x+0.2], [bubble_y, bubble_y-0.4, bubble_y], 'k-', lw=1.2, zorder=1)
    # Hide the line under the pointer
    ax.plot([x-0.19, x+0.19], [bubble_y, bubble_y], color='white', lw=2.0, zorder=3)
    
    # Text inside bubble
    ax.text(x, bubble_y + bubble_h/2, text, fontsize=11, ha='center', va='center', zorder=4, 
            wrap=True, fontfamily='Malgun Gothic', linespacing=1.5)

# Wrap text manually for matplotlib
text_A = "빅뱅 직후 우주는\n너무 뜨거워서 원자핵이나\n원자가 존재할 수 없는\n상태였어."
text_B = "우주가 팽창하며\n충분히 냉각되자 전자가 원자핵의\n인력에 묶여 원자가 처음으로\n형성되었지."
text_C = "외부 은하의 스펙트럼을\n분석하면 우주 전역에\n탄소와 산소가 가장 풍부하게\n존재한다는 걸 알 수 있어."

draw_student(ax, 2.0, 2.0, 'A', text_A)
draw_student(ax, 6.0, 2.0, 'B', text_B)
draw_student(ax, 10.0, 2.0, 'C', text_C)

plt.tight_layout()
out_path_project = r'C:\Users\user\godtonggwa\exam4\plot_q05_v2.png'
plt.savefig(out_path_project, dpi=600, bbox_inches='tight')
