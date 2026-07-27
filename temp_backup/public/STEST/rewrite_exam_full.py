import sys

sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/shko8/godtonggwa/public/STEST/exam.html', 'r', encoding='utf-8') as f:
    text = f.read()

# --- 1. REPORT FILTER INJECTION ---
target_report_1 = "            const results = Object.values(latestResultsMap);"
replacement_report_1 = """            let results = Object.values(latestResultsMap);

            // --- FILTER INJECTION ---
            const subFilter = window.myReportSubFilter || 'ALL';
            if (subFilter === 'WEEKLY') {
                results = results.filter(r => {
                    const svc = r.serviceType || masterExams.find(e => e.docId === r.examId)?.serviceType;
                    return svc === 'WEEKLY_MAG';
                });
            } else if (subFilter === 'MOCK') {
                results = results.filter(r => {
                    const svc = r.serviceType || masterExams.find(e => e.docId === r.examId)?.serviceType;
                    return svc !== 'WEEKLY_MAG' && svc !== 'FREE_ARCHIVE';
                });
            } else if (subFilter === 'PREP') {
                results = results.filter(r => {
                    const svc = r.serviceType || masterExams.find(e => e.docId === r.examId)?.serviceType;
                    return svc === 'FREE_ARCHIVE';
                });
            }

            window.reportFilterHtml = `
                <div class="flex gap-2 mb-4 bg-gray-100 p-1.5 rounded-xl sticky top-0 z-20 shadow-sm">
                    <button onclick="window.myReportSubFilter='ALL'; refreshCurrentTab()" class="flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${subFilter==='ALL' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}">전체</button>
                    <button onclick="window.myReportSubFilter='WEEKLY'; refreshCurrentTab()" class="flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${subFilter==='WEEKLY' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}">주간지</button>
                    <button onclick="window.myReportSubFilter='MOCK'; refreshCurrentTab()" class="flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${subFilter==='MOCK' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}">모의고사</button>
                    <button onclick="window.myReportSubFilter='PREP'; refreshCurrentTab()" class="flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${subFilter==='PREP' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}">예시문항</button>
                </div>
            `;
"""
text = text.replace(target_report_1, replacement_report_1)

target_report_2 = "            if (results.length === 0) {"
replacement_report_2 = """            if (results.length === 0) {
                container.innerHTML = window.reportFilterHtml + `<div class="text-center py-20 text-gray-400">
                    <i data-lucide="bar-chart-2" class="w-12 h-12 mx-auto mb-3 opacity-50"></i>
                    <p>아직 채점된 성적이 없습니다.</p>
                </div>`;
                return;
            }
"""
text = text.replace(target_report_2 + "\n                container.innerHTML = `<div class=\"text-center py-20 text-gray-400\">\n                    <i data-lucide=\"bar-chart-2\" class=\"w-12 h-12 mx-auto mb-3 opacity-50\"></i>\n                    <p>아직 채점된 성적이 없습니다.</p>\n                </div>`;\n                return;\n            }", replacement_report_2)


target_report_3 = "                <div class=\"space-y-6 animate-fade-in\">\n                    ${results.length > 0 ? `"
replacement_report_3 = """                ${window.reportFilterHtml}
                <div class="space-y-6 animate-fade-in">
                    ${results.length > 0 ? `"""
text = text.replace(target_report_3, replacement_report_3)

target_report_4 = "                <div class=\"space-y-6 animate-fade-in\">\n                    <div class=\"flex justify-end\">"
replacement_report_4 = """                ${window.reportFilterHtml}
                <div class="space-y-6 animate-fade-in">
                    <div class="flex justify-end">"""
text = text.replace(target_report_4, replacement_report_4)

# --- 2. ALL TAB BANNER CARDS REWRITE ---
import re
target_all_tab = re.search(r"if \(filterType === 'all'\) \{.*?\n        \}\n\n        function createCard", text, flags=re.DOTALL)

if target_all_tab:
    replacement_all_tab = """if (filterType === 'all') {
            html += `
            <div class="mb-4">
                <h3 class="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2"><i data-lucide="shopping-cart" class="w-4 h-4 text-emerald-500"></i> 상품 안내 및 신청</h3>
                
                <!-- 1. 예시문항 패키지 -->
                <div class="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl p-6 text-white shadow-lg mb-6 relative overflow-hidden cursor-pointer hover:shadow-xl transition-all" onclick="location.href='../archive/archive.html'">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <div class="relative z-10">
                        <span class="bg-indigo-700/50 text-indigo-100 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide mb-2 inline-block">FREE PASS</span>
                        <h4 class="text-xl font-black mb-1">2028 예시문항 완벽분석</h4>
                        <p class="text-xs text-indigo-100 mb-4">교육청/평가원 기출문제 무료 제공 및 해설</p>
                        <button class="bg-white text-indigo-600 px-4 py-2 rounded-lg text-xs font-bold shadow-sm">무료로 시작하기</button>
                    </div>
                </div>

                <!-- 2. 모의고사 연간 패키지 -->
                <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-lg mb-6 relative overflow-hidden cursor-pointer hover:shadow-xl transition-all" onclick="location.href='../package_info.html'">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <div class="relative z-10">
                        <span class="bg-gray-700/50 text-gray-300 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide mb-2 inline-block">PREMIUM</span>
                        <h4 class="text-xl font-black mb-1">모의고사 연간 패키지</h4>
                        <p class="text-xs text-gray-400 mb-4">시즌별 고품질 모의고사 세트 (총 12회분)</p>
                        <button class="bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm">패키지 자세히 보기</button>
                    </div>
                </div>

                <!-- 3. 주간지 구독 -->
                <div class="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl p-6 text-white shadow-lg mb-6 relative overflow-hidden cursor-pointer hover:shadow-xl transition-all" onclick="location.href='../package_info.html'">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <div class="relative z-10">
                        <span class="bg-emerald-700/50 text-emerald-100 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide mb-2 inline-block">WEEKLY</span>
                        <h4 class="text-xl font-black mb-1">갓통과 주간지 구독</h4>
                        <p class="text-xs text-emerald-100 mb-4">매주 배달되는 핵심 문항 및 완벽 해설 (12주)</p>
                        <button class="bg-white text-emerald-600 px-4 py-2 rounded-lg text-xs font-bold shadow-sm">구독 신청하기</button>
                    </div>
                </div>
            </div>`;
            container.innerHTML = html;
            return;
        }

        function createCard"""
    text = text.replace(target_all_tab.group(0), replacement_all_tab)
else:
    print("Could not find filterType === 'all' block.")

with open('C:/Users/shko8/godtonggwa/public/STEST/exam.html', 'w', encoding='utf-8') as fw:
    fw.write(text)
print('Modifications for report tab and all tab done.')
