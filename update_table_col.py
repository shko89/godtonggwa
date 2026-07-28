import os
from bs4 import BeautifulSoup

d = r'g:\내 드라이브\주간지\1주차'
page34_path = os.path.join(d, 'page34.html')

with open(page34_path, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

table = soup.find('table')
if table:
    # Extract answers based on td text (1-20)
    answers = {}
    for tr in table.find_all('tr'):
        tds = tr.find_all('td')
        for i in range(0, len(tds), 2):
            if i+1 < len(tds):
                q = tds[i].get_text(strip=True)
                ans = tds[i+1].get_text(strip=True)
                if q.isdigit():
                    answers[int(q)] = ans
    
    # Rebuild table rows
    new_trs = []
    # Header row with 5 pairs
    header_tr = soup.new_tag('tr')
    header_tr['style'] = "background: #f1f5f9; border-bottom: 1px solid #cbd5e1;"
    for _ in range(5):
        th1 = soup.new_tag('th')
        th1['style'] = "padding: 6px 0; color: #475569;"
        th1.string = "문항"
        th2 = soup.new_tag('th')
        th2['style'] = "padding: 6px 0; color: #0f172a;"
        th2.string = "정답"
        header_tr.append(th1)
        header_tr.append(th2)
    new_trs.append(header_tr)
    
    # 4 rows x 5 items per row = 20 items
    for row_idx in range(4):
        tr = soup.new_tag('tr')
        if row_idx < 3:
            tr['style'] = "border-bottom: 1px dashed #e2e8f0;"
        for col_idx in range(5):
            q_num = row_idx * 5 + col_idx + 1
            ans = answers.get(q_num, '')
            td1 = soup.new_tag('td')
            td1['style'] = "padding: 6px 0; text-align: center; font-weight: 700; color: #475569;"
            td1.string = str(q_num)
            td2 = soup.new_tag('td')
            td2['style'] = "padding: 6px 0; text-align: center; color: #e11d48; font-weight: 900;"
            td2.string = str(ans)
            tr.append(td1)
            tr.append(td2)
        new_trs.append(tr)
    
    table.clear()
    for tr in new_trs:
        table.append(tr)

    with open(page34_path, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    print("Updated table to 5 columns per row in page34.html")
else:
    print("Table not found")
