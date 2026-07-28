import sys
import re
import json
import os

sys.stdout.reconfigure(encoding='utf-8')

# Read JS file
with open(r'C:\Users\user\godtonggwa\public\STEST\weekly\2028\week_2028_01.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

start = js_content.find('"explanations": [')
end = js_content.rfind(']') + 1
expl_json = '{' + js_content[start:end] + '}'
data = json.loads(expl_json)
explanations = data['explanations']

ans_match = re.search(r'answers:\s*\[(.*?)\]', js_content)
answers = [int(x.strip()) for x in ans_match.group(1).split(',')]

def parse_explanation(content_html):
    # Extract ox for ㄱ, ㄴ, ㄷ
    res = []
    for m in re.finditer(r'<span[^>]*>(ㄱ|ㄴ|ㄷ)\.</span>(.*?)\((O|X)\)', content_html):
        ox = m.group(3)
        desc = m.group(2).strip()
        res.append((m.group(1), ox, desc))
    return res

print(answers)
for e in explanations[:3]:
    print(f"Q{e['no']}")
    print(parse_explanation(e['content']))

