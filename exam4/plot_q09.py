import matplotlib.pyplot as plt
import platform
from matplotlib import rc

if platform.system() == 'Windows':
    rc('font', family=['Malgun Gothic', 'Segoe UI Symbol'])
else:
    rc('font', family=['NanumGothic', 'Segoe UI Symbol'])
plt.rcParams['axes.unicode_minus'] = False 

fig, (ax1, ax2, ax3) = plt.subplots(1, 3, figsize=(9.0, 3.5), dpi=600)

# (가) 지구
labels_a = ['㉠', '산소', '규소', '기타']
sizes_a = [35, 30, 15, 20]
colors_a = ['#666666', '#cccccc', '#eeeeee', 'white']

ax1.pie(sizes_a, labels=labels_a, colors=colors_a, autopct='%1.0f%%', startangle=90, counterclock=False,
        labeldistance=0.75, pctdistance=0.4,
        wedgeprops=dict(edgecolor='black', lw=1.2), textprops={'fontsize': 10, 'fontfamily': 'Malgun Gothic'})
ax1.text(0, -1.3, '(가)', fontsize=12, ha='center', va='center', fontfamily='Malgun Gothic')

# (나) 사람
labels_b = ['산소', '㉡', '수소', '기타']
sizes_b = [65, 18, 10, 7]
colors_b = ['#cccccc', '#666666', '#eeeeee', 'white']

ax2.pie(sizes_b, labels=labels_b, colors=colors_b, autopct='%1.0f%%', startangle=90, counterclock=False,
        labeldistance=0.75, pctdistance=0.4,
        wedgeprops=dict(edgecolor='black', lw=1.2), textprops={'fontsize': 10, 'fontfamily': 'Malgun Gothic'})
ax2.text(0, -1.3, '(나)', fontsize=12, ha='center', va='center', fontfamily='Malgun Gothic')

# (다) 우주
labels_c = ['수소', '㉢', '기타']
sizes_c = [74, 24, 2]
colors_c = ['#eeeeee', '#666666', 'white']

ax3.pie(sizes_c, labels=labels_c, colors=colors_c, autopct='%1.0f%%', startangle=90, counterclock=False,
        labeldistance=0.75, pctdistance=0.4,
        wedgeprops=dict(edgecolor='black', lw=1.2), textprops={'fontsize': 10, 'fontfamily': 'Malgun Gothic'})
ax3.text(0, -1.3, '(다)', fontsize=12, ha='center', va='center', fontfamily='Malgun Gothic')

plt.subplots_adjust(bottom=0.2)
out_path_project = r'C:\Users\user\godtonggwa\exam4\plot_q09_inside.png'
plt.savefig(out_path_project, dpi=600, bbox_inches='tight')
