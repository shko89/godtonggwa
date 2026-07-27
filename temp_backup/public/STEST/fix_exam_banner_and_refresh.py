import sys

sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/shko8/godtonggwa/public/STEST/exam.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Fix the banner
target_banner = """                <!-- 1. 예시문항 패키지 -->
                <div class="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl p-6 text-white shadow-lg mb-6 relative overflow-hidden cursor-pointer hover:shadow-xl transition-all" onclick="location.href='../archive/archive.html'">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <div class="relative z-10">
                        <span class="bg-indigo-700/50 text-indigo-100 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide mb-2 inline-block">FREE PASS</span>
                        <h4 class="text-xl font-black mb-1">2028 예시문항 완벽분석</h4>
                        <p class="text-xs text-indigo-100 mb-4">교육청/평가원 기출문제 무료 제공 및 해설</p>
                        <button class="bg-white text-indigo-600 px-4 py-2 rounded-lg text-xs font-bold shadow-sm">무료로 시작하기</button>
                    </div>
                </div>"""
replacement_banner = """                <!-- 1. 예시문항 패키지 -->
                <div class="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl p-6 text-white shadow-lg mb-6 relative overflow-hidden cursor-pointer hover:shadow-xl transition-all" onclick="location.href='../package_info.html'">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <div class="relative z-10">
                        <span class="bg-indigo-700/50 text-indigo-100 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide mb-2 inline-block">시즌 0 출시</span>
                        <h4 class="text-xl font-black mb-1">2028 통합과학<br>예시문항 완벽 분석 패키지</h4>
                        <p class="text-xs text-indigo-100 mb-4">첫 수능의 나침반 평가원 예시문항 완전 해부 4회분 실전 모의고사</p>
                        <button class="bg-white text-indigo-600 px-4 py-2 rounded-lg text-xs font-bold shadow-sm">패키지 자세히 보기</button>
                    </div>
                </div>"""

text = text.replace(target_banner, replacement_banner)

# 2. Inject window.refreshCurrentTab
if "window.refreshCurrentTab =" not in text:
    inject_script = """
        window.refreshCurrentTab = function() {
            const activeTab = document.querySelector('button[id^="tab-"].text-indigo-600');
            if (activeTab) {
                switchTab(activeTab.id.replace('tab-', ''));
            }
        };
"""
    # Find the start of the module script
    idx = text.find('<script type="module">')
    if idx != -1:
        # Find the next newline
        nl_idx = text.find('\n', idx)
        text = text[:nl_idx+1] + inject_script + text[nl_idx+1:]

with open('C:/Users/shko8/godtonggwa/public/STEST/exam.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Modifications applied successfully.")
