import sys
import re

file_path = r'C:\Users\user\godtonggwa\public\STEST\exam.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Fix 1: Fix targetExam and originalData lookup
old_target = "const targetExam = results.find(r => r.examId === selectedId);"
new_target = """const getBase = (id) => (id && id.includes('_') && id.match(/_\\d{13}$/)) ? id.replace(/_\\d{13}$/, '') : id;
                const targetExam = results.find(r => getBase(r.examId) === selectedId || r.examId === selectedId);"""

old_original = "let originalData = results.find(r => r.examId === selectedId) || results[0];"
new_original = "let originalData = results.find(r => getBase(r.examId) === selectedId || r.examId === selectedId) || results[0];"

# Fix 2: Add dynamic score calculation in the results map for dropdown display
old_results_map = """let results = Object.values(latestResultsMap).filter(r => r.examId && r.examId !== 'undefined' && r.examId !== 'null');
            results.forEach(r => {
                if (!r.title || r.title === 'undefined' || r.title === 'null') {
                    const meta = masterExams.find(e => e.docId === r.examId);
                    r.title = (meta && meta.title && meta.title !== 'undefined') ? meta.title : r.examId;
                }
            });"""

new_results_map = """let results = Object.values(latestResultsMap).filter(r => r.examId && r.examId !== 'undefined' && r.examId !== 'null');
            results.forEach(r => {
                let searchId = r.examId;
                if (searchId && searchId.includes('_') && searchId.match(/_\\d{13}$/)) {
                    searchId = searchId.replace(/_\\d{13}$/, '');
                }
                if (!r.title || r.title === 'undefined' || r.title === 'null') {
                    const meta = masterExams.find(e => e.docId === searchId);
                    r.title = (meta && meta.title && meta.title !== 'undefined') ? meta.title : searchId;
                }
                if ((r.score == null || r.score === 0) && r.answers) {
                    r.score = r.answers.reduce((sum, ans) => sum + (ans.isCorrect ? (Number(ans.score) || (r.answers.length===20 ? 2.5 : (50/r.answers.length))) : 0), 0);
                }
            });"""


html = html.replace(old_target, new_target)
html = html.replace(old_original, new_original)
html = html.replace(old_results_map, new_results_map)

# Fix 3: Fix data.score and data.grade in renderReportPage
# Search for:
#             const grade = data.grade;
#             if (grade === 1) {

old_grade = """            const grade = data.grade;
            if (grade === 1) {"""

new_grade = """            if (data.score == null || data.score === 0) {
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
            }
            
            if (grade === 1) {"""

html = html.replace(old_grade, new_grade)

# One more fix: when we hydrate missing data, it might update data.answers but score is already evaluated. 
# But our new_grade is placed AFTER hydration, so it's fine!

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Applied fixes for navigation and zero score.")
