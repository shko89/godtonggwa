import sys
sys.stdout.reconfigure(encoding='utf-8')
filepath = 'g:/내 드라이브/주간지/2주차/week_2028_02_final.html'
try:
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    count = 0
    for line in text.split('\n'):
        if 'style=\"' in line or 'style=\'' in line:
            print(line.strip())
            count += 1
            if count >= 20:
                break
except Exception as e:
    print('Error:', e)
