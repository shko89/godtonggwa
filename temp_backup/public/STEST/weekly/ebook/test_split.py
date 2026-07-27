import codecs
import re

target_file = r'G:\내 드라이브\주간지\1주차\week_2028_01.html'
with codecs.open(target_file, 'r', 'utf-8') as f:
    content = f.read()

styles = re.findall(r'<style>(.*?)</style>', content, re.DOTALL)
print('Found', len(styles), 'style blocks. First block length:', len(styles[0]) if styles else 0)

parts = re.split(r'(<div class="a4-page|<div class="page-wrapper)', content)
print('Split into', len(parts), 'parts')
