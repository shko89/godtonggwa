import os
import glob
import codecs
import re

target_dir = r'G:\내 드라이브\주간지\1주차'
source_file = os.path.join(target_dir, 'week_2028_01.html')

# 1. Clean up old page files
old_pages = glob.glob(os.path.join(target_dir, 'page*.html'))
for f in old_pages:
    try:
        os.remove(f)
    except Exception as e:
        pass
print(f"Removed old page files.")

# 2. Read source file
with codecs.open(source_file, 'r', 'utf-8') as f:
    content = f.read()

# Extract styles
styles = "".join(re.findall(r'(<style>.*?</style>)', content, re.DOTALL))

# Split by a4-page OR page-wrapper
parts = re.split(r'(<div class="a4-page|<div class="page-wrapper)', content)

def get_page_numbers(html):
    return [int(n) for n in re.findall(r'<div class="page-num">\s*-\s*(\d+)\s*-\s*</div>', html)]

valid_pages = [] # List of tuples: (page_numbers_list, html_string)
current_page_nums = []
current_html = ""
page_idx = 1

# Skip parts[0] as it's the preamble before the first page
for i in range(1, len(parts), 2):
    block_html = parts[i] + parts[i+1]
    
    if i == len(parts) - 2:
        block_html = re.sub(r'</body>\s*</html>.*', '', block_html, flags=re.DOTALL)
        
    nums = get_page_numbers(block_html)
    
    # It is a cover page if it starts with ' cover-page' immediately after '<div class="a4-page'
    # meaning parts[i+1] starts with ' cover-page'
    is_cover_block = parts[i+1].startswith(' cover-page') or parts[i+1].startswith(' spread-page cover-page')
    
    if len(nums) > 0 or is_cover_block:
        # Start a new page
        if current_html:
            valid_pages.append((current_page_nums, current_html))
        current_page_nums = nums
        current_html = block_html
        if is_cover_block and not nums:
            current_page_nums = [1]
    else:
        # Append to current page (these are fragments like download buttons)
        current_html += block_html

# append the last one
if current_html:
    valid_pages.append((current_page_nums, current_html))

template = """<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="../weekly_common.css">
    {styles}
</head>
<body>
{content}
</body>
</html>"""

for nums, page_html in valid_pages:
    if len(nums) > 0:
        num_str = f"{nums[0]:02d}"
        page_idx = nums[-1] + 1
    else:
        num_str = f"{page_idx:02d}"
        page_idx += 1
        
    file_name = f'page{num_str}.html'
    out_path = os.path.join(target_dir, file_name)
    
    final_html = template.replace('{styles}', styles).replace('{content}', page_html.strip())
    
    with codecs.open(out_path, 'w', 'utf-8') as out_f:
        out_f.write(final_html)
    print(f'Created {file_name}')

print("Done splitting pages accurately.")
