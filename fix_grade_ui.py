import sys

file_path = r'C:\Users\user\godtonggwa\public\STEST\exam.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

old_str = """            let grade = data.grade;
            if (!grade) {
                const ratio = data.score / (maxScore || 50);
                if (ratio >= 0.9) grade = 1;
                else if (ratio >= 0.8) grade = 2;
                else if (ratio >= 0.7) grade = 3;
                else if (ratio >= 0.6) grade = 4;
                else grade = 5;
            }"""

new_str = """            let grade = data.grade;
            if (!grade) {
                const ratio = data.score / (maxScore || 50);
                if (ratio >= 0.9) grade = 1;
                else if (ratio >= 0.8) grade = 2;
                else if (ratio >= 0.7) grade = 3;
                else if (ratio >= 0.6) grade = 4;
                else grade = 5;
                data.grade = grade;
            }"""

if old_str in html:
    html = html.replace(old_str, new_str)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed undefined grade.")
else:
    print("old_str not found")
