import sys

sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/shko8/godtonggwa/public/STEST/exam.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Inject filter UI at the start of 'my' tab
target1 = """            if (filterType === 'my') {
                // 시즌 모의고사 및 주간지 리스트업"""
replacement1 = """            if (filterType === 'my') {
                const subFilter = window.mySubFilter || 'ALL';
                
                html += `
                <div class="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl sticky top-0 z-20 shadow-sm">
                    <button onclick="window.mySubFilter='ALL'; refreshCurrentTab()" class="flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${subFilter==='ALL' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}">전체</button>
                    <button onclick="window.mySubFilter='WEEKLY'; refreshCurrentTab()" class="flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${subFilter==='WEEKLY' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}">주간지</button>
                    <button onclick="window.mySubFilter='MOCK'; refreshCurrentTab()" class="flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${subFilter==='MOCK' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}">모의고사</button>
                    <button onclick="window.mySubFilter='PREP'; refreshCurrentTab()" class="flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${subFilter==='PREP' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}">예시문항</button>
                </div>
                `;

                // 시즌 모의고사 및 주간지 리스트업"""
text = text.replace(target1, replacement1)

# 2. Wrap WEEKLY_MAG ROADMAP
target2 = "// --- WEEKLY_MAG ROADMAP ---\n                if (weeklyExams.length > 0) {"
replacement2 = "// --- WEEKLY_MAG ROADMAP ---\n                if ((subFilter === 'ALL' || subFilter === 'WEEKLY') && weeklyExams.length > 0) {"
text = text.replace(target2, replacement2)

# 3. Wrap MOCK and PREP
target3 = """// 1. 진행 중인 모의고사
                html += `<h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2"><i data-lucide="edit-3" class="w-4 h-4 text-indigo-500"></i> 진행 중인 모의고사 (OMR 입력 대기)</h3>`;"""
replacement3 = """if (subFilter === 'ALL' || subFilter === 'MOCK' || subFilter === 'PREP') {
                // 1. 진행 중인 모의고사
                if (subFilter === 'ALL' || subFilter === 'MOCK') {
                    html += `<h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2"><i data-lucide="edit-3" class="w-4 h-4 text-indigo-500"></i> 진행 중인 모의고사 (OMR 입력 대기)</h3>`;"""
text = text.replace(target3, replacement3)

target4 = """// 2. 성적 처리 완료
                html += `<h3 class="text-sm font-bold text-gray-800 mb-3 mt-8 flex items-center gap-2"><i data-lucide="check-square" class="w-4 h-4 text-emerald-500"></i> 성적 처리 완료</h3>`;

                if (completedPremiumExams.length === 0 && completedArchiveExams.length === 0) {"""
replacement4 = """                    html += `<div class="mb-6">`;
                }
                // 2. 성적 처리 완료
                html += `<h3 class="text-sm font-bold text-gray-800 mb-3 mt-8 flex items-center gap-2"><i data-lucide="check-square" class="w-4 h-4 text-emerald-500"></i> 성적 처리 완료</h3>`;

                if (completedPremiumExams.length === 0 && completedArchiveExams.length === 0) {"""
text = text.replace(target4, replacement4)

target5 = """// 프리미엄 결과
                    if (completedPremiumExams.length > 0) {"""
replacement5 = """// 프리미엄 결과
                    if ((subFilter === 'ALL' || subFilter === 'MOCK') && completedPremiumExams.length > 0) {"""
text = text.replace(target5, replacement5)

target6 = """// 기출문제 결과
                    if (completedArchiveExams.length > 0) {"""
replacement6 = """// 기출문제 결과
                    if ((subFilter === 'ALL' || subFilter === 'PREP') && completedArchiveExams.length > 0) {"""
text = text.replace(target6, replacement6)

target7 = """                    }
                }
                
                html += `</div>`;
                container.innerHTML = html;"""
replacement7 = """                    }
                }
                } // end wrapper 
                
                html += `</div>`;
                container.innerHTML = html;"""
text = text.replace(target7, replacement7)

with open('C:/Users/shko8/godtonggwa/public/STEST/exam.html', 'w', encoding='utf-8') as fw:
    fw.write(text)
print('Modifications for my tab done.')
