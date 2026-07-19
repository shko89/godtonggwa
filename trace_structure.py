import sys
import re

source_file = 'g:/내 드라이브/주간지/2주차/week_2028_02_final.html'
with open(source_file, 'r', encoding='utf-8') as f:
    text = f.read()

for match in re.finditer(r'<div class="page-wrapper"|<div id="flipbook-container"|<div class="a4-page"|<script', text):
    print(f'Match: {match.group(0)} at index {match.start()}')
