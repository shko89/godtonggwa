import codecs
import re
import os

source_file = r'G:\내 드라이브\주간지\1주차\week_2028_01.html'
output_dir = r'G:\내 드라이브\주간지\1주차'

with codecs.open(source_file, 'r', 'utf-8') as f:
    content = f.read()

# We need to split the document by '<div class="a4-page'
# But we must keep the split token.
parts = re.split(r'(<div class="a4-page)', content)

# A function to extract page number from a block of HTML
def get_page_number(html):
    # Try to find page-num like <div class="page-num">- 01 -</div>
    m = re.search(r'<div class="page-num">\s*-\s*(\d+)\s*-\s*</div>', html)
    if m:
        return int(m.group(1))
        
    # If not found, try to find an id like id="page-1"
    m2 = re.search(r'id="page-(\d+)"', html)
    if m2:
        return int(m2.group(1))
        
    return None

template = """<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="../weekly_common.css">
</head>
<body>
{content}
</body>
</html>"""

page_idx = 1
for i in range(1, len(parts), 2):
    page_html = parts[i] + parts[i+1]
    
    # We might have trailing HTML after the last page, we should strip it
    # We look for the closing </div> of the page. Actually, a simpler way is to just assume it ends properly,
    # but the split might include a lot of </body></html> at the end.
    # Let's clean up the end of the last page_html
    if i == len(parts) - 2:
        # This is the last page, it might have </body></html> or <script>
        page_html = re.sub(r'</body>.*', '', page_html, flags=re.DOTALL)
        page_html = re.sub(r'<script.*', '', page_html, flags=re.DOTALL)
    
    num = get_page_number(page_html)
    if num is None:
        # If no explicit page number is found, we might just use the sequential index.
        # But wait, cover pages might not have a page number.
        if 'cover-page' in parts[i]:
            num = 1
        else:
            num = page_idx
            
    page_idx = num + 1
    
    file_name = f'page{num:02d}.html'
    out_path = os.path.join(output_dir, file_name)
    
    final_html = template.replace('{content}', page_html.strip())
    
    with codecs.open(out_path, 'w', 'utf-8') as out_f:
        out_f.write(final_html)
    print(f'Created {file_name}')
