import codecs
import re

target_file = r'G:\내 드라이브\주간지\1주차\week_2028_01.html'
with codecs.open(target_file, 'r', 'utf-8') as f:
    content = f.read()

parts = re.split(r'(<div class="a4-page|<div class="page-wrapper)', content)
print('Part 5+6:', repr(parts[5] + parts[6]))
print('Part 7+8:', repr(parts[7] + parts[8])[:200])
