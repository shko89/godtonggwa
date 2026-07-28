import sys
from bs4 import BeautifulSoup

file_path = r'g:\내 드라이브\주간지\1주차\week_2028_01_final.html'
with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

page_wrapper = soup.find(class_='page-wrapper')

# Find all wrapper divs that we appended (they have data-scope attributes on their children, or we can just grab the direct children of page-wrapper)
# Actually, the direct children of page-wrapper are the scope wrappers, like <div class="scope-page03">
scope_wrappers = page_wrapper.find_all('div', recursive=False)

# Let's verify what the direct children are
# In merge_all_v5.py:
# wrapper = base_soup.new_tag('div')
# wrapper['class'] = scope_class
# wrapper.append(p)
# page_wrapper.append(wrapper)
# Note: Since some files have multiple .a4-page elements, the wrapper for that file contains multiple .a4-page elements!
# This means if I move page 14 (which is inside page14.html wrapper along with page 13? wait!)
