import sys
with open(r'C:\Users\user\godtonggwa\public\STEST\weekly\ebook\week_2028_01.html', encoding='utf-8') as f:
    s = f.read()
idx = s.find('id="flipbook-container"')
print(s[max(0, idx):idx+1000])
