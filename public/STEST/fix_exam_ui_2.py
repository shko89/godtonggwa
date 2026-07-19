import sys
sys.stdout.reconfigure(encoding='utf-8')

filepath = 'C:/Users/shko8/godtonggwa/public/STEST/exam.html'
with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("|| { title: `주간지 ${i}주차 (오픈 예정)`, status: 'locked' };", 
                    "|| { title: `갓통과 WEEKLY ${i < 10 ? '0'+i : i}`, status: 'locked' };")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)

print("Open titles updated.")
