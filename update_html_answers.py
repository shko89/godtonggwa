import os
import re
import json
from bs4 import BeautifulSoup

def get_data():
    with open(r'C:\Users\user\godtonggwa\public\STEST\weekly\2028\week_2028_01.js', 'r', encoding='utf-8') as f:
        js = f.read()
    start = js.find('"explanations": [')
    end = js.rfind(']') + 1
    data = json.loads('{' + js[start:end] + '}')
    expls = { e['no']: e for e in data['explanations'] }
    
    ans_match = re.search(r'answers:\s*\[(.*?)\]', js)
    answers = [int(x.strip()) for x in ans_match.group(1).split(',')]
    return answers, expls

def parse_expl(content_html):
    res = []
    for m in re.finditer(r'<span[^>]*>(ㄱ|ㄴ|ㄷ)\.</span>(.*?)\((O|X)\)', content_html):
        res.append((m.group(1), m.group(3), m.group(2).strip()))
    return res

answers, expls = get_data()
d = r'g:\내 드라이브\주간지\1주차'

# 2. Update explanations in page35.html, page36.html, page37.html
for page in ['page35.html', 'page36.html', 'page37.html']:
    path = os.path.join(d, page)
    if not os.path.exists(path): continue
    
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Fix typo '120번 문항' to '20번 문항'
    html = html.replace('120번 문항', '20번 문항')
    
    soup = BeautifulSoup(html, 'html.parser')
    updated = False
    
    # 2.1 Format 1 (.ans-card)
    for card in soup.find_all(class_='ans-card'):
        title = card.find(class_='ans-card-title')
        if not title: continue
        m = re.search(r'(\d+)번', title.get_text())
        if not m: continue
        q_num = int(m.group(1))
        
        if q_num < 1 or q_num > len(answers): continue
        
        badge = card.find(class_='ans-card-badge')
        if badge:
            badge.string = f"정답 {answers[q_num-1]}"
            
        bogi_rows = card.find_all(class_='bogi-row')
        parsed = parse_expl(expls[q_num]['content'])
        for i, row in enumerate(bogi_rows):
            if i < len(parsed):
                bo, ox, desc = parsed[i]
                ox_div = row.find(class_='bogi-ox')
                desc_div = row.find(class_='bogi-desc')
                if ox_div:
                    ox_div.string = f"{bo}. ({ox})"
                    ox_div['style'] = "color: #16a34a;" if ox == 'O' else "color: #e11d48;"
                if desc_div:
                    desc_div.string = desc
        updated = True

    # 2.2 Format 2 (.ta-exp)
    for exp in soup.find_all(class_='ta-exp'):
        header_spans = exp.find('div').find_all('span') if exp.find('div') else []
        if len(header_spans) < 2: continue
        m = re.search(r'(\d+)번', header_spans[0].get_text())
        if not m: continue
        q_num = int(m.group(1))
        
        if q_num < 1 or q_num > len(answers): continue
        
        header_spans[1].string = f"정답 {answers[q_num-1]}"
        
        body_div = exp.find_all('div', recursive=False)[1]
        rows = body_div.find_all('div', style=re.compile('display: flex'))
        parsed = parse_expl(expls[q_num]['content'])
        
        for i, row in enumerate(rows):
            if i < len(parsed):
                bo, ox, desc = parsed[i]
                divs = row.find_all('div')
                if len(divs) >= 2:
                    divs[0].string = f"{bo}. ({ox})"
                    divs[0]['style'] = f"font-weight: 900; color: {'#16a34a' if ox == 'O' else '#e11d48'}; flex: 0 0 35px;"
                    divs[1].string = desc
        updated = True

    if updated:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        print(f"Updated {page}")
