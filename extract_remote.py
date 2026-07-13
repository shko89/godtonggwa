import re
content = open('remote_exam.html', encoding='utf-8').read()
match = re.search(r'<script type="module">(.*?)</script>', content, re.DOTALL)
if match:
    open('test_remote.js', 'w', encoding='utf-8').write(match.group(1))
    print("Extracted successfully.")
else:
    print("Script tag not found.")
