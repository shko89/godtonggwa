import re, subprocess

with open('C:/Users/shko8/godtonggwa/public/STEST/exam.html', 'r', encoding='utf-8') as f:
    text = f.read()

match = re.search(r'<script type="module">(.*?)</script>', text, re.DOTALL)
if match:
    js_code = match.group(1)
    with open('C:/Users/shko8/godtonggwa/public/STEST/temp.mjs', 'w', encoding='utf-8') as f:
        f.write(js_code)
    
    res = subprocess.run(['node', '-c', 'C:/Users/shko8/godtonggwa/public/STEST/temp.mjs'], capture_output=True, text=True)
    if res.returncode != 0:
        print('Syntax Error Found:')
        print(res.stderr)
    else:
        print('No syntax errors found by Node.js.')
else:
    print('No script block found.')
