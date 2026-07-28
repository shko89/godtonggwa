import sys

file_path = r'C:\Users\user\godtonggwa\public\STEST\exam.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace hardcoded week_2028_02_final.html with dynamic ${weekData.docId}_final.html
old_str = "location.href='weekly/ebook/week_2028_02_final.html?id=${weekData.docId}'"
new_str = "location.href='weekly/ebook/${weekData.docId}_final.html?id=${weekData.docId}'"

html = html.replace(old_str, new_str)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated exam.html successfully.")
