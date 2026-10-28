// 2028학년도 대비 갓통과 시즌 0 모의고사 1회 정답 및 해설 데이터
// -----------------------------------------------------------------------------
// [통일 해설 양식 표준]
// - 전역 객체: window.globalExamData (및 window.examData 호환 별칭)
// - 문항별 해설 객체: { no, domain, chapter, topic, behavioralDomain, content }
// - 문체 및 수식: 2회.txt의 정제된 1:1 과외 톤앤매너 + KaTeX 수식($...$)
// - 구조 및 디자인: explanation.html 전용 시맨틱 HTML 클래스
// -----------------------------------------------------------------------------

window.globalExamData = {
    title: "2028 갓통과 시즌 0 모의고사 1회",
    answers: [5,5,3,1,5,4,3,1,4,5,2,4,5,1,2,2,4,2,3,4,2,3,2,5,1],
    scores: [1.5,1.5,1.5,2.5,1.5,2,1.5,2,2,1.5,2.5,2,1.5,2,2,2,1.5,2,2.5,2.5,2,2.5,2.5,2.5,2.5],
    explanations: [
        // 1번 해설 (과학의 기초 > 측정과 어림 | 이해)
        {
            no: 1,
            domain: "통합과학2",
            chapter: "환경과 에너지",
            topic: "생태계 평형",
            behavioralDomain: "이해",
            content: `<div class="ans-correct-title">정답: ⑤ ㄱ, ㄴ, ㄷ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 미시 세계와 거시 세계의 규모 및 측정</div>
    <div class="concept-content">
        자연을 이루는 세계는 원자·분자·세포처럼 눈으로 직접 볼 수 없는 <strong>미시 세계</strong>와 행성·별·은하처럼 거대한 <strong>거시 세계</strong>로 구분해!<br>
        • <strong>길이 단위 환산</strong>: $1\\,\\text{m} = 10^3\\,\\text{mm} = 10^6\\,\\mu\\text{m} = 10^9\\,\\text{nm}$<br>
        • <strong>관측 도구</strong>: 광학 현미경이나 전자 현미경은 작은 물체를 확대하여 <strong>미시 세계</strong>를 탐구하는 도구이고, 천체 망원경은 멀리 있는 천체를 관측하여 <strong>거시 세계</strong>를 탐구하는 도구란다.
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄱ.</span><span class="fact-check-text">적혈구의 지름(약 $8\\,\\mu\\text{m} = 8 \\times 10^{-6}\\,\\text{m}$)이 속하는 미시 세계에서 나노미터($1\\,\\text{nm} = 10^{-9}\\,\\text{m}$)는 마이크로미터($1\\,\\mu\\text{m} = 10^{-6}\\,\\text{m}$)보다 $1000$배($10^3$배) 작은 단위야. 따라서 미시 세계에는 마이크로미터($\\mu\\text{m}$)보다 더 작은 나노미터($\\text{nm}$) 단위로 측정해야 하는 대상(예: DNA 폭, 수소 원자 크기 등)이 존재한다는 설명은 옳아! (O)</span></div>
<div class="fact-check-item"><span class="fact-check-label">ㄴ.</span><span class="fact-check-text">적혈구($8 \\times 10^{-6}\\,\\text{m}$)와 같이 육안으로 볼 수 없는 세포의 크기를 측정하는 것은 <strong>미시 세계</strong>의 탐구 활동이고, 지구의 지름($1.3 \\times 10^7\\,\\text{m}$)을 측정하는 것은 <strong>거시 세계</strong>의 탐구 활동에 해당해! (O)</span></div>
<div class="fact-check-item"><span class="fact-check-label">ㄷ.</span><span class="fact-check-text">(가)의 현미경은 작은 대상을 확대하여 관찰하는 도구이므로, 육안으로 관찰하기 힘든 작은 생물이나 세포를 탐구하는 <strong>미시 세계</strong> 연구에 주로 사용돼! (O)</span></div>`
        },
        // 2번 해설 (과학의 기초 > 측정과 어림 | 이해)
        {
            no: 2,
            domain: "통합과학1",
            chapter: "과학의 기초",
            topic: "측정과 어림",
            behavioralDomain: "이해",
            content: `<div class="ans-correct-title">정답: ⑤ ㄱ, ㄴ, ㄷ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 기체 분자 운동과 증발·확산</div>
    <div class="concept-content">
        • <strong>증발</strong>: 액체 표면에 있는 분자가 분자 간 인력을 이겨내고 스스로 기체 상태로 튀어 나가는 현상이야.<br>
        • <strong>확산</strong>: 물질을 이루는 입자들이 스스로 운동하여 액체나 기체 속으로 사방으로 퍼져 나가는 현상이란다.<br>
        • <strong>온도와 입자 운동</strong>: 온도가 높을수록 분자들의 평균 운동 에너지가 커져 입자 운동이 활발해지므로 증발과 확산 속도가 모두 빨라져!
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄱ.</span><span class="fact-check-text">손등에 바른 액체 상태의 향수 입자가 기체로 변하는 현상은 액체 표면에서 일어나는 <strong>증발</strong>이므로 ㉠은 '증발'이 맞아! (O)</span></div>
<div class="fact-check-item"><span class="fact-check-label">ㄴ.</span><span class="fact-check-text">향기 입자가 공기 중으로 퍼져 나가 멀리 있는 사람에게 전달되는 현상(확산)은 입자들이 정지해 있지 않고 <strong>스스로 끊임없이 운동</strong>하기 때문에 일어나는 거야! (O)</span></div>
<div class="fact-check-item"><span class="fact-check-label">ㄷ.</span><span class="fact-check-text">온도가 높을수록 향기 입자의 열운동이 활발해져 확산 속도가 빨라지므로, 기온이 높은 여름철이 추운 겨울철보다 향기가 더 빠르게 퍼져 나간단다! (O)</span></div>`
        },
        // 3번 해설 (과학의 기초 > 기본량과 단위 | 이해)
        {
            no: 3,
            domain: "통합과학1",
            chapter: "과학의 기초",
            topic: "기본량과 단위",
            behavioralDomain: "이해",
            content: `<div class="ans-correct-title">정답: ③ ㄷ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 국제단위계(SI)의 기본량과 유도량</div>
    <div class="concept-content">
        • <strong>7가지 SI 기본량과 기본 단위</strong>: 길이($\\text{m}$), 질량($\\text{kg}$), 시간($\\text{s}$), 전류($\\text{A}$), 열역학적 온도($\\text{K}$), 물질량($\\text{mol}$), 광도($\\text{cd}$)<br>
        • <strong>유도량과 유도 단위</strong>: 기본량을 조합하여 나타낸 물리량으로, 부피($\\text{m}^3$, $\\text{cm}^3$, $\\text{L}$), 밀도($\\text{kg/m}^3$, $\\text{g/cm}^3$), 속력($\\text{m/s}$), 힘($\\text{N}$) 등이 있어.<br>
        • 자료 분석: ㉠은 <strong>질량</strong>(기본량), ㉡은 <strong>부피</strong>(유도량), ㉢은 <strong>밀도</strong>(유도량)야!
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄷ.</span><span class="fact-check-text">돌멩이의 질량(㉠)은 $60\\,\\text{g}$이고, 돌멩이를 넣었을 때 늘어난 물의 부피(돌멩이의 부피, ㉡)는 $150\\,\\text{mL} - 100\\,\\text{mL} = 50\\,\\text{mL} = 50\\,\\text{cm}^3$야. 따라서 돌멩이의 밀도(㉢)는 $\\dfrac{\\text{질량}}{\\text{부피}} = \\dfrac{60\\,\\text{g}}{50\\,\\text{cm}^3} = 1.2\\,\\text{g/cm}^3$이 맞아! (O)</span></div>

<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄱ.</span><span class="fact-check-text">㉠(질량), ㉡(부피), ㉢(밀도) 중 국제단위계(SI)의 <strong>기본량</strong>에 해당하는 것은 <strong>㉠(질량) 1가지</strong>뿐이야! 부피(㉡, $\\text{길이}^3$)와 밀도(㉢, $\\text{질량}/\\text{부피}$)는 모두 유도량이란다. (X)</span></div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄴ.</span><span class="fact-check-text">SI 기본 단위는 질량에 $\\text{kg}$, 길이에 $\\text{m}$를 사용해. 따라서 기본 단위를 조합한 ㉢(밀도)의 국제단위계(SI) 유도 단위는 $\\text{g/cm}^3$이 아니라 <strong>$\\text{kg/m}^3$</strong>이야! (X)</span></div>
</div>`
        },
        // 4번 해설 (물질과 규칙성 > 지각과 생명체 구성 물질의 규칙성 | 이해)
        {
            no: 4,
            domain: "통합과학1",
            chapter: "물질과 규칙성",
            topic: "지각·생명체 구성 물질의 규칙성(1)",
            behavioralDomain: "이해",
            content: `<div class="ans-correct-title">정답: ① ㄱ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 규산염 사면체와 규산염 광물의 결합 구조</div>
    <div class="concept-content">
        • <strong>규산염 사면체</strong>: 규소($\\text{Si}$) 1개를 중심으로 산소($\\text{O}$) 4개가 공유 결합한 $\\text{SiO}_4^{4-}$ 정사면체 구조야. 중심 원자인 <strong>㉠은 $\\text{Si}$(규소)</strong>, 주변 원자인 <strong>㉡은 $\\text{O}$(산소)</strong>란다.<br>
        • <strong>결합 구조와 특성 비교</strong>:<br>
        &nbsp;&nbsp;- <strong>감람석(독립형)</strong>: 사면체끼리 산소를 공유하지 않아 결합이 끊어지기 쉬움(풍화에 약함), <strong>깨짐</strong> 성질이 나타남.<br>
        &nbsp;&nbsp;- <strong>휘석(단사슬 구조)</strong>: 사면체가 양옆 산소를 2개씩 공유하여 사슬 모양으로 연결됨, 감람석보다 풍화에 강함.<br>
        &nbsp;&nbsp;- <strong>석영(망상 구조)</strong>: 모든 산소(4개)를 공유하여 3차원 입체 그물 구조를 이룸(풍화에 가장 강함), 불순물이 없는 순수한 결정은 무색투명함.
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄱ.</span><span class="fact-check-text">감람석은 규산염 사면체가 철($\\text{Fe}$)이나 마그네슘($\\text{Mg}$) 양이온과 결합한 독립형 구조로, 특정 방향의 약한 결합면이 없어 힘을 받으면 불규칙하게 떨어져 나가는 <strong>'깨짐'</strong> 성질이 나타나! 따라서 (가)에는 '깨짐'이 들어가는 것이 옳아. (O)</span></div>

<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄴ.</span><span class="fact-check-text">규산염 사면체 사이에 공유하는 산소의 수가 많을수록 결합이 단단하여 지표의 풍화에 강해! 단사슬 구조인 휘석은 독립형 구조인 감람석보다 공유하는 산소 수가 많아 정출 온도가 낮고 <strong>풍화에 대한 저항성이 더 크단다</strong>(감람석이 풍화에 더 약함). (X)</span></div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄷ.</span><span class="fact-check-text">㉠은 규소($\\text{Si}$, 원자 번호 14, 3주기 14족)이므로 전자껍질 수는 $3$, 원자가 전자 수는 $4$여서 $\\dfrac{\\text{원자가 전자 수}}{\\text{전자껍질 수}} = \\dfrac{4}{3}$이야. 반면 ㉡은 산소($\\text{O}$, 원자 번호 8, 2주기 16족)이므로 전자껍질 수는 $2$, 원자가 전자 수는 $6$이어서 $\\dfrac{\\text{원자가 전자 수}}{\\text{전자껍질 수}} = \\dfrac{6}{2} = 3$이란다. 따라서 이 값은 ㉠($4/3$)이 ㉡($3$)보다 작아! (X)</span></div>
</div>`
        },
        // 5번 해설 (시스템과 상호작용 > 생명 시스템의 기본 단위 | 이해)
        {
            no: 5,
            domain: "통합과학2",
            chapter: "환경과 에너지",
            topic: "생태계 구성 요소",
            behavioralDomain: "이해",
            content: `<div class="ans-correct-title">정답: ⑤ ㄱ, ㄴ, ㄷ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 생물의 유기적 구성 단계와 세포소기관</div>
    <div class="concept-content">
        • <strong>세포소기관</strong>: <strong>A는 핵</strong>(유전 물질 DNA가 있어 세포의 생명 활동을 조절함), <strong>B는 미토콘드리아</strong>(세포 호흡을 통해 생명 활동에 필요한 에너지 ATP를 생성함)야.<br>
        • <strong>동물의 구성 단계</strong>: 세포 $\\rightarrow$ 조직 $\\rightarrow$ 기관 $\\rightarrow$ 기관계 $\\rightarrow$ 개체<br>
        • <strong>근육 세포</strong>는 모양과 기능이 비슷한 세포들이 모여 근육 조직을 이루는 기본 단위 세포란다!
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄱ.</span><span class="fact-check-text">A는 세포의 중심부에서 유전 정보를 저장하고 있는 <strong>핵</strong>으로, 염색체(DNA)가 존재하여 세포의 구조와 기능을 결정하고 생명 활동을 통제·조절해! (O)</span></div>
<div class="fact-check-item"><span class="fact-check-label">ㄴ.</span><span class="fact-check-text">B는 내막이 주름진 구조를 가진 <strong>미토콘드리아</strong>로, 유기물을 분해하는 세포 호흡을 통해 세포가 사용하는 에너지(ATP)를 생산하는 발전소 역할을 해! (O)</span></div>
<div class="fact-check-item"><span class="fact-check-label">ㄷ.</span><span class="fact-check-text">생물의 유기적 구성 단계에서 '근육 세포'는 생물체를 구조적·기능적으로 이루는 기본 단위인 <strong>'세포'</strong> 단계에 해당해! (O)</span></div>`
        },
        // 6번 해설 (변화와 다양성 > 물질 변화에서 에너지 출입 | 의사소통)
        {
            no: 6,
            domain: "통합과학2",
            chapter: "변화와 다양성",
            topic: "물질 변화에서 에너지 출입",
            behavioralDomain: "의사소통",
            content: `<div class="ans-correct-title">정답: ④ ㄴ, ㄷ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 화학 반응에서의 열의 출입 (발열 vs 흡열)</div>
    <div class="concept-content">
        • <strong>흡열 반응 (가)</strong>: 질산 암모늄($\\text{NH}_4\\text{NO}_3$)과 수산화 바륨($\\text{Ba(OH)}_2 \\cdot 8\\text{H}_2\\text{O}$)의 반응은 주변의 열을 <strong>흡수</strong>하는 대표적인 <strong>흡열 반응</strong>이야(주변 온도 하강, 물이 얾). 반응물의 에너지 합보다 생성물의 에너지 합이 더 크단다.<br>
        • <strong>발열 반응 (나)</strong>: 산화 칼슘($\\text{CaO}$)과 물($\\text{H}_2\\text{O}$)의 반응은 주변으로 열을 <strong>방출</strong>하는 대표적인 <strong>발열 반응</strong>이야(주변 온도 상승). 반응물의 에너지 합이 생성물의 에너지 합보다 더 높아서 그 차이만큼 열을 방출해!
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄴ.</span><span class="fact-check-text">(나)의 산화 칼슘과 물의 반응은 열에너지를 방출하는 발열 반응이므로, 반응물의 에너지 합이 생성물의 에너지 합보다 더 <strong>'높은'</strong> 반응이야. 따라서 ㉡은 '높은'이 맞아! (O)</span></div>
<div class="fact-check-item"><span class="fact-check-label">ㄷ.</span><span class="fact-check-text">식물의 광합성은 빛에너지를 흡수하여 포도당에 화학 에너지로 저장하는 <strong>흡열 반응</strong>이야. 따라서 열의 출입 방향이 주변에서 열을 흡수하는 (가)와 같단다! (O)</span></div>

<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄱ.</span><span class="fact-check-text">실험 (가)에서 나무판 위의 물이 얼어 삼각 플라스크가 달라붙은 것은 반응이 일어나면서 주변(물)로부터 열을 빼앗아 갔기 때문이야. 즉, 열에너지를 <strong>'흡수'</strong>하는 흡열 반응이므로 ㉠은 '방출'이 아니라 <strong>'흡수'</strong>야! (X)</span></div>
</div>`
        },
        // 7번 해설 (과학과 미래 사회 > 인공지능과 과학 탐구 | 자료 변환 및 해석)
        {
            no: 7,
            domain: "통합과학2",
            chapter: "과학과 미래 사회",
            topic: "인공지능과 과학 탐구",
            behavioralDomain: "자료 변환 및 해석",
            content: `<div class="ans-correct-title">정답: ③ ㄱ, ㄴ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 스마트 과학 탐구와 데이터 전처리</div>
    <div class="concept-content">
        • <strong>데이터 전처리(Preprocessing)</strong>: 센서로 수집한 원시 데이터에서 통신 오류로 인한 결측치(빈 값)나 비정상적으로 튀는 이상치(노이즈)를 제거·보정하여 분석 결과의 <strong>정확도와 신뢰성</strong>을 높이는 필수 과정이야.<br>
        • <strong>그래프 해석</strong>: 실선(평일)은 출근 시간대(08시경)와 퇴근 시간대(18~20시경)에 미세먼지 농도가 뚜렷하게 치솟으며 변동 폭이 크고, 점선(주말)은 하루 동안 농도 변화가 완만해!
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄱ.</span><span class="fact-check-text">(나) 과정에서 센서 오류로 인한 이상치와 결측치를 제거하는 데이터 전처리를 수행하면, 잘못된 값으로 인한 왜곡을 막아 탐구 결과의 <strong>정확도와 신뢰성</strong>을 높일 수 있어! (O)</span></div>
<div class="fact-check-item"><span class="fact-check-label">ㄴ.</span><span class="fact-check-text">그래프를 보면 자동차 통행과 경제 활동이 활발한 평일 출퇴근 시간대에 미세먼지 농도가 급증하므로, 도심의 미세먼지 농도가 인간의 활동과 밀접한 관련이 있음을 알 수 있어! (O)</span></div>

<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄷ.</span><span class="fact-check-text">시간에 따른 미세먼지 농도의 변화 폭(최댓값과 최솟값의 차이)을 비교해 보면, 실선으로 나타낸 <strong>평일</strong>(약 $27 \\sim 65\\,\\mu\\text{g/m}^3$)이 점선으로 나타낸 <strong>주말</strong>(약 $29 \\sim 45\\,\\mu\\text{g/m}^3$)보다 훨씬 크단다! (X)</span></div>
</div>`
        },
        // 8번 해설 (환경과 에너지 > 에너지 전환과 효율 | 적용)
        {
            no: 8,
            domain: "통합과학2",
            chapter: "환경과 에너지",
            topic: "에너지 전환과 효율",
            behavioralDomain: "적용",
            content: `<div class="ans-correct-title">정답: ① 0.03</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 에너지 전환 효율과 전력량 계산</div>
    <div class="concept-content">
        • <strong>단위 환산</strong>: $1\\,\\text{GJ(기가줄)} = 10^3\\,\\text{MJ(메가줄)} = 1,000\\,\\text{MJ}$<br>
        • <strong>다단계 에너지 전환 효율</strong>: 전체 발전 효율은 각 단계의 전환 효율을 곱한 값과 같아!<br>
        &nbsp;&nbsp;$E_{\\text{전기}} = (\\text{총 발생 열에너지}) \\times (\\text{열}\\rightarrow\\text{운동 효율}) \\times (\\text{운동}\\rightarrow\\text{전기 효율})$
    </div>
</div>

<div class="fact-check-title">🎯 단계별 풀이 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">1단계</span><span class="fact-check-text"><strong>발전소 A(화력 발전)에서 화석 연료 $100\\,\\text{kg}$으로 생산하는 전기 에너지 구하기</strong><br>
• 총 발생 열에너지 $= 100\\,\\text{kg} \\times 40\\,\\text{MJ/kg} = 4,000\\,\\text{MJ}$<br>
• 운동 에너지로 전환된 양 $= 4,000\\,\\text{MJ} \\times 0.2(20\\%) = 800\\,\\text{MJ}$<br>
• 최종 생산된 전기 에너지(전력량) $= 800\\,\\text{MJ} \\times 0.9(90\\%) = 720\\,\\text{MJ}$</span></div>
<div class="fact-check-item"><span class="fact-check-label">2단계</span><span class="fact-check-text"><strong>발전소 B(원자력 발전)에서 $720\\,\\text{MJ}$을 생산하기 위해 필요한 핵연료 질량($x\\,\\text{g}$) 구하기</strong><br>
• 핵연료 $1\\,\\text{g}$당 발생 열에너지 $= 80\\,\\text{GJ} = 80,000\\,\\text{MJ}$<br>
• 핵연료 $1\\,\\text{g}$당 생산 전기 에너지 $= 80,000\\,\\text{MJ} \\times 0.3(30\\%) = 24,000\\,\\text{MJ/g}$<br>
• 따라서 필요한 핵연료의 질량 $x = \\dfrac{720\\,\\text{MJ}}{24,000\\,\\text{MJ/g}} = 0.03\\,\\text{g}$이야! (정답 ①)</span></div>`
        },
        // 9번 해설 (변화와 다양성 > 자연선택 | 이해)
        {
            no: 9,
            domain: "통합과학2",
            chapter: "변화와 다양성",
            topic: "자연선택",
            behavioralDomain: "이해",
            content: `<div class="ans-correct-title">정답: ④ ㄴ, ㄷ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 자연 선택과 생물 다양성</div>
    <div class="concept-content">
        • <strong>다윈의 자연 선택설 과정</strong>: 과잉 생산과 개체 변이(유전적 다양성) $\\rightarrow$ 생존 경쟁 $\\rightarrow$ <strong>자연 선택</strong>(환경에 유리한 변이를 가진 개체가 살아남아 자손을 더 많이 남김) $\\rightarrow$ 진화(종 분화)<br>
        • 같은 종 내의 개체들 사이에서 부리 모양, 털 색깔 등 형질이 다양하게 나타나는 변이는 유전자 차이로 인한 <strong>유전적 다양성</strong>에 해당해!
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄴ.</span><span class="fact-check-text">각 섬의 먹이 환경에 알맞은 특정 부리 모양을 가진 개체가 생존 경쟁에서 살아남아 자손을 남길 확률이 높았다는 ㉠은 <strong>자연 선택</strong>에 의한 진화 과정을 설명한 것이 맞아! (O)</span></div>
<div class="fact-check-item"><span class="fact-check-label">ㄷ.</span><span class="fact-check-text">(가)는 딱딱한 씨앗이 많은 환경에, (다)는 선인장이나 나무 틈의 곤충이 많은 환경에 각각 적응하여 오랜 세월 자연 선택된 결과 서로 다른 종으로 진화한 것이야! (O)</span></div>

<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄱ.</span><span class="fact-check-text">자연 선택의 출발점이 되는 초기 핀치새 무리 내의 부리 모양 변이는 개체들이 가진 유전자 차이에서 비롯된 것이므로 종 다양성이 아니라 <strong>유전적 다양성</strong>에 해당해! (X)</span></div>
</div>`
        },
        // 10번 해설 (물질과 규칙성 > 별의 진화 | 이해)
        {
            no: 10,
            domain: "통합과학1",
            chapter: "물질과 규칙성",
            topic: "별의 진화",
            behavioralDomain: "이해",
            content: `<div class="ans-correct-title">정답: ⑤ ㄱ, ㄴ, ㄷ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 별의 내부 핵융합과 지구·생명체 구성 원소</div>
    <div class="concept-content">
        • <strong>질량이 태양보다 훨씬 큰 별의 내부 구조</strong>: 중심부로 갈수록 온도와 압력이 높아 더 무거운 원소의 핵융합이 일어나며, 중심에서 철($\\text{Fe}$)까지 생성돼! 바깥쪽에서 안쪽으로 $\\text{H} \\rightarrow \\text{He} \\rightarrow \\text{C(탄소)} \\rightarrow \\text{O(산소)} \\rightarrow \\text{Si(규소)} \\rightarrow \\text{Fe(철)}$ 순서를 이룬단다.<br>
        • <strong>지구를 구성하는 원소 질량비</strong>: 1위 철($\\text{Fe}$) $>$ 2위 <strong>산소($\\text{O}$)</strong> $>$ 3위 <strong>규소($\\text{Si}$)</strong><br>
        • <strong>사람(생명체)을 구성하는 원소 질량비</strong>: 1위 <strong>산소($\\text{O}$)</strong> $>$ 2위 <strong>탄소($\\text{C}$)</strong> $>$ 3위 수소($\\text{H}$)<br>
        • 따라서 <strong>A는 규소($\\text{Si}$), B는 산소($\\text{O}$), C는 탄소($\\text{C}$)</strong>야!
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄱ.</span><span class="fact-check-text">태양과 같이 질량이 작은 별은 중심부에서 탄소($\\text{C}$)와 산소($\\text{O}$)까지만 만들어지고 핵융합이 멈추지만, 이 별은 중심부에서 규소 핵융합을 거쳐 철($\\text{Fe}$)까지 생성되었으므로 중심부의 온도가 태양보다 훨씬 높아! (O)</span></div>
<div class="fact-check-item"><span class="fact-check-label">ㄴ.</span><span class="fact-check-text">지구를 구성하는 원소 질량비 3위이자 별 내부에서 철($\\text{Fe}$) 바로 바깥 층을 이루는 A는 <strong>규소($\\text{Si}$)</strong>로, 주기율표의 <strong>14족 원소</strong>(원자가 전자 수 4)가 맞아! (O)</span></div>
<div class="fact-check-item"><span class="fact-check-label">ㄷ.</span><span class="fact-check-text">B는 산소($\\text{O}$, 16족), C는 탄소($\\text{C}$, 14족)이므로 B와 C는 모두 <strong>비금속 원소</strong>에 해당해! (O)</span></div>`
        },
        // 11번 해설 (과학과 미래 사회 > 감염병과 병원체 | 결론 도출 및 일반화)
        {
            no: 11,
            domain: "통합과학2",
            chapter: "과학과 미래 사회",
            topic: "감염병과 병원체",
            behavioralDomain: "결론 도출 및 일반화",
            content: `<div class="ans-correct-title">정답: ② ㄴ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 기후 변화와 감염병 매개체의 전파 조건 해석</div>
    <div class="concept-content">
        • <strong>전파 가능 조건</strong>: 모기가 죽기 전에 체내 바이러스의 외부 잠복기가 끝나야 하므로, <strong>모기의 수명($L$, 실선) $>$ 외부 잠복기(점선)</strong>인 구간에서 전파가 가능해!<br>
        • <strong>그래프 분석</strong>: 온도가 $26\\,^\\circ\\text{C}$보다 높아지면 점선(외부 잠복기)이 실선(모기의 수명)보다 아래로 내려가면서 빗금 친 전파 가능 구간이 나타나지? 이는 기온이 상승할 때 모기의 수명도 줄어들지만, 바이러스의 외부 잠복기가 <strong>더 크게 감소(단축)</strong>하기 때문이야!
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄴ.</span><span class="fact-check-text">기온이 상승할수록 외부 잠복기(모기 체내에서 병원체가 증식하여 전파력을 갖게 될 때까지 걸리는 시간)가 짧아진다는 것은, 모기 체내에서 바이러스의 증식 속도가 그만큼 <strong>빨라진다</strong>는 뜻이야! (O)</span></div>

<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄱ.</span><span class="fact-check-text">온도가 올라갈 때 실선(모기의 수명)과 점선(외부 잠복기) 모두 아래로 내려가므로 기간이 짧아지고 있어. 특히 점선의 기울기가 더 가파르므로, 기온 상승은 모기의 수명보다 병원체의 외부 잠복기를 더 크게 <strong>'감소(단축)'</strong>시켜 전파 가능성을 높인단다. 따라서 ㉠은 '증가'가 아니라 <strong>'감소'</strong>야! (X)</span></div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄷ.</span><span class="fact-check-text">지구 온난화로 평균 기온이 $26\\,^\\circ\\text{C}$ 이상인 지역과 기간이 늘어나면 전파 가능 조건($L > \\text{외부 잠복기}$)을 만족하는 영역이 넓어지므로, 뎅기열 환자 수는 감소하는 것이 아니라 <strong>증가</strong>할 것으로 예상할 수 있어! (X)</span></div>
</div>`
        },
        // 12번 해설 (변화와 다양성 > 산화와 환원 | 적용)
        {
            no: 12,
            domain: "통합과학2",
            chapter: "변화와 다양성",
            topic: "산화와 환원",
            behavioralDomain: "적용",
            content: `<div class="ans-correct-title">정답: ④ ㄴ, ㄷ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 금속과 금속 양이온의 산화·환원 반응과 전하량 보존</div>
    <div class="concept-content">
        • <strong>반응 전 수용액($\\text{XCl}$) 분석</strong>: 염화 이온($\\text{Cl}^-$)은 $1$가 음이온이므로, $\\text{XCl}$이 전기적으로 중성이 되려면 $\\text{X}^{a+}$는 $1$가 양이온($a = 1$, $\\text{X}^+$)이어야 해!<br>
        • <strong>구경꾼 이온 찾기</strong>: 반응 전후 개수가 $3$개로 변하지 않는 <strong>○는 구경꾼 이온인 $\\text{Cl}^-$</strong>이야. 따라서 반응 전에 $3$개 있었다가 반응 후 $1$개로 줄어든 <strong>■는 $\\text{X}^+$</strong>, 반응 후 새로 $1$개 생성된 <strong>▲는 $\\text{Y}^{b+}$</strong>란다!<br>
        • <strong>전하량 보존 법칙</strong>: $\\text{X}^+$ 이온 $2$개(총 전하량 $+2$)가 환원되어 석출될 때 $\\text{Y}^{b+}$ 이온 $1$개가 생성되었으므로, 전하량 총합이 보존되려면 $b = 2$($\\text{Y}^{2+}$)여야 해!
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄴ.</span><span class="fact-check-text">금속 $\\text{Y}$를 넣었을 때 수용액 속에 $\\text{Y}^{2+}$(▲) 이온이 생성되었으므로, 금속 $\\text{Y}$는 전자를 잃고 양이온($\\text{Y}^{2+}$)으로 <strong>산화</strong>된 것이 맞아! (O)</span></div>
<div class="fact-check-item"><span class="fact-check-label">ㄷ.</span><span class="fact-check-text">$\\text{XCl}$에서 $a = 1$이고, $\\text{X}^+$ 이온 $2$개가 감소할 때 $\\text{Y}^{b+}$ 이온 $1$개가 증가하여 양이온의 총 전하량($+3$)이 일정하게 유지되므로 $b = 2$야. 따라서 $a : b = 1 : 2$가 성립해! (O)</span></div>

<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄱ.</span><span class="fact-check-text">반응 전과 반응 후에 모두 $3$개로 개수가 일정하게 유지되는 ○는 반응에 참여하지 않는 구경꾼 이온인 <strong>$\\text{Cl}^-$</strong>이야! $\\text{X}^{a+}$는 개수가 $3$개에서 $1$개로 줄어든 ■란다. (X)</span></div>
</div>`
        },
        // 13번 해설 (물질과 규칙성 > 원소 형성 | 적용)
        {
            no: 13,
            domain: "통합과학1",
            chapter: "물질과 규칙성",
            topic: "원소 형성",
            behavioralDomain: "적용",
            content: `<div class="ans-correct-title">정답: ⑤ ㄱ, ㄴ, ㄷ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 별의 흡수 스펙트럼과 우주의 진화</div>
    <div class="concept-content">
        • <strong>스펙트럼 비교</strong>: 별 (가)의 스펙트럼에는 수소와 헬륨의 흡수선만 주로 나타나지만, 별 (나)의 스펙트럼에는 수소와 헬륨 이외에도 수많은 무거운 원소(중원소)들의 흡수선이 촘촘하게 나타나!<br>
        • <strong>별의 세대와 탄생 시기</strong>: 우주 초기에 먼저 탄생한 별일수록 수소와 헬륨 위주로 구성되고, 별의 진화와 초신성 폭발을 거쳐 우주 공간에 무거운 원소가 방출된 뒤에 뒤늦게 탄생한 별(태양 등)일수록 중원소 흡수선이 많이 나타난단다.
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄱ.</span><span class="fact-check-text">(가)는 수소와 헬륨 흡수선 위주로 나타나고 (나)는 무거운 원소들의 흡수선이 다수 포함되어 있으므로, 중원소가 축적되기 전인 우주 초기에 형성된 <strong>(가)가 (나)보다 탄생 시기가 이른 별</strong>이야! (O)</span></div>
<div class="fact-check-item"><span class="fact-check-label">ㄴ.</span><span class="fact-check-text">(나)에 포함된 수소·헬륨 이외의 무거운 원소들은 이전 세대 별의 내부 핵융합 반응과 <strong>초신성 폭발</strong> 같은 우주 진화 과정을 통해 생성되어 성간 물질로 흩어진 산물이야! (O)</span></div>
<div class="fact-check-item"><span class="fact-check-label">ㄷ.</span><span class="fact-check-text">(가)와 (나)를 비롯한 우주 전역의 별과 은하 스펙트럼에서 흡수선의 위치와 세기(선폭)를 분석하면, 우주를 구성하는 수소와 헬륨의 질량비가 약 $3 : 1$임을 확인할 수 있으며 이는 빅뱅 우주론의 결정적 증거가 돼! (O)</span></div>`
        },
        // 14번 해설 (시스템과 상호작용 > 지구시스템의 구성과 상호작용 | 적용)
        {
            no: 14,
            domain: "통합과학1",
            chapter: "시스템과 상호작용",
            topic: "지구시스템의 구성과 상호작용",
            behavioralDomain: "적용",
            content: `<div class="ans-correct-title">정답: ① ㄱ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 지구 시스템의 탄소 순환과 탄소의 존재 형태</div>
    <div class="concept-content">
        • <strong>권역 A, B, C 찾기</strong>:<br>
        &nbsp;&nbsp;- <strong>A는 기권</strong>: 생물권(B)과 수권(바다)의 호흡·방출을 통해 탄소가 유입되는 권역이야.<br>
        &nbsp;&nbsp;- <strong>B는 생물권</strong>: A(기권)로 '호흡'을 통해 탄소를 내보내고, 죽은 뒤 지권(C)으로 '화석화'되는 권역이야.<br>
        &nbsp;&nbsp;- <strong>C는 지권</strong>: 수권에서 '침전/퇴적'이 일어나고 생물권에서 '화석화'가 일어나는 권역이야.<br>
        • <strong>탄소의 주요 존재 형태</strong>: 기권(A)에서는 <strong>(가) 이산화 탄소($\\text{CO}_2$)</strong>, 생물권(B)에서는 <strong>(나) 유기물</strong>, 지권(C)에서는 <strong>(다) 탄산 칼슘($\\text{CaCO}_3$, 석회암)</strong> 및 화석 연료 형태로 주로 존재해!
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄱ.</span><span class="fact-check-text">B(생물권)로부터 '호흡' 과정을 통해 탄소가 이동해 오고 수권(바다)과 직접 기체 교환을 하는 <strong>A는 기권</strong>이 맞아! (O)</span></div>

<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄴ.</span><span class="fact-check-text">광합성과 호흡 과정에서 기권(A)과 생물권(B) 사이를 직접 이동하는 탄소의 형태는 (나) 유기물이 아니라 기체 상태인 <strong>(가) 이산화 탄소($\\text{CO}_2$)</strong>야! (나) 유기물 형태의 이동은 먹이 사슬을 통한 섭취나 사체의 화석화 등에서 나타난단다. (X)</span></div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄷ.</span><span class="fact-check-text">지구 온난화가 가속되어 해수의 표층 수온이 상승하면 기체의 용해도가 감소해! 따라서 바닷물(수권)에 녹아 있던 이산화 탄소가 기권(A)으로 방출되는 양, 즉 수권에서 A로 이동하는 (가)의 양은 감소하는 것이 아니라 <strong>증가</strong>한단다. (X)</span></div>
</div>`
        },
        // 15번 해설 (물질과 규칙성 > 원소의 주기성 | 적용)
        {
            no: 15,
            domain: "통합과학1",
            chapter: "물질과 규칙성",
            topic: "원소의 주기성",
            behavioralDomain: "적용",
            content: `<div class="ans-correct-title">정답: ② ㄴ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 2, 3주기 원자의 전자껍질과 원자가 전자 수 추론</div>
    <div class="concept-content">
        • <strong>안쪽 껍질의 총 전자 수</strong>: 최외각 껍질을 제외한 안쪽 껍질의 총 전자 수는 <strong>2주기 원소</strong>(안쪽이 1번째 껍질뿐)가 <strong>$2$개</strong>이고, <strong>3주기 원소</strong>(안쪽이 1, 2번째 껍질)가 $2 + 8 =$ <strong>$10$개</strong>야!<br>
        • <strong>원자 X, Y, Z 확정하기</strong>:<br>
        &nbsp;&nbsp;- <strong>X</strong>: 비율이 $3$이므로 2주기 원소(안쪽 전자 $2$개)이며, 원자가 전자 수 $= 2 \\times 3 = 6$개 $\\rightarrow$ 2주기 16족인 <strong>산소($\\text{O}$)</strong>!<br>
        &nbsp;&nbsp;- <strong>Y</strong>: 비율이 $0.6$이므로 3주기 원소(안쪽 전자 $10$개)이며, 원자가 전자 수 $= 10 \\times 0.6 = 6$개 $\\rightarrow$ 3주기 16족인 <strong>황($\\text{S}$)</strong>!<br>
        &nbsp;&nbsp;- <strong>Z</strong>: 비율이 $0.2$이므로 3주기 원소(안쪽 전자 $10$개)이며, 원자가 전자 수 $= 10 \\times 0.2 = 2$개 $\\rightarrow$ 3주기 2족인 <strong>마그네슘($\\text{Mg}$)</strong>!
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄴ.</span><span class="fact-check-text">인체(생명체)를 구성하는 원소의 질량비는 <strong>산소($\\text{O}$, 약 $65\\%$) $>$ 탄소($\\text{C}$) $>$ 수소($\\text{H}$) $>$ 질소($\\text{N}$)</strong> 순이므로, 산소(X)가 가장 크다는 설명은 옳아! (O)</span></div>

<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄱ.</span><span class="fact-check-text">만약 Z가 2주기 원소라면 원자가 전자 수가 $2 \\times 0.2 = 0.4$개가 되어 자연수가 될 수 없어! Z는 안쪽 껍질 전자 수가 $10$개인 <strong>3주기 2족 원소(마그네슘, $\\text{Mg}$)</strong>야. (X)</span></div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄷ.</span><span class="fact-check-text">X(산소, $\\text{O}$)와 Y(황, $\\text{S}$)는 모두 비금속 원소이므로, 두 원소가 결합하여 생성된 화합물($\\text{SO}_2$, $\\text{SO}_3$)은 <strong>공유 결합 물질</strong>이야. 공유 결합 물질은 고체와 액체 상태에서 모두 이온이나 자유 전자가 없어 <strong>전기 전도성이 없단다</strong>! (X)</span></div>
</div>`
        },
        // 16번 해설 (환경과 에너지 > 발전 | 탐구 설계)
        {
            no: 16,
            domain: "통합과학2",
            chapter: "환경과 에너지",
            topic: "발전",
            behavioralDomain: "탐구 설계",
            content: `<div class="ans-correct-title">정답: ② ㄴ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 전자기 유도와 렌츠 법칙(에너지 보존)</div>
    <div class="concept-content">
        • <strong>패러데이 전자기 유도 법칙</strong>: 코일을 통과하는 자기선속이 시간에 따라 빠르게 변할수록(자석의 낙하 속력이 빠를수록) 코일에 흐르는 <strong>유도 전류의 세기가 세진다</strong>!<br>
        • <strong>렌츠 법칙과 자기력</strong>: 코일에는 자석의 운동을 <strong>방해하는 방향</strong>으로 유도 전류가 흘러! 따라서 자석이 코일에 <strong>다가올 때는 밀어내는 척력</strong>이, 코일에서 <strong>멀어질 때는 당기는 인력</strong>이 작용하며, 이 과정에서 자석의 역학적 에너지 일부가 <strong>전기 에너지로 전환</strong>돼.
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄴ.</span><span class="fact-check-text">(라) 과정에서 자석을 떨어뜨리는 높이를 다르게 하면 코일에 진입할 때 자석의 낙하 속력이 달라져! 이를 통해 자석의 낙하 속력(자기선속의 시간 변화율)에 따라 유도 전류의 세기가 어떻게 변하는지 알아볼 수 있어. (O)</span></div>

<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄱ.</span><span class="fact-check-text">(나)에서 자석이 코일을 통과하며 낙하하는 동안 코일에 유도 전류가 흐르면서 <strong>자석의 역학적 에너지 중 일부가 전기 에너지(및 저항에서의 열에너지)로 전환</strong>돼. 따라서 자석의 역학적 에너지는 보존되지 않고 감소한단다! (X)</span></div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄷ.</span><span class="fact-check-text">(다)에서 S극을 아래로 향하게 하여 코일 위에서 떨어뜨릴 때(접근할 때)는 코일 위쪽에 S극이 유도되어 다가오는 자석을 밀어내는 <strong>척력</strong>이 작용해! 자석이 코일 아래로 빠져나갈 때 비로소 당기는 인력이 작용하므로, 과정 전체에서 당기는 방향의 자기력만 작용한다는 설명은 틀렸어. (X)</span></div>
</div>`
        },
        // 17번 해설 (변화와 다양성 > 지질시대 환경 변화와 대멸종 | 이해)
        {
            no: 17,
            domain: "통합과학2",
            chapter: "변화와 다양성",
            topic: "지질시대 환경 변화와 대멸종",
            behavioralDomain: "이해",
            content: `<div class="ans-correct-title">정답: ④ ㄱ, ㄷ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 지질 시대의 수륙 분포 변화와 화석</div>
    <div class="concept-content">
        • <strong>(가) 고생대 말 ~ 중생대 초 (판게아 형성기)</strong>: 모든 대륙이 하나로 뭉쳐 초대륙 <strong>판게아(Pangaea)</strong>를 이룬 시기야. 고생대 말(페름기 말)에는 지구 역사상 가장 큰 규모의 대멸종(제3차 대멸종)이 일어났어!<br>
        • <strong>(나) 신생대 (현재와 유사한 수륙 분포)</strong>: 대서양이 넓어지고 인도 대륙이 유라시아판과 충돌하여 히말라야산맥을 형성한 신생대 수륙 분포야. 신생대 제4기 지층에서는 대표적인 포유류 화석인 <strong>매머드</strong>가 발견된단다!
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄱ.</span><span class="fact-check-text">초대륙 판게아가 형성된 (가) 시기(고생대 말기)가 끝날 무렵, 판게아 형성으로 인한 해안선 및 대륙붕 면적 감소와 대규모 화산 폭발 등으로 인해 지구 역사상 <strong>가장 큰 규모의 대멸종</strong>이 일어났어! (O)</span></div>
<div class="fact-check-item"><span class="fact-check-label">ㄷ.</span><span class="fact-check-text">(나)는 현재와 비슷한 수륙 분포를 보이는 <strong>신생대</strong> 시기이므로, 이 시기에 생성된 지층에서는 신생대 표준 화석인 <strong>매머드</strong>와 화폐석 등이 발견돼! (O)</span></div>

<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄴ.</span><span class="fact-check-text">초대륙 판게아인 (가)가 분리되어 (나)로 변하는 과정에서 대서양 중앙 해령을 중심으로 새로운 해양 지각이 생성되며 아메리카 대륙과 아프리카·유라시아 대륙이 멀어졌으므로, <strong>대서양의 면적은 점차 넓어졌어</strong>! (X)</span></div>
</div>`
        },
        // 18번 해설 (물질과 규칙성 > 화학 결합 | 문제 인식 및 가설 설정)
        {
            no: 18,
            domain: "통합과학1",
            chapter: "물질과 규칙성",
            topic: "공유 결합",
            behavioralDomain: "문제 인식 및 가설 설정",
            content: `<div class="ans-correct-title">정답: ② ㄴ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 화학 결합의 원리(옥텟 규칙)와 이온 결합</div>
    <div class="concept-content">
        • <strong>화학 결합을 형성하는 까닭 (가설 ⓐ)</strong>: 비활성 기체(18족 원소)가 아닌 원소들은 화학 결합을 통해 <strong>'18족 원소(비활성 기체)와 같이 안정한 전자 배치'</strong>를 이루려고 해!<br>
        • <strong>원자 A와 B 분석</strong>:<br>
        &nbsp;&nbsp;- <strong>A (원자 번호 3, 리튬 $\\text{Li}$)</strong>: 전자 배치 $(2, 1) \\rightarrow$ 전자 $1$개를 잃고 헬륨($\\text{He}$)과 같은 전자 배치 $(2)$를 갖는 양이온 <strong>$\\text{A}^+$($\\text{Li}^+$)</strong>가 됨.<br>
        &nbsp;&nbsp;- <strong>B (원자 번호 8, 산소 $\\text{O}$)</strong>: 전자 배치 $(2, 6) \\rightarrow$ 전자 $2$개를 얻어 네온($\\text{Ne}$)과 같은 전자 배치 <strong>$(2, 8)$</strong>을 갖는 음이온 <strong>$\\text{B}^{2-}$($\\text{O}^{2-}$)</strong>가 됨.
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄴ.</span><span class="fact-check-text">원자 번호 8번인 B(산소)는 두 번째 껍질에 전자가 $6$개 있으므로, 결합할 때 전자 $2$개를 얻어 네온($\\text{Ne}$)과 같은 전자 배치를 이뤄! 따라서 ⓑ는 <strong>'첫 번째 껍질(2), 두 번째 껍질(8)'</strong>이 맞아. (O)</span></div>

<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄱ.</span><span class="fact-check-text">A는 $+1$가 양이온($\\text{A}^+$)이 되고 B는 $-2$가 음이온($\\text{B}^{2-}$)이 되므로, 두 이온이 결합한 안정한 화합물은 전하의 합이 $0$이 되어야 하므로 화학식이 $\\text{AB}$가 아니라 <strong>$\\text{A}_2\\text{B}$</strong>($\\text{Li}_2\\text{O}$)야! (X)</span></div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄷ.</span><span class="fact-check-text">원소들이 화학 결합을 통해 이루고자 하는 안정한 전자 배치(ⓐ)는 17족(할로젠)이 아니라 <strong>'18족 원소(비활성 기체)와 같이 안정한 전자 배치'</strong>란다! (X)</span></div>
</div>`
        },
        // 19번 해설 (시스템과 상호작용 > 중력장 내의 운동 | 자료 변환 및 해석)
        {
            no: 19,
            domain: "통합과학1",
            chapter: "시스템과 상호작용",
            topic: "중력장 내의 운동",
            behavioralDomain: "자료 변환 및 해석",
            content: `<div class="ans-correct-title">정답: ③ ㄱ, ㄴ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 수평으로 던진 물체의 운동 (모눈종이 분석법)</div>
    <div class="concept-content">
        • <strong>수평 방향 (등속도 운동)</strong>: 수평 방향으로는 힘이 작용하지 않으므로 일정한 시간($0.1\\,\\text{s}$)마다 이동하는 수평 칸수가 일정해!<br>
        &nbsp;&nbsp;- <strong>P</strong>: $0.1\\,\\text{s}$마다 오른쪽으로 <strong>$1$칸씩</strong> 이동 $\\rightarrow$ R(오른쪽 $4$칸 지점) 도달 시간 $t_{\\text{P}} = 0.4\\,\\text{s}$<br>
        &nbsp;&nbsp;- <strong>Q</strong>: $0.1\\,\\text{s}$마다 오른쪽으로 <strong>$2$칸씩</strong> 이동 $\\rightarrow$ R(오른쪽 $4$칸 지점) 도달 시간 $t_{\\text{Q}} = 0.2\\,\\text{s}$<br>
        • <strong>연직 방향 (자유 낙하 운동)</strong>: 낙하 높이 $h = \\dfrac{1}{2}gt^2 \\propto t^2$이고, 연직 방향 속력 $v_y = gt \\propto t$야!
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄱ.</span><span class="fact-check-text">모눈종이에서 바닥의 R 지점까지 이동하는 동안 찍힌 $0.1\\,\\text{s}$ 간격의 구간 수를 세어 보면, P는 $4$구간($0.4\\,\\text{s}$)이고 Q는 $2$구간($0.2\\,\\text{s}$)이야(연직 낙하 높이도 P가 $16$칸, Q가 $4$칸으로 $4 : 1$이므로 낙하 시간 비는 $\\sqrt{4} : \\sqrt{1} = 2 : 1$). 따라서 R에 도달할 때까지 걸린 시간은 P가 Q의 $2$배가 맞아! (O)</span></div>
<div class="fact-check-item"><span class="fact-check-label">ㄴ.</span><span class="fact-check-text">P와 Q는 수평 방향으로 같은 거리($4$칸)를 이동하여 R에 도달했는데, 걸린 시간은 Q($0.2\\,\\text{s}$)가 P($0.4\\,\\text{s}$)의 $\\dfrac{1}{2}$배야($0.1\\,\\text{s}$당 수평 이동 거리도 Q는 $2$칸, P는 $1$칸). 따라서 수평 방향으로 던진 초기 속력은 Q가 P의 $2$배야! (O)</span></div>

<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄷ.</span><span class="fact-check-text">연직 방향은 초속도 $0$인 등가속도(자유 낙하) 운동을 하므로, 바닥 R에 도달하는 순간 연직 방향의 속력($v_y = gt$)은 낙하 시간($t$)에 정비례해! 낙하 시간이 P가 Q의 $2$배이므로, R 도달 순간 연직 방향의 속력도 P가 Q의 $4$배가 아니라 <strong>$2$배</strong>란다(낙하 높이가 $4$배!). (X)</span></div>
</div>`
        },
        // 20번 해설 (물질과 규칙성 > 지각과 생명체 구성 물질의 규칙성 | 탐구 수행 및 자료 수집)
        {
            no: 20,
            domain: "통합과학1",
            chapter: "물질과 규칙성",
            topic: "지각·생명체 구성 물질의 규칙성(2)",
            behavioralDomain: "탐구 수행 및 자료 수집",
            content: `<div class="ans-correct-title">정답: ④ ㄱ, ㄷ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] DNA 이중나선 구조와 샤가프 법칙 응용</div>
    <div class="concept-content">
        • <strong>상보적 염기쌍 결합</strong>: 이중나선 DNA에서 <strong>아데닌($\\text{A}$)은 타이민($\\text{T}$)과</strong>, <strong>구아닌($\\text{G}$)은 사이토신($\\text{C}$)과</strong> 항상 $1 : 1$로 짝을 지어 결합해!<br>
        • <strong>최대 염기쌍 개수 구하기</strong>:<br>
        &nbsp;&nbsp;- $\\text{A}$($12$개)와 $\\text{T}$($8$개)로 만들 수 있는 최대 염기쌍 수 $= \\min(12, 8) =$ <strong>$8$쌍</strong> ($16$개 염기)<br>
        &nbsp;&nbsp;- $\\text{G}$($14$개)와 $\\text{C}$($10$개)로 만들 수 있는 최대 염기쌍 수 $= \\min(14, 10) =$ <strong>$10$쌍</strong> ($20$개 염기)<br>
        &nbsp;&nbsp;- 따라서 염기 부품으로 만들 수 있는 최대 염기쌍은 총 $8 + 10 = 18$쌍, 즉 <strong>뉴클레오타이드는 총 $36$개</strong>야! (준비된 당 $45$개, 인산 $42$개 모두 $36$개 이상이므로 $36$개 뉴클레오타이드 모두 제작 가능!)
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄱ.</span><span class="fact-check-text">DNA와 RNA 같은 핵산을 구성하는 기본 단위체는 인산, 당, 염기가 $1 : 1 : 1$로 결합한 <strong>뉴클레오타이드</strong>가 맞아! (O)</span></div>
<div class="fact-check-item"><span class="fact-check-label">ㄷ.</span><span class="fact-check-text">완성된 모형 X에는 사이토신($\\text{C}$) $10$개가 모두 사용되었으므로, 사이토신($\\text{C}$)과 상보적으로 결합한 구아닌($\\text{G}$) 염기의 총개수도 <strong>$10$개</strong>야! (O)</span></div>

<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄴ.</span><span class="fact-check-text">모형 X는 $\\text{A}-\\text{T}$ $8$쌍($16$개)과 $\\text{G}-\\text{C}$ $10$쌍($20$개)을 합쳐 총 $18$쌍, 즉 <strong>$36$개의 뉴클레오타이드</strong>로 이루어져 있어. 각 뉴클레오타이드마다 인산이 $1$개씩 들어 있으므로 X에서 인산의 총개수는 $30$개가 아니라 <strong>$36$개</strong>란다! (X)</span></div>
</div>`
        },
        // 21번 해설 (시스템과 상호작용 > 판구조론과 지각 변동 | 이해)
        {
            no: 21,
            domain: "통합과학1",
            chapter: "시스템과 상호작용",
            topic: "판구조론과 지각 변동",
            behavioralDomain: "이해",
            content: `<div class="ans-correct-title">정답: ② ㄴ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 판의 이동 속도와 판의 경계 판별</div>
    <div class="concept-content">
        • <strong>A와 B 사이의 경계</strong>: 같은 방향(오른쪽)으로 이동하지만 뒤쪽의 해양판 A($10\\,\\text{cm/년}$)가 앞쪽의 해양판 B($4\\,\\text{cm/년}$)보다 속력이 더 빠르므로, A가 B를 따라잡아 부딪히는 <strong>수렴형 경계(섭입대)</strong>야!<br>
        • <strong>B와 C 사이의 경계</strong>: 해양판 B(오른쪽 $4\\,\\text{cm/년}$)와 대륙판 C(왼쪽 $2\\,\\text{cm/년}$)가 서로 마주 보고 다가오므로, 해양판 B가 대륙판 C 아래로 섭입하는 <strong>수렴형 경계(섭입대)</strong>야!
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄴ.</span><span class="fact-check-text">해양판 B와 대륙판 C가 서로 충돌·섭입하는 수렴형 경계에서는 해구와 함께 대륙판 가장자리가 횡압력을 받아 융기하면서 안데스산맥과 같은 <strong>습곡 산맥</strong>이 형성될 수 있어! (O)</span></div>

<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄱ.</span><span class="fact-check-text">화살표 방향이 같다고 발산형 경계로 착각하면 안 돼! 왼쪽의 A($10\\,\\text{cm/년}$)가 오른쪽의 B($4\\,\\text{cm/년}$)보다 빠르게 이동하므로 두 판 사이의 거리는 $1$년에 $6\\,\\text{cm}$씩 가까워지는 <strong>수렴형 경계</strong>야. 따라서 새로운 지각이 생성되는 것이 아니라 지각이 소멸한단다! (X)</span></div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄷ.</span><span class="fact-check-text">현무암질 암석으로 이루어진 <strong>해양 지각(A, B)</strong>은 화강암질 암석으로 이루어진 <strong>대륙 지각(C)</strong>보다 평균 밀도가 더 커! 따라서 대륙판인 C의 지각 평균 밀도가 가장 크다는 설명($\\text{C} > \\text{B} > \\text{A}$)은 틀렸어. (X)</span></div>
</div>`
        },
        // 22번 해설 (변화와 다양성 > 중화 반응 | 자료 변환 및 해석)
        {
            no: 22,
            domain: "통합과학2",
            chapter: "변화와 다양성",
            topic: "중화 반응",
            behavioralDomain: "자료 변환 및 해석",
            content: `<div class="ans-correct-title">정답: ③ 1</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 중화 반응에서의 양이온 수 비율 분석</div>
    <div class="concept-content">
        • 수용액 속에 들어 있는 구경꾼 양이온은 $\\text{Na}^+$와 $\\text{K}^+$이고, 산성일 때만 $\\text{H}^+$가 추가로 존재해!<br>
        • 즉, 양이온이 <strong>2종류</strong>인 (가)는 <strong>중성</strong>($\\text{Na}^+, \\text{K}^+$만 존재)이고, 양이온이 <strong>3종류</strong>인 (나)와 (다)는 모두 $\\text{H}^+$가 남아 있는 <strong>산성</strong>($\\text{H}^+, \\text{Na}^+, \\text{K}^+$ 존재)이야!
    </div>
</div>

<div class="fact-check-title">🎯 단계별 풀이 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">1단계</span><span class="fact-check-text"><strong>(가)에서 각 수용액의 단위 부피당 이온 수(농도 비) 구하기</strong><br>
• (가)는 중성이므로 양이온은 $\\text{Na}^+$와 $\\text{K}^+$뿐이며 비율이 $\\dfrac{2}{3} : \\dfrac{1}{3} = 2 : 1$이야.<br>
• (나)에서 $\\text{NaOH}\\,10\\,\\text{mL}$(2배)와 $\\text{KOH}\\,15\\,\\text{mL}$(3배)를 넣었을 때 양이온 비율이 $\\dfrac{1}{2} : \\dfrac{1}{3} : \\dfrac{1}{6} = 3 : 2 : 1$이 되므로, (가)의 $5\\,\\text{mL}$당 이온 수를 <strong>$\\text{NaOH}\\,5\\,\\text{mL} = 1N$개, $\\text{KOH}\\,5\\,\\text{mL} = 2N$개</strong>로 놓자!<br>
• (가)가 중성이므로 $\\text{HCl}\\,5\\,\\text{mL}$에 들어 있는 $\\text{H}^+$($\\text{Cl}^-$) 수는 $1N + 2N =$ <strong>$3N$개</strong>야!</span></div>
<div class="fact-check-item"><span class="fact-check-label">2단계</span><span class="fact-check-text"><strong>(나)를 이용해 $x$ 구하기</strong><br>
• (나)에서 구경꾼 양이온 수는 $\\text{Na}^+ (10\\,\\text{mL}) = 2N$개, $\\text{K}^+ (15\\,\\text{mL}) = 6N$개야.<br>
• 양이온 수 비율이 $\\dfrac{1}{2} : \\dfrac{1}{3} : \\dfrac{1}{6} = 3 : 2 : 1 = 6N : 4N : 2N$이므로, 남은 $\\text{H}^+$ 수는 <strong>$4N$개</strong>여야 해!<br>
• 따라서 넣어 준 $\\text{HCl}\\,x\\,\\text{mL}$의 원래 $\\text{H}^+$ 수는 $(2N + 6N) + 4N = 12N$개이므로, $\\text{HCl}\\,5\\,\\text{mL}$가 $3N$개에서 <strong>$x = 20\\,(\\text{mL})$</strong>임을 알 수 있어!</span></div>
<div class="fact-check-item"><span class="fact-check-label">3단계</span><span class="fact-check-text"><strong>(다)를 이용해 $y$ 및 $\\dfrac{y}{x}$ 구하기</strong><br>
• (다)는 산성이며 $\\text{H}^+, \\text{Na}^+, \\text{K}^+$ 세 양이온의 비율이 $\\dfrac{1}{3} : \\dfrac{1}{3} : \\dfrac{1}{3} = 1 : 1 : 1$로 모두 같아!<br>
• 산성 용액에서 전체 양이온 수의 합($\\text{H}^+ + \\text{Na}^+ + \\text{K}^+$)은 항상 넣어 준 $\\text{HCl}\\,x\\,\\text{mL}(20\\,\\text{mL})$의 $\\text{H}^+$ 수인 <strong>$12N$개</strong>와 같으므로, 세 양이온은 각각 $\\dfrac{12N}{3} =$ <strong>$4N$개씩</strong> 존재해!<br>
• 따라서 $\\text{Na}^+$가 $4N$개 들어 있으려면 $\\text{NaOH}$의 부피는 <strong>$y = 20\\,(\\text{mL})$</strong>($\\text{KOH}$는 $10\\,\\text{mL}$)여야 하므로, $\\dfrac{y}{x} = \\dfrac{20}{20} = 1$이야! (정답 ③)</span></div>`
        },
        // 23번 해설 (시스템과 상호작용 > 충격량과 운동량 | 자료 변환 및 해석)
        {
            no: 23,
            domain: "통합과학1",
            chapter: "시스템과 상호작용",
            topic: "충격량과 운동량",
            behavioralDomain: "자료 변환 및 해석",
            content: `<div class="ans-correct-title">정답: ② 0~t₂ 구간에서 운동량의 변화량 크기는 S이다.</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 충격량과 운동량 변화량의 관계</div>
    <div class="concept-content">
        • <strong>충격량($I$) $=$ 운동량의 변화량($\\Delta p$)</strong>:<br>
        &nbsp;&nbsp;- (가) 힘-시간($F-t$) 그래프 아랫부분의 넓이($S$)는 물체가 충돌하는 동안 받은 <strong>충격량($I$)</strong>의 크기와 같아!<br>
        &nbsp;&nbsp;- 물체가 받은 충격량은 물체의 <strong>운동량 변화량($\\Delta p$)</strong>과 같으므로, 충돌이 끝난 시각 $t_{\\text{end}}$ 이후 운동량 변화량의 최댓값은 <strong>$\\Delta p_{\\text{최대}} = S$</strong>야!<br>
        • <strong>(나) 운동량 변화량-시간($\\Delta p - t$) 그래프의 기울기</strong>: 단위 시간당 운동량의 변화량($\\dfrac{\\Delta p}{\\Delta t}$)이므로 <strong>알짜힘($F$)</strong>의 크기를 의미해!
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">②</span><span class="fact-check-text">$t_2$는 충돌이 완전히 끝난 $t_{\\text{end}}$ 이후의 시각이야. $0 \\sim t_{\\text{end}}$ 동안 받은 충격량의 크기가 (가) 그래프의 면적인 $S$이고 이후에는 힘이 작용하지 않으므로, $0 \\sim t_2$ 구간에서 물체 A의 운동량 변화량의 크기($\\Delta p_{\\text{최대}}$)는 <strong>$S$</strong>가 맞아! (O)</span></div>

<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
    <div class="fact-check-item"><span class="wrong-fact-label">①</span><span class="fact-check-text">물체 A는 충돌이 끝나는 $t_{\\text{end}}$에서 비로소 정지(운동량 $0$)해! $t_1$은 아직 벽과 충돌 중인 시각이므로 운동량이 $0$이 아니란다. (X)</span></div>
    <div class="fact-check-item"><span class="wrong-fact-label">③</span><span class="fact-check-text">(나) 그래프의 세로축이 운동량의 변화량($\\Delta p$)이고 가로축이 시간($t$)이므로, 그래프의 기울기($\\dfrac{\\Delta p}{\\Delta t}$)는 충격량이 아니라 물체가 받는 <strong>힘($F$)</strong>을 의미해! (X)</span></div>
    <div class="fact-check-item"><span class="wrong-fact-label">④</span><span class="fact-check-text">초기 운동량은 충돌 전 물체의 질량과 속도에 의해 이미 결정된 값으로, 벽과의 충돌 시간이 늘어난다고 해서 초기 운동량이 변하지는 않아! (X)</span></div>
    <div class="fact-check-item"><span class="wrong-fact-label">⑤</span><span class="fact-check-text">같은 초기 운동량을 가진 물체가 정지할 때 면적($S$)은 일정하므로, (가)에서 최대 힘($F_{\\text{최대}}$)이 커지면 반대로 충돌 시간($t_{\\text{end}}$)은 감소해! (X)</span></div>
</div>`
        },
        // 24번 해설 (시스템과 상호작용 > 유전자와 단백질 | 적용)
        {
            no: 24,
            domain: "통합과학1",
            chapter: "시스템과 상호작용",
            topic: "유전자와 단백질",
            behavioralDomain: "적용",
            content: `<div class="ans-correct-title">정답: ⑤ ㄴ, ㄷ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] DNA 염기 모형 분석과 전사·번역 (유전 정보의 흐름)</div>
    <div class="concept-content">
        • <strong>1단계: (가)에서 가닥 Ⅰ과 Ⅱ의 염기 서열 확정하기</strong><br>
        &nbsp;&nbsp;- 길이가 긴 염기(회색)는 아데닌($\\text{A}$)과 구아닌($\\text{G}$) 중 하나야. 가닥 Ⅰ을 보면 <strong>뾰족한 모양의 긴 염기가 3개</strong>(1, 3, 4번째), <strong>둥근 모양의 긴 염기가 2개</strong>(2, 6번째), <strong>둥근 홈을 가진 짧은 염기가 1개</strong>(5번째) 있어.<br>
        &nbsp;&nbsp;- 조건에서 <strong>"Ⅰ의 6개 염기 중 아데닌($\\text{A}$)의 수는 2이다"</strong>라고 했으므로, 2개 있는 둥근 긴 염기가 <strong>$\\text{A}$</strong>(짝인 둥근 짧은 염기는 <strong>$\\text{T}$</strong>)이고, 3개 있는 뾰족한 긴 염기가 <strong>$\\text{G}$</strong>(짝인 뾰족한 짧은 염기는 <strong>$\\text{C}$</strong>)야!<br>
        &nbsp;&nbsp;- 따라서 <strong>가닥 Ⅰ의 염기 서열은 $\\text{G}-\\text{A}-\\text{G}-\\text{G}-\\text{T}-\\text{A}$</strong>이고, 상보적인 <strong>가닥 Ⅱ의 염기 서열은 $\\text{C}-\\text{T}-\\text{C}-\\text{C}-\\text{A}-\\text{T}$</strong>란다!<br>
        • <strong>2단계: 전사된 RNA와 주형 가닥 찾기</strong><br>
        &nbsp;&nbsp;- 만약 <strong>가닥 Ⅱ($\\text{C}-\\text{T}-\\text{C}-\\text{C}-\\text{A}-\\text{T}$)</strong>가 주형 가닥이라면 전사된 <strong>RNA는 $\\text{G}-\\text{A}-\\text{G}-\\text{G}-\\text{U}-\\text{A}$</strong>가 돼.<br>
        &nbsp;&nbsp;- 이 RNA의 염기 개수는 <strong>$\\text{G}=3$개(㉠), $\\text{A}=2$개(㉡), $\\text{U}=1$개(㉢), $\\text{C}=0$개(㉣)</strong>로 그래프 (나)와 완벽히 일치하며, 두 코돈 <strong>$\\text{GAG}$(아미노산 ⓑ)</strong>와 <strong>$\\text{GUA}$(아미노산 ⓓ)</strong>로 번역돼! (반면 가닥 Ⅰ이 주형 가닥이면 전사된 RNA가 $\\text{C}-\\text{U}-\\text{C}-\\text{C}-\\text{A}-\\text{U}$가 되어 표의 코돈으로 번역될 수 없어!)
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄴ.</span><span class="fact-check-text">전사된 RNA($\\text{GAGGUA}$)를 구성하는 염기 개수는 $\\text{G}$가 $3$개, $\\text{A}$가 $2$개, $\\text{U}$가 $1$개, $\\text{C}$가 $0$개이므로, 그래프 (나)에서 $3$개인 <strong>㉠은 구아닌($\\text{G}$)</strong>이고 $0$개인 <strong>㉣은 사이토신($\\text{C}$)</strong>이 맞아! (O)</span></div>
<div class="fact-check-item"><span class="fact-check-label">ㄷ.</span><span class="fact-check-text">전사된 RNA의 염기 서열이 $\\text{GAG}\\,\\text{GUA}$이므로, 첫 번째 코돈 $\\text{GAG}$가 지정하는 아미노산 <strong>P는 ⓑ</strong>이고, 두 번째 코돈 $\\text{GUA}$가 지정하는 아미노산 <strong>Q는 ⓓ</strong>야! (O)</span></div>

<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄱ.</span><span class="fact-check-text">전사된 RNA의 염기 서열($\\text{G}-\\text{A}-\\text{G}-\\text{G}-\\text{U}-\\text{A}$)은 가닥 Ⅰ($\\text{G}-\\text{A}-\\text{G}-\\text{G}-\\text{T}-\\text{A}$)에서 $\\text{T}$ 대신 $\\text{U}$가 들어간 형태야. 즉, RNA와 상보적인 서열($\\text{C}-\\text{T}-\\text{C}-\\text{C}-\\text{A}-\\text{T}$)을 가진 <strong>가닥 Ⅱ가 전사에 이용된 DNA 주형 가닥</strong>이란다! (X)</span></div>
</div>`
        },
        // 25번 해설 (환경과 에너지 > 대기와 해양의 상호작용 | 자료 변환 및 해석)
        {
            no: 25,
            domain: "통합과학2",
            chapter: "환경과 에너지",
            topic: "대기와 해양의 상호작용",
            behavioralDomain: "자료 변환 및 해석",
            content: `<div class="ans-correct-title">정답: ① ㄱ</div>

<div class="concept-box">
    <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념] 엘니뇨 시기의 대기·해양 변화와 기압 편차</div>
    <div class="concept-content">
        • <strong>엘니뇨(El Niño)란?</strong> 무역풍이 평년보다 약해지면서 따뜻한 표층 해수가 서태평양으로 이동하지 못해, <strong>적도 부근 동태평양의 표층 수온이 평년보다 높아지는 현상</strong>이야!<br>
        • <strong>동태평양(페루 연안)과 서태평양(인도네시아 연안) 비교 (엘니뇨 시기)</strong>:<br>
        &nbsp;&nbsp;- <strong>동태평양(㉠)</strong>: 표층 수온 상승(따뜻한 해수층 두께 두꺼워짐, 용승 약화) $\\rightarrow$ 상승 기류 발달(강수량 증가) $\\rightarrow$ 해면 기압 감소 $\\rightarrow$ <strong>기압 편차($\\text{엘니뇨} - \\text{평년}$)는 음($-$)의 값(㉠)</strong>!<br>
        &nbsp;&nbsp;- <strong>서태평양(㉡)</strong>: 표층 수온 하강 $\\rightarrow$ 하강 기류 발달(가뭄 발생) $\\rightarrow$ 해면 기압 증가 $\\rightarrow$ <strong>기압 편차($\\text{엘니뇨} - \\text{평년}$)는 양($+$)의 값(㉡)</strong>!
    </div>
</div>

<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item"><span class="fact-check-label">ㄱ.</span><span class="fact-check-text">엘니뇨 시기에는 평년에 서태평양에 있던 적란운과 상승 기류 영역이 중앙·동태평양 쪽으로 이동하면서 서태평양의 해면 기압이 평년보다 높아져! 따라서 기압 편차(엘니뇨 시기 기압 $-$ 평년 기압)가 양($+$)의 값($+0.15\\,\\text{hPa}$)을 나타내는 <strong>㉡은 서태평양</strong>이 맞아. (O)</span></div>

<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄴ.</span><span class="fact-check-text">엘니뇨 시기에는 무역풍 약화로 인해 따뜻한 표층 해수가 동태평양 쪽으로 밀려오고 차가운 심층수의 용승이 약해지므로, 동태평양(㉠)의 따뜻한 해수층 두께는 평년보다 얇아지는 것이 아니라 <strong>두꺼워져</strong>! (X)</span></div>
    <div class="fact-check-item"><span class="wrong-fact-label">ㄷ.</span><span class="fact-check-text">평년에는 서태평양이 따뜻하고 동태평양이 차가워 동서 간 표층 수온 차이가 크지만, 엘니뇨 시기에는 동태평양의 수온이 상승하고 서태평양의 수온이 하강하므로 <strong>서태평양과 동태평양의 표층 수온 차이는 평년보다 작아진단다</strong>! (X)</span></div>
</div>`
        }
    ]
};

// 구버전 참조 호환용 별칭
window.examData = window.globalExamData;
