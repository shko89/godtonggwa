import matplotlib.pyplot as plt
import numpy as np
import platform
from matplotlib import rc
import matplotlib.patches as patches
import matplotlib.patheffects as pe

# 폰트 설정
if platform.system() == 'Windows':
    rc('font', family=['Malgun Gothic', 'Segoe UI Symbol'])
else:
    rc('font', family=['NanumGothic', 'Segoe UI Symbol'])
plt.rcParams['axes.unicode_minus'] = False 
plt.rcParams['mathtext.fontset'] = 'cm'

def draw_nucleus(ax, x, y, r=0.15):
    # 그라데이션 원자핵
    for i in range(10, 0, -1):
        alpha = 0.1 + (10 - i) * 0.08
        circle = patches.Circle((x, y), r * (i/10.0), facecolor='gray', alpha=alpha, edgecolor='none')
        ax.add_patch(circle)
    # 테두리
    ax.add_patch(patches.Circle((x, y), r, fill=False, edgecolor='black', lw=1.2))

def draw_shell(ax, x, y, r):
    ax.add_patch(patches.Circle((x, y), r, fill=False, edgecolor='black', lw=1.2))

def draw_electron(ax, x, y):
    ax.add_patch(patches.Circle((x, y), 0.06, facecolor='black', edgecolor='none'))

def draw_electrons(ax, cx, cy, r, num_electrons, start_angle=90):
    angles = np.linspace(start_angle, start_angle + 360, num_electrons, endpoint=False)
    for angle in angles:
        rad = np.radians(angle)
        ex = cx + r * np.cos(rad)
        ey = cy + r * np.sin(rad)
        draw_electron(ax, ex, ey)

def draw_bracket(ax, x_center, y_center, width, height, charge):
    # 닫힌 사각형이 아닌 열린 선으로 브라켓 그리기
    lw = 1.5
    # 왼쪽 브라켓
    x_left = x_center - width/2
    ax.plot([x_left+0.2, x_left, x_left], [y_center+height/2, y_center+height/2, y_center-height/2], color='black', lw=lw)
    ax.plot([x_left, x_left+0.2], [y_center-height/2, y_center-height/2], color='black', lw=lw)
    
    # 오른쪽 브라켓
    x_right = x_center + width/2
    ax.plot([x_right-0.2, x_right, x_right], [y_center+height/2, y_center+height/2, y_center-height/2], color='black', lw=lw)
    ax.plot([x_right, x_right-0.2], [y_center-height/2, y_center-height/2], color='black', lw=lw)
    
    # 전하 표기
    ax.text(x_right + 0.1, y_center + height/2 + 0.1, r"$\mathrm{"+charge+"}$", fontsize=14, ha='left', va='bottom')

# 그림 셋업 (가)와 (나)
fig, axes = plt.subplots(1, 2, figsize=(8, 4), dpi=600)

### (가) NaF (이온 결합)
ax = axes[0]
ax.set_aspect('equal')
ax.axis('off')
ax.set_xlim(-3.5, 3.5)
ax.set_ylim(-2, 2)
ax.text(0, -1.8, "(가)", fontsize=16, ha='center', va='center')

# Na+ (Left)
cx1, cy1 = -1.6, 0
draw_nucleus(ax, cx1, cy1)
draw_shell(ax, cx1, cy1, 0.5)
draw_shell(ax, cx1, cy1, 1.0)
draw_electrons(ax, cx1, cy1, 0.5, 2)
draw_electrons(ax, cx1, cy1, 1.0, 8)
draw_bracket(ax, cx1, cy1, 2.6, 2.6, "+")
ax.text(cx1, -1.45, r"$\mathrm{A^+}$", fontsize=14, ha='center', va='center')

# F- (Right)
cx2, cy2 = 1.6, 0
draw_nucleus(ax, cx2, cy2)
draw_shell(ax, cx2, cy2, 0.5)
draw_shell(ax, cx2, cy2, 1.0)
draw_electrons(ax, cx2, cy2, 0.5, 2)
draw_electrons(ax, cx2, cy2, 1.0, 8)
draw_bracket(ax, cx2, cy2, 2.6, 2.6, "-")
ax.text(cx2, -1.45, r"$\mathrm{B^-}$", fontsize=14, ha='center', va='center')

### (나) OF2 (공유 결합)
ax = axes[1]
ax.set_aspect('equal')
ax.axis('off')
ax.set_xlim(-4, 4)
ax.set_ylim(-2.5, 2.5)
ax.text(0, -2, "(나)", fontsize=16, ha='center', va='center')

d = 1.6
r = 1.0
intersect_y = np.sqrt(r**2 - (d/2)**2) # 0.6
theta_rad = np.arcsin(intersect_y / r) # 36.87도
theta_deg = np.degrees(theta_rad)

# O (Center)
cx0, cy0 = 0, 0
draw_nucleus(ax, cx0, cy0)
draw_shell(ax, cx0, cy0, 0.5)
draw_shell(ax, cx0, cy0, 1.0)
draw_electrons(ax, cx0, cy0, 0.5, 2)
ax.text(cx0, -1.3, r"$\mathrm{C}$", fontsize=14, ha='center', va='center')

# F (Left)
cxL, cyL = -d, 0
draw_nucleus(ax, cxL, cyL)
draw_shell(ax, cxL, cyL, 0.5)
draw_shell(ax, cxL, cyL, 1.0)
draw_electrons(ax, cxL, cyL, 0.5, 2)
ax.text(cxL, -1.3, r"$\mathrm{B}$", fontsize=14, ha='center', va='center')

# F (Right)
cxR, cyR = d, 0
draw_nucleus(ax, cxR, cyR)
draw_shell(ax, cxR, cyR, 0.5)
draw_shell(ax, cxR, cyR, 1.0)
draw_electrons(ax, cxR, cyR, 0.5, 2)
ax.text(cxR, -1.3, r"$\mathrm{B}$", fontsize=14, ha='center', va='center')

# 공유 전자쌍 (O와 F_L)
draw_electron(ax, cx0 - d/2, intersect_y)
draw_electron(ax, cx0 - d/2, -intersect_y)
# 공유 전자쌍 (O와 F_R)
draw_electron(ax, cx0 + d/2, intersect_y)
draw_electron(ax, cx0 + d/2, -intersect_y)

# 비공유 전자쌍 (O) -> 4개 남음. 
# 공유 범위: 좌측 180-theta ~ 180+theta, 우측 -theta ~ theta
# 상단과 하단에 2개씩.
draw_electron(ax, cx0 + r*np.cos(np.radians(90-30)), cy0 + r*np.sin(np.radians(90-30)))
draw_electron(ax, cx0 + r*np.cos(np.radians(90+30)), cy0 + r*np.sin(np.radians(90+30)))
draw_electron(ax, cx0 + r*np.cos(np.radians(270-30)), cy0 + r*np.sin(np.radians(270-30)))
draw_electron(ax, cx0 + r*np.cos(np.radians(270+30)), cy0 + r*np.sin(np.radians(270+30)))

# 비공유 전자쌍 (F_L) -> 6개 남음.
# 교집합 범위: -theta ~ theta. 나머지: theta ~ 360-theta
angles_FL = np.linspace(theta_deg + 30, 360 - theta_deg - 30, 6)
for angle in angles_FL:
    ex = cxL + r*np.cos(np.radians(angle))
    ey = cyL + r*np.sin(np.radians(angle))
    draw_electron(ax, ex, ey)

# 비공유 전자쌍 (F_R) -> 6개 남음.
# 교집합 범위: 180-theta ~ 180+theta. 나머지: 180+theta ~ 360+180-theta
angles_FR = np.linspace(180+theta_deg + 30, 540-theta_deg - 30, 6)
for angle in angles_FR:
    ex = cxR + r*np.cos(np.radians(angle))
    ey = cyR + r*np.sin(np.radians(angle))
    draw_electron(ax, ex, ey)

plt.tight_layout()
plt.savefig(r'C:\Users\user\gemtest\q1_bonding.png', dpi=600, bbox_inches='tight')
print("Saved to C:\\Users\\user\\gemtest\\q1_bonding.png")
