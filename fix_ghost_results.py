import sys

file_path = r'C:\Users\user\godtonggwa\public\STEST\exam.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

old_str = "let results = Object.values(latestResultsMap);"
new_str = """let results = Object.values(latestResultsMap).filter(r => r.examId && r.examId !== 'undefined');
            results.forEach(r => {
                if (!r.title) {
                    const meta = masterExams.find(e => e.docId === r.examId);
                    r.title = meta ? meta.title : r.examId;
                }
            });"""

if old_str in html:
    html = html.replace(old_str, new_str)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed ghost results in renderReportPage.")
else:
    print("old_str not found")
