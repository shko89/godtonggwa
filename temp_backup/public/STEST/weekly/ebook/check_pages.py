import codecs
import re

target_file = r'G:\내 드라이브\주간지\1주차\week_2028_01.html'
with codecs.open(target_file, 'r', 'utf-8') as f:
    content = f.read()

nums = re.findall(r'<div class="page-num">- (\d+) -</div>', content)
print('Page nums in file:', nums)

# also check if the gap pages have a4-page
m = re.search(r'<div class="page-num">- 05 -</div>', content)
if m:
    idx = m.start()
    print('Context around page 5:', content[max(0, idx-100):min(len(content), idx+50)])
