import sys

file_path = r'C:\Users\user\godtonggwa\public\STEST\exam.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

old_str = "const isCorrect = studentMark === q.correctAnswer;"
new_str = "const isCorrect = String(studentMark).trim() === String(q.correctAnswer).trim();"

if old_str in html:
    html = html.replace(old_str, new_str)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed type mismatch in hydrateMissingData.")
else:
    print("old_str not found")
