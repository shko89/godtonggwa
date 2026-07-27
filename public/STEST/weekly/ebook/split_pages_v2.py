import codecs
import re
import os

source_file = r'G:\내 드라이브\주간지\1주차\week_2028_01.html'
output_dir = r'G:\내 드라이브\주간지\1주차'

with codecs.open(source_file, 'r', 'utf-8') as f:
    content = f.read()

# Extract styles
styles = "".join(re.findall(r'(<style>.*?</style>)', content, re.DOTALL))

# Split by a4-page or page-wrapper
parts = re.split(r'(<div class="a4-page|<div class="page-wrapper)', content)

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
    
    # clean trailing closing tags
    if i == len(parts) - 2:
        page_html = re.sub(r'</body>\s*</html>.*', '', page_html, flags=re.DOTALL)
        
    nums = get_page_numbers(page_html)
    
    if len(nums) > 0:
        num_str = f"{nums[0]:02d}"
        if len(nums) > 1:
            num_str += f"-{nums[-1]:02d}"
        page_idx = nums[-1] + 1
    else:
        if 'cover-page' in parts[i]:
            num_str = "01"
            page_idx = 2
        else:
            num_str = f"{page_idx:02d}"
            page_idx += 1
            
    file_name = f'page{num_str}.html'
    out_path = os.path.join(output_dir, file_name)
    
    final_html = template.replace('{styles}', styles).replace('{content}', page_html.strip())
    
    with codecs.open(out_path, 'w', 'utf-8') as out_f:
        out_f.write(final_html)
    print(f'Created {file_name}')
