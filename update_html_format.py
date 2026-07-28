import os
import re
from bs4 import BeautifulSoup

d = r'g:\내 드라이브\주간지\1주차'
page34_path = os.path.join(d, 'page34.html')

with open(page34_path, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

# 1. Update fast answer table horizontally
# We will find the table, extract answers, and rebuild it.
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
    # Header row is the same
    header_tr = soup.new_tag('tr')
    header_tr['style'] = "background: #f1f5f9; border-bottom: 1px solid #cbd5e1;"
    for _ in range(4):
        th1 = soup.new_tag('th')
        th1['style'] = "padding: 6px 0; color: #475569;"
        th1.string = "문항"
        th2 = soup.new_tag('th')
        th2['style'] = "padding: 6px 0; color: #0f172a;"
        th2.string = "정답"
        header_tr.append(th1)
        header_tr.append(th2)
    new_trs.append(header_tr)
    
    # 5 rows x 4 items per row = 20 items
    for row_idx in range(5):
        tr = soup.new_tag('tr')
        if row_idx < 4:
            tr['style'] = "border-bottom: 1px dashed #e2e8f0;"
        for col_idx in range(4):
            q_num = row_idx * 4 + col_idx + 1
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

# 2. Convert Q1-Q5 to .ans-card format
# Find all divs containing the old explanations
exp_divs = soup.find_all('div', style=re.compile('box-shadow: 0 2px 4px.*overflow: hidden'))

if exp_divs:
    # Create the content grid container
    grid = soup.new_tag('div')
    grid['class'] = 'content-grid'
    
    # Insert it before the first explanation div
    exp_divs[0].insert_before(grid)
    
    for div in exp_divs:
        # Extract q_num and ans
        header = div.find('div')
        spans = header.find_all('span') if header else []
        if len(spans) < 2: continue
        q_num = spans[0].get_text(strip=True)
        ans = spans[1].get_text(strip=True)
        
        # Build ans-card
        ans_card = soup.new_tag('div')
        ans_card['class'] = 'ans-card'
        
        # Header
        ans_header = soup.new_tag('div')
        ans_header['class'] = 'ans-card-header'
        
        title_span = soup.new_tag('span')
        title_span['class'] = 'ans-card-title'
        title_span.string = f"{int(q_num)}번 문항"
        
        badge_span = soup.new_tag('span')
        badge_span['class'] = 'ans-card-badge'
        badge_span.string = ans
        
        ans_header.append(title_span)
        ans_header.append(badge_span)
        ans_card.append(ans_header)
        
        # Body
        ans_body = soup.new_tag('div')
        ans_body['class'] = 'ans-card-body'
        
        body_div = div.find_all('div', recursive=False)[1]
        rows = body_div.find_all('div', style=re.compile('display: flex'))
        for row in rows:
            inner_divs = row.find_all('div')
            if len(inner_divs) >= 2:
                bogi_row = soup.new_tag('div')
                bogi_row['class'] = 'bogi-row'
                
                bogi_ox = soup.new_tag('div')
                bogi_ox['class'] = 'bogi-ox'
                ox_text = inner_divs[0].get_text(strip=True)
                bogi_ox.string = ox_text
                if '(O)' in ox_text:
                    bogi_ox['style'] = "color: #16a34a;"
                else:
                    bogi_ox['style'] = "color: #e11d48;"
                    
                bogi_desc = soup.new_tag('div')
                bogi_desc['class'] = 'bogi-desc'
                bogi_desc.string = inner_divs[1].get_text(strip=True)
                
                bogi_row.append(bogi_ox)
                bogi_row.append(bogi_desc)
                ans_body.append(bogi_row)
        
        ans_card.append(ans_body)
        grid.append(ans_card)
        
        div.decompose()

# Need to ensure .content-grid CSS is present if missing
if not soup.find(string=re.compile(r'\.content-grid')):
    style_tag = soup.find('style')
    if style_tag:
        style_tag.append('''
        /* 2단 그리드 카드 스타일 */
        .content-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            align-content: start;
            flex-grow: 1;
        }

        .ans-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 10px 12px;
            break-inside: avoid;
            box-shadow: 0 1px 3px rgba(0,0,0,0.02);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .ans-card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #cbd5e1;
            padding-bottom: 4px;
            margin-bottom: 6px;
        }

        .ans-card-title {
            font-weight: 900;
            font-size: 12px;
            color: #0f172a;
        }

        .ans-card-badge {
            font-weight: 900;
            font-size: 12px;
            color: #2563eb;
            background: #e0f2fe;
            padding: 1px 6px;
            border-radius: 4px;
        }

        .ans-card-body {
            font-size: 9.5px;
            line-height: 1.4;
            color: #334155;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .bogi-row {
            display: flex;
            gap: 6px;
        }

        .bogi-ox {
            font-weight: 900;
            flex: 0 0 32px;
        }

        .bogi-desc {
            flex: 1;
            word-break: keep-all;
            text-align: justify;
        }
''')

with open(page34_path, 'w', encoding='utf-8') as f:
    f.write(str(soup))
print("Updated page34.html")

# 3. Update page36.html and page37.html if they exist
for page in ['page36.html', 'page37.html']:
    path = os.path.join(d, page)
    if not os.path.exists(path): continue
    
    with open(path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
        
    ta_exps = soup.find_all(class_='ta-exp')
    if ta_exps:
        # Create the grid
        grid = soup.new_tag('div')
        grid['class'] = 'content-grid'
        ta_exps[0].insert_before(grid)
        
        for exp in ta_exps:
            header_spans = exp.find('div').find_all('span') if exp.find('div') else []
            if len(header_spans) < 2: continue
            q_num_text = header_spans[0].get_text(strip=True)
            ans = header_spans[1].get_text(strip=True)
            
            # Build ans-card
            ans_card = soup.new_tag('div')
            ans_card['class'] = 'ans-card'
            
            ans_header = soup.new_tag('div')
            ans_header['class'] = 'ans-card-header'
            
            title_span = soup.new_tag('span')
            title_span['class'] = 'ans-card-title'
            title_span.string = q_num_text
            
            badge_span = soup.new_tag('span')
            badge_span['class'] = 'ans-card-badge'
            badge_span.string = ans
            
            ans_header.append(title_span)
            ans_header.append(badge_span)
            ans_card.append(ans_header)
            
            ans_body = soup.new_tag('div')
            ans_body['class'] = 'ans-card-body'
            
            body_div = exp.find_all('div', recursive=False)[1]
            rows = body_div.find_all('div', style=re.compile('display: flex'))
            for row in rows:
                inner_divs = row.find_all('div')
                if len(inner_divs) >= 2:
                    bogi_row = soup.new_tag('div')
                    bogi_row['class'] = 'bogi-row'
                    
                    bogi_ox = soup.new_tag('div')
                    bogi_ox['class'] = 'bogi-ox'
                    ox_text = inner_divs[0].get_text(strip=True)
                    bogi_ox.string = ox_text
                    if '(O)' in ox_text:
                        bogi_ox['style'] = "color: #16a34a;"
                    else:
                        bogi_ox['style'] = "color: #e11d48;"
                        
                    bogi_desc = soup.new_tag('div')
                    bogi_desc['class'] = 'bogi-desc'
                    bogi_desc.string = inner_divs[1].get_text(strip=True)
                    
                    bogi_row.append(bogi_ox)
                    bogi_row.append(bogi_desc)
                    ans_body.append(bogi_row)
            
            ans_card.append(ans_body)
            grid.append(ans_card)
            
            exp.decompose()
            
        # Ensure column count logic in parent is replaced
        # Sometimes there's a div with column-count: 2 wrapping the ta-exps
        column_wrapper = grid.parent
        if column_wrapper and column_wrapper.name == 'div' and 'column-count: 2' in column_wrapper.get('style', ''):
            # Remove column count style
            style_str = column_wrapper['style']
            style_str = re.sub(r'column-count:\s*2;?', '', style_str)
            style_str = re.sub(r'column-gap:\s*[^;]+;?', '', style_str)
            column_wrapper['style'] = style_str

        # Add CSS if missing
        if not soup.find(string=re.compile(r'\.content-grid')):
            style_tag = soup.find('style')
            if style_tag:
                style_tag.append('''
                /* 2단 그리드 카드 스타일 */
                .content-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    align-content: start;
                    flex-grow: 1;
                }

                .ans-card {
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 10px 12px;
                    break-inside: avoid;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .ans-card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 2px solid #cbd5e1;
                    padding-bottom: 4px;
                    margin-bottom: 6px;
                }

                .ans-card-title {
                    font-weight: 900;
                    font-size: 12px;
                    color: #0f172a;
                }

                .ans-card-badge {
                    font-weight: 900;
                    font-size: 12px;
                    color: #2563eb;
                    background: #e0f2fe;
                    padding: 1px 6px;
                    border-radius: 4px;
                }

                .ans-card-body {
                    font-size: 9.5px;
                    line-height: 1.4;
                    color: #334155;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .bogi-row {
                    display: flex;
                    gap: 6px;
                }

                .bogi-ox {
                    font-weight: 900;
                    flex: 0 0 32px;
                }

                .bogi-desc {
                    flex: 1;
                    word-break: keep-all;
                    text-align: justify;
                }
        ''')

        with open(path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        print(f"Updated {page}")
