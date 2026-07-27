import sys, re
import os

sys.stdout.reconfigure(encoding='utf-8')
filepath = 'C:/Users/shko8/godtonggwa/public/STEST/exam.html'

with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# --- 1. 12주 -> 10주 변경 ---
text = text.replace('주간지 12주 완강 로드맵', '주간지 10주 완강 로드맵')
text = text.replace('${completedWeekly}주차 완료 / 12주', '${completedWeekly}주차 완료 / 10주')
text = text.replace('const totalWeekly = 12;', 'const totalWeekly = 10;')
text = text.replace('for(let i = 1; i <= 12; i++) {', 'for(let i = 1; i <= 10; i++) {')
text = text.replace('총 12회분', '총 10회분')
text = text.replace('완벽 해설 (12주)', '완벽 해설 (10주)')
# Also replace in the index.html just in case it was missed, though we already did it.

# --- 2. Report Filter HTML 교체 (전체 삭제, 예시문항->기출문제) ---
target_filter_html = """            window.reportFilterHtml = `
                <div class="flex gap-2 mb-4 bg-gray-100 p-1.5 rounded-xl sticky top-0 z-20 shadow-sm">
                    <button onclick="window.myReportSubFilter='ALL'; refreshCurrentTab()" class="flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${subFilter==='ALL' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}">전체</button>
                    <button onclick="window.myReportSubFilter='WEEKLY'; refreshCurrentTab()" class="flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${subFilter==='WEEKLY' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}">주간지</button>
                    <button onclick="window.myReportSubFilter='MOCK'; refreshCurrentTab()" class="flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${subFilter==='MOCK' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}">모의고사</button>
                    <button onclick="window.myReportSubFilter='PREP'; refreshCurrentTab()" class="flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${subFilter==='PREP' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}">예시문항</button>
                </div>
            `;"""
replacement_filter_html = """            window.reportFilterHtml = `
                <div class="flex gap-2 mb-4 bg-gray-100 p-1.5 rounded-xl sticky top-0 z-20 shadow-sm">
                    <button onclick="window.myReportSubFilter='WEEKLY'; refreshCurrentTab()" class="flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${subFilter==='WEEKLY' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}">주간지</button>
                    <button onclick="window.myReportSubFilter='MOCK'; refreshCurrentTab()" class="flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${subFilter==='MOCK' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}">모의고사</button>
                    <button onclick="window.myReportSubFilter='PREP'; refreshCurrentTab()" class="flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${subFilter==='PREP' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}">기출문제</button>
                </div>
            `;"""
text = text.replace(target_filter_html, replacement_filter_html)

# --- 3. subFilter 로직 및 데이터 필터링 수정 (주간지 데이터 모의고사에 섞이는 버그 픽스) ---
target_subfilter_logic = """            // --- FILTER INJECTION ---
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
            }"""
replacement_subfilter_logic = """            // --- FILTER INJECTION ---
            let subFilter = window.myReportSubFilter;
            
            // 데이터의 서비스 종류 판별 함수 (누락된 주간지 아이디 패턴도 인식)
            const getSvc = (r) => {
                let svc = r.serviceType || masterExams.find(e => e.docId === r.examId)?.serviceType;
                if (!svc && r.examId && (r.examId.toLowerCase().includes('week') || r.examId.startsWith('W'))) {
                    svc = 'WEEKLY_MAG';
                }
                return svc;
            };

            if (!subFilter) {
                // 초기 진입 시, 가장 최근에 친 시험 데이터의 분류로 자동 선택
                if (results.length > 0) {
                    const svc = getSvc(results[0]);
                    if (svc === 'WEEKLY_MAG') subFilter = 'WEEKLY';
                    else if (svc === 'FREE_ARCHIVE') subFilter = 'PREP';
                    else subFilter = 'MOCK';
                } else {
                    subFilter = 'MOCK';
                }
                window.myReportSubFilter = subFilter;
            }

            if (subFilter === 'WEEKLY') {
                results = results.filter(r => getSvc(r) === 'WEEKLY_MAG');
            } else if (subFilter === 'MOCK') {
                results = results.filter(r => getSvc(r) !== 'WEEKLY_MAG' && getSvc(r) !== 'FREE_ARCHIVE');
            } else if (subFilter === 'PREP') {
                results = results.filter(r => getSvc(r) === 'FREE_ARCHIVE');
            }"""
text = text.replace(target_subfilter_logic, replacement_subfilter_logic)

# --- 4. 디폴트 렌더링 뷰를 cumulative -> 최신 개별 모의고사로 변경 ---
# First, change the argument default
text = text.replace('async function renderReportPage(container, selectedId = \'cumulative\') {', 'async function renderReportPage(container, selectedId = null) {')

# Second, change the cumulative check logic inside renderReportPage
target_cumulative_logic = """            // [추가] 선택값이 누적 분석이거나, 기본값이면서 결과가 1개 이상일 때 누적 뷰 호출
            if (selectedId === 'cumulative' || (!selectedId && results.length > 0)) {
                await renderCumulativeReportPage(container, results);
                return;
            }"""
replacement_cumulative_logic = """            // 기본값일 경우 가장 최근 개별 모의고사를 보여줌
            if (!selectedId && results.length > 0) {
                selectedId = results[0].examId;
            }

            // 누적 뷰가 명시적으로 선택되었을 때만 호출
            if (selectedId === 'cumulative') {
                await renderCumulativeReportPage(container, results);
                return;
            }"""
text = text.replace(target_cumulative_logic, replacement_cumulative_logic)

# --- 5. 탭 전환 시 디폴트 타겟을 null로 설정 ---
target_tab_logic = """            if (window.currentTab === 'report') {
                // [수정] 보고서 진입 시 누적 분석(cumulative)을 기본값으로 사용
                const targetId = window.pendingReportId || 'cumulative';
                renderReportPage(contentDiv, targetId);
                window.pendingReportId = null;
            }"""
replacement_tab_logic = """            if (window.currentTab === 'report') {
                // [수정] 보고서 진입 시 최신 개별 리포트를 기본값으로 사용
                const targetId = window.pendingReportId || null;
                renderReportPage(contentDiv, targetId);
                window.pendingReportId = null;
            }"""
text = text.replace(target_tab_logic, replacement_tab_logic)


# Save the file
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)

print("exam.html successfully refactored!")
