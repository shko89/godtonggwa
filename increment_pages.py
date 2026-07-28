import os
import glob
import re
from bs4 import BeautifulSoup

d = r'g:\내 드라이브\주간지\1주차'
files = glob.glob(os.path.join(d, 'page*.html'))

def get_num(f):
    basename = os.path.basename(f)
    m = re.search(r'page0*(\d+)(?:-(\d+))?', basename)
    if m:
        return (int(m.group(1)), int(m.group(2) or 0))
    return (999, 0)

files.sort(key=get_num, reverse=True)

# Process all files except page01.html
for fpath in files:
    basename = os.path.basename(fpath)
    if basename == 'page01.html':
        continue
    
    m = re.search(r'page(0*)(\d+)(.*)\.html', basename)
    if not m:
        continue
        
    prefix_zeros = m.group(1)
    num = int(m.group(2))
    suffix = m.group(3)
    
    new_num = num + 1
    new_num_str = f"{new_num:02d}"
    
    # We always format as 2 digits, e.g. 02 -> 03, 11 -> 12
    # if original had three digits like 011, wait, 'page011-1.html'
    if prefix_zeros == '0' and num >= 10:
        # page011 -> page012
        new_basename = f"page0{new_num}{suffix}.html"
    else:
        new_basename = f"page{new_num:02d}{suffix}.html"
        
    new_fpath = os.path.join(d, new_basename)
    
    # Read HTML and update page-num
    with open(fpath, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
        
    for p in soup.find_all(class_='page-num'):
        txt = p.text.strip()
        # text should be like "- 02 -"
        tm = re.search(r'-\s*(\d+)\s*-', txt)
        if tm:
            old_pnum = int(tm.group(1))
            new_pnum = old_pnum + 1
            p.string = f"- {new_pnum:02d} -"
            
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(str(soup))
        
    os.rename(fpath, new_fpath)
    print(f"Renamed {basename} -> {new_basename} and updated page-num")

# Now create a blank page02.html
blank_html = """<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <title>Blank Page</title>
    <style>
        body { margin: 0; padding: 40px 20px; display: flex; flex-direction: column; align-items: center; background-color: #cbd5e1; }
        .a4-page { width: 500px; height: 707px; background-color: #ffffff; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3); position: relative; }
    </style>
</head>
<body>
    <div class="a4-page"></div>
</body>
</html>
"""
with open(os.path.join(d, 'page02.html'), 'w', encoding='utf-8') as f:
    f.write(blank_html)
print("Created blank page02.html")
