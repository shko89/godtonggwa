import codecs

target_file = r'C:\Users\shko8\godtonggwa\public\STEST\weekly\ebook\week_2028_01.html'
with codecs.open(target_file, 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('font-size: 14px; line-height: 1.2;', 'font-size: 10px; line-height: 1.2;')
content = content.replace('font-size: 13px; color: #000; text-align: center;', 'font-size: 10px; color: #000; text-align: center;')
content = content.replace('font-size: 14px; color: #000; line-height: 1.25;', 'font-size: 10px; color: #000; line-height: 1.25;')

with codecs.open(target_file, 'w', 'utf-8') as f:
    f.write(content)
print('Font sizes updated to 10px.')
