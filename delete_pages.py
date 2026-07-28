import os
from bs4 import BeautifulSoup

d = r'g:\내 드라이브\주간지\1주차'
page35_path = os.path.join(d, 'page35.html')

with open(page35_path, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

# Find and delete page-36
page36 = soup.find('div', id='page-36')
if page36:
    page36.decompose()
    print("Deleted page-36")

# Find and delete page-37
page37 = soup.find('div', id='page-37')
if page37:
    page37.decompose()
    print("Deleted page-37")

with open(page35_path, 'w', encoding='utf-8') as f:
    f.write(str(soup))
print("Finished updating page35.html")
