import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('g:/내 드라이브/주간지/2주차/week_2028_02_final.html', 'r', encoding='utf-8') as f:
    html_text = f.read()

# Find the first page
page1 = html_text.find('<div class="a4-page')
# Find the second page
page2 = html_text.find('<div class="a4-page', page1 + 10)
# Find the third page
page3 = html_text.find('<div class="a4-page', page2 + 10)
# Find the fourth page
page4 = html_text.find('<div class="a4-page', page3 + 10)

if page3 != -1 and page4 != -1:
    print(html_text[page3:page4])
else:
    print("Could not find page 3")
