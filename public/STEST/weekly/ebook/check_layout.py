import codecs
import re
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

target_file = r'C:\Users\shko8\godtonggwa\public\STEST\weekly\ebook\week_2028_01.html'
with codecs.open(target_file, 'r', 'utf-8') as f:
    content = f.read()

print('--- PAGE 3 MAP ELEMENTS ---')
m = re.search(r'(<div class="map-container">.*?<div class="page-num">)', content, re.DOTALL)
if m:
    print(m.group(1))

print('\n--- CSS FOR TUTORS SCHEMA ---')
css_matches = re.findall(r'(\.[a-zA-Z0-9_-]*handwriting[a-zA-Z0-9_-]*\s*\{.*?\})', content)
print('\n'.join(css_matches))
css_matches2 = re.findall(r'(\.hw-table\s*\{.*?\})', content)
print('\n'.join(css_matches2))
