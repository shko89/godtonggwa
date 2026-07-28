import sys
with open(r'C:\Users\user\godtonggwa\public\STEST\weekly\ebook\week_2028_01.html', encoding='utf-8') as f:
    s = f.read()
print('Number of a4-pages:', s.count('class="a4-page'))
