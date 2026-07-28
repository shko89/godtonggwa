import sys
from bs4 import BeautifulSoup

file_path = r'g:\내 드라이브\주간지\1주차\week_2028_01_final.html'
with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

print_style = soup.new_tag('style')
print_style.string = """
@media print {
    .editable, [contenteditable="true"] {
        outline: none !important;
        border: none !important;
        box-shadow: none !important;
        background: transparent !important;
    }
}
"""
soup.head.append(print_style)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(str(soup))
    
print("Added print styles successfully.")
