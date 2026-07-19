import codecs
import re

target_file = r'C:\Users\shko8\godtonggwa\public\STEST\weekly\ebook\week_2028_01.html'
with codecs.open(target_file, 'r', 'utf-8') as f:
    content = f.read()

# Replace font-weight: 700 with font-weight: 400 (normal) for .handwriting class
content = content.replace('font-weight: 700; color: #1e3a8a; font-size: 10px;', 'font-weight: 400; color: #1e3a8a; font-size: 10px;')

# For .bridge-page-new .handwriting, it might inherit or have a specific font-weight.
# Let's check if it has font-weight. If not, the global .handwriting change will affect it.
# We will just write the file.
with codecs.open(target_file, 'w', 'utf-8') as f:
    f.write(content)
print('Removed bold from handwriting.')
