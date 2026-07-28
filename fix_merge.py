import sys
with open(r'C:\Users\user\godtonggwa\merge_all_v5.py', 'r', encoding='utf-8') as f:
    code = f.read()
code = code.replace("open(fpath, 'r', encoding='utf-8')", "open(fpath, 'r', encoding='utf-8', errors='ignore')")
with open(r'C:\Users\user\godtonggwa\merge_all_v5.py', 'w', encoding='utf-8') as f:
    f.write(code)
