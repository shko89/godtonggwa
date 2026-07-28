import sys
from bs4 import BeautifulSoup

file_path = r'g:\내 드라이브\주간지\1주차\week_2028_01_final.html'
with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

# 1. Add font import
font_link = soup.new_tag('link', href='https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap', rel='stylesheet')
soup.head.append(font_link)

# 2. Add handwriting style for pages 35, 36, 37
style = soup.new_tag('style')
style.string = """
.a4-page[data-scope="page35"] .ans-card-body,
.a4-page[data-scope="page36"] .ans-card-body,
.a4-page[data-scope="page37"] .ans-card-body {
    font-family: 'Nanum Pen Script', cursive !important;
    font-size: 16px !important;
    line-height: 1.3 !important;
    color: #1e3a8a !important;
    letter-spacing: 0.5px !important;
}
.a4-page[data-scope="page35"] .ans-card-badge,
.a4-page[data-scope="page36"] .ans-card-badge,
.a4-page[data-scope="page37"] .ans-card-badge {
    font-family: 'Nanum Pen Script', cursive !important;
    font-size: 18px !important;
}
"""
soup.head.append(style)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(str(soup))

print("Applied handwriting font to explanations on pages 35-37.")
