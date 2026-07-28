import os
import sys
sys.stdout.reconfigure(encoding='utf-8')
d = r'g:\내 드라이브\주간지\1주차'
with open(os.path.join(d, 'page35.html'), 'r', encoding='utf-8') as f:
    s = f.read()
idx = s.find('id="page-35"')
print("PAGE 35:")
print(s[idx:idx+800])

with open(os.path.join(d, 'page34.html'), 'r', encoding='utf-8') as f:
    s2 = f.read()
idx2 = s2.find('01</span>')
print("\nPAGE 34 around Q1:")
print(s2[idx2-800:idx2+800])
