import re

def fix_page_numbers():
    html_path = r"g:\내 드라이브\주간지\2주차\week_2028_02_final.html"
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all <div class="page-num">- xx -</div> and replace sequentially starting from 02
    page_count = 2
    
    def replace_page_num(match):
        nonlocal page_count
        new_str = f'<div class="page-num">- {page_count:02d} -</div>'
        page_count += 1
        return new_str

    # Use regex to match exactly the page-num div
    new_content = re.sub(r'<div class="page-num">\s*-\s*\d+\s*-\s*</div>', replace_page_num, content)
    
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Renumbered {page_count - 2} pages. Last page number is {page_count - 1:02d}.")

if __name__ == '__main__':
    fix_page_numbers()
