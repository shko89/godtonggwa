// 전체 텍스트 폰트 크기 설정을 위한 스타일 제어 코드
if (typeof document !== 'undefined') {
    document.documentElement.style.fontSize = "11px";
}

window.globalExamData = {
    title: "갓통과 WEEKLY 02",
    answers: [5, 2, 3, 2, 3, 3, 1, 3, 2, 5, 5, 2, 2, 4, 5, 3, 4, 3, 1, 4],
    scores: [1.5, 1.5, 1.5, 2.0, 2.0, 2.5, 1.5, 1.5, 2.0, 1.5, 2.0, 1.5, 1.5, 2.0, 2.0, 1.5, 1.5, 1.5, 2.0, 2.0],
    settings: {
        fontSize: "11px"
    },
    "explanations": [
        {
            "no": 1,
            "topic": "스펙트럼과 우주의 원소",
            "content": `
        <div class="ans-correct-title">정답: ⑤ ㄱ, ㄴ, ㄷ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">안녕! 스펙트럼의 종류를 묻는 기본적인 문제야. 그림에서 (가)는 <b>연속 스펙트럼</b>, (나)는 <b>방출 스펙트럼</b>, (다)는 <b>흡수 스펙트럼</b>을 나타내고 있어.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">(가)는 백열등처럼 고온의 밀도가 높은 광원에서 나오는 빛의 스펙트럼으로, 연속적인 무지개색 띠가 나타나. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">고온의 기체 성운 주변에서는 기체가 에너지를 방출하면서 밝은 선이 나타나는 (나) 형태의 방출 스펙트럼이 주로 관측돼. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">저온의 기체를 통과한 별빛은 기체가 특정 파장의 빛을 흡수하기 때문에 (다)와 같이 검은 선이 나타나는 흡수 스펙트럼이 관측돼. (O)</span>
        </div>
`
        },
        {
            "no": 2,
            "topic": "원소의 주기성",
            "content": `
        <div class="ans-correct-title">정답: ② ㄴ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">이온의 전자 배치 모형을 통해 원래 원소를 찾는 문제야! X는 2+ 이온이 되었을 때 네온(Ne)과 같은 전자 배치를 가지므로 <b>마그네슘(Mg)</b>이야. Y는 2- 이온일 때 전자가 10개이므로 <b>산소(O)</b>이고, Z는 1- 이온일 때 전자가 10개이므로 <b>플루오린(F)</b>이지.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">X(Mg)는 전자를 잃고 양이온이 되기 쉬운 <b>금속 원소</b>가 맞단다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">원자가 전자 수는 Y(O, 6개) < Z(F, 7개) 이므로 틀렸어. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">Y와 Z는 같은 주기(2주기) 원소이긴 하지만, 족(16족, 17족)이 다르기 때문에 화학적 성질이 비슷하지 않아. (X)</span>
            </div>
        </div>
`
        },
        {
            "no": 3,
            "topic": "빅뱅과 우주 초기의 진화",
            "content": `
        <div class="ans-correct-title">정답: ③ ㄱ, ㄴ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">우주 초기 입자의 생성 순서를 묻는 문제야. <b>(나)기본 입자 → (가)양성자/중성자 → (다)헬륨 원자핵</b> 순서라는 걸 꼭 기억해!</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">생성 순서는 (나)→(가)→(다)가 맞아! (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">우주는 계속 팽창하며 온도가 낮아지므로, 먼저 생성된 (가) 시기가 (다) 시기보다 온도가 높아! (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">수소 원자핵(양성자 1개)과 헬륨 원자핵(양성자 2개+중성자 2개)의 질량비는 약 3:1이므로 <b>수소가 더 커.</b> (X)</span>
            </div>
        </div>
`
        },
        {
            "no": 4,
            "topic": "우주와 지구의 원소",
            "content": `
        <div class="ans-correct-title">정답: ② ㄴ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">원소의 비율을 비교하는 문제야. (가)는 우주를 구성하는 원소 질량비니까 수소가 약 75%, 헬륨이 약 25%지. (나)는 지구 전체를 구성하는 원소 질량비로 철(Fe), 산소(O), 규소(Si), 마그네슘(Mg) 순으로 많아.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">지구가 형성될 때 온도가 매우 높아서 수소나 헬륨 같은 가벼운 기체들은 우주 공간으로 다 날아가 버렸기 때문에 (나)에서 비율이 매우 적어. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">지구에서 가장 많은 질량비를 차지하는 ㉠은 탄소(C)가 아니라 <b>철(Fe)</b>이야! (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">철과 같은 무거운 원소들은 태양계 성운에서 만들어진 게 아니라, 그 이전에 수명을 다한 <b>질량이 매우 큰 별의 내부 핵융합과 초신성 폭발</b>을 통해 만들어진 후 우주로 퍼져 나간 거야. (X)</span>
            </div>
        </div>
`
        },
        {
            "no": 5,
            "topic": "원소의 주기성",
            "content": `
        <div class="ans-correct-title">정답: ⑤ ㄱ, ㄴ, ㄷ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">알고리즘 순서도를 따라가며 원소를 찾는 재미있는 문제야! 제시된 원소는 리튬(Li), 산소(O), 나트륨(Na), 염소(Cl) 네 가지네. 주어진 Z(원자 번호), S(껍질 수), V(원자가 전자 수) 조건을 따라가면 A는 Cl, B는 O, C는 Li, D는 Na가 돼.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">A는 Cl(염소)이므로 <b>비금속 원소</b>가 맞아. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">B(O)와 C(Li)는 모두 <b>2주기 원소</b>로 같은 주기야. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">Li(3-1=2)와 Na(11-1=10)를 구분하는 질문 ㉠으로 '(Z-V) = 10인가?'를 넣으면, Na는 '예', C(Li)는 '아니요'가 되니까 완벽하게 들어맞네! (O)</span>
        </div>
`
        },
        {
            "no": 6,
            "topic": "우주와 지구의 원소",
            "content": `
        <div class="ans-correct-title">정답: ③ ㄱ, ㄴ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">질량비 그래프를 보고 대상을 찾아야 해! (가)는 수소(A)가 1등인 <b>우주</b>, (나)는 산소(C), 규소(D) 등이 많은 <b>지각</b>, (다)는 산소(C), 탄소(E), 수소(A) 순서인 <b>사람</b>이야.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">(다)는 산소, 탄소, 수소 순서인 <b>사람</b>을 구성하는 원소의 질량비가 맞단다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">C는 산소(O)야. 산소는 별의 내부에서 헬륨 핵융합 반응 등을 통해 생성되었어. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">D는 규소(Si, 3주기), E는 탄소(C, 2주기)이므로 <b>같은 주기가 아니야.</b> (X)</span>
            </div>
        </div>
`
        },
        {
            "no": 7,
            "topic": "빅뱅과 우주 초기의 진화",
            "content": `
        <div class="ans-correct-title">정답: ① ㄱ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">우주 초기 물질의 진화 과정 흐름도네. 쿼크 -> (가)양성자/중성자 생성 -> (나)원자핵 생성 -> 원자 생성 순서야.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">(가)는 쿼크들이 결합하는 과정이야. 우주가 팽창하면서 온도가 낮아져야 입자들이 서로 뭉칠 수 있으니까 맞는 설명이야. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">우주 배경 복사는 빅뱅 후 약 38만 년, 원자핵과 전자가 결합하여 <b>'원자가 생성될 때'</b> 빛이 빠져나오면서 방출되었어. (나) 원자핵 생성 과정이 아니란다. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">원자가 생성된 시기는 3분이 아니라 <b>약 38만 년</b>이 지났을 때 우주 온도가 약 3000K로 낮아졌을 때야! (X)</span>
            </div>
        </div>
`
        },
        {
            "no": 8,
            "topic": "스펙트럼과 우주의 원소",
            "content": `
        <div class="ans-correct-title">정답: ⑤ ㄱ, ㄴ, ㄷ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">스펙트럼 분석 문제야. 별빛이 저온의 기체를 지나오면 기체가 특정 빛을 흡수해서 (가)와 같은 <b>흡수 스펙트럼(검은 선)</b>이 생기고, 뜨거운 기체 성운 자체가 에너지를 내뿜으면 (나)와 같은 <b>방출 스펙트럼(밝은 선)</b>이 만들어지지!</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">(가)는 별빛이 저온 기체를 통과하면서 만들어진 <b>흡수 스펙트럼</b>이 맞아. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">(가)의 검은 흡수선 위치와 원소 X의 밝은 방출선 위치를 비교해봐. 위치가 똑같지? 그러니까 (가) 기체에는 X가 <b>포함되어 있어.</b> (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">(나)의 밝은 방출선 위치와 원소 Y의 방출선 위치를 비교해보면 완벽하게 일치해! 즉, (나) 성운에는 <b>원소 Y가 포함</b>되어 있는 거야. (O)</span>
        </div>
`
        },
        {
            "no": 9,
            "topic": "별의 진화와 원소 생성",
            "content": `
        <div class="ans-correct-title">정답: ③ ㄷ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">별 내부의 층상 구조를 보고 별의 질량을 유추하는 문제야! (가)는 중심부에 탄소(C)가 있는 걸 보니 <b>태양 정도 질량</b>의 별이고, (나)는 중심부에 철(Fe)까지 만들어졌으니 <b>질량이 매우 큰 별</b>이지.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">(나) 구조를 보면 바깥쪽부터 안쪽으로 갈수록 더 무거운 원소가 생성되었지? 무거운 원소를 만들려면 더 높은 온도가 필요하기 때문에 <b>중심부로 갈수록 더 높은 온도의 핵융합 반응</b>이 일어난 거야. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">별의 질량이 클수록 핵융합 반응이 격렬하게 일어나 연료를 빨리 소모해. 그래서 주계열성에 머무는 수명은 질량이 큰 <b>(나)가 (가)보다 훨씬 짧단다.</b> (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">(가)와 같은 태양 정도 질량의 별은 초신성 폭발을 하지 못하고, <b>행성상 성운</b>을 통해 우주 공간으로 물질을 퍼뜨려. (X)</span>
            </div>
        </div>
`
        },
        {
            "no": 10,
            "topic": "원소의 주기성",
            "content": `
        <div class="ans-correct-title">정답: ⑤ ㄱ, ㄴ, ㄷ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">표가 글로 주어져서 약간의 추리가 필요해. 2, 3주기 원소의 (원자번호 - 원자가전자수) 값은 각각 2, 10이어야 하는데 표에는 1, 5로 나와 있어. 즉, 표의 값이 <b>'상댓값'</b>이라는 걸 눈치채야 해! 이를 통해 A(F), B(Na), C(Ne), D(Mg)임을 알아낼 수 있지.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">원자 번호는 C(Ne, 10번)가 A(F, 9번)보다 크지. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">B(Na)와 D(Mg)는 모두 전자 껍질이 3개인 <b>3주기 원소</b>가 맞단다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">(Z+V) 값은 A(9+7=16), D(12+2=14)이므로 A가 더 크네. (O)</span>
        </div>
`
        },
        {
            "no": 11,
            "topic": "별의 진화와 우주의 원소",
            "content": `
        <div class="ans-correct-title">정답: ④ ㄱ, ㄷ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">이 문제는 <b>'우주의 진화에 따라 무거운 원소가 점점 누적된다'</b>는 핵심 개념을 묻는 아주 좋은 문제야! 최근에 태어난 별일수록 이전 별들이 흩뿌린 무거운 원소들을 더 많이 포함하고 있단다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">무거운 원소가 없는 A가 가장 <b>오래전에</b> 형성되었고, 무거운 원소가 가장 많은 C가 가장 <b>최근에</b> 형성된 별이야. 순서는 A -> B -> C 가 맞단다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">나중에 태어난 별일수록 무거운 원소를 많이 포함한다는 관측 결과는 <b>시간이 지날수록 우주 공간에 무거운 원소의 비율이 점차 증가했음</b>을 보여주는 훌륭한 증거야. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">C에서 철과 우라늄 선이 관측되는 이유는 C가 직접 핵융합으로 만든 게 아니라, <b>이전 세대의 별들이 만들어 흩뿌려놓은 성간 물질이 뭉쳐서 C가 태어났기 때문</b>이야. 현재 주계열성인 C의 중심부에서는 수소 핵융합만 일어나! (X)</span>
            </div>
        </div>
`
        },
        {
            "no": 12,
            "topic": "우주와 지구의 원소",
            "content": `
        <div class="ans-correct-title">정답: ② ㄷ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">(가)는 수소(74%)와 헬륨(24%)이 대부분이네. 이건 <b>우주</b>야. (나)는 1등이 철(35%)이고 그 뒤로 산소, 규소, 마그네슘이 따르는 <b>지구 전체</b>의 질량비야. 가장 많은 B는 철(Fe)이 되겠네.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">B는 철(Fe)이야. 철은 질량이 태양보다 훨씬 <b>큰 별의 중심부에서 핵융합 반응으로 생성되는 최종 산물</b>이 맞단다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">원자가 전자 수는 규소 D(Si, 14족)가 4개, 산소 C(O, 16족)가 6개이므로 <b>C가 더 커.</b> (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">(가)가 우주, (나)는 지각이 아니라 <b>지구 전체</b>의 질량비야. (X)</span>
            </div>
        </div>
`
        },
        {
            "no": 13,
            "topic": "원소의 주기성",
            "content": `
        <div class="ans-correct-title">정답: ② ㄴ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">그래프의 y축 값은 '(원자가 전자 수) - (전자 껍질 수)'야. 2, 3주기 원소이므로 껍질 수는 2 또는 3이지. y값을 토대로 역추적하면 원자번호 순서대로 A는 탄소(C), B는 산소(O), C는 황(S)이라는 걸 알 수 있어.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">B(산소)와 C(황)는 모두 원자가 전자가 6개인 <b>16족 원소</b>로, 같은 족 원소이군. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">A(탄소)는 14족, C(황)는 16족이므로 화학적 성질이 <b>다르다.</b> (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">A(탄소), B(산소), C(황) 세 가지 모두 금속성이 없는 <b>비금속 원소</b>야~ (X)</span>
            </div>
        </div>
`
        },
        {
            "no": 14,
            "topic": "별의 진화와 원소 생성",
            "content": `
        <div class="ans-correct-title">정답: ④ ㄴ, ㄷ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">별 내부에서 밖으로 밀어내는 기체 압력차에 의한 힘(㉡)과 안으로 끌어당기는 중력(㉠)을 나타낸 그림이야. 주계열성은 이 두 힘이 같아서 크기가 일정하게 유지되지!</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">주계열성의 가장 핵심적인 특징은 중심부 온도가 천만 K 이상 도달하여 수소 핵융합 반응이 일어난다는 것이지. 이 에너지가 별을 빛나게 하고 <b>㉡의 힘</b>을 만들어! (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">주계열성 단계에서는 수축하려는 중력(㉠)과 팽창하려는 내부 압력(㉡)의 크기가 완벽하게 같아 힘의 평형을 이뤄서 크기가 일정하게 유지돼. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">화살표의 방향이 중심을 향하고 있으므로 ㉠은 <b>중력</b>이야. (X)</span>
            </div>
        </div>
`
        },
        {
            "no": 15,
            "topic": "스펙트럼과 우주의 원소",
            "content": `
        <div class="ans-correct-title">정답: ⑤ ㄱ, ㄴ, ㄷ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">별 S1의 스펙트럼 검은 선 위치와 기체 A, B의 흡수선 위치가 모두 일치하므로 S1 대기에는 기체 A, B가 모두 있어. 별 S2는 검은 선 위치가 기체 A와만 일치하네!</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">그러니까 ㉠ 기체는 <b>A</b>가 맞겠지? (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">기체 B의 방출선 위치가 $S_2$의 흡수선 위치와 일치함을 확인할 수 있어. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">별 S2 스펙트럼의 검은 선(흡수 스펙트럼)은 별빛이 별의 대기인 <b>저온의 기체를 통과하면서 특정 파장의 빛을 흡수</b>했기 때문에 나타나는 거야. (O)</span>
        </div>
`
        },
        {
            "no": 16,
            "topic": "빅뱅과 우주 초기의 진화",
            "content": `
        <div class="ans-correct-title">정답: ③ A, C</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">세 학생의 대화를 분석하는 문제야! 우주 팽창과 입자 생성, 헬륨 질량비 형성 시기, 우주 배경 복사 방출 시기를 정확히 알아야 해!</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">A.</span>
            <span class="fact-check-text">"온도가 내려가면서 쿼크가 결합하여 양성자와 중성자가 만들어졌어." -> 완벽한 설명이야! 우주 팽창 = 온도 하강 = 입자 결합! (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">C.</span>
            <span class="fact-check-text">"약 38만 년이 지났을 때 원자가 형성되면서 우주 배경 복사가 방출되었어." -> 우주가 투명해진 순간을 아주 정확히 짚어냈어! (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">B.</span>
                <span class="fact-check-text">질량비 3:1이 형성된 시기는 빅뱅 후 <b>약 3분</b> 지났을 때야. 3000K는 약 38만 년 후 원자가 만들어질 때의 온도란다. 헷갈리기 딱 좋지? (X)</span>
            </div>
        </div>
`
        },
        {
            "no": 17,
            "topic": "원소의 주기성",
            "content": `
        <div class="ans-correct-title">정답: ⑤ ㄴ, ㄷ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">Y축 값이 '(원자가 전자 수) - (전자 껍질 수)' 라는 독특한 그래프네! 값이 +5에서 -2로 뚝 떨어지는 C에서 D 구간이 바로 <b>주기가 바뀌는 지점</b>이라는 강력한 힌트야! 이를 통해 C는 플루오린(F), D는 나트륨(Na)임을 알 수 있지.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">A~H 중 비활성 기체는 <b>D(Ne) 1가지</b> 뿐이야! 찾았다! (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">D(Ne)는 2주기, E(Na)는 3주기이므로 <b>전자 껍질 수가 달라.</b> (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">B(O, 16족)와 F(Al, 13족)는 족이 <b>달라.</b> (X)</span>
            </div>
        </div>
`
        },
        {
            "no": 18,
            "topic": "우주와 지구의 원소",
            "content": `
        <div class="ans-correct-title">정답: ③ ㄱ, ㄴ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">우주 역사상 원소의 총 질량 변화를 나타낸 그래프야. A는 빅뱅 초기부터 압도적으로 많고 아주 서서히 줄어드는 <b>수소(H)</b>, B는 별이 탄생하고 진화하면서 계단식으로 늘어나는 <b>탄소(C)</b>야.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ, ㄴ.</span>
            <span class="fact-check-text">A(수소)는 우주 초기에 만들어진 이후 <b>별 내부의 핵융합 반응의 주원료</b>로 쓰이면서 다른 무거운 원소들로 변하기 때문에 총 질량이 서서히 감소해. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">B(탄소)는 <b>별 내부의 헬륨 핵융합 반응</b>을 통해 만들어져. 빅뱅 직후에는 온도와 밀도가 빠르게 낮아져서 탄소까지 만들어질 시간이 없었어. (X)</span>
            </div>
        </div>
`
        },
        {
            "no": 19,
            "topic": "별의 진화와 원소 생성",
            "content": `
        <div class="ans-correct-title">정답: ① ㄱ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">이 탐구는 <b>'최근에 형성된 별일수록 무거운 원소의 질량비가 높다'</b>는 가설을 증명하는 과정이야. 나이가 많은(먼저 태어난) 별 A보다, 나이가 적은(최근 태어난) 별 B에 무거운 원소가 더 많다는 결과가 나왔지!</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">나이가 많은 A보다 최근에 태어난 B에 무거운 원소가 더 많다는 사실이 바로 <b>무거운 원소의 질량비가 점차 증가한다</b>는 가설을 뒷받침하는 결정적인 증거야! (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">이 탐구에서 측정한 스펙트럼은 빛이 저온의 성간 기체나 별의 대기를 통과하며 특정 파장을 흡수한 <b>흡수 스펙트럼</b>이야. 방출 스펙트럼이 아니야! (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">별 B 대기에서 관측된 무거운 원소들은 B 스스로가 내부에서 만든 게 아니야! <b>이전 세대의 별들이 진화하고 초신성 폭발을 하면서 우주 공간으로 방출해 놓은 원소들이 뭉쳐서 B를 만들었기 때문</b>이야. (X)</span>
            </div>
        </div>
`
        },
        {
            "no": 20,
            "topic": "별의 진화 경로",
            "content": `
        <div class="ans-correct-title">정답: ④ ㄱ, ㄷ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">질량에 따른 별의 진화 경로를 비교하는 문제야! (가)는 중심에 탄소(C)가 있는 <b>태양 정도 질량의 별</b>이고, (나)는 중심에 철(Fe)까지 있는 <b>질량이 훨씬 큰 별</b>의 진화 과정이지.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">㉠은 주계열성 다음 단계로, 크기가 부풀어 오르고 표면 온도는 낮아지지만 붉게 빛나는 <b>적색 거성</b>이 맞단다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">㉡은 초거성 다음 단계니까 <b>초신성 폭발</b> 단계야. 이때 엄청난 에너지가 발생하면서 철(Fe)보다 더 무거운 금, 납, 우라늄 같은 원소들이 생성된단다! (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">초거성으로 진화하는 <b>(나)가 (가)보다 질량이 훨씬 큰 별</b>이야. (X)</span>
            </div>
        </div>
`
        }
    ]
};