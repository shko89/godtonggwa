import sys

file_path = r'C:\Users\user\godtonggwa\public\STEST\exam.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

old_str = "if ((r.score == null || r.score === 0) && r.answers) {"
new_str = "if ((r.score == null || r.score === 0) && Array.isArray(r.answers)) {"

if old_str in html:
    html = html.replace(old_str, new_str)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed TypeError.")
else:
    print("old_str not found")
