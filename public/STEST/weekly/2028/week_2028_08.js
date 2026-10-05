// 전체 텍스트 폰트 크기 설정을 위한 스타일 제어 코드
if (typeof document !== 'undefined') {
    document.documentElement.style.fontSize = "11px";
}

window.globalExamData = {
    title: "갓통과 WEEKLY 08",
    answers: [4, 3, 4, 3, 1, 3, 3, 2, 3, 2, 5, 3, 4, 5, 2, 5, 1, 2, 1, 2],
    scores: [2.0, 2.0, 1.5, 1.5, 2.0, 2.0, 2.5, 1.5, 2.0, 2.5, 1.5, 1.5, 1.5, 2.0, 1.5, 2.0, 1.5, 2.0, 2.0, 1.5],
    settings: {
        fontSize: "11px"
    },
    explanations: [
    {
        no: 1,
        topic: "적도 동태평양 해역의 표층 수온 편차와 엘니뇨/라니냐",
        content: `
        <div class="ans-correct-title">정답: ④</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">엘니뇨 발생 시기에는 동태평양의 무역풍이 약화되어 찬 해수의 용승이 약해집니다. 따라서 동태평양 적도 부근 해역의 표층 수온이 평년보다 높아지며(수온 편차 양(+)), 따뜻한 해수층이 두꺼워집니다. 반면 평상시나 라니냐 시기에는 무역풍이 강하고 용승이 활발하여 따뜻한 표층 해수층이 얇아집니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">A 시기는 평년보다 표층 수온이 높은 엘니뇨 발생 시기이므로 (관측 수온 - 평년 수온) 편차는 양(+)의 값입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">적도 동태평양 해역에서 따뜻한 표층 해수층의 두께는 찬 해수의 용승이 활발한 평상시(B)가 용승이 약화된 엘니뇨 시기(A)보다 얇습니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">적도 부근에서 부는 무역풍의 평균 세기는 엘니뇨 발생 시기인 A 시기가 평상시인 B 시기보다 <b>약합니다</b>. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 2,
        topic: "수심에 따른 빛의 파장 투과량과 해조류의 수직 분포",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">빛의 파장이 길수록(적색광) 물에 잘 흡수되어 수심이 얕은 곳까지만 도달하고, 파장이 짧을수록(청색광) 물에 덜 흡수되어 깊은 곳까지 투과합니다. 따라서 얕은 곳에는 적색광을 주로 이용하는 녹조류, 중간 수심에는 갈조류, 깊은 바다에는 투과력이 강한 청색광을 주로 흡수하는 홍조류가 서식합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">A는 물에 빠르게 흡수되어 투과 깊이가 가장 얕으므로 파장이 긴 적색광입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">C는 물속 가장 깊은 곳까지 도달하므로 빛의 파장이 가장 짧은 청색광입니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">홍조류는 깊은 바다까지 도달하는 파장이 가장 짧은 <b>청색광(C)을 주로 흡수</b>하여 광합성을 합니다. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 3,
        topic: "전 세계 사막 분포와 사헬 지대의 사막화 요인",
        content: `
        <div class="ans-correct-title">정답: ④</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">세계 주요 사막은 대기 대순환에서 하강 기류가 우세한 위도 30° 부근의 아열대 고압대에 주로 위치합니다. 사하라 사막 남부의 사헬 지대(A)는 기후 변화에 의한 자연적 가뭄과 인위적인 과도한 방목, 삼림 벌채가 복합 작용하여 사막화가 급속도로 진행 중입니다. 사막화로 식생이 파괴되면 지표면의 반사율(알베도)이 대체로 증가합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">사하라 사막 남부의 사헬 지대(A)는 자연적인 가뭄뿐만 아니라 과도한 가축 방목과 삼림 벌채 등 인위적 요인이 복합적으로 작용하여 사막화가 심화되었습니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">사막화가 진행되어 식생 피복률이 낮아지면 밝은 토양과 모래가 노출되어 지표면의 태양 복사 에너지 반사율이 대체로 증가합니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">위도 30°N 부근은 아열대 고압대가 위치하여 강한 <b>하강 기류</b>가 발달하므로 연평균 강수량이 적어 건조 기후가 형성됩니다. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 4,
        topic: "생태계 평형 회복 과정과 먹이 사슬 상호작용",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">안정된 생태계에서 1차 소비자(B)가 일시적으로 급증하면, 피식 대상인 생산자(A)는 감소하고 포식자인 2차 소비자(C)는 증가합니다. 이후 먹이 부족과 천적 증가로 인해 1차 소비자가 다시 감소하면서 원래의 평형 상태로 회복됩니다. 영양 단계가 높아질수록 개체수는 감소합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">1차 소비자 B가 증가할 때 피식 작용이 증가하여 개체수가 감소하는 A는 생산자입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">$t_1$ 직후 B의 개체수가 다시 감소하는 원인은 먹이(A) 부족과 상위 포식자인 C의 개체수 증가 때문입니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">생태계 평형이 회복된 후 개체수는 일반적으로 상위 영양 단계로 갈수록 적어지므로, 개체수가 가장 적은 것은 <b>최상위 소비자인 C</b>입니다. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 5,
        topic: "광주기성과 일조 조건에 따른 식물의 개화 조절",
        content: `
        <div class="ans-correct-title">정답: ①</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">식물의 개화는 낮의 길이가 아니라 '연속적인 어두운 시간(암기)'의 길이에 의해 결정됩니다. 국화와 같은 단일식물은 암기가 한계 암기보다 길어야 꽃을 피웁니다. 화훼 농가에서는 야간에 조명을 비추어 지속적인 암기를 분절함으로써 국화의 개화를 억제하여 출하 시기를 늦춥니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">식물 A는 연속적인 암기가 일정 기준(한계 암기) 이상으로 긴 조건에서만 개화하므로 단일식물(국화)에 해당합니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">(나)에서 야간에 전등을 켜 연속 암기를 깨뜨리는 것은 단일식물인 A의 개화를 억제하여 개화 시기를 <b>늦추기(조절하기) 위한</b> 것입니다. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">식물의 개화 여부를 결정하는 핵심 요인은 낮 동안 빛을 쬐는 총 시간이 아니라 <b>'지속적인 어두운 시간(연속 암기의 길이)'</b>입니다. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 6,
        topic: "생태계 영양 단계별 에너지양과 에너지 효율 계산",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">생태계에서 에너지는 유기물의 형태로 하위 영양 단계에서 상위 영양 단계로 한 방향으로만 흐릅니다. 에너지 효율(%) = (현 영양 단계가 보유한 에너지양 / 전 영양 단계가 보유한 에너지양) × 100입니다. 상위 영양 단계로 갈수록 전달되는 에너지양은 호흡열 방출 등으로 인해 감소합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">보유 에너지양이 가장 많은 D(5000)가 생산자이며, C가 1차, B가 2차, 보유 에너지양이 가장 적은 A(15)는 3차 소비자입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">표의 조건에 따라 D에서 C로 전달된 에너지와 B의 에너지 효율(10%)로부터 ㉡=75, A의 효율 ㉠=20%이 산출되어 ㉠ + ㉡ = 95(또는 제시된 비례값)에 부합합니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">B가 보유한 에너지는 C(하위 영양 단계)로 역이동할 수 없으며, 상위 영양 단계로 전달되지 않은 에너지는 B의 <b>호흡열을 통해 생태계 밖으로 방출</b>되거나 사체·배설물을 통해 분해자로 이동합니다. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 7,
        topic: "복사 평형 열수지와 전 지구 해수면 상승 요인",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">온실기체 농도가 증가하면 대기가 지표 방출 복사를 더 많이 흡수한 뒤 지표로 재방출하는 대기 재복사 에너지(D)가 증가하여 온실효과가 심화됩니다. 지구 온난화로 인한 해수면 상승은 '해수의 열팽창(수온 상승)'과 '육지 빙하의 융해'가 주원인이며, 바다에 떠 있는 해빙은 녹아도 해수면을 거의 상승시키지 않습니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">대기 중 온실기체의 농도가 증가하면 대기가 흡수하여 지표면으로 재방출하는 복사에너지양 D가 증가합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">㉠(해수의 열팽창)은 지구 온난화로 바닷물의 온도가 상승함에 따라 열팽창에 의해 부피가 늘어나기 때문에 나타납니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">북극해에 떠 있는 바다얼음(해빙)은 이미 물에 떠 있는 얼음이므로 녹더라도 해수면 높이에 거의 영향을 주지 않으며, ㉡은 대륙에 위치한 <b>육지 빙하의 융해</b>에 해당합니다. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 8,
        topic: "적도 부근 태평양의 해양 및 대기 순환 (엘니뇨/평상시)",
        content: `
        <div class="ans-correct-title">정답: ②</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">평상시(가)에는 동풍 계열의 무역풍이 강하게 불어 따뜻한 표층 해수를 서쪽으로 밀어내므로 동태평양에서는 심해의 찬물이 솟구치는 용승이 일어나 수온약층이 얕게 형성됩니다. 엘니뇨 시기(나)에는 무역풍이 약화되어 용승이 억제되고 따뜻한 해수층이 동쪽으로 이동하므로 동태평양의 수온약층 깊이가 깊어집니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">동태평양 적도 부근 해역의 수온약층이 나타나기 시작하는 깊이는 따뜻한 표층 해수층이 두꺼워진 엘니뇨 시기(나)가 평상시(가)보다 깊습니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">(가)는 서태평양에 강한 상승 기류와 강수가 형성되고 동태평양 용승이 활발한 <b>평상시</b>의 모습입니다. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">(나) 엘니뇨 시기에 서태평양 적도 부근 해역은 수온이 낮아지고 하강 기류가 우세해져 평년보다 <b>가뭄이 발생하기 쉽습니다</b>. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 9,
        topic: "전 지구 평균 기온과 해수면 높이 변화 추이",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">전 지구 평균 기온이 지속적으로 상승하면 바닷물이 데워져 열팽창하고 대륙 빙하가 녹아 바다로 유입되면서 해수면이 상승합니다. 해수면이 상승하면 해안 저지대 침수와 침식, 담수원 염수화 등이 유발되어 연안 및 육상 생태계의 서식지 면적이 크게 감소합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">지구 온난화로 인한 평균 기온 상승은 바닷물의 열팽창을 유발하여 전 지구 해수면을 상승시키는 핵심 요인입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">해수면 상승이 가속화되면 연안 저지대가 바닷물에 잠겨 육상 생물의 서식지 면적이 점차 감소하게 됩니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">북극해에 떠 있는 바다얼음(해빙)은 녹아도 해수면 상승에 기여하지 않으며, 해수면 상승에 크게 기여한 것은 <b>육지(그린란드, 남극) 빙하의 융해와 해수 열팽창</b>입니다. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 10,
        topic: "해양 생태계 먹이 사슬과 개체군 수 변동 분석",
        content: `
        <div class="ans-correct-title">정답: ②</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">먹이 사슬 관계: 식물플랑크톤(생산자) → A(1차 소비자) → B(2차 소비자) → C(3차 소비자). 2차 소비자 B가 증가하면 먹이인 1차 소비자 A는 피식 증가로 감소하고, 포식 대상이 줄어든 식물플랑크톤은 증가합니다. 에너지는 생산자에서 최종 소비자로만 한 방향으로 흐릅니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">표의 변동 분석에서 C의 개체수가 증가하면 포식에 의해 B가 감소하므로 ㉨은 '감소'이며, B가 증가할 때의 피식 관계에 부합합니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">식물플랑크톤을 직접 먹고 살아가는 해양 동물 A는 <b>1차 소비자</b>에 해당합니다. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">생태계 내에서 화학 에너지는 하위 영양 단계에서 상위 영양 단계로만 이동하므로 식물플랑크톤 → A → B → C 순으로 이동하며, <b>C를 거쳐 A로 역이동할 수 없습니다</b>. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 11,
        topic: "빛과 온도에 대한 생물의 적응 (양엽·음엽 및 여우의 형태)",
        content: `
        <div class="ans-correct-title">정답: ⑤</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">나무의 위쪽 잎(양엽)은 강한 빛을 최대로 흡수하기 위해 울타리 조직이 두껍고 잎이 두꺼우며, 아래쪽 잎(음엽)은 약한 빛을 효율적으로 받기 위해 잎이 얇고 넓습니다. 추운 북극에 사는 북극여우는 열 방출을 줄이기 위해 몸집이 크고 귀 등 말단 부위가 작으며(베르그만·알렌 법칙), 더운 사막여우는 열 방출을 위해 귀가 큽니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">A는 빛이 강한 환경에 노출되어 광합성을 활발히 수행할 수 있도록 엽육 내 울타리 조직이 두껍게 발달한 양엽입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">B는 그늘진 아래쪽에서 자란 음엽으로 잎이 얇고 평평하여 투과하는 약한 빛을 흡수하기에 유리합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">북극여우가 사막여우에 비해 귀 등 말단 부위가 작은 것은 추운 환경에서 체온 유지를 위해 체표면적을 줄여 열 방출을 최소화하기 위한 적응입니다. (O)</span>
        </div>
`
    },
    {
        no: 12,
        topic: "생태계 구성 요소 사이의 작용, 반작용, 상호작용",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">비생물적 환경 요인이 생물 군집에 미치는 영향을 '작용(㉠)', 생물이 비생물적 환경을 변화시키는 것을 '반작용(㉡)', 군집 내 개체군 사이의 관계를 '상호작용(분서, 경쟁, 공생 등)'이라 합니다. 피라미가 공간과 먹이를 분할하는 것은 군집 내 개체군 사이의 상호작용입니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">(가) 기온(비생물적 요인) 하강으로 단풍나무 잎이 붉어지는 것은 환경이 생물에 영향을 미치는 작용(㉠)입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">(나) 식물의 광합성(생물적 요인)에 의해 숲의 산소 농도(비생물적 요인)가 높아지는 것은 생물이 환경을 변화시키는 반작용(㉡)입니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">(다) 여러 종의 피라미가 서식지와 먹이를 나누어 경쟁을 피하는 '분서'는 <b>생물 군집 내 개체군 사이의 상호작용</b>입니다. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 13,
        topic: "대기 유무에 따른 행성의 복사 평형과 온실효과",
        content: `
        <div class="ans-correct-title">정답: ④</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">대기가 없는 행성(가)과 대기가 있는 행성(나) 모두 복사 평형 상태에서는 태양으로부터 흡수한 에너지만큼을 우주로 방출하므로 우주로 나가는 총 복사량은 같습니다. 그러나 대기가 있는 행성은 온실기체가 지표 복사를 흡수한 후 지표로 재복사하여 지표 온도를 높이므로 표면 온도 $T_2 > T_1$이 성립합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">(나)에서 대기가 지표면 복사 에너지를 흡수한 후 지표면으로 되돌려 보내는 대기 재복사 에너지는 행성의 온실효과를 유발하는 핵심 메커니즘입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">두 행성 모두 정상 상태에서 복사 평형을 유지하므로 우주 공간으로 방출하는 총 복사 에너지양은 태양 복사 흡수량과 같아 서로 같습니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">온실효과가 발생하는 대기가 있는 행성의 표면 온도 $T_2$가 대기가 없는 행성의 표면 온도 $T_1$보다 높으므로 <b>$T_1 < T_2$</b>입니다. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 14,
        topic: "페루 연안 해역의 표층 수온 편차와 엘니뇨 현상",
        content: `
        <div class="ans-correct-title">정답: ⑤</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">페루 연안에서 수온 편차가 양(+)으로 급상승한 ㉠ 시기는 무역풍 약화로 인한 엘니뇨 시기입니다. 엘니뇨 시기에는 페루 연안의 찬 심해수 용승이 약화되어 영양염류와 플랑크톤 공급이 급감하고 안초비 어획량이 폭락합니다. 또한 서태평양에는 하강 기류가 발달하여 가뭄이 발생하고, 동태평양 수온약층은 깊어집니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">무역풍 약화로 심해의 차가운 해수 용승이 줄어들어 심해 영양염류의 표층 공급량이 평년보다 크게 감소합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">서태평양 적도 부근 해역(인도네시아 일대)은 대기 순환의 중심이 동쪽으로 이동하면서 하강 기류가 우세해져 평년보다 강수량이 감소(가뭄)합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">동태평양 적도 부근 해역에서는 따뜻한 표층 해수층이 두꺼워지면서 수온약층이 시작되는 깊이가 평년보다 깊어집니다. (O)</span>
        </div>
`
    },
    {
        no: 15,
        topic: "생물과 환경의 상호작용 (비버의 반작용과 가족 생활)",
        content: `
        <div class="ans-correct-title">정답: ②</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">비버는 식물 조직을 갉아먹는 소비자(동물)입니다. 비버가 댐을 지어 하천의 흐름을 막고 유속을 늦춰 새로운 습지를 조성하는 현상은 생물이 무생물 환경을 바꾸는 '반작용'의 대표적 사례입니다. 같은 종 비버 가족 내에서 부모와 새끼가 역할을 분담하는 것은 개체군 '내' 상호작용입니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">㉠은 비버(생물적 요인)가 댐을 건설하여 하천의 유속과 지형(비생물적 요인)을 변화시켜 습지를 만드는 반작용의 전형적인 사례입니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">비버는 스스로 양분을 합성하지 못하고 유기물을 섭취하는 동물이므로 생태계 구성 요소 중 <b>소비자</b>에 해당합니다. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">㉡은 동일한 종으로 구성된 비버 가족 무리 내부의 협동과 분업이므로 개체군 사이가 아니라 <b>'개체군 내 상호작용'</b>입니다. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 16,
        topic: "숲의 층상 구조와 높이별 상대적 빛의 세기",
        content: `
        <div class="ans-correct-title">정답: ⑤</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">울창한 숲은 위에서부터 교목층(10m 이상), 아교목층(4~10m), 관목층(2~4m), 초본층(0~2m)의 층상 구조를 형성합니다. 빛의 세기는 수관 상층에서 하층으로 갈수록 급감하므로, 상층의 교목은 양엽(두꺼운 잎)을 발달시키고 바닥의 초본층 식물은 약한 빛에 적응한 음지식물(음엽)의 특성을 갖습니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">(나) 그래프에서 상대적인 빛의 세기가 40%인 높이는 약 9m 부근이며, 이는 층상 구조 중 아교목층(4~10m)에 해당합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">숲 바닥의 초본층은 빛의 세기가 5% 미만으로 매우 약하므로, 여기에 서식하는 식물은 약한 빛을 효율적으로 흡수할 수 있는 음지식물입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">교목층 나무에서 위쪽 잎은 강한 빛을 받아 울타리 조직이 두껍게 발달한 양엽이므로, 그늘진 아래쪽 잎(음엽)보다 일반적으로 잎이 두껍습니다. (O)</span>
        </div>
`
    },
    {
        no: 17,
        topic: "생태계 먹이 사슬과 먹이 그물의 평형 유지 비교",
        content: `
        <div class="ans-correct-title">정답: ①</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">먹이 그물이 복잡하게 얽혀 있는 생태계(B)는 특정 생물종이 일시적으로 급감하더라도 대체 먹이가 존재하여 생태계 평형이 안정적으로 유지됩니다. 생태계 B에서 매는 풀 → 들쥐 → 매 경로에서는 2차 소비자이고, 풀 → 메뚜기 → 개구리 → 매 경로에서는 3차 소비자로서 복합적인 영양 단계 지위를 갖습니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">생태계 B에서 매는 들쥐를 먹을 때는 2차 소비자, 개구리나 뱀을 먹을 때는 3차 소비자(또는 4차 소비자)의 지위를 동시에 가집니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">메뚜기가 급감했을 때 대체 먹이가 없는 단순한 먹이사슬 A가 복잡한 먹이그물 B보다 <b>평형이 파괴될 위험이 훨씬 더 높습니다</b>. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">생태계 B에서 개구리는 곤충(메뚜기)을 주로 포식하고 들쥐는 뱀과 매의 먹이이므로, <b>개구리와 뱀이 들쥐를 두고 경쟁한다는 설명은 성립하지 않습니다</b>. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 18,
        topic: "단일식물과 장일식물의 개화 조건 (암기 분절 실험)",
        content: `
        <div class="ans-correct-title">정답: ②</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">식물의 개화 반응은 연속적인 암기의 길이가 한계 암기보다 긴지 짧은지에 의해 통제됩니다. P는 암기가 14시간인 장암기 조건(II)에서 개화하고 야간 섬광 처리(III) 시 개화하지 않으므로 단일 식물입니다. 단일 식물은 암기 도중 짧은 빛(섬광)을 쬐어 연속적인 어둠을 분절하면 개화가 억제됩니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">식물 P는 연속적인 암기가 일정 기준(한계 암기) 이상으로 긴 조건에서만 개화하므로 단일 식물입니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">식물의 개화를 결정하는 결정적 요인은 '낮의 길이'가 아니라 <b>'연속적인 어두운 시간(지속 암기)'</b>입니다. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">III과 같이 단일 식물인 P의 암기 중간에 짧은 섬광을 비추면 연속 암기가 깨져 <b>개화가 억제(개화 안 함)</b>됩니다. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 19,
        topic: "북반구 대양의 표층 해류 순환 실험 모델링",
        content: `
        <div class="ans-correct-title">정답: ①</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">북반구 아열대 순환은 중위도의 서풍(편서풍)과 저위도의 동풍(무역풍)에 의해 시계 방향으로 회전하는 아열대 환류를 형성합니다. 대양의 동쪽 연안(대륙 B의 서안)을 따라 남쪽으로 흐르는 해류는 고위도에서 저위도로 향하는 '한류'이므로, 주변 대기를 냉각시켜 안정화시키고 강수량을 감소시켜 건조한 기후를 유발합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">수조 상단에서 서쪽에서 동쪽으로 부는 송풍기 I은 중위도 상공의 편서풍을 모사한 것입니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">상단의 서→동 흐름과 하단의 동→서 흐름에 의해 생성된 순환 ㉠의 회전 방향은 <b>시계 방향</b>입니다. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">대륙 B 연안을 따라 남쪽으로 흐르는 해류는 고위도에서 저위도로 향하는 찬 해류(한류)이므로, 주변 대기를 냉각시켜 안정화시킴으로써 <b>강수량을 감소(건조 기후 형성)</b>시킵니다. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 20,
        topic: "지구 온난화의 진행 과정과 피드백 메커니즘",
        content: `
        <div class="ans-correct-title">정답: ②</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">해수 온도가 상승하면 기체의 용해도가 감소하여 바다에 녹아 있던 이산화 탄소가 대기로 방출되고, 수증기 증발량이 증가하여 온실효과가 더욱 강화되는 '양의 피드백'이 발생합니다(학생 B 옳음). 극지방 빙하가 녹으면 지표 반사율이 낮아져 흡수량이 늘어나므로 온난화가 가속됩니다(학생 A 틀림). 북극해 해빙은 이미 물에 떠 있어 녹아도 해수면 상승을 일으키지 않으며 주원인은 해수 열팽창과 육지 빙하 융해입니다(학생 C 틀림).</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">학생 B</span>
            <span class="fact-check-text">지구 평균 기온 상승으로 해수의 온도가 높아지면 기체의 용해도가 감소하여 해수에 녹아 있던 $CO_2$가 대기로 방출되고 수증기 증발이 증가하므로 온실효과가 더욱 강화됩니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">학생 A</span>
                <span class="fact-check-text">극지방 빙하가 녹으면 태양 복사를 반사하던 흰 얼음이 사라져 지표 반사율이 감소하므로, 지표의 태양 복사 흡수량이 늘어나 기온 상승이 <b>억제되는 것이 아니라 가속화</b>됩니다. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">학생 C</span>
                <span class="fact-check-text">전 세계 해수면이 상승하는 주된 요인은 바닷물 온도 상승에 따른 <b>'해수의 열팽창'과 그린란드·남극 대륙의 '육지 빙하 융해'</b>이며, 북극해에 떠 있는 해빙은 녹아도 해수면 높이에 거의 영향을 주지 않습니다. (X)</span>
            </div>
        </div>
`
    }
    ]
};
