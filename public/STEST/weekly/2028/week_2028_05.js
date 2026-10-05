// 전체 텍스트 폰트 크기 설정을 위한 스타일 제어 코드
if (typeof document !== 'undefined') {
    document.documentElement.style.fontSize = "11px";
}

window.globalExamData = {
    title: "갓통과 WEEKLY 05",
    answers: [4, 5, 3, 1, 5, 4, 5, 2, 4, 4, 4, 3, 5, 3, 2, 1, 5, 4, 4, 3],
    scores: [1.5, 1.5, 2, 1.5, 1.5, 1.5, 1.5, 1.5, 2.5, 1.5, 2, 1.5, 2, 2.5, 1.5, 2, 1.5, 1.5, 1.5, 2],
    settings: {
        fontSize: "11px"
    },
    "explanations": [
    {
        "no": 1,
        "topic": "충돌과 작용-반작용 / 운동량과 충격량",
        "content": `
        <div class="ans-correct-title">정답: ④</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">마찰이 없는 수평면에서 압축된 용수철이 분리될 때, 두 수레 A와 B가 서로에게 가하는 힘은 작용-반작용에 의해 크기가 같고 방향이 반대입니다. 힘을 받는 시간도 같으므로 두 수레가 받는 충격량($I = F \cdot \Delta t$)의 크기는 서로 같습니다. 따라서 질량이 같은 두 수레는 분리 직후 속력도 같습니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">분리되는 동안 A가 B를 미는 힘과 B가 A를 미는 힘은 작용-반작용 관계이므로 항상 크기가 같고 방향이 반대입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">두 수레의 질량이 같고 받은 충격량(운동량 변화량)의 크기가 같으므로, 분리된 직후 A와 B의 속력은 서로 같습니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">용수철이 수레를 미는 동안 두 수레가 받는 힘의 크기와 작용 시간이 같으므로, A가 받은 충격량의 크기와 B가 받은 충격량의 크기는 <b>서로 같습니다</b>. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 2,
        "topic": "세포 내 유전 정보의 전달 장소 (전사와 번역)",
        "content": `
        <div class="ans-correct-title">정답: ⑤</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">방사성 우라실($^{3}H$-Uracil)은 RNA 합성(전사)에만 사용되는 염기입니다. 배양 초기에는 핵(전사 장소)에서 방사선이 최초로 검출되며, 시간이 지나면 핵에서 합성된 mRNA가 핵공을 통해 세포질로 이동하여 단백질 합성이 일어나는 라이보솜에서 최종적으로 검출됩니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">우라실(U)은 DNA에는 없고 RNA에만 존재하는 염기이므로, 방사성 우라실은 RNA가 합성(전사)될 때 결합하여 들어갑니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">(나) 단계에서 RNA의 전사는 유전 물질(DNA)이 있는 핵 속에서 일어나므로 방사선은 핵에서 최초로 검출됩니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">(다) 단계에서 핵에서 만들어진 mRNA는 세포질의 라이보솜으로 이동하여 단백질 번역에 사용되므로 최종 목적지는 라이보솜입니다. (O)</span>
        </div>
`
    },
    {
        "no": 3,
        "topic": "충격량과 충돌 시간 / 평균 힘의 관계",
        "content": `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">물체가 동일한 속력 $v_0$로 벽에 충돌하여 정지할 때, 운동량의 변화량(충격량 $I = \Delta p = m v_0$)은 일정합니다. 이때 $I = F_{avg} \cdot \Delta t$이므로 충돌 시간($\Delta t$)이 길어질수록 물체가 받는 평균 힘($F_{avg}$)은 반비례하여 감소합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">범퍼의 재질에 따른 충돌 시간과 힘을 비교하는 실험이므로, 수레 및 범퍼의 질량, 충돌 전 속력은 같게 유지해야 하는 통제 변인입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">가설을 검증하기 위해 충돌 시간을 다르게 하려면 고무줄 범퍼보다 변형이 적어 충돌 시간이 짧은 '단단한 플라스틱 범퍼'로 교체(㉠)하는 것이 적절합니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">충돌 전 속력과 질량이 같아 정지할 때까지의 운동량 변화량(충격량)은 일정합니다. 충돌 시간이 길어져도 <b>운동량 변화량의 크기는 변하지 않고 일정</b>하며, 단지 평균 힘이 감소할 뿐입니다. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 4,
        "topic": "세포막의 유동 모자이크 모형",
        "content": `
        <div class="ans-correct-title">정답: ①</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">세포막은 인지질 2중층에 막 단백질이 파묻히거나 관통하고 있는 구조입니다. 인지질과 단백질은 고정되어 있지 않고 유동적으로 움직일 수 있어 '유동 모자이크 모형'이라 부릅니다. 인지질은 친수성 머리와 소수성 꼬리를 가집니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">인지질 분자는 물과 친한 친수성 머리(인산기)와 물을 밀어내는 소수성 꼬리(지방산)로 이루어져 있습니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">막 단백질과 인지질 분자들은 인지질 2중층 내에서 <b>유동적으로 위치를 이동</b>할 수 있습니다. 고정되어 있다는 설명은 틀렸습니다. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">인지질 2중층의 내부는 소수성(지용성)이므로, 수용성 물질이나 이온은 인지질 2중층을 직접 통과하기 어렵고 <b>수송 단백질을 통해 이동</b>합니다. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 5,
        "topic": "두 물체의 정면 충돌과 운동량 보존",
        "content": `
        <div class="ans-correct-title">정답: ⑤</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">충돌 전 A의 운동량: $p_A = 2\text{ kg} \times 4\text{ m/s} = 8\text{ kg}\cdot\text{m/s}$, B는 정지($p_B = 0$). 충돌 후 A의 속도는 $1\text{ m/s}$, B의 속도는 $2\text{ m/s}$. 충돌 전후 총 운동량이 보존되므로 $8 = (2 \times 1) + (m_B \times 2) \implies m_B = 3\text{ kg}$입니다. A의 충격량은 $\Delta p_A = 2(1 - 4) = -6\text{ N}\cdot\text{s}$입니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">A가 받은 충격량의 크기는 A의 운동량 변화량의 크기와 같으므로 $|2\text{ kg} \times (1\text{ m/s} - 4\text{ m/s})| = 6\text{ N}\cdot\text{s}$입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">외력이 없으므로 총 운동량이 보존되어 $2\times 4 + 0 = 2\times 1 + m_B \times 2$에서 $m_B = 3\text{ kg}$입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">작용-반작용에 의해 A가 받은 충격량의 방향(운동 반대 방향, 왼쪽)과 B가 받은 충격량의 방향(오른쪽)은 서로 반대입니다. (O)</span>
        </div>
`
    },
    {
        "no": 6,
        "topic": "동·식물 세포 공통 소기관 (핵, 미토콘드리아, 리보솜)",
        "content": `
        <div class="ans-correct-title">정답: ④</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">세포 소기관의 특징 분석:<br>A: DNA 저장 및 생명 활동 통제 → 핵(2중막)<br>B: 포도당 분해 세포 호흡 및 ATP 생산 → 미토콘드리아(2중막)<br>C: 아미노산 연결 단백질 합성 → 리보솜(막 없음).</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">핵(A)은 인지질 2중층이 2겹으로 된 2중막 구조(핵막)로 둘러싸여 있습니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">리보솜(C)에서 합성된 단백질은 세포막을 구성하는 막 단백질이나 다양한 효소, 호르몬의 주요 성분이 됩니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">광합성이 일어나는 장소는 <b>엽록체</b>이며, 미토콘드리아(B)는 산소를 이용한 <b>세포 호흡</b>이 일어나는 장소입니다. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 7,
        "topic": "세포막을 통한 물질 이동 (단순 확산 vs 촉진 확산)",
        "content": `
        <div class="ans-correct-title">정답: ⑤</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">농도 차에 따른 확산 속도 그래프에서:<br>A: 농도 차가 커져도 특정 속도 이상 증가하지 않고 포화됨 → 막 단백질을 이용한 <b>촉진 확산(포도당)</b>.<br>B: 농도 차에 비례하여 직선으로 계속 증가함 → 인지질 2중층을 직접 통과하는 <b>단순 확산($O_2$)</b>.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">A는 수송 단백질의 도움을 받아 이동하는 촉진 확산 방식입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">기체 분자인 산소($O_2$)는 인지질 2중층을 단순 확산하므로 B에 해당합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">A의 확산 속도가 한계에 도달하는 이유는 세포막에 존재하는 해당 물질의 막 단백질이 모두 포화되어 작용하고 있기 때문입니다. (O)</span>
        </div>
`
    },
    {
        "no": 8,
        "topic": "번지점프의 원리와 충격력 완화",
        "content": `
        <div class="ans-correct-title">정답: ②</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">낙하 후 정지할 때까지의 속도 변화량($v \to 0$)이 같고 점퍼의 질량이 같으므로, 충돌 전후의 <b>운동량의 변화량(㉠, 충격량)</b>은 일반 밧줄이나 고무줄이나 동일합니다. 이때 신축성 있는 고무줄은 늘어나면서 정지하는 데 걸리는 시간($\Delta t$)을 길게 늘려주어 점퍼가 받는 <b>평균 힘(㉡, 충격력)</b>을 줄여줍니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">정답 분석</span>
            <span class="fact-check-text">㉠은 '운동량의 변화량(또는 충격량)', ㉡은 '평균 힘(충격력)'이 들어가야 물리적으로 완벽하게 맞습니다. 정답은 ②번입니다. (O)</span>
        </div>
`
    },
    {
        "no": 9,
        "topic": "유전암호 코돈 돌연변이와 아밀레이스 효소 활성",
        "content": `
        <div class="ans-correct-title">정답: ④</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">코돈 표 분석:<br>UCU와 UCC는 동일한 아미노산 ㉠(세린)을 지정하고, CCU와 CCC는 아미노산 ㉡(프롤린)을 지정합니다.<br>$E_2$는 UCU → UCC로 염기가 바뀌었으나 지정 아미노산이 ㉠으로 동일하므로 정상 효소($E_1$)와 동일한 활성을 가져 녹말을 분해합니다. 따라서 시험관 II의 아이오딘 반응 결과 ㉡은 <b>황갈색(녹말 분해됨)</b>입니다. 반면 $E_3, E_4$는 아미노산이 ㉡으로 바뀌어 효소 기능을 잃어 청남색을 띱니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">가설 ⓐ는 실험 결과(동일 아미노산인 $E_2$는 활성 유지, 다른 아미노산인 $E_3, E_4$는 활성 상실)를 통해 '번역되는 아미노산이 동일하다면 효소 기능은 유지된다'임이 타당합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">$E_3$는 코돈 변화로 인해 아미노산이 바뀌어 단백질의 3차원 입체 구조가 변형되었으므로 활성을 잃었습니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">$E_2$는 정상적으로 녹말을 분해하므로 녹말이 남아있지 않아 아이오딘-아이오딘화 포타슘 용액의 색깔 ㉡은 <b>황갈색</b>입니다. 청남색이 아닙니다. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 10,
        "topic": "트럭과 승용차의 정면 충돌 (작용-반작용 및 가속도)",
        "content": `
        <div class="ans-correct-title">정답: ④</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">대형 트럭($M$)과 소형 승용차($m$, $M > m$)의 충돌 분석:<br>1. 작용-반작용에 의해 두 차량이 서로에게 가하는 힘의 크기($F$)는 항상 같습니다.<br>2. 충돌 시간($\Delta t$)도 같으므로 두 차량이 받는 충격량($I = F \cdot \Delta t$)의 크기는 같습니다.<br>3. 뉴턴 제2법칙($a = F/m$)에 의해 질량이 작은 승용차의 가속도(속도 변화율)가 훨씬 커서 승용차 탑승자가 더 위험합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">학생 B</span>
            <span class="fact-check-text">두 차량이 충돌하는 동안 주고받은 충격량의 크기는 작용-반작용에 의해 서로 같습니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">학생 C</span>
            <span class="fact-check-text">힘의 크기가 같을 때 질량이 작은 소형 승용차가 더 큰 가속도(속도 변화)를 겪으므로 탑승자에게 더 위험합니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">학생 A</span>
                <span class="fact-check-text">작용-반작용 법칙에 의해 소형 승용차와 대형 트럭이 받는 <b>평균 힘의 크기는 항상 서로 같습니다</b>. 승용차가 더 큰 힘을 받는다는 설명은 오류입니다. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 11,
        "topic": "진핵세포 모형 구조 분석 (식물 세포)",
        "content": `
        <div class="ans-correct-title">정답: ④</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">제시된 세포 모형에는 가장 바깥쪽에 두꺼운 <b>세포벽</b>이 존재하고, 내부에 <b>엽록체</b>와 커다란 <b>중앙 액포</b>가 관찰되므로 전형적인 <b>식물 세포</b>의 구조입니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">식물 세포는 세포막 바깥쪽에 세포를 보호하고 형태를 유지하는 세포벽을 가지고 있습니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">빛에너지를 화학 에너지(포도당)로 변환하는 광합성 소기관인 엽록체가 뚜렷하게 관찰됩니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">세포벽과 엽록체가 관찰되므로 이 모형은 동물 세포가 아니라 <b>식물 세포</b>를 나타낸 것입니다. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 12,
        "topic": "자유 낙하 후 바닥 충돌과 충격량 그래프",
        "content": `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">높이 $4h, h$에서 자유 낙하 시 바닥 도달 직전 속력: $v = \sqrt{2gh}$이므로 $v_A = \sqrt{2g(4h)} = 2\sqrt{2gh}$, $v_B = \sqrt{2gh}$.<br>바닥 닿기 직전 운동량: $p_A = m(2v) = 2mv$, $p_B = (2m)v = 2mv$.<br>두 물체 모두 바닥에서 정지하므로 바닥으로부터 받은 충격량(곡선 아래 면적 $S$)은 $S_A = S_B = 2mv$로 같습니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">바닥에 닿기 직전 속력은 높이의 제곱근에 비례하므로 A가 B의 $\sqrt{4h/h} = 2$배입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">두 물체의 충돌 전 운동량 크기가 $2mv$로 같고 모두 정지하였으므로 운동량 변화량(면적) $S_A = S_B$입니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">그래프에서 A와 B의 충돌 시간($\Delta t$)이 서로 다르면 평균 힘($F = S/\Delta t$)도 서로 달라집니다. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 13,
        "topic": "유전 정보의 흐름 (전사, 번역 및 돌연변이)",
        "content": `
        <div class="ans-correct-title">정답: ⑤</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">정상 DNA 주형 가닥(3'→5'): CAC CTG CTT → 전사(ⓐ)된 mRNA(5'→3'): GUG GAC GAA → 번역(ⓑ) 아미노산: Val - Asp - Glu.<br>돌연변이 DNA(3'→5'): CAC CTC CTT → mRNA: GUG GAG GAA → 번역 아미노산: Val - Glu - Glu.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">mRNA의 유전암호에 따라 아미노산을 연결하여 단백질을 합성하는 번역(ⓑ) 과정은 세포질의 라이보솜에서 일어납니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">DNA 주형 가닥의 CAC에 상보적으로 전사된 mRNA의 첫 번째 코돈 ㉠은 GUG입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">돌연변이에 의해 바뀐 코돈 GAG(㉢)는 아미노산 W(Glu)를 지정합니다. (O)</span>
        </div>
`
    },
    {
        "no": 14,
        "topic": "자유 낙하 운동과 수평으로 던진 물체의 운동",
        "content": `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">동일 높이 $h$에서 A는 자유 낙하, B는 수평 속력 $v$로 투사:<br>1. 연직 방향 운동: 두 물체 모두 초기 연직 속도 0, 연직 가속도 $g$로 동일하므로 임의의 시간 $t$에서 두 물체의 높이는 $y(t) = h - \frac{1}{2}gt^2$로 항상 같습니다.<br>2. 수평 거리 $L$을 이동하는 데 걸린 시간은 $t = L/v$이며, 이 시간 동안 같은 높이만큼 낙하하므로 공중에서 반드시 충돌합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">두 물체가 같은 높이에서 출발하여 공중에서 만날 수 있는 이유는 연직 방향으로 작용하는 중력 가속도($g$)가 같아 연직 낙하 거리가 동일하기 때문입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">B가 운동하는 동안 작용하는 유일한 알짜힘은 중력($mg$)뿐이므로 힘의 크기와 방향(연직 아래)은 항상 일정합니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">B를 더 큰 속력 $v'$으로 던지면 충돌 시간 $t' = L/v'$이 짧아지므로, 낙하 거리가 줄어들어 R보다 <b>지면에서 더 높은 곳(지면에서 더 먼 곳)에서 충돌</b>합니다. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 15,
        "topic": "효소의 작용과 화학 반응의 에너지 변화",
        "content": `
        <div class="ans-correct-title">정답: ②</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">에너지 그래프 분석:<br>반응물의 에너지가 생성물의 에너지보다 높으므로 에너지를 방출하는 <b>발열 반응(이화 작용)</b>입니다.<br>ⓐ는 활성화 에너지가 높은 효소 없을 때, ⓑ는 활성화 에너지가 낮아진 효소 있을 때의 경로입니다. $E_1$은 반응열(반응물과 생성물의 에너지 차이)로 효소 유무와 무관하게 일정합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">반응열 $E_1$은 반응물과 생성물의 고유한 에너지 차이이므로, 효소를 첨가해도 변하지 않고 일정합니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">그래프에서 생성물의 에너지는 반응물의 에너지보다 <b>낮습니다</b> (발열 반응). (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">아미노산이 결합하여 단백질이 합성되는 과정은 에너지를 흡수하는 <b>동화 작용(흡열 반응)</b>이므로 위 발열 반응 그래프와 맞지 않습니다. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 16,
        "topic": "물풍선 받기와 충격력 (최대 힘 vs 평균 힘)",
        "content": `
        <div class="ans-correct-title">정답: ①</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">동일 속도, 동일 질량의 물풍선을 $t_0$ 동안 정지시키므로 운동량 변화량(충격량 $\Delta p$)과 충돌 시간($t_0$)이 같아 두 학생이 가한 <b>평균 힘($F_{avg} = \Delta p / t_0$)은 서로 같습니다</b>.<br>하지만 B는 순간적으로 손을 멈춰 최대 힘이 파손 한계선($1.5F_0$)을 초과($2F_0$)하였으므로 물풍선이 터집니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">학생 B의 힘-시간 그래프에서 최대 힘이 $2F_0$에 도달하여 물풍선의 파손 한계선($1.5F_0$)을 넘어서므로 B가 받은 물풍선은 터집니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">두 학생 모두 총 충격량(면적)과 충돌 시간($t_0$)이 같으므로 0부터 $t_0$까지 받은 <b>평균 힘의 크기는 A와 B가 서로 같습니다</b>. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">두 물풍선은 질량과 충돌 전후 속도가 같으므로 <b>운동량 변화량의 크기도 서로 같습니다</b>. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 17,
        "topic": "돌연변이 효소의 활성과 독성 물질 분해",
        "content": `
        <div class="ans-correct-title">정답: ⑤</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">DNA: TAC-CGA-TTG-ATC → mRNA: AUG-GCU-AAC-UAG.<br>첫 번째 아미노산 개시 코돈 AUG 다음의 코돈 ㉠은 GCU(알라닌)입니다.<br>(나) 그래프에서 돌연변이 효소 I은 정상 효소 E와 동일한 속도로 독성 물질을 분해하므로 기능과 입체 구조가 정상입니다. 반면 돌연변이 효소 II는 독성 물질 농도가 줄지 않으므로 기능을 완전히 상실했습니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">DNA 가닥의 CGA에 상보적인 mRNA의 코돈 ㉠의 염기 서열은 GCU입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">효소 I은 정상 효소 E와 독성 물질 분해 곡선이 일치하므로 단백질의 3차원 입체 구조와 활성이 정상입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">효소 II는 염기 치환으로 인해 아미노산 서열이 달라져 활성 부위가 변형되어 효소 기능이 상실되었습니다. (O)</span>
        </div>
`
    },
    {
        "no": 18,
        "topic": "승용차와 트럭의 1차원 완전 비탄성 충돌",
        "content": `
        <div class="ans-correct-title">정답: ④</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">오른쪽을 (+) 방향으로 설정:<br>충돌 전: 승용차 $p_1 = m(+2v) = +2mv$, 트럭 $p_2 = 3m(-v) = -3mv$.<br>총 운동량 $P_{total} = +2mv - 3mv = -mv$.<br>충돌 후 한 덩어리가 된 속도 $V = \frac{-mv}{m+3m} = -\frac{1}{4}v$ (왼쪽 방향).<br>승용차의 운동량 변화량: $\Delta p = m(-\frac{1}{4}v) - m(2v) = -\frac{9}{4}mv$. 크기는 $\frac{9}{4}mv$.<br>트럭의 운동량 변화량: $3m(-\frac{1}{4}v) - 3m(-v) = +\frac{9}{4}mv$. 크기는 $\frac{9}{4}mv$.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">충돌 과정에서 두 차량이 주고받은 충격량의 크기는 작용-반작용에 의해 $\frac{9}{4}mv$로 서로 같습니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">충돌 시간 $\Delta t$ 동안 승용차가 받은 평균 힘의 크기는 $\frac{|\Delta p|}{\Delta t} = \frac{9mv}{4\Delta t}$로 성립합니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">충돌 후 한 덩어리가 된 차량의 속도는 $-\frac{1}{4}v$로 왼쪽(트럭의 처음 운동 방향)이므로, 충돌 전 <b>승용차의 운동 방향(오른쪽)과 반대</b>입니다. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 19,
        "topic": "세포 소기관 간 물질·에너지 상호작용",
        "content": `
        <div class="ans-correct-title">정답: ④</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">소기관 분석:<br>C: 핵 (DNA 유전 정보를 ㉡ RNA로 전사)<br>B: 리보솜 (㉡ RNA의 정보에 따라 아미노산 합성)<br>A: 미토콘드리아 (㉠ 포도당을 분해하여 세포 호흡으로 ATP 에너지 생성).</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">핵(C)에서 DNA의 유전 정보가 전사 과정을 통해 mRNA(㉡)로 전달됩니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">리보솜(B)은 mRNA(㉡)의 코돈 서열에 맞추어 아미노산들을 펩타이드 결합으로 연결하여 폴리펩타이드를 합성합니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">미토콘드리아(A)는 동물 세포뿐만 아니라 <b>식물 세포에도 반드시 존재</b>하여 밤낮으로 세포 호흡을 수행합니다. (X)</span>
            </div>
        </div>
`
    },
    {
        "no": 20,
        "topic": "추락 방지 그물망과 충격력 완화 원리",
        "content": `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">동일 질량의 모형을 같은 높이에서 낙하하므로 그물망 도달 직전 속도와 정지할 때까지의 운동량 변화량(충격량)은 (가)와 (나)에서 같습니다.<br>스프링이 느슨하게 쳐진 (나)는 늘어나는 거리가 길어 정지할 때까지 걸리는 시간($\Delta t$)이 길어지므로 사람 모형이 받는 평균 충격력이 감소합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">떨어지는 동안 사람 모형에 작용하는 중력의 크기는 $mg$로 (가)와 (나)에서 동일합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">(나) 모형은 충돌 시간을 늘려 충격력을 줄이는 원리로, 자동차 에어백이나 안전 매트와 동일한 물리적 원리가 적용되었습니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">느슨하게 처진 (나)가 더 많이 늘어나 충돌 시간이 길어집니다. 따라서 정지할 때까지 걸린 시간은 <b>(나)가 (가)보다 깁니다</b>. (X)</span>
            </div>
        </div>
`
    }
    ]
};
