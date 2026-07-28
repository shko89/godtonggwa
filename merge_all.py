import os
import glob
import re
from bs4 import BeautifulSoup

d = r'g:\내 드라이브\주간지\1주차'
files = glob.glob(os.path.join(d, 'page*.html'))

def sort_key(f):
    basename = os.path.basename(f)
    m = re.search(r'page0*(\d+)(?:-(\d+))?', basename)
    if m:
        return (int(m.group(1)), int(m.group(2) or 0))
    return (999, 0)

files.sort(key=sort_key)

# We will use the first file as the base template
base_file = files[0]
with open(base_file, 'r', encoding='utf-8') as f:
    base_soup = BeautifulSoup(f.read(), 'html.parser')

base_body = base_soup.find('body')
if base_body:
    base_body.clear()

base_head = base_soup.find('head')
existing_styles = []
for style in base_head.find_all('style'):
    existing_styles.append(style.string or "")

# Merge all pages
for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    # 1. Merge styles
    head = soup.find('head')
    if head:
        for style in head.find_all('style'):
            style_content = style.string or ""
            # very naive check for unique styles, if not in existing_styles we append
            if style_content not in existing_styles:
                existing_styles.append(style_content)
                new_style = base_soup.new_tag('style')
                new_style.string = style_content
                base_head.append(new_style)

    # 2. Merge pages
    for a4_page in soup.find_all(class_='a4-page'):
        base_body.append(a4_page)

out_path = os.path.join(d, 'week_2028_01_final.html')
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(str(base_soup))

print(f"Merged {len(files)} files into week_2028_01_final.html")
