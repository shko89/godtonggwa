import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('g:/내 드라이브/주간지/2주차/week_2028_02_final.html', 'r', encoding='utf-8') as f:
    html_text = f.read()

page_start = html_text.find('<div class="a4-page cover-page"')
next_page = html_text.find('<div class="a4-page', page_start+10)
if next_page != -1:
    print(html_text[page_start:next_page])
else:
    print(html_text[page_start:page_start+2000])
