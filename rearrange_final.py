import sys
from bs4 import BeautifulSoup

file_path = r'g:\내 드라이브\주간지\1주차\week_2028_01_final.html'
with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

pw = soup.find(class_='page-wrapper')
pages = pw.find_all(recursive=False)

# Extract pages by indices
cover = pages[0]
blank = pages[1]
page_3_to_7 = pages[2:7]
page_14_to_17 = pages[13:17]
page_8_to_9 = pages[7:9]
page_18_to_21 = pages[17:21]
page_10_to_11 = pages[9:11]
page_22_to_25 = pages[21:25]
page_12_to_13 = pages[11:13]
page_26_to_end = pages[25:]

# Assemble new order
new_order = [cover, blank]
new_order.extend(page_3_to_7)
new_order.extend(page_14_to_17)
new_order.extend(page_8_to_9)
new_order.extend(page_18_to_21)
new_order.extend(page_10_to_11)
new_order.extend(page_22_to_25)
new_order.extend(page_12_to_13)
new_order.extend(page_26_to_end)

# Verify count
assert len(new_order) == 37, f"Count mismatch! Expected 37, got {len(new_order)}"

# Update page-num sequentially starting from index 2
# index 2 should be '- 03 -'
# index 36 should be '- 37 -'
for i in range(2, len(new_order)):
    p = new_order[i]
    pnum_tags = p.find_all(class_='page-num')
    if pnum_tags:
        for pnum_tag in pnum_tags:
            # We assume ALL .page-num tags inside this page element get the same page number (or maybe there is only one per .a4-page)
            # Actually, there should be exactly one per .a4-page
            pnum_tag.string = f"- {i+1:02d} -"

# Empty the page wrapper and re-append in new order
pw.clear()
for p in new_order:
    pw.append(p)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(str(soup))
    
print("Successfully rearranged and renumbered pages in week_2028_01_final.html")
