import sys
from bs4 import BeautifulSoup

file_path = r'g:\내 드라이브\주간지\1주차\week_2028_01_final.html'
with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

# 1. Remove the font link
for link in soup.head.find_all('link'):
    if 'Nanum+Pen+Script' in str(link):
        link.decompose()

# 2. Remove the style block
for style in soup.head.find_all('style'):
    if 'Nanum Pen Script' in style.text:
        style.decompose()

# 3. Restore the original text from page35, page36, page37
pages_to_restore = {
    'page35': r'g:\내 드라이브\주간지\1주차\page35.html',
    'page36': r'g:\내 드라이브\주간지\1주차\page36.html',
    'page37': r'g:\내 드라이브\주간지\1주차\page37.html'
}

pw = soup.find(class_='page-wrapper')
if pw:
    for p in pw.find_all(recursive=False):
        scope = p.get('data-scope')
        if scope in pages_to_restore:
            # Read original page
            with open(pages_to_restore[scope], 'r', encoding='utf-8', errors='ignore') as orig_f:
                orig_soup = BeautifulSoup(orig_f.read(), 'html.parser')
            
            # Find original cards container or individual cards
            orig_cards = orig_soup.find_all(class_='ans-card')
            target_cards = p.find_all(class_='ans-card')
            
            if len(orig_cards) == len(target_cards):
                for i in range(len(orig_cards)):
                    # Replace the content of the target card with the original card content
                    # Note: We need to preserve data-scope attribute on the elements
                    # It's safer to just replace the inner content of ans-card-body
                    
                    orig_body = orig_cards[i].find(class_='ans-card-body')
                    target_body = target_cards[i].find(class_='ans-card-body')
                    
                    if orig_body and target_body:
                        # Clear target body
                        target_body.clear()
                        # Append children from orig body
                        for child in orig_body.contents:
                            import copy
                            target_body.append(copy.copy(child))
                        
                        # ensure data-scope is preserved in new children
                        for tag in target_body.find_all(True):
                            tag['data-scope'] = scope

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(str(soup))
print("Restored original text and removed handwriting CSS.")
