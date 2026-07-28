import sys
from bs4 import BeautifulSoup

file_path = r'g:\내 드라이브\주간지\1주차\week_2028_01_final.html'
with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# I know I added a style block containing ".a4-page[data-scope=\"page35\"] .ans-card-body"
# Let's find and remove it, then inject the new one.
soup = BeautifulSoup(html, 'html.parser')
for style in soup.head.find_all('style'):
    if '.a4-page[data-scope="page35"] .ans-card-body' in style.text:
        style.decompose()
        break

new_style = soup.new_tag('style')
new_style.string = """
.a4-page[data-scope="page35"] .ans-card-body,
.a4-page[data-scope="page36"] .ans-card-body,
.a4-page[data-scope="page37"] .ans-card-body {
    font-family: 'Nanum Pen Script', cursive !important;
    font-size: 14.5px !important;
    line-height: 1.15 !important;
    color: #1e3a8a !important;
    letter-spacing: 0.2px !important;
}
.a4-page[data-scope="page35"] .ans-card-badge,
.a4-page[data-scope="page36"] .ans-card-badge,
.a4-page[data-scope="page37"] .ans-card-badge {
    font-family: 'Nanum Pen Script', cursive !important;
    font-size: 15px !important;
}
.a4-page[data-scope="page35"] .ans-card,
.a4-page[data-scope="page36"] .ans-card,
.a4-page[data-scope="page37"] .ans-card {
    padding: 6px 10px !important;
    margin-bottom: 4px !important;
}
.a4-page[data-scope="page35"] .ans-card-header,
.a4-page[data-scope="page36"] .ans-card-header,
.a4-page[data-scope="page37"] .ans-card-header {
    margin-bottom: 3px !important;
    padding-bottom: 3px !important;
}
.a4-page[data-scope="page35"] .bogi-row,
.a4-page[data-scope="page36"] .bogi-row,
.a4-page[data-scope="page37"] .bogi-row {
    margin-bottom: 0px !important;
}
.a4-page[data-scope="page35"] .ans-card-body,
.a4-page[data-scope="page36"] .ans-card-body,
.a4-page[data-scope="page37"] .ans-card-body {
    gap: 2px !important;
}
"""
soup.head.append(new_style)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(str(soup))

print("Updated handwriting CSS with smaller size and margins.")
