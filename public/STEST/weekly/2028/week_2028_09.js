// 전체 텍스트 폰트 크기 설정을 위한 스타일 제어 코드
if (typeof document !== 'undefined') {
    document.documentElement.style.fontSize = "11px";
}

window.globalExamData = {
    title: "갓통과 WEEKLY 09",
    answers: [3, 3, 3, 3, 3, 5, 4, 3, 5, 2, 3, 3, 4, 3, 3, 4, 5, 2, 2, 4],
    scores: [1.5, 1.5, 1.5, 2.0, 1.5, 2.0, 2.0, 1.5, 1.5, 2.0, 1.5, 2.0, 1.5, 1.5, 2.0, 1.5, 2.0, 1.5, 2.0, 2.0],
    settings: {
        fontSize: "11px"
    },
    explanations: [
    {
        no: 1,
        topic: "태양 중심부의 수소 핵융합 반응과 질량 결손",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">태양 중심부는 1,500만 K의 초고온·초고압 플라스마 상태로, 수소 원자핵(¹H) 4개가 융합하여 헬륨 원자핵(⁴He) 1개를 형성하는 수소 핵융합 반응이 일어납니다. 이때 반응 전후의 미세한 질량 결손(Δm)이 아인슈타인의 질량-에너지 등가 원리(E = Δm · c²)에 의해 막대한 빛과 열에너지로 변환되어 우주로 방출됩니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">수소 원자핵들이 정전기적 척력을 이겨내고 핵융합을 일으키기 위해서는 약 1,500만 K의 초고온과 초고압이 필요하므로 (가)의 반응은 태양의 중심부에서 주로 일어납니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">아인슈타인의 질량-에너지 등가 원리(E = Δm · c²)에 따라, 핵융합 과정에서 방출되는 에너지는 반응 전후에 감소한 질량(결손 질량 Δm)에 비례하여 생성됩니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">수소 원자핵 4개의 총 질량(M₁)은 생성된 헬륨 원자핵 1개의 질량(M₂)보다 <b>크며</b>, 이 차이(M₁ - M₂ = Δm)만큼의 질량이 에너지로 전환되어 외부로 방출됩니다. 따라서 반응 전후의 질량은 같지 않습니다. (X)</span>
            </div>
        </div>
        `
    },
    {
        no: 2,
        topic: "열기관의 에너지 보존 법칙과 열효율의 한계",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">열기관은 공급된 열에너지(E)의 일부를 유용한 일(W)로 바꾸고 나머지를 저온으로 방출(Q)합니다. 에너지 보존 법칙(열역학 제1법칙)에 의해 E = W + Q가 성립하지만, 열역학 제2법칙에 의해 열에너지를 100% 일로 전환하는 것은 불가능하므로 열효율이 100%인 열기관은 존재할 수 없습니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">열기관에 공급된 에너지는 외부로 한 일과 저온으로 방출된 열에너지의 합과 같으므로 E = W + Q가 성립하며, 이는 에너지가 보존됨을 의미합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">열효율은 공급된 에너지 중 일로 전환된 비율(η = W/E = 1 - Q/E)이므로, 버려지는 열에너지 Q의 비율이 작을수록 열효율은 높아집니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">열역학 제2법칙에 따라 자연계의 열 이동은 비가역적이어서 공급된 열에너지를 전부 일로 전환할 수 없으므로, 마찰이나 손실을 완벽히 차단하더라도 <b>열효율이 100%인 열기관은 만들 수 없습니다</b>. (X)</span>
            </div>
        </div>
        `
    },
    {
        no: 3,
        topic: "태양 전지의 광전 효과와 태양광 발전 원리",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">태양 전지는 p형 반도체와 n형 반도체의 접합으로 이루어집니다. 빛을 비추면 광전 효과(광기전력 효과)에 의해 전자-양공 쌍이 생성되어 전자는 n형 반도체로, 양공은 p형 반도체로 모입니다. 이때 외부 회로를 연결하면 전자가 n형에서 p형으로 이동하며 전류(전류 방향은 p형 → n형)가 흐릅니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">태양광 발전은 화력이나 수력처럼 터빈을 돌리는 역학적 에너지를 거치지 않고, 반도체의 광기전력 효과를 통해 빛에너지를 전기 에너지로 직접 전환합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">빛을 흡수하여 발생한 전자는 n형 반도체 쪽으로 이동하여 축적되므로, 외부 도선을 연결하면 전자는 외부 회로를 따라 n형 반도체에서 p형 반도체 쪽으로 이동합니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">태양 전지는 코일과 자석의 상대 운동을 이용하는 전자기 유도 현상이 아니라, <b>반도체 접합면에서 일어나는 광전(광기전력) 효과</b>를 이용하여 전기를 생산합니다. (X)</span>
            </div>
        </div>
        `
    },
    {
        no: 4,
        topic: "전자기 유도와 렌츠 법칙 및 상대 운동",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">코일을 지나는 자기선속에 시간적 변화가 생길 때 유도 기전력이 발생합니다(패러데이 법칙). 이때 유도 전류는 자기선속의 변화를 방해하는 방향으로 흐릅니다(렌츠 법칙). 자석과 코일이 같은 방향, 같은 속도로 함께 움직이면 상대 운동이 없으므로 유도 전류가 전혀 흐르지 않습니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">(가)에서 S극이 코일을 향해 접근하므로 코일은 이를 밀어내기 위해 왼쪽 끝에 같은 극인 S극을 유도합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">(나)에서는 S극이 멀어지므로 (가)의 접근할 때와 자기장의 증감 방향이 정반대가 되어 코일에 흐르는 유도 전류의 방향도 (가)와 반대입니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">(다)에서 자석과 코일이 같은 방향, 동일한 속력 v로 나란히 움직이면 둘 사이의 상대적인 위치 변화가 없어 코일을 통과하는 자기장의 변화가 0이므로 유도 전류가 흐르지 않아 검류계 바늘은 <b>전혀 움직이지 않습니다</b>. (X)</span>
            </div>
        </div>
        `
    },
    {
        no: 5,
        topic: "수소 연료 전지의 산화·환원 반응과 친환경 특성",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">수소 연료 전지는 (-)극에 수소(H₂), (+)극에 산소(O₂)를 공급합니다. (-)극에서 수소가 산화되어 수소 이온(H⁺)과 전자로 분리되며, 전자는 '외부 도선'을 통해 (+)극으로 흐르며 전류를 발생시킵니다. 수소 이온은 '전해질'을 통해 (+)극으로 이동해 산소와 결합하여 순수한 물(H₂O)만 생성합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">수소와 산소의 화학 반응(산화·환원)에서 방출되는 화학 에너지를 연소나 열기관 과정을 거치지 않고 전기 에너지로 직접 전환합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">연료 전지의 최종 반응 생성물은 순수한 물(H₂O)뿐이므로 온실가스인 이산화 탄소나 대기 오염 물질을 전혀 배출하지 않습니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">전자는 전해질 내부를 통과할 수 없으며, <b>외부 도선(외부 회로)</b>을 통해 (-)극에서 (+)극으로 이동합니다. 전해질을 통해 이동하는 것은 수소 이온(H⁺)입니다. (X)</span>
            </div>
        </div>
        `
    },
    {
        no: 6,
        topic: "열기관의 열효율 정량 계산과 열역학 제2법칙",
        content: `
        <div class="ans-correct-title">정답: ⑤</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">열기관에서 공급된 열 Q₁ = W + Q₂가 성립하며 열효율 η = W/Q₁입니다. A기관: Q₁=200 kJ, W=40 kJ이므로 방출열 ㉠ = 200 - 40 = 160 kJ. B기관: Q₁=300 kJ, Q₂=210 kJ이므로 일 ㉡ = 300 - 210 = 90 kJ, 효율은 90/300 = 0.30입니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">에너지 보존 법칙에 의해 Q₁ = W + Q₂이므로, 열기관 A에서 버려지는 열에너지 ㉠은 200 kJ - 40 kJ = 160 kJ입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">열기관 B에서 외부에 한 일 ㉡은 공급 열에너지 300 kJ에서 방출 열에너지 210 kJ을 뺀 90 kJ입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">열역학 제2법칙에 따르면 열은 비가역적 과정을 거치므로, 저온의 열원으로 방출되어 흩어진 열에너지를 다시 100% 모아 일로 환원할 수 없습니다. (O)</span>
        </div>
        `
    },
    {
        no: 7,
        topic: "자석 낙하 시 렌츠 법칙에 의한 전자기 유도와 제동력",
        content: `
        <div class="ans-correct-title">정답: ④</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">낙하하는 자석에 대해 코일은 항상 자석의 운동을 방해하는 방향의 자기력을 작용합니다. 진입할 때는 밀어내고(척력), 통과 후 빠져나갈 때는 당기므로(인력), 두 경우 모두 코일이 자석에 작용하는 힘은 '연직 위쪽'입니다. 낙하 높이가 높아질수록 통과 속력이 증가하여 유도 전류의 세기가 커집니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">자석이 아래로 떨어질 때 코일은 항상 자석의 운동을 방해하므로, 진입할 때(t₁)는 위로 밀어내는 척력, 빠져나올 때(t₂)는 위로 끌어당기는 인력이 작용하여 자기력의 방향은 모두 연직 위쪽입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">자석의 낙하 높이를 높이면 코일에 진입하는 순간의 자석 속력이 더 빨라져 코일을 통과하는 자기장의 시간당 변화율이 커지므로 유도 전류의 최댓값은 I_A보다 커집니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">자석이 코일에 들어갈 때(t₁)는 아래쪽 자기선속이 증가하지만, 빠져나올 때(t₂)는 아래쪽 자기선속이 감소하므로, 코일에 흐르는 유도 전류의 방향은 <b>t₁일 때와 t₂일 때가 서로 반대</b>입니다. (X)</span>
            </div>
        </div>
        `
    },
    {
        no: 8,
        topic: "풍력 발전과 태양광 발전의 발전 원리 및 친환경성",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">풍력 발전은 바람(공기의 운동 에너지)으로 터빈을 회전시켜 전자기 유도 현상으로 전기를 생산합니다. 태양광 발전은 태양 전지의 광전효과를 이용해 빛에너지를 직접 전기로 전환합니다. 두 발전 방식 모두 화석 연료 연소 과정이 없으므로 온실가스를 배출하지 않는 대표적인 친환경 재생 에너지입니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">태양광 발전과 풍력 발전은 모두 발전 과정에서 화석 연료를 태우지 않으므로 온실가스(이산화탄소)를 배출하지 않는 친환경 청정 신재생 에너지라는 공통점을 갖습니다. (O - 출제 의도상 무탄소 친환경 특성 판정)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">풍력 발전은 빛에너지가 아니라 바람의 운동 에너지를 이용하여 전기를 생산합니다. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">태양광 발전은 전자기 유도 현상이 아니라 반도체의 <b>광기전력(광전) 효과</b>를 이용하여 전기를 생산합니다. (X)</span>
            </div>
        </div>
        `
    },
    {
        no: 9,
        topic: "에너지 소비효율 등급 라벨 해석과 에너지 절약",
        content: `
        <div class="ans-correct-title">정답: ⑤</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">에너지 소비효율 등급은 1등급에 가까울수록 에너지 효율이 높습니다. 동일한 작업을 수행할 때 효율이 높은 제품은 소비 전력량이 적고 버려지는 열에너지가 적습니다. 고효율 제품을 널리 사용하면 전체 전력 생산 수요를 줄여 발전소의 화석 연료 연소에 따른 온실가스 배출을 감축할 수 있습니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">소비효율 1등급인 제품 A는 낮은 등급인 제품 B보다 동일한 전력 대비 유용한 일로 전환하는 에너지 효율이 높습니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">에너지 효율이 높은 제품 A는 투입된 전기 에너지 중 유용한 일로 전환되는 비율이 크므로, 같은 시간 동안 가동할 때 버려지는 열에너지는 B보다 적습니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">에너지 소비효율 등급이 높은 제품을 사용하면 전력 소비량을 줄여 화력 발전소 등의 가동을 줄임으로써 온실가스 배출 감소에 기여합니다. (O)</span>
        </div>
        `
    },
    {
        no: 10,
        topic: "태양 내부의 층상 구조와 플라스마 상태 및 에너지 전달",
        content: `
        <div class="ans-correct-title">정답: ②</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">태양 내부는 중심에서부터 핵(A, 약 1,500만 K, 수소 핵융합), 복사층(B, 에너지를 광자 복사로 전달), 대류층(C, 고온 물질의 상승과 저온 물질의 하강에 의한 대류)으로 구성됩니다. 중심부는 초고온으로 인해 원자핵과 전자가 분리된 플라스마 상태이며, 태양 표면에서 지구로는 진공을 통과하는 복사 형태로 에너지가 전달됩니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">태양 중심부인 핵(A)은 온도가 약 1,500만 K에 달하는 극단적인 초고온 상태이므로 전자가 원자핵에서 완전히 떨어져 나와 자유롭게 운동하는 플라스마 상태로 존재합니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">복사층(B)에서는 대류가 아니라 전자기파 광자의 흡수와 재방출을 통한 <b>복사</b>에 의해 에너지가 주로 전달됩니다. 대류에 의해 에너지가 전달되는 영역은 C(대류층)입니다. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">태양 표면에서 방출된 에너지는 매질이 없는 진공의 우주 공간을 지나 지구에 도달하므로, 물질의 대류가 아니라 <b>빛(전자기파 복사)</b> 형태로 전달됩니다. (X)</span>
            </div>
        </div>
        `
    },
    {
        no: 11,
        topic: "해양 에너지 발전(조력 발전과 파력 발전)의 비교",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">조력 발전(가)은 달과 태양의 인력(조력 에너지)에 의한 조수 간만의 차로 해수면의 높이 차를 만들어 수차를 돌립니다. 파력 발전(나)은 바람(태양 복사 에너지가 근원)에 의해 일어나는 파도의 상하 운동을 이용합니다. 두 방식 모두 터빈을 회전시켜 전자기 유도 현상으로 전기를 생산합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">조력 발전(가)은 밀물과 썰물 때의 수위 차이를 이용하여 낙하하는 해수로 수차를 회전시키므로, 조수 간만의 차가 큰 지형(서해안 등)에 설치하기 유리합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">조력 발전과 파력 발전은 모두 해수나 공기의 흐름으로 터빈을 회전시켜 코일과 자석의 전자기 유도 현상을 통해 전기 에너지를 생산합니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">파도를 일으키는 근원 에너지는 대기 순환을 일으켜 바람을 불게 하는 <b>태양 복사 에너지</b>이며, 지구 내부 에너지가 아닙니다. (지구 내부 에너지는 지진해일/쓰나미 등을 일으킴) (X)</span>
            </div>
        </div>
        `
    },
    {
        no: 12,
        topic: "전자기 유도 실험의 변인 통제와 유도 전류 크기 요인",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">패러데이 전자기 유도 법칙에 따라 코일에 유도되는 기전력은 코일의 감은 수(N)에 비례하고, 자석의 세기(자석 개수) 및 코일 통과 속도(낙하 높이)가 클수록 자기선속의 시간적 변화율이 커져 유도 전류가 강해집니다. 자석의 극을 반대로 바꾸면 전류의 흐름 방향(바늘 회전 방향)도 반대가 됩니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">실험 1과 2는 자석의 개수와 놓는 높이가 같고 코일의 감은 수만 다르므로, 두 결과를 비교하면 감은 수가 많을수록 검류계 바늘의 최대 회전각(유도 전류)이 큼을 입증할 수 있습니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">실험 1과 3은 자석의 극을 서로 반대로 하여 코일에 진입시켰으므로, 코일을 통과하는 자기장의 방향이 반대가 되어 유도 전류가 흐르는 방향(검류계 바늘 회전 방향)은 서로 반대입니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">자석이 코일을 통과하는 동안 역학적 에너지의 일부가 전자기 유도에 의해 전기 에너지와 열에너지로 전환되므로 빠져나온 직후의 역학적 에너지는 점 P에서의 역학적 에너지보다 감소합니다(선지 판정에 따른 오답 분석). (선지 구성 판정)</span>
            </div>
        </div>
        `
    },
    {
        no: 13,
        topic: "핵융합 발전(토카막 자기장 가둠)과 D-T 융합 반응",
        content: `
        <div class="ans-correct-title">정답: ④</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">태양 중심부는 초고압이므로 1,500만 K에서 수소 핵융합이 일어나지만, 지구는 중력이 작아 초고압을 만들 수 없으므로 지상 핵융합로에서는 1억 K 이상의 초고온 플라스마가 필요합니다. 중수소(²H)와 삼중수소(³H)가 융합하면 헬륨(⁴He)과 고에너지 중성자(¹n)가 방출되며, 온실가스가 없는 미래 청정 에너지입니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">중수소(²H)와 삼중수소(³H)의 핵융합 반응식(²H + ³H → ⁴He + ㉠)에서 질량수 보존(2 + 3 = 4 + 1)과 전하수 보존(1 + 1 = 2 + 0)을 만족하는 입자 ㉠은 질량수가 1이고 전하가 없는 <b>중성자(¹n)</b>입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">핵융합 발전은 온실가스를 배출하지 않고, 원전 사고 위험이나 고준위 방사성 폐기물이 발생하지 않으며 원료(중수소)가 바닷물에 무한히 풍부한 친환경 미래 에너지원입니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">태양은 초고압 환경이어서 1,500만 K에서도 핵융합이 일어나지만, 지상에서는 태양과 같은 거대한 압력을 구현할 수 없으므로 <b>1억 K(100,000,000 K) 이상의 훨씬 더 높은 온도</b>에서 플라스마를 유지해야 합니다. (X)</span>
            </div>
        </div>
        `
    },
    {
        no: 14,
        topic: "수력·조력·태양광 발전의 메커니즘과 분류",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">조력 발전(A)은 밀물과 썰물의 조석 수위 차를 이용하여 터빈을 돌립니다. 수력 발전(C)은 높은 댐에 저장된 물의 중력 퍼텐셜 에너지가 낙하하며 운동 에너지를 거쳐 터빈을 돌려 전기 에너지로 전환됩니다. 태양광 발전(B)은 터빈이나 발전기 없이 빛을 직접 전기로 전환합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">조력 발전(A)은 달과 태양의 인력에 의한 밀물과 썰물 때의 해수면 높이 차이를 이용하여 수차를 돌려 전력을 생산합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">수력 발전(C)은 댐에 저장된 물의 중력 퍼텐셜 에너지가 낙하하면서 수차 터빈의 역학적 에너지로 바뀌고, 발전기에서 최종적으로 전기 에너지로 전환됩니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">태양광 발전(B)은 <b>발전기를 회전시키지 않고</b> 태양 전지의 광전효과를 이용하여 빛에너지를 전기 에너지로 직접 전환합니다. (X)</span>
            </div>
        </div>
        `
    },
    {
        no: 15,
        topic: "태양 전지판의 입사각에 따른 발전 효율 탐구",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">태양 전지는 빛에너지를 전기 에너지로 직접 전환합니다. 빛이 전지판 표면에 수직(θ = 0°)으로 입사할 때 단위 면적당 입사하는 빛에너지가 최대가 되어 전력 생산량이 가장 많습니다. 에너지 전환 효율은 (생산된 전기 에너지 / 입사한 빛에너지) × 100%입니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">태양 전지는 열기관이나 발전기 같은 기계적 회전 장치 없이 반도체 접합면에서 빛에너지를 전기 에너지로 직접 변환합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">자료에서 입사한 빛에너지 대비 생산된 전기 에너지의 비율을 계산하면 θ = 0°일 때 에너지 전환 효율은 20%로 정확히 산출됩니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">태양 전지 패널의 고유한 에너지 변환 성능은 동일하므로, 패널이 흡수한 빛에너지 1 J당 생산되는 전기 에너지는 입사각이 기울어진 θ = 60°일 때가 수직 입사인 θ = 0°일 때보다 <b>크지 않습니다(오히려 비스듬할 때 표면 반사율 증가 등으로 효율이 저하됨)</b>. (X)</span>
            </div>
        </div>
        `
    },
    {
        no: 16,
        topic: "스마트폰 무선 충전기와 교통카드(RFID)의 전자기 유도",
        content: `
        <div class="ans-correct-title">정답: ④</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">무선 충전 패드의 송신 코일에 교류(AC) 전류가 흐르면 시간에 따라 세기와 방향이 변하는 자기장이 형성됩니다. 이 변화하는 자기장이 스마트폰 내부 수신 코일을 통과하면서 전자기 유도에 의해 유도 기전력이 발생해 배터리를 충전합니다. 교통카드 역시 단말기 코일의 변화하는 자기장에 의해 카드 내 코일에 유도 전류가 흘러 칩이 구동됩니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">송신 코일에 교류가 흘러 시간에 따라 변하는 자기장을 만들면, 패러데이 전자기 유도 법칙에 의해 스마트폰 내부의 수신 코일에 유도 기전력과 유도 전류가 발생합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">대중교통의 교통카드 단말기와 카드(RFID/NFC)도 단말기 코일이 만드는 교류 자기장을 통해 카드 내부 코일에 유도 전류를 생성하여 데이터를 주고받으므로 동일한 전자기 유도 원리를 이용합니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">충전 패드 내부의 송신 코일에 직류(DC) 전류가 흐르면 자기장의 세기와 방향이 일정하여 시간적 자기장 변화가 생기지 않으므로, 유도 전류를 발생시키기 위해서는 반드시 <b>교류(AC) 전류</b>가 흘러야 합니다. (X)</span>
            </div>
        </div>
        `
    },
    {
        no: 17,
        topic: "조력 발전과 파력 발전의 출력 변동성과 예측 가능성",
        content: `
        <div class="ans-correct-title">정답: ⑤</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">조력 발전(A)은 천체의 인력과 지구 자전에 따른 조석 현상을 이용하므로 하루 약 2회 밀물과 썰물이 반복되어 약 12시간 25분 주기로 발전량이 극히 규칙적이고 예측 가능성이 높습니다. 반면 파력 발전(B)은 바람의 세기와 날씨에 따라 파도의 높이가 수시로 변하므로 발전량 예측 가능성이 낮습니다. 두 방식 모두 온실가스를 배출하지 않습니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">파력 발전(B)은 기상 상태와 바람의 변화에 따라 파도의 높이가 불규칙하게 변하므로, 천체의 규칙적인 운행 주기에 따라 작동하는 조력 발전(A)보다 발전량 예측 가능성이 낮습니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">조력 발전과 파력 발전은 모두 화석 연료를 연소하지 않고 해양의 자연 역학적 에너지를 이용하므로 발전 과정에서 온실가스(이산화탄소)를 거의 배출하지 않는 친환경 발전입니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">조력 발전(A)의 근원 에너지는 태양 복사 에너지가 아니라, 지구와 달·태양 사이의 만유인력에 의해 발생하는 <b>조력 에너지</b>입니다. (X)</span>
            </div>
        </div>
        `
    },
    {
        no: 18,
        topic: "기존 전력망과 지능형 전력망(스마트 그리드)의 비교",
        content: `
        <div class="ans-correct-title">정답: ②</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">기존 전력망(가)은 발전소에서 소비자로 전력을 단방향 공급하여 피크 수요에 맞춘 과잉 발전으로 에너지 낭비가 컸습니다. 지능형 전력망(나, 스마트 그리드)은 정보통신기술(ICT)을 융합하여 소비자의 전력 사용량을 실시간 모니터링하고 발전량을 최적화하며, 분산형 신재생 에너지의 양방향 송수전을 가능하게 합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">스마트 그리드(나)는 정보통신기술(ICT)을 통해 전력 수요량에 대한 실시간 정보를 파악하여 발전량을 능동적으로 조절함으로써 불필요하게 버려지는 대기 전력과 전기 에너지 손실을 대폭 줄입니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">기존 전력망(가)은 전력의 흐름이 단방향이지만 정보 교환 시스템이 구축되어 있지 않으며, 양방향 전력 및 정보 교환은 스마트 그리드(나)의 핵심 특징입니다. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">스마트 그리드(나)에서는 양방향 전력 전송이 가능하므로, 각 가정이나 건물에서 태양광 등으로 생산하고 남은 잉여 전력을 전력망을 통해 다른 소비자에게 <b>역송전하여 판매할 수 있습니다</b>. (X)</span>
            </div>
        </div>
        `
    },
    {
        no: 19,
        topic: "전자기 유도 낙하 실험과 패러데이 법칙 정량 해석",
        content: `
        <div class="ans-correct-title">정답: ②</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">패러데이 전자기 유도 법칙에 따라 유도 기전력의 크기 V = -N(ΔΦ/Δt)입니다. 자석을 떨어뜨리는 높이가 높을수록(h₂ > h₁) 코일에 도달할 때의 자석 속력이 커져 코일을 통과하는 자기장의 시간당 변화율(ΔΦ/Δt)이 커지므로 유도 전류가 강해져 검류계 바늘이 더 크게 움직입니다. 코일의 감은 수를 늘리면 유도 전류는 더 커집니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">실험 결과 (라)에서 h₂일 때 측정된 검류계의 최대 눈금이 h₁일 때보다 더 컸으므로, 코일을 통과하는 자석의 속력이 더 빨랐음을 의미합니다. 따라서 낙하 높이는 h₂ > h₁입니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">자석을 떨어뜨리는 높이를 다르게 하는 것은 자석 자체의 자기장 세기를 바꾸는 것이 아니라, 코일에 도달하는 자석의 <b>속력을 다르게 하여 자기장의 시간당 변화율(ΔΦ/Δt)을 조작</b>하기 위함입니다. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">패러데이 법칙에 의해 유도 기전력은 코일의 감은 수(N)에 비례하므로, 감은 수를 2배 늘리면 유도 전류가 더 커져 검류계의 최대 눈금은 <b>더 커집니다</b>. (X)</span>
            </div>
        </div>
        `
    },
    {
        no: 20,
        topic: "발전 방식별 에너지 전환 효율 계산 및 전기 생산량 비교",
        content: `
        <div class="ans-correct-title">정답: ④</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">에너지 전환 효율은 (생산된 전기 에너지 / 공급된 총에너지) × 100%입니다. A(태양열): (500 - 400)/500 = 20%. B(수력): 감소한 중력 퍼텐셜 에너지 mgh = 2,000 kg × 10 m/s² × 10 m = 200 kJ 중 160 kJ 전기 생산 → 효율 160/200 = 80%. C(수소연료전지): 수소 1 g당 화학에너지 120 kJ 중 48 kJ 전기 생산 → 효율 48/120 = 40%. 효율은 B(80%) > C(40%) > A(20%)입니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">④.</span>
            <span class="fact-check-text">동일한 양의 에너지가 공급되었을 때 생산되는 전기 에너지는 에너지 전환 효율에 비례합니다. 발전 방식 B의 효율은 80%(160 kJ / 200 kJ), C의 효율은 40%(48 kJ / 120 kJ), A의 효율은 20%(100 kJ / 500 kJ)이므로, 생산하는 전기 에너지의 양은 <b>B > C > A</b> 순서입니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">①, ②, ③, ⑤</span>
                <span class="fact-check-text">A의 효율은 20%, B의 효율은 80%, C의 효율은 40%이므로 생산하는 전기 에너지의 올바른 부등호 관계는 B > C > A뿐입니다. (X)</span>
            </div>
        </div>
        `
    },
    ]
};
