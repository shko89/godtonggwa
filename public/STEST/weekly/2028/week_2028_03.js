// 전체 텍스트 폰트 크기 설정을 위한 스타일 제어 코드
if (typeof document !== 'undefined') {
    document.documentElement.style.fontSize = "11px";
}

window.globalExamData = {
    title: "갓통과 WEEKLY 03",
    answers: [5, 4, 3, 2, 4, 5, 1, 4, 1, 4, 1, 3, 3, 5, 3, 3, 1, 5, 2, 3],
    scores: [1.5, 1.5, 1.5, 2, 2, 1.5, 1.5, 2, 1.5, 2, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 2.5, 2, 1.5],
    settings: {
        fontSize: "11px"
    },
    "explanations": [
    {
        "no": 1,
        "topic": "화학 결합 (이온 결합과 공유 결합)",
        "content": `
        <div class="ans-correct-title">정답: ⑤ ㄴ, ㄷ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">화학 결합 모형을 보고 원소를 찾는 문제야. (가)에서 양이온 A와 음이온 B가 1:1로 결합하고 있고, 각각 전자를 잃고 얻어 네온(Ne)과 같은 전자 배치를 가졌어. 따라서 A는 나트륨(Na), B는 플루오린(F)이야. (나)는 C 원자 1개와 B(플루오린) 원자 2개가 전자를 공유하고 있으므로, C는 산소(O)가 된단다. 즉 (가)는 이온 결합 물질인 NaF, (나)는 공유 결합 물질인 OF₂야.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">원자가 전자 수는 B(F, 17족)가 7개, C(O, 16족)가 6개이므로 B > C가 맞아. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">AB는 이온 결합 물질이므로 액체 상태에서 전기가 통하지만, CB<SUB>2</SUB>는 공유 결합 물질이므로 액체 상태에서도 전기가 통하지 않아. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">A(Na)는 전자 껍질이 3개인 3주기, B(F)는 전자 껍질이 2개인 2주기 원소이므로 <b>서로 다른 주기</b>의 원소란다. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 2,
        "topic": "신소재의 활용",
        "content": `
        <div class="ans-correct-title">정답: ④ ㄱ, ㄷ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">(가)의 센서 X는 온도에 따라 저항이 변하는 반도체(서미스터)를 이용한 화재 감지 장치고, (나)의 송전선 Y는 전기가 잘 통하는 도체(금속), 애자 Z는 전기가 통하지 않는 절연체를 사용한 거야. 물질의 전기적 성질을 묻고 있지!</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">반도체를 이용한 온도 센서(X)는 온도가 높아지면 전자들이 이동하기 쉬워져서 전기 저항이 작아지는 성질을 이용해. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">애자(Z)는 절연체이므로 고압의 전류가 철탑을 통해 땅으로 새어나가는 것을 안전하게 막아주는 역할을 한단다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">송전선(Y)과 같은 금속(도체)은 온도가 높아지면 원자핵의 진동이 활발해져서 전자의 이동을 방해해. 따라서 온도가 높아질수록 오히려 <b>전기 전도성이 감소</b>한단다. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 3,
        "topic": "화학 결합과 우주의 원소",
        "content": `
        <div class="ans-correct-title">정답: ③ ㄱ, ㄷ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">(가)에서 X 이온과 Y 이온은 전자를 주고받아 모두 네온(Ne)과 같은 전자 배치(10개)를 가졌어. 2개를 잃은 X는 마그네슘(Mg), 2개를 얻은 Y는 산소(O)야. (나)는 Z와 O가 1:2로 결합하여 Ne 배치를 가지는 공유 결합 물질이므로 Z는 탄소(C)가 되고 분자는 이산화 탄소(CO₂)가 되지.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">원자 번호는 X(Mg, 12번) > Y(O, 8번) > Z(C, 6번) 순서가 완벽히 맞아. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">(나)인 이산화 탄소(CO₂) 분자 구조를 보면, 중심의 탄소(C)가 양쪽의 산소(O)와 각각 2쌍의 전자를 공유하는 <b>이중 결합</b>을 형성하고 있어. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">마그네슘(X)과 같이 철(Fe)보다 가벼운 원소들은 초신성 폭발이 아니라 <b>별 내부의 핵융합 반응</b>을 통해 만들어진단다. 초신성 폭발로는 철보다 무거운 원소들이 만들어져! (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 4,
        "topic": "생명체의 주요 구성 물질 (핵산)",
        "content": `
        <div class="ans-correct-title">정답: ② ㄴ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">DNA 이중 나선 구조를 조립할 때는 항상 상보적 염기 결합 규칙(A는 T와, G는 C와 짝을 이룸)을 지켜야 해! 준비된 염기 모형으로 최대 몇 개의 쌍을 만들 수 있는지 계산해 보는 논리적인 문제란다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">A(20개)와 T(30개)로는 최대 20쌍, G(15개)와 C(25개)로는 최대 15쌍을 만들 수 있어. 총 35쌍의 염기쌍이 만들어지니까, 뉴클레오타이드의 총 개수 ㉠은 35쌍 × 2 = 70개가 된단다! (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">DNA를 구성하는 뉴클레오타이드의 당은 리보스가 아니라 <b>디옥시리보스</b>야. 리보스는 RNA를 구성하는 당이지! (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">결합 후 남은 염기 모형은 T가 10개(30-20), C가 10개(25-15)로 <b>T와 C의 개수가 서로 같아.</b> (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 5,
        "topic": "지각과 생명체를 구성하는 물질의 결합 규칙성",
        "content": `
        <div class="ans-correct-title">정답: ④ ㄴ, ㄷ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">(가)는 중심 원자 1개와 주변 산소 4개가 결합한 정사면체가 반복적으로 연결된 <b>규산염 광물 모형</b>이야. (나)는 서로 다른 모양의 단위체(아미노산)들이 결합하여 긴 사슬 모양을 이룬 <b>단백질 모형</b>이지.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">(나)의 단백질을 구성하는 단위체인 다양한 아미노산들은 물 분자가 빠져나가면서 형성되는 <b>펩타이드 결합</b>을 통해 연결된단다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">지각을 구성하는 규산염 광물과 생명체를 구성하는 단백질 모두, <b>기본 단위체가 규칙적으로 반복 결합</b>하여 복잡하고 다양한 물질을 형성한다는 훌륭한 공통점이 있어. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">(가) 규산염 사면체의 중심에 위치한 원자는 탄소(C)가 아니라 <b>규소(Si)</b>야! 지각에 가장 많은 원소가 산소와 규소라는 걸 잊지 마. (X)</span>
            </div>
        </div>
`
    },
        {
        "no": 6,
        "topic": "지구와 생명체를 구성하는 원소",
        "content": `
        <div class="ans-correct-title">정답: ⑤ ㄱ, ㄴ, ㄷ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">지각과 생명체의 원소 질량비를 해석하는 문제야! 생명체에 두 번째로 많은 W는 <b>탄소(C)</b>, 지각에 두 번째로 많은 X는 <b>규소(Si)</b>, 둘 다 가장 많은 Y는 <b>산소(O)</b>, 지각에 일부 존재하는 Z는 <b>칼슘(Ca)</b>이야. 따라서 (가)는 CaO(산화 칼슘), (나)는 SiO₄(규산염 사면체)가 된단다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">W(탄소, C)는 원자 번호 6번으로, 전자 껍질이 2개인 <b>2주기 원소</b>가 맞아. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">(가) CaO는 금속(Ca)과 비금속(O)이 결합한 <b>이온 결합 물질</b>이고, WY₂(CO₂)는 비금속끼리 결합한 <b>공유 결합 물질</b>이야. 액체 상태에서 전기가 통하는 것은 이온 결합 물질인 (가)뿐이지! (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">(나) 규산염 사면체 내부에서 중심의 규소(X)와 주변의 산소(Y)들은 서로 <b>전자쌍을 공유하는 공유 결합</b>을 형성하고 있어. (O)</span>
        </div>
`
    },
    {
        "no": 7,
        "topic": "지각을 구성하는 규산염 광물",
        "content": `
        <div class="ans-correct-title">정답: ④ ㄱ, ㄷ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">규산염 광물의 결합 구조 모형이야. (가)는 사면체 하나로 이루어진 <b>독립형 구조(감람석)</b>, (나)는 사면체가 길게 이어진 <b>단일 사슬 구조(휘석)</b>를 나타내고 있어. 산소를 많이 공유할수록 구조가 복잡해지고 풍화에 강해진다는 사실!</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">(가)는 이웃한 사면체와 산소를 공유하지 않는 <b>독립형 구조</b>로, 대표적인 광물은 감람석이야. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">인접한 사면체와 산소를 공유하는 수가 많을수록 결합이 튼튼해서 화학적 풍화에 강해. 산소 공유가 없는 (가)가 산소를 공유하는 (나)보다 <b>화학적 풍화에 더 약하단다.</b> (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">인접한 사면체와 공유하는 산소의 수는 (가)가 0개, (나)가 2개이므로 <b>(나)가 더 많아!</b> (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 8,
        "topic": "생명체의 주요 구성 물질 (단백질과 핵산)",
        "content": `
        <div class="ans-correct-title">정답: ① ㄱ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">(가)는 단백질의 단위체인 <b>아미노산</b>, (나)는 DNA의 단위체인 <b>뉴클레오타이드</b> 모형이야. X는 단백질, Y는 DNA가 되겠네. 특히 Y의 염기 개수를 계산할 때 꼼꼼하게 따져봐야 해!</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">X(단백질)의 입체 구조와 기능은 단위체인 아미노산의 종류와 배열 순서에 의해 결정되는데, 아미노산의 종류를 결정하는 것이 바로 <b>C(곁사슬, R기)</b>야. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text"><b>[갓쌤의 날카로운 분석 팩트체크!]</b> Y는 100개의 '염기쌍', 즉 <b>총 200개의 염기</b>로 이루어져 있어. 구아닌(G)이 30%면 사이토신(C)도 30%고, 아데닌(A)은 20%가 되지. 200개의 20%이므로 <b>수학적으로는 '40개'가 정확해!</b> 하지만 정답지가 ①번(ㄱ)인 것으로 보아, 출제자 선생님께서 '100개의 염기쌍'을 '총 100개의 염기'로 착각하여 아데닌을 20개로 의도하고 오답 처리하셨을 가능성이 매우 높아. 이런 문제는 실전에서 꼭 선생님께 질문해서 확인을 받아야 한단다! (출제 의도상 X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">Y(DNA)의 이중 나선 바깥쪽 골격은 염기(F)가 아니라, <b>D(인산)와 E(당)가 번갈아 가며 결합</b>하여 형성돼. 염기(F)는 골격 안쪽에서 상보적 결합을 한단다. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 9,
        "topic": "지구와 생명 시스템의 구성 물질",
        "content": `
        <div class="ans-correct-title">정답: ① ㄱ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">각 시스템을 구성하는 주요 물질을 찾는 문제야. 혈액을 통해 물질을 운반하는 A는 <b>물(H₂O)</b>, 바닷물에 가장 많은 염류인 B는 <b>염화 나트륨(NaCl)</b>, 식물의 광합성으로 생성되는 대기 중 기체 C는 <b>산소(O₂)</b>야.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">A(물)는 비금속인 수소와 산소가 전자쌍을 공유하여 결합한 <b>공유 결합 물질</b>이 맞아. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">B(NaCl)에서 나트륨 이온(Na⁺)은 전자 1개를 잃어 <b>네온(Ne)</b>과 같은 배치를, 염화 이온(Cl⁻)은 전자 1개를 얻어 <b>아르곤(Ar)</b>과 같은 배치를 가져. 모두 아르곤과 같다는 건 틀렸어. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">C(산소 분자, O₂)는 두 개의 산소 원자가 두 쌍의 전자를 공유하는 <b>이중 결합</b>을 형성하고 있어. 단일 결합이 아니야. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 10,
        "topic": "생명체의 주요 구성 물질 (단백질의 형성)",
        "content": `
        <div class="ans-correct-title">정답: ④ ㄱ, ㄷ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">단백질이 어떻게 만들어지는지 과정을 모형으로 보여주는 탐구 활동이야! 단위체인 ㉠이 결합할 때 물(H₂O) 분자가 빠져나가는 '탈수 축합 반응'을 통해 긴 폴리펩타이드가 형성되는 과정을 정확히 이해해야 해.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">단백질을 구성하는 기본 단위체인 ㉠은 <b>'아미노산'</b>이 정확하게 맞아. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">(라)에서 물 분자가 빠져나가고 아미노산과 아미노산 사이에 새롭게 형성된 연결 막대(결합)를 우리는 <b>'펩타이드 결합'</b>이라고 불러. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">아미노산 사이의 펩타이드 결합은 비금속 원소인 탄소(C)와 질소(N)가 전자쌍을 공유하는 <b>'공유 결합'</b>이야. 전자를 주고받는 정전기적 인력은 이온 결합을 설명하는 거란다. (X)</span>
            </div>
        </div>
`
    },
        {
        "no": 11,
        "topic": "화학 결합 (이온 결합과 공유 결합)",
        "content": `
        <div class="ans-correct-title">정답: ① ㄴ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">화학 결합 모형을 비교하는 문제야. (가)는 금속 양이온(X⁺)과 비금속 음이온(Y⁻)이 정전기적 인력으로 결합한 <b>이온 결합 물질</b>을 나타내고 있어. 반면 (나)는 두 비금속 원자(Y)가 1쌍의 전자쌍을 공유하여 결합한 <b>공유 결합 분자(Y₂)</b> 모형이야. 전자 껍질과 전자 수를 보면 X는 리튬(Li), Y는 플루오린(F)이라는 것도 파악할 수 있지!</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">(나)는 비금속 원자들이 전자쌍을 공유하며 결합하고 있으므로 <b>공유 결합 물질</b>이 맞아. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">(가)와 같은 이온 결합 물질은 양이온과 음이온이 강한 정전기적 인력으로 단단하게 결합되어 이동할 수 없기 때문에 <b>고체 상태에서는 전기 전도성이 없어.</b> (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">망치로 힘을 가했을 때 얇게 펴지거나 길게 뽑히는 전성 및 연성은 자유 전자를 가진 <b>금속 결합 물질(금속)</b>의 고유한 특징이야. 이온 결합 물질인 (가)는 외부에서 힘을 가하면 이온 층이 밀리면서 같은 전하를 띤 이온끼리 만나 반발력이 작용하므로 쉽게 부스러진단다. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 12,
        "topic": "지각을 구성하는 규산염 광물",
        "content": `
        <div class="ans-correct-title">정답: ③ ㄱ, ㄴ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">규산염 광물의 구조와 특징을 실생활 및 역사적 사례와 연결하는 훌륭한 문제야. (가)에서 타격 시 일정한 방향으로 쪼개지지 않고 불규칙하게 깨져 나가는 성질을 가진 도구의 재료는 <b>석영</b>이야. (나)에서 이산화탄소가 녹아든 물과 매우 빠르게 반응하여 온실가스를 포집하는 데 연구되는 광물은 <b>감람석</b>이지.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">석영은 규산염 사면체가 모든 산소를 공유하며 입체적으로 결합한 <b>3차원 망상 구조</b>를 이루고 있어 단단하고 쪼개짐이 없지. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">감람석은 이웃한 사면체와 산소를 공유하지 않는 <b>독립상(독립형) 구조</b>를 이루어 화학적 풍화에 가장 약하단다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">하나의 규산염 사면체가 이웃한 사면체와 공유하는 산소 원자의 수는 <b>석영이 4개, 감람석이 0개</b>야. 따라서 석영이 감람석보다 공유하는 산소 수가 더 많단다. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 13,
        "topic": "물질의 전기적 성질과 신소재",
        "content": `
        <div class="ans-correct-title">정답: ③ ㄱ, ㄴ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">고체 물질을 전기적 성질에 따라 명확하게 분류한 표야. A는 전기 저항이 매우 작아 전류가 잘 흐르며 피뢰침으로 쓰이는 <b>도체</b>이고, B는 조건에 따라 저항이 변해 발광 다이오드(LED)에 활용되는 <b>반도체</b>야. C는 전류가 거의 흐르지 않아 전선의 피복으로 쓰이는 <b>절연체</b>지.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">A는 전기가 매우 잘 통하는 물질이므로 <b>도체</b>가 맞아. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">B(반도체)의 가장 큰 특징은 순수한 상태에서는 전기가 잘 통하지 않지만, 온도나 압력을 가하거나 불순물을 첨가하면 <b>전기 전도성을 세밀하게 조절</b>할 수 있다는 점이야. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">C(절연체)는 고무, 플라스틱, 유리처럼 주로 <b>비금속 원소</b>들의 공유 결합으로 이루어진 물질이야. 금속 원소로만 이루어진 물질은 A(도체)에 해당한단다. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 14,
        "topic": "생명체의 주요 구성 물질 (핵산) / 미시 세계 탐구",
        "content": `
        <div class="ans-correct-title">정답: ⑤ ㄱ, ㄴ, ㄷ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">DNA의 이중 나선 구조를 밝혀낸 역사적 탐구 과정을 묻고 있어. ⓐ는 프랭클린이 수행한 <b>X선 회절 분석 실험</b>으로 미시 세계의 3차원 분자 구조를 파악하는 핵심적인 방법이야. 오른쪽 구조 모형을 보면 염기 ㉠이 사이토신(C)과 상보적으로 짝을 이루고 있음을 확인할 수 있어.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">ⓐ(X선 회절 분석)는 X선의 짧은 파장을 이용하여 원자나 분자의 배열 상태를 알아내는 방법이므로, <b>미시 세계의 공간 규모를 측정하는 방법</b>이 맞아. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">DNA의 염기 결합 규칙에 따라 아데닌(A)과 항상 상보적으로 결합을 형성하는 ㉠은 <b>타이민(T)</b>이야. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">DNA 이중 나선 구조의 바깥쪽 튼튼한 뼈대(골격)는 뉴클레오타이드의 <b>당과 인산이 공유 결합으로 규칙적으로 반복</b>되며 형성돼. 염기는 안쪽에서 수소 결합을 하지! (O)</span>
        </div>
`
    },
    {
        "no": 15,
        "topic": "생명체의 주요 구성 물질 (단백질)",
        "content": `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">새롭게 발견된 돌연변이 효소를 통해 단백질의 구조와 기능의 관계를 추론하는 탐구 활동이야. 탐구 과정 (다)를 보면, <b>'단위체 배열 순서가 일부 달라짐'</b>으로 인해 완전히 <b>'새로운 3차원 입체 구조를 형성'</b>하였고, 그 결과 플라스틱 분해라는 <b>새로운 기능</b>을 가지게 되었다고 명확하게 설명하고 있어.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">③</span>
            <span class="fact-check-text">결론에서 가설이 옳다고 했으므로, 가설 ㉠에는 탐구 과정과 결과 전체를 관통하는 핵심 원리인 <b>"단백질을 구성하는 단위체의 배열 순서가 달라지면 입체 구조가 변하여 새로운 기능을 가질 수 있을 것이다"</b>가 들어가는 것이 가장 논리적이야. 단백질의 기능은 입체 구조가 결정하고, 입체 구조는 아미노산의 종류와 배열 순서가 결정한다는 통합과학의 핵심 개념을 관통하고 있지! (O)</span>
        </div>
`
    },
        {
        "no": 16,
        "topic": "우리 주변의 다양한 물질 (화학 결합과 신소재)",
        "content": `
        <div class="ans-correct-title">정답: ③ A, C</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">세 학생이 물질의 결합과 이용에 대해 대화하고 있는 모습이야. 규산염 사면체의 결합 방식, 단백질의 펩타이드 결합, 그리고 반도체의 활용 사례를 묻는 통합적인 문제란다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">A.</span>
            <span class="fact-check-text">규산염 사면체 내부에서 중심의 규소 1개와 주변의 산소 4개는 서로 전자를 내놓고 공유하는 <b>공유 결합</b>을 하는 것이 맞아. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">C.</span>
            <span class="fact-check-text">발광 다이오드(LED)나 태양 전지는 조건에 따라 전기 전도성을 조절할 수 있는 <b>규소 기반의 반도체</b>를 활용한 대표적인 신소재지. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">B.</span>
                <span class="fact-check-text">단백질의 아미노산을 연결하는 펩타이드 결합은 비금속 원소인 탄소(C)와 질소(N) 사이에서 일어나는 <b>'공유 결합'</b>이야. 금속과 비금속 간의 이온 결합이 아니란다. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 17,
        "topic": "지구와 생명체를 구성하는 원소",
        "content": `
        <div class="ans-correct-title">정답: ① ㄱ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">(나)에서 사람을 구성하는 원소의 질량비를 보면 Z가 65%, Y가 18.5%, W가 9.5%를 차지해. 인체 구성 비율 1~3위는 산소(O), 탄소(C), 수소(H)이므로 Z는 산소, Y는 탄소, W는 수소야. (가)에서 최대 공유 결합 수를 보면 W(수소)는 1개, Y(탄소)는 4개이고, X도 4개야. X는 14족 원소 중 지각에 풍부한 규소(Si)임을 추론할 수 있지!</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">원자 번호는 X(규소, 14번)가 Y(탄소, 6번)보다 큰 것이 확실해. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">Z(산소)는 원자가 전자가 6개인 16족 원소이므로 안정해지기 위해 필요한 전자 수, 즉 <b>최대 공유 결합 수는 2개</b>야. 3개가 아니지. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">W₂Z는 H₂O, 바로 물이야! 물은 비금속 원소들로만 이루어진 공유 결합 물질이므로, <b>순수한 액체 상태에서는 전기가 통하지 않아</b>. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 18,
        "topic": "물질의 전기적 성질과 신소재",
        "content": `
        <div class="ans-correct-title">정답: ⑤ ㄱ, ㄴ, ㄷ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">다이오드의 정류 작용을 묻는 회로도 문제야. 스위치가 a에 연결되었을 때 전구에 불이 켜진다고 했지? a쪽 전지의 긴 줄(+)에서 나온 전류가 X를 거쳐 Y로 흐르므로, p-n 접합 다이오드의 순방향 바이어스 조건에 따라 X는 p형 반도체, Y는 n형 반도체가 돼.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">스위치를 b에 연결하면 전지의 방향이 반대가 되어 다이오드에 역방향 전압이 걸려. 이때 ㉠이 전기가 안 통하는 절연체라면, 회로가 완전히 끊긴 것과 같아 <b>전구에 불이 켜지지 않아</b>. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">스위치가 a에 연결되어 전류가 흐를 때 Y는 전지의 (-)극 쪽에 연결되어 있으므로 <b>n형 반도체</b>가 맞아. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">스위치를 b에 연결하면 다이오드(X-Y) 쪽으로는 전류가 흐르지 못하지만, ㉠이 전기가 잘 통하는 도체라면 <b>전류가 ㉠을 우회하여 흐를 수 있으므로 전구에 불이 켜진단다</b>. (O)</span>
        </div>
`
    },
    {
        "no": 19,
        "topic": "지각을 구성하는 물질의 규칙성",
        "content": `
        <div class="ans-correct-title">정답: ② ㄴ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">규산염 광물의 결합 구조를 구슬 모형으로 세밀하게 조립하는 탐구야. (가)의 기본 단위체는 규소 1개와 산소 4개지. (나)의 환상(고리) 구조와 (다)의 복사슬 구조에서 공유되는 산소의 개수를 정확히 파악해야 해.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">(다)는 (나)의 육각형 고리 4개가 1열로 이어진 구조야. 1개의 고리는 6개의 단위체(규소)로 이루어지고, 고리가 하나 추가될 때마다 단위체 4개가 더 결합해. 따라서 총 4개의 고리면 6 + 4 + 4 + 4 = <b>18개의 기본 단위체 모형</b>이 사용된 게 정확히 맞아. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">(나)의 단일 고리 구조는 6개의 규산염 사면체가 각각 산소를 2개씩 공유해. 총 산소 수는 (6개 × 4개) - (공유하는 산소 6개) = <b>18개</b>야. 24개가 아니란다. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">(다)에서 단위체 18개가 결합할 때, 내부에서 공유되는 산소의 총 결합 수는 21곳이야. 전체 산소 구슬의 개수는 (18개 × 4) - 21 = <b>51개</b>가 된단다. 56개는 틀렸어! (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 20,
        "topic": "생명체를 구성하는 탄소 화합물",
        "content": `
        <div class="ans-correct-title">정답: ③ ㄱ, ㄴ</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">생명체를 구성하는 핵심 탄소 화합물인 단백질과 핵산의 공통점과 차이점을 벤 다이어그램으로 분류하는 문제야. A는 단백질만의 특징, B는 공통점, C는 핵산만의 특징이 들어가야 해.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">A(단백질의 특징): 단백질을 구성하는 기본 단위체는 <b>아미노산</b>이 맞아. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">B(공통점): 단백질과 핵산은 모두 탄소(C) 골격을 중심으로 산소(O), 수소(H), 질소(N) 등이 <b>공유 결합을 통해 형성된 거대한 탄소 화합물</b>이지. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">효소와 항체의 주성분으로 작용하는 것은 핵산이 아니라 <b>단백질(A)</b>의 가장 대표적인 역할이야. 핵산은 유전 정보를 저장하거나 전달하는 역할을 한단다. (X)</span>
            </div>
        </div>
`
    }
    ]
};