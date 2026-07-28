import sys

file_path = r'C:\Users\user\godtonggwa\public\STEST\exam.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

old_str = "const restoredData = await hydrateMissingData(data.examId, data.myAnswers);"
new_str = "const restoredData = await hydrateMissingData(getBase(data.examId), data.myAnswers);"

if old_str in html:
    html = html.replace(old_str, new_str)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed hydrateMissingData examId.")
else:
    print("old_str not found")
