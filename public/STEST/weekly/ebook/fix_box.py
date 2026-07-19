import codecs

target_file = r'C:\Users\shko8\godtonggwa\public\STEST\weekly\ebook\week_2028_01.html'
with codecs.open(target_file, 'r', 'utf-8') as f:
    content = f.read()

# Fix insight-box position
content = content.replace('<div class="insight-box" style="position: relative; top: -35px;">', '<div class="insight-box" style="margin-bottom: 15px;">')

with codecs.open(target_file, 'w', 'utf-8') as f:
    f.write(content)
print('Fixed insight-box.')
