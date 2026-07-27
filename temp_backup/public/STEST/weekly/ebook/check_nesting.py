import codecs
import re
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

target_file = r'G:\내 드라이브\주간지\1주차\week_2028_01.html'
with codecs.open(target_file, 'r', 'utf-8') as f:
    content = f.read()

parts = re.split(r'(<div class="a4-page|<div class="page-wrapper)', content)
for i in range(1, len(parts), 2):
    page_html = parts[i] + parts[i+1]
    if len(page_html) < 300:
        print(f'Short block {i}:', repr(page_html))
