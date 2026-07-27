import sys
import re
sys.stdout.reconfigure(encoding='utf-8')

filepath = 'C:/Users/shko8/godtonggwa/public/STEST/exam.html'
with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. '예시문항' -> '기출문제' in mySubFilter HTML
text = text.replace("window.mySubFilter='PREP'; refreshCurrentTab()\" class=\"flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${subFilter==='PREP' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}\">예시문항</button>", 
                    "window.mySubFilter='PREP'; refreshCurrentTab()\" class=\"flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${subFilter==='PREP' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}\">기출문제</button>")

# 2. '주간지 10주 완강 로드맵' -> '갓통과 WEEKLY 10주 완강 로드맵'
text = text.replace('주간지 10주 완강 로드맵', '갓통과 WEEKLY 10주 완강 로드맵')

# 3. Fix the "02 02" issue and "오픈 예정" titles.
# Let's find the loop generating weekData.
# Original: 
# const weekData = resolvedWeekly.find(e => e.subTitle && e.subTitle.includes(`${i}주차`)) || resolvedWeekly[i-1] || { title: `주간지 ${i}주차 (오픈 예정)`, status: 'locked' };
# let titleToDisplay = weekData.title;
# let nodeHtml = '';
# if (weekData.status === 'graded') {
#     const paddedNum = i < 10 ? '0' + i : i;
#     titleToDisplay = `${weekData.title} ${paddedNum}`;

# We will regex replace the titleToDisplay logic.
pattern_weekdata = r"const weekData = resolvedWeekly\.find\([^)]+\)\s*\|\|\s*resolvedWeekly\[i-1\]\s*\|\|\s*\{\s*title:\s*`주간지 \$\{i\}주차 \(오픈 예정\)`,\s*status:\s*'locked'\s*\};"
replacement_weekdata = "const weekData = resolvedWeekly.find(e => e.subTitle && e.subTitle.includes(`${i}주차`)) || resolvedWeekly[i-1] || { title: `갓통과 WEEKLY ${i < 10 ? '0'+i : i}`, status: 'locked' };"
text = re.sub(pattern_weekdata, replacement_weekdata, text)

# For titleToDisplay in graded/purchased, they appended paddedNum to weekData.title. 
# But weekData.title is already '갓통과 WEEKLY 02'.
# So we should remove the concatenation.
pattern_graded = r"if\s*\(weekData\.status === 'graded'\)\s*\{\s*const paddedNum = i < 10 \? '0' \+ i : i;\s*titleToDisplay = `\$\{weekData\.title\} \$\{paddedNum\}`;"
replacement_graded = "if (weekData.status === 'graded') {\n                            const paddedNum = i < 10 ? '0' + i : i;\n                            titleToDisplay = weekData.title.includes(paddedNum) ? weekData.title : `${weekData.title} ${paddedNum}`;"
text = re.sub(pattern_graded, replacement_graded, text)

pattern_purchased = r"\} else if\s*\(weekData\.status === 'purchased'\)\s*\{\s*const paddedNum = i < 10 \? '0' \+ i : i;\s*titleToDisplay = `\$\{weekData\.title\} \$\{paddedNum\}`;"
replacement_purchased = "} else if (weekData.status === 'purchased') {\n                            const paddedNum = i < 10 ? '0' + i : i;\n                            titleToDisplay = weekData.title.includes(paddedNum) ? weekData.title : `${weekData.title} ${paddedNum}`;"
text = re.sub(pattern_purchased, replacement_purchased, text)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)

print("exam.html updated.")
