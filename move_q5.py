import os
from bs4 import BeautifulSoup

d = r'g:\내 드라이브\주간지\1주차'
page34_path = os.path.join(d, 'page34.html')
page35_path = os.path.join(d, 'page35.html')

with open(page34_path, 'r', encoding='utf-8') as f:
    soup34 = BeautifulSoup(f.read(), 'html.parser')

with open(page35_path, 'r', encoding='utf-8') as f:
    soup35 = BeautifulSoup(f.read(), 'html.parser')

# Find Q5 in page34
q5_card = None
for card in soup34.find_all(class_='ans-card'):
    title = card.find(class_='ans-card-title')
    if title and '5번 문항' in title.get_text():
        q5_card = card.extract()
        break

if q5_card:
    # Insert Q5 at the beginning of the first content-grid in page35
    grid35 = soup35.find('div', id='page-35').find(class_='content-grid')
    if grid35:
        grid35.insert(0, q5_card)
        print("Moved Q5 to page35.html")
    else:
        print("Could not find content-grid in page35.html")
        
    with open(page34_path, 'w', encoding='utf-8') as f:
        f.write(str(soup34))
        
    with open(page35_path, 'w', encoding='utf-8') as f:
        f.write(str(soup35))
else:
    print("Could not find Q5 in page34.html")
