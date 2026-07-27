import sys

with open('C:/Users/shko8/godtonggwa/public/STEST/temp.mjs', 'r', encoding='utf-8') as f:
    code = f.read()

lines = code.split('\n')
stack = []
in_string = False
string_char = None
in_template = False
in_comment = False
in_block_comment = False

for i, line in enumerate(lines):
    j = 0
    while j < len(line):
        char = line[j]
        next_char = line[j+1] if j+1 < len(line) else None
        
        if in_block_comment:
            if char == '*' and next_char == '/':
                in_block_comment = False
                j += 1
            j += 1
            continue
            
        if in_comment:
            break
            
        if in_string:
            if char == '\\':
                j += 1
            elif char == string_char:
                in_string = False
            j += 1
            continue
            
        if in_template:
            if char == '\\':
                j += 1
            elif char == '`':
                in_template = False
            elif char == '$' and next_char == '{':
                stack.append(('{', i+1, 'template_expr'))
                j += 1
            j += 1
            continue
            
        if char == '/' and next_char == '*':
            in_block_comment = True
            j += 1
        elif char == '/' and next_char == '/':
            in_comment = True
        elif char == "'" or char == '"':
            in_string = True
            string_char = char
        elif char == '`':
            in_template = True
        elif char == '{':
            stack.append(('{', i+1, 'brace'))
        elif char == '}':
            if stack and stack[-1][0] == '{':
                stack.pop()
            else:
                print(f"Unmatched }} at line {i+1}")
        j += 1
    in_comment = False

print("Unclosed braces:")
for item in stack:
    print(f"Line {item[1]}: {item[2]}")
