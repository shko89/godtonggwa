import os
from bs4 import BeautifulSoup

d = r'g:\내 드라이브\주간지\1주차'
page35_path = os.path.join(d, 'page35.html')
page36_path = os.path.join(d, 'page36.html')

# Update page35.html (which contains both page-35 and page-36 divs)
with open(page35_path, 'r', encoding='utf-8') as f:
    soup35 = BeautifulSoup(f.read(), 'html.parser')

q12_card = None
page36_grid = soup35.find('div', id='page-36')
if page36_grid:
    grid36 = page36_grid.find(class_='content-grid')
    if grid36:
        for card in grid36.find_all(class_='ans-card'):
            title = card.find(class_='ans-card-title')
            if title and '12번' in title.get_text():
                q12_card = card.extract()
                break

if q12_card:
    page35_grid = soup35.find('div', id='page-35')
    if page35_grid:
        grid35 = page35_grid.find(class_='content-grid')
        if grid35:
            grid35.append(q12_card)
            print("Moved Q12 from page-36 to page-35 inside page35.html")
            
    with open(page35_path, 'w', encoding='utf-8') as f:
        f.write(str(soup35))
else:
    print("Could not find Q12 in page-36 of page35.html")

# Update page36.html standalone file
if os.path.exists(page36_path):
    with open(page36_path, 'r', encoding='utf-8') as f:
        soup36_standalone = BeautifulSoup(f.read(), 'html.parser')
        
    q12_card_standalone = None
    for card in soup36_standalone.find_all(class_='ans-card'):
        title = card.find(class_='ans-card-title')
        if title and '12번' in title.get_text():
            q12_card_standalone = card.extract()
            break
            
    if q12_card_standalone:
        with open(page36_path, 'w', encoding='utf-8') as f:
            f.write(str(soup36_standalone))
        print("Removed Q12 from standalone page36.html")
