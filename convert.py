import re

def replacer(match):
    inner = match.group(1)
    inner = inner.replace('\\"', '"')
    inner = inner.replace('\\n', '\n')
    inner = inner.replace('`', '\\`')
    inner = inner.replace('${', '\\${')
    return f'"content": `\n{inner}\n`'

paths = [
    'public/STEST/weekly/2028/week_2028_01-2.js',
    'public/STEST/weekly/2028/week_2028_02.js'
]

pattern = r'"content"\s*:\s*"((?:\\.|[^"\\])*)"'

for path in paths:
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()

    new_text = re.sub(pattern, replacer, text)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_text)
    print(f"Successfully converted {path} to use backticks!")
