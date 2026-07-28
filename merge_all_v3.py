import os
import glob
import re
from bs4 import BeautifulSoup

d = r'g:\내 드라이브\주간지\1주차'
ebook_file = r'C:\Users\user\godtonggwa\public\STEST\weekly\ebook\week_2028_01.html'

def sort_key(f):
    basename = os.path.basename(f)
    m = re.search(r'page0*(\d+)(?:-(\d+))?', basename)
    if m:
        return (int(m.group(1)), int(m.group(2) or 0))
    return (999, 0)

files = glob.glob(os.path.join(d, 'page*.html'))
files.sort(key=sort_key)

# Read ebook file to extract viewer UI and scripts
with open(ebook_file, 'r', encoding='utf-8') as f:
    ebook_soup = BeautifulSoup(f.read(), 'html.parser')

# Get scripts from ebook head
ebook_head_scripts = ebook_soup.head.find_all('script')
# Get header title and toggle button
header_title = ebook_soup.find(class_='header-title')
toggle_div = ebook_soup.find('div', style=re.compile('display: flex; gap: 10px'))
# Get flipbook container
flipbook_container = ebook_soup.find(id='flipbook-container')
# Get inline scripts from body
ebook_body_scripts = ebook_soup.body.find_all('script')

def scope_css(css_content, scope_class):
    css = re.sub(r'/\*.*?\*/', '', css_content, flags=re.DOTALL)
    scoped_css = []
    blocks = css.split('}')
    for block in blocks:
        if not block.strip(): continue
        parts = block.split('{')
        if len(parts) != 2:
            scoped_css.append(block + '}')
            continue
        selectors_str, rules = parts
        selectors = selectors_str.split(',')
        scoped_selectors = []
        for sel in selectors:
            sel = sel.strip()
            if not sel or sel.startswith('@'):
                scoped_selectors.append(sel)
            elif sel == 'body' or sel == 'html':
                scoped_selectors.append(f'.{scope_class}')
            else:
                scoped_selectors.append(f'.{scope_class} {sel}')
        scoped_css.append(', '.join(scoped_selectors) + ' {' + rules + '}')
    return '\n'.join(scoped_css)

# Prepare base
with open(files[0], 'r', encoding='utf-8') as f:
    base_soup = BeautifulSoup(f.read(), 'html.parser')

base_body = base_soup.find('body')
base_body.clear()

base_head = base_soup.find('head')
for s in ebook_head_scripts:
    base_head.append(s)

if header_title: base_body.append(header_title)
if toggle_div: base_body.append(toggle_div)

page_wrapper = base_soup.new_tag('div')
page_wrapper['class'] = 'page-wrapper'
base_body.append(page_wrapper)

existing_styles = set()
# To prevent base_soup from having its own unscoped styles, we will clear all styles from base_head except linked ones.
for style in base_head.find_all('style'):
    style.decompose()

# Merge all pages with scoping
for fpath in files:
    basename = os.path.basename(fpath).replace('.html', '')
    scope_class = f"scope-{basename}"
    
    with open(fpath, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    # Merge styles
    head = soup.find('head')
    if head:
        for style in head.find_all('style'):
            style_content = style.string or ""
            scoped = scope_css(style_content, scope_class)
            # Add to head
            new_style = base_soup.new_tag('style')
            new_style.string = scoped
            base_head.append(new_style)

    # Wrap pages
    wrapper = base_soup.new_tag('div')
    wrapper['class'] = scope_class
    
    # Sometimes they use .concept-page, sometimes .a4-page
    pages = soup.find_all(class_=re.compile(r'(a4-page|concept-page)'))
    for p in pages:
        wrapper.append(p)
        
    page_wrapper.append(wrapper)

if flipbook_container:
    base_body.append(flipbook_container)
    
for s in ebook_body_scripts:
    base_body.append(s)

out_path = os.path.join(d, 'week_2028_01_final.html')
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(str(base_soup))

print(f"Successfully merged {len(files)} files with scoped CSS and E-Book mode.")
