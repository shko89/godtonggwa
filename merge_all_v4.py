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

with open(ebook_file, 'r', encoding='utf-8') as f:
    ebook_soup = BeautifulSoup(f.read(), 'html.parser')

ebook_head_scripts = ebook_soup.head.find_all('script')
header_title = ebook_soup.find(class_='header-title')
toggle_div = ebook_soup.find('div', style=re.compile('display: flex; gap: 10px'))
flipbook_container = ebook_soup.find(id='flipbook-container')

# ADD A CLOSE BUTTON TO FLIPBOOK CONTAINER!
if flipbook_container:
    # Find the div with the zoom buttons
    zoom_div = flipbook_container.find('div', style=re.compile('position: absolute; top: 20px; left: 20px'))
    if zoom_div:
        close_btn = ebook_soup.new_tag('button')
        close_btn['onclick'] = 'toggleFlipbook()'
        close_btn['style'] = 'padding: 10px 15px; font-size: 16px; background-color: #f8fafc; border: 2px solid #dc2626; border-radius: 8px; cursor: pointer; color: #dc2626; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-left: 20px;'
        close_btn.string = '❌ 닫기 (나가기)'
        zoom_div.append(close_btn)

ebook_body_scripts = ebook_soup.body.find_all('script')

def insert_scope(sel, scope_id):
    if ':' in sel:
        parts = sel.split(':', 1)
        return f'{parts[0]}[data-scope="{scope_id}"]:{parts[1]}'
    else:
        return f'{sel}[data-scope="{scope_id}"]'

def scope_css(css_content, scope_id):
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
                # Map body styles to the .a4-page wrapper directly
                scoped_selectors.append(f'.a4-page[data-scope="{scope_id}"]')
                scoped_selectors.append(f'.concept-page[data-scope="{scope_id}"]')
            else:
                scoped_selectors.append(insert_scope(sel, scope_id))
        if scoped_selectors:
            scoped_css.append(', '.join(scoped_selectors) + ' {' + rules + '}')
    return '\n'.join(scoped_css)

with open(files[0], 'r', encoding='utf-8') as f:
    base_soup = BeautifulSoup(f.read(), 'html.parser')

base_body = base_soup.find('body')
base_body.clear()

base_head = base_soup.find('head')
for style in base_head.find_all('style'):
    style.decompose()

for s in ebook_head_scripts:
    base_head.append(s)

if header_title: base_body.append(header_title)
if toggle_div: base_body.append(toggle_div)

page_wrapper = base_soup.new_tag('div')
page_wrapper['class'] = 'page-wrapper'
base_body.append(page_wrapper)

for fpath in files:
    basename = os.path.basename(fpath).replace('.html', '')
    scope_id = basename
    
    with open(fpath, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    head = soup.find('head')
    if head:
        for style in head.find_all('style'):
            style_content = style.string or ""
            scoped = scope_css(style_content, scope_id)
            new_style = base_soup.new_tag('style')
            new_style.string = scoped
            base_head.append(new_style)

    pages = soup.find_all(class_=re.compile(r'(a4-page|concept-page)'))
    for p in pages:
        # Add data-scope to every element inside this page, including the page itself
        p['data-scope'] = scope_id
        for tag in p.find_all(True):
            tag['data-scope'] = scope_id
        page_wrapper.append(p)

if flipbook_container:
    base_body.append(flipbook_container)
    
for s in ebook_body_scripts:
    base_body.append(s)

out_path = os.path.join(d, 'week_2028_01_final.html')
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(str(base_soup))

print(f"Successfully merged {len(files)} files with data-scope CSS and E-Book close button.")
