import codecs
import re

target_file = r'C:\Users\shko8\godtonggwa\public\STEST\weekly\ebook\week_2028_01.html'
with codecs.open(target_file, 'r', 'utf-8') as f:
    content = f.read()

# The specific CSS rule has "font-size: 12px; /* ... */"
content = re.sub(r'(\.bridge-page-new\s*\.handwriting\s*\{[^}]*?font-size:\s*)12px', r'\g<1>10px', content)

with codecs.open(target_file, 'w', 'utf-8') as f:
    f.write(content)
print('Bridge page handwriting font size updated to 10px.')
