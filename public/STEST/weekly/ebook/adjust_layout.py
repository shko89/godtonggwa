import codecs
import re

target_file = r'C:\Users\shko8\godtonggwa\public\STEST\weekly\ebook\week_2028_01.html'
with codecs.open(target_file, 'r', 'utf-8') as f:
    content = f.read()

# 1. Shrink map-container slightly to make room
content = re.sub(
    r'\.map-container \{ flex-grow: 1; position: relative; margin-top: 15px; display: flex; flex-direction: column; transform: scale\(0\.9\); transform-origin: top center; min-height: 400px; \}',
    '.map-container { flex-grow: 1; position: relative; margin-top: 5px; display: flex; flex-direction: column; transform: scale(0.85); transform-origin: top center; min-height: 370px; }',
    content
)

# 2. Set insight-box margin to 25px (this should now push it up properly because there is free space)
content = content.replace('<div class="insight-box" style="margin-bottom: 35px;">', '<div class="insight-box" style="margin-bottom: 20px;">')

with codecs.open(target_file, 'w', 'utf-8') as f:
    f.write(content)
print('Layout adjusted.')
