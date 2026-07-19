import re, subprocess, os

with open('C:/Users/shko8/godtonggwa/public/STEST/temp.mjs', 'r', encoding='utf-8') as f:
    code = f.read()

# find all function declarations
funcs = [m.start() for m in re.finditer(r'\b(?:async\s+)?function\s+[a-zA-Z0-9_]+\s*\(', code)]
funcs.append(len(code))

for i in range(len(funcs) - 1):
    start = funcs[i]
    end = funcs[i+1]
    
    # inject a '}' right before the next function starts
    test_code = code[:end] + '}\n' + code[end:]
    
    with open('test2.mjs', 'w', encoding='utf-8') as f:
        f.write(test_code)
        
    res = subprocess.run(['node', '-c', 'test2.mjs'], capture_output=True, text=True)
    if res.returncode == 0:
        func_name = code[start:start+50].split('(')[0]
        print(f"Adding '}}' before function at index {end} (which is after {func_name}) FIXES the syntax!")

