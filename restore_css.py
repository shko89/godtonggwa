import os
import re
from bs4 import BeautifulSoup

d = r'g:\내 드라이브\주간지\1주차'
page35_path = os.path.join(d, 'page35.html')
page36_path = os.path.join(d, 'page36.html')

with open(page35_path, 'r', encoding='utf-8') as f:
    soup35 = BeautifulSoup(f.read(), 'html.parser')

with open(page36_path, 'r', encoding='utf-8') as f:
    soup36 = BeautifulSoup(f.read(), 'html.parser')

style35 = soup35.find('style')
style36 = soup36.find('style')

if style35 and style36:
    # Just copy the entire style block from page35 to page36, as they should be structurally identical now
    # Wait, they might have different things, but for weekly_common.css and local overrides they should be same.
    style36.string = style35.string
    
    with open(page36_path, 'w', encoding='utf-8') as f:
        f.write(str(soup36))
    print("Copied style from page35.html to page36.html to restore consistency.")
else:
    print("Could not find style tags in one of the files.")
