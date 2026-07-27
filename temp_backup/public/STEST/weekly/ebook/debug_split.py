import codecs
import re

target_file = r'G:\내 드라이브\주간지\1주차\week_2028_01.html'
with codecs.open(target_file, 'r', 'utf-8') as f:
    content = f.read()

parts = re.split(r'(<div class="a4-page|<div class="page-wrapper)', content)
print('Total parts:', len(parts))
for i in range(1, len(parts), 2):
    page_html = parts[i] + parts[i+1]
    nums = re.findall(r'<div class="page-num">- (\d+) -</div>', page_html)
    print(f'Part {i}: length {len(page_html)}, nums: {nums}')
