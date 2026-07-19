import sys
sys.stdout.reconfigure(encoding='utf-8')
filepath = 'C:/Users/shko8/godtonggwa/public/STEST/exam.html'

with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Revert Mock exam 10회분 back to 12회분
text = text.replace('시즌별 고품질 모의고사 세트 (총 10회분)', '시즌별 고품질 모의고사 세트 (총 12회분)')

# 2. Match Weekly banner title in exam.html to index.html
text = text.replace('<h4 class="text-xl font-black mb-1">갓통과 주간지 구독</h4>', '<h4 class="text-xl font-black mb-1 leading-tight">갓통과 WEEKLY<br><span class="text-emerald-200 text-lg">모바일 전자책 & 핏(Fit) 20</span></h4>')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)

# Also fix index.html just in case there are still "12주" in the banner
filepath_idx = 'C:/Users/shko8/godtonggwa/public/index.html'
with open(filepath_idx, 'r', encoding='utf-8') as f:
    idx_text = f.read()

idx_text = idx_text.replace('겨울방학 주간지 12주 프로그램', '겨울방학 주간지 10주 프로그램')
idx_text = idx_text.replace('단원별 주간지 12주 프로그램', '단원별 주간지 10주 프로그램')

with open(filepath_idx, 'w', encoding='utf-8') as f:
    f.write(idx_text)

print("Banner fixes applied successfully!")
