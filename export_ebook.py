import sys
import shutil
from bs4 import BeautifulSoup
import copy

source_path = r'g:\내 드라이브\주간지\1주차\week_2028_01_final.html'
reference_path = r'C:\Users\user\godtonggwa\public\STEST\weekly\ebook\week_2028_02_final.html'
dest_path = r'C:\Users\user\godtonggwa\public\STEST\weekly\ebook\week_2028_01_final.html'

# 1. Parse reference
with open(reference_path, 'r', encoding='utf-8', errors='ignore') as f:
    ref_soup = BeautifulSoup(f.read(), 'html.parser')

security_module_script = None
security_style = None

for tag in ref_soup.head.find_all('script', type='module'):
    if 'firebaseConfig' in tag.text and 'Anti-copy measures' in tag.text:
        security_module_script = copy.copy(tag)
        break

for tag in ref_soup.head.find_all('style'):
    if 'user-select: none' in tag.text and 'display: none' in tag.text:
        security_style = copy.copy(tag)
        break

# 2. Parse source
with open(source_path, 'r', encoding='utf-8', errors='ignore') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

# Delete pages from index 29 (which is '- 30 -') onwards
pw = soup.find(class_='page-wrapper')
pages = pw.find_all(recursive=False)

pw.clear()
for i, p in enumerate(pages):
    if i < 29:
        pw.append(p)
    else:
        break # Skip 29 and above

# Insert security scripts and styles into head
if security_module_script:
    existing = False
    for tag in soup.head.find_all('script'):
        if 'firebaseConfig' in tag.text:
            existing = True
            tag.replace_with(security_module_script)
            break
    if not existing:
        soup.head.append(security_module_script)

if security_style:
    existing = False
    for tag in soup.head.find_all('style'):
        if 'user-select: none' in tag.text:
            existing = True
            tag.replace_with(security_style)
            break
    if not existing:
        soup.head.append(security_style)

# Add the mouse wheel script from body as well just in case
wheel_script = None
for tag in ref_soup.body.find_all('script'):
    if 'wheel' in tag.text and 'overflow-y-auto' in tag.text:
        wheel_script = copy.copy(tag)
        break

if wheel_script:
    existing = False
    for tag in soup.body.find_all('script'):
        if 'wheel' in tag.text and 'overflow-y-auto' in tag.text:
            existing = True
            tag.replace_with(wheel_script)
            break
    if not existing:
        soup.body.append(wheel_script)


# Save to destination
html_out = str(soup)

with open(dest_path, 'w', encoding='utf-8') as f:
    f.write(html_out)

print("Saved to", dest_path)
