import codecs
target_file = r'G:\내 드라이브\주간지\1주차\week_2028_01.html'
with codecs.open(target_file, 'r', 'utf-8') as f:
    content = f.read()
print('a4-page count:', content.count('<div class="a4-page'))
