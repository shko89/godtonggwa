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
        print(f"Failed to remove {f}: {e}")
print(f"Removed {len(old_pages)} old page files.")

# 2. Read source file
with codecs.open(source_file, 'r', 'utf-8') as f:
    content = f.read()

# Extract styles
styles = "".join(re.findall(r'(<style>.*?</style>)', content, re.DOTALL))

# Split only by a4-page
parts = re.split(r'(<div class="a4-page)', content)

def get_page_numbers(html):
    return [int(n) for n in re.findall(r'<div class="page-num">\s*-\s*(\d+)\s*-\s*</div>', html)]

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

page_idx = 1
for i in range(1, len(parts), 2):
    page_html = parts[i] + parts[i+1]
    
    # clean trailing closing tags from the last part
    if i == len(parts) - 2:
        page_html = re.sub(r'</body>\s*</html>.*', '', page_html, flags=re.DOTALL)
        
    nums = get_page_numbers(page_html)
    
    if len(nums) > 0:
        # Use the first page number found in the block
        num_str = f"{nums[0]:02d}"
        page_idx = nums[-1] + 1
    else:
        if 'cover-page' in parts[i]:
            num_str = "01"
            page_idx = 2
        else:
            num_str = f"{page_idx:02d}"
            page_idx += 1
            
    file_name = f'page{num_str}.html'
    out_path = os.path.join(target_dir, file_name)
    
    final_html = template.replace('{styles}', styles).replace('{content}', page_html.strip())
    
    with codecs.open(out_path, 'w', 'utf-8') as out_f:
        out_f.write(final_html)
    print(f'Created {file_name}')

print("Done splitting pages.")
