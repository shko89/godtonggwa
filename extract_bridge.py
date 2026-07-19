import sys

sys.stdout.reconfigure(encoding='utf-8')
with open('g:/내 드라이브/주간지/2주차/week_2028_02_final.html', 'r', encoding='utf-8') as f:
    html_text = f.read()

start = html_text.find('id="bridge-page"')
if start == -1:
    start = html_text.find('bridge-page')

if start != -1:
    div_start = html_text.rfind('<div', 0, start)
    next_page = html_text.find('<div class="a4-page', div_start + 10)
    if next_page != -1:
        out = html_text[div_start:next_page]
    else:
        out = html_text[div_start:div_start+3000]
    
    with open('g:/내 드라이브/주간지/bridge_sample.txt', 'w', encoding='utf-8') as fout:
        fout.write(out)
else:
    print('bridge-page not found')
