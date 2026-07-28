import os
import re
from bs4 import BeautifulSoup

d = r'g:\내 드라이브\주간지\1주차'
page36_path = os.path.join(d, 'page36.html')
page37_path = os.path.join(d, 'page37.html')

with open(page36_path, 'r', encoding='utf-8') as f:
    soup36 = BeautifulSoup(f.read(), 'html.parser')

with open(page37_path, 'r', encoding='utf-8') as f:
    soup37 = BeautifulSoup(f.read(), 'html.parser')

# Find content-grid in page36
grid36 = soup36.find(class_='content-grid')

if grid36:
    # Get all ans-cards from page37 and append to page36's grid
    for card in soup37.find_all(class_='ans-card'):
        grid36.append(card.extract())
        
    print("Merged Q17-20 into page36.html")
    
    # Now update CSS in page36 to make it compact
    style_tag = soup36.find('style')
    if style_tag:
        style_str = style_tag.string
        
        # Adjust content-grid gap
        style_str = re.sub(r'(\.content-grid\s*{[^}]*gap:\s*)12px', r'\1 6px', style_str)
        # Adjust ans-card padding
        style_str = re.sub(r'(\.ans-card\s*{[^}]*padding:\s*)10px 12px', r'\1 6px 8px', style_str)
        # Adjust ans-card-header margin-bottom
        style_str = re.sub(r'(\.ans-card-header\s*{[^}]*margin-bottom:\s*)6px', r'\1 3px', style_str)
        # Adjust ans-card-header padding-bottom
        style_str = re.sub(r'(\.ans-card-header\s*{[^}]*padding-bottom:\s*)4px', r'\1 2px', style_str)
        # Adjust ans-card-title font-size
        style_str = re.sub(r'(\.ans-card-title\s*{[^}]*font-size:\s*)12px', r'\1 10.5px', style_str)
        # Adjust ans-card-badge font-size
        style_str = re.sub(r'(\.ans-card-badge\s*{[^}]*font-size:\s*)12px', r'\1 10.5px', style_str)
        # Adjust ans-card-body font-size and line-height
        style_str = re.sub(r'(\.ans-card-body\s*{[^}]*font-size:\s*)9\.5px', r'\1 9px', style_str)
        style_str = re.sub(r'(\.ans-card-body\s*{[^}]*line-height:\s*)1\.4', r'\1 1.25', style_str)
        # Adjust bogi-row gap
        style_str = re.sub(r'(\.bogi-row\s*{[^}]*gap:\s*)6px', r'\1 4px', style_str)
        
        style_tag.string = style_str
        
    with open(page36_path, 'w', encoding='utf-8') as f:
        f.write(str(soup36))
    print("Updated CSS and saved page36.html")
    
    # Optionally delete page37.html as it is no longer needed
    # os.remove(page37_path)
    print("Finished merging page 37 into page 36.")
else:
    print("Could not find content-grid in page36.html")
