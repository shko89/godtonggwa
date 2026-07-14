import re

def fix_toc_pages():
    html_path = r"g:\내 드라이브\주간지\2주차\week_2028_02_final.html"
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_pages = ["06", "12", "18", "28", "38"]
    count = 0
    
    def repl(match):
        nonlocal count
        if count < len(new_pages):
            res = f'<div class="item-page editable" contenteditable="true">{new_pages[count]}</div>'
            count += 1
            return res
        return match.group(0)

    # Regex to match the item-page divs
    new_content = re.sub(r'<div class="item-page editable" contenteditable="true">\d+</div>', repl, content)
    
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Replaced {count} TOC page numbers in original HTML.")

if __name__ == '__main__':
    fix_toc_pages()
