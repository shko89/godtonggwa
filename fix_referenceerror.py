import sys

file_path = r'C:\Users\user\godtonggwa\public\STEST\exam.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

old_str = "let originalData = results.find(r => getBase(r.examId) === selectedId || r.examId === selectedId) || results[0];"
new_str = """const getBase = (id) => (id && id.includes('_') && id.match(/_\\d{13}$/)) ? id.replace(/_\\d{13}$/, '') : id;
            let originalData = results.find(r => getBase(r.examId) === selectedId || r.examId === selectedId) || results[0];"""

# First, remove the `const getBase` from the previous location so it doesn't cause a re-declaration error if they are ever in the same scope (they aren't, but still).
html = html.replace("const getBase = (id) => (id && id.includes('_') && id.match(/_\\d{13}$/)) ? id.replace(/_\\d{13}$/, '') : id;\n                const targetExam =", "const getBaseLocal = (id) => (id && id.includes('_') && id.match(/_\\d{13}$/)) ? id.replace(/_\\d{13}$/, '') : id;\n                const targetExam =")
html = html.replace("results.find(r => getBase(r.examId) === selectedId || r.examId === selectedId);", "results.find(r => getBaseLocal(r.examId) === selectedId || r.examId === selectedId);")

if old_str in html:
    html = html.replace(old_str, new_str)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed ReferenceError.")
else:
    print("old_str not found")
