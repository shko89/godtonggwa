import sys

file_path = r'C:\Users\user\godtonggwa\public\STEST\exam.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

old_str = """            if (data.score == null || data.score === 0) {
                if (data.answers && data.answers.length > 0) {
                    data.score = data.answers.reduce((sum, ans) => sum + (ans.isCorrect ? (Number(ans.score) || (isWeekly ? 2.5 : (50/data.answers.length))) : 0), 0);
                }
            }
            
            let grade = data.grade;
            if (!grade) {
                const ratio = data.score / (maxScore || 50);
                if (ratio >= 0.9) grade = 1;
                else if (ratio >= 0.8) grade = 2;
                else if (ratio >= 0.7) grade = 3;
                else if (ratio >= 0.6) grade = 4;
                else grade = 5;
                data.grade = grade;
            }"""

new_str = """            if (data.score == null || data.score === 0) {
                if (data.answers && data.answers.length > 0) {
                    data.score = data.answers.reduce((sum, ans) => sum + (ans.isCorrect ? (Number(ans.score) || (isWeekly ? 2.5 : (50/data.answers.length))) : 0), 0);
                    if (originalData) originalData.score = data.score;
                }
            }
            
            let grade = data.grade;
            if (!grade) {
                const ratio = data.score / (maxScore || 50);
                if (ratio >= 0.9) grade = 1;
                else if (ratio >= 0.8) grade = 2;
                else if (ratio >= 0.7) grade = 3;
                else if (ratio >= 0.6) grade = 4;
                else grade = 5;
                data.grade = grade;
                if (originalData) originalData.grade = grade;
            }"""

if old_str in html:
    html = html.replace(old_str, new_str)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed dropdown score update.")
else:
    print("old_str not found")
