import sys
import json

js_path = 'g:/내 드라이브/주간지/3주차/weekly_part1.js'
html_path = 'g:/내 드라이브/주간지/2주차/week_2028_02_final.html'

with open(js_path, 'r', encoding='utf-8') as f:
    js_text = f.read()

print('--- JS META SNIPPET ---')
meta_start = js_text.find('meta')
if meta_start != -1:
    print(js_text[max(0, meta_start-50):min(len(js_text), meta_start+500)])
else:
    print('No meta found in JS')

print('\\n--- HTML PAGE 1 SNIPPET ---')
with open(html_path, 'r', encoding='utf-8') as f:
    html_text = f.read()

# Just print the first <div class="a4-page
page_start = html_text.find('<div class="a4-page')
if page_start != -1:
    print(html_text[page_start:page_start+1000])
else:
    print('Cover page not found')
