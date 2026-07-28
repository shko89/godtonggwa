// 전체 텍스트 폰트 크기 설정을 위한 스타일 제어 코드
if (typeof document !== 'undefined') {
    document.documentElement.style.fontSize = "11px";
}

window.globalExamData = {
    title: "갓통과 WEEKLY 01",
    answers: [5, 5, 3, 5, 2, 1, 3, 2, 1, 3, 2, 4, 3, 5, 4, 3, 2, 3, 5, 1],
    scores: [1.5, 2, 1.5, 1.5, 1.5, 2, 1.5, 1.5, 1.5, 1.5, 2, 1.5, 1.5, 1.5, 1.5, 1.5, 2, 1.5, 1.5, 2.5],
    settings: {
        fontSize: "11px"
    },
    "explanations": [
        {
            "no": 1,
            "topic": "정보와 신호",
            "content": `
<div class="ans-correct-title">정답: ⑤ ㄱ, ㄴ, ㄷ</div>
        <div class="concept-box"><div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div><div class="concept-content">가속도 센서처럼 자연의 변화를 감지해서 전기 신호로 바꿔주는 장치가 바로 '센서'야!</div></div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">가속도는 길이와 시간이라는 기본량을 조합해서 만든 거니까 <b>유도량</b>이 맞아. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">아날로그 정보는 연속적으로 변화하는 물리량이 맞아. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">(가)는 센서에서 나온 아날로그 신호를 스마트폰(기계)이 알아들을 수 있게 0과 1의 <b>디지털 신호로 변환</b>해주는 장치지. (O)</span>
        </div>
        </div>
`
        },
        {
            "no": 2,
            "topic": "기본량과 측정",
            "content": `
<div class="ans-correct-title">정답: ⑤ ㄱ, ㄴ, ㄷ</div>
        <div class="concept-box"><div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div><div class="concept-content">눈금실린더의 기본! 눈높이를 수평으로 맞추고 액체의 가장 오목한 부분을 읽어야 시차(개인 오차)가 생기지 않아!</div></div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">부피는 길이(m)를 세 번 곱한 값($m^3$)이므로 <b>유도량</b>이 맞아. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">액체 표면이 오목할 땐 그 최하단인 <b>B와 시선을 수평으로</b> 맞춰서 읽는 게 정확한 측정법이야. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">위쪽(A)에서 비스듬히 내려다보면 실제 액체 높이(B)보다 더 높은 눈금이 시선에 들어오니까 <b>더 큰 값</b>으로 측정돼. (O)</span>
        </div>
`
        },
        {
            "no": 3,
            "topic": "SI 접두어",
            "content": `
<div class="ans-correct-title">정답: ③ ㄱ, ㄴ</div>
        <div class="concept-box"><div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div><div class="concept-content">SI 접두어는 구구단처럼 암기! 킬로($10^3$), 밀리($10^{-3}$), 마이크로($10^{-6}$), 나노($10^{-9}$)</div></div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">킬로(k)는 1000배, 즉 $10^3$이 맞아. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">1 나노($n$)는 $10^{-9}$고, 마이크로($\\mu$)는 $10^{-6}$이야. $10^{-3} \\times 10^{-6} = 10^{-9}$ 니까 둘은 완벽하게 <b>같은 값</b>이지. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">세포는 눈에 보이지 않는 미시 세계야. 그러니까 메가(M, $10^6$)같이 거대한 접두어가 아니라 <b>마이크로($\\mu$)</b>를 써야지! (X) 앗? ㄷ은 틀린 거니까 정답은 <b>② ㄴ</b> 이네! 자꾸 헷갈리게 해서 미안!</span>
            </div>
        </div>
`
        },
        {
            "no": 4,
            "topic": "기본량과 유도량",
            "content": `
<div class="ans-correct-title">정답: ⑤ ㄱ, ㄴ, ㄷ</div>
        <div class="concept-box"><div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div><div class="concept-content">길이, 질량, 시간 같은 찐 근본 7개가 '기본량'이고, 얘네를 지지고 볶고 곱하고 나눠서 조립한 게 '유도량'이야!</div></div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">길이, 질량은 남한테 의존하지 않는 독립적인 <b>기본량</b>(가) 그룹이 맞아. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">시간은 SI 7대 <b>기본량</b> 중 하나니까 A에 들어가는 게 맞아! (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">(나) 유도량(속력, 밀도 등)은 결국 (가) 기본량들을 <b>수학적으로 조합(곱/나눗셈)</b>해서 만들어낸 거야. (O)</span>
        </div>
        
`
        },
        {
            "no": 5,
            "topic": "정보와 신호",
            "content": `
<div class="ans-correct-title">정답: ② ㄴ</div>
        <div class="concept-box"><div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div><div class="concept-content">아날로그는 곡선! 디지털은 계단! 듬성듬성 쪼갤수록(표본화 주기가 길수록) 원본이랑 안 비슷해져서 오차가 커져.</div></div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
    <span class="fact-check-label">ㄴ.</span>
    <span class="fact-check-text">(다)처럼 듬성듬성 뽑으면 빈 공간이 많아서 디테일을 놓치지? 그래서 (나)보다 원래 정보랑 차이 나는 <b>정보 손실(오차)이 더 커져. (O)</span>
</div>
<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지 팩트폭행! (함정 주의)</div>
    <div class="fact-check-item">
        <span class="wrong-fact-label">ㄱ.</span>
        <span class="fact-check-text">(가)는 매끄럽게 이어지는 <b>아날로그 신호</b>야. 0과 1로 된 건 (나), (다) 같은 디지털 신호지! (X)</span>
    </div>
    <div class="fact-check-item">
        <span class="wrong-fact-label">ㄷ.</span>
        <span class="fact-check-text">촘촘하게 쪼갠 (나)가 데이터를 훨씬 많이 기록했기 때문에 전송해야 할 데이터 용량도 <b>(나)가 더 커.</b> (X)</span>
    </div>
</div>
`
        },
        {
            "no": 6,
            "topic": "측정과 어림",
            "content": `
<div class="ans-correct-title">정답: ① ㄱ</div>
        <div class="concept-box"><div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div><div class="concept-content">얇은 종이 1장의 두께를 어떻게 정밀하게 잴까? 여러 장을 뭉쳐서 한 번에 재고 장수로 나누면 '오차율'이 확 줄어들어!</div></div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item">
    <span class="fact-check-label">ㄱ.</span>
    <span class="fact-check-text">자로 잰 전체 두께($H$)는 '길이' 차원이니까 <b>기본량</b>이 맞아! (O)</span>
</div>
<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지 팩트폭행! (함정 주의)</div>
    <div class="fact-check-item">
        <span class="wrong-fact-label">ㄴ.</span>
        <span class="fact-check-text">500장 두께를 재고 500으로 나누는 건 대충 때려맞추는 '어림'이 아니야. 한 번 잴 때 생기는 오차를 평균화해서 정밀도를 높이는 <b>'간접 측정'</b>이야! (X)</span>
    </div>
    <div class="fact-check-item">
        <span class="wrong-fact-label">ㄷ.</span>
        <span class="fact-check-text">1장씩 따로 500번을 재면 눈금을 읽을 때마다 오차가 500번 쌓이겠지? 1장 두께는 0.1mm 정도인데 자의 눈금이 1mm면 한 장씩 잴 때마다 죄다 0mm로 보일거야. 1장씩 따로 재는 건 <b>측정조차 불가능</b>한 바보 같은 짓이야! 뭉텅이로 재야 오차가 줄어들어. (X)</span>
    </div>
</div>
`
        },
        {
            "no": 7,
            "topic": "시공간의 규모",
            "content": `
<div class="ans-correct-title">정답: ③ ㄱ, ㄴ</div>
        <div class="concept-box"><div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div><div class="concept-content">미시부터 거시까지 사이즈 차이가 너무 커서 10의 거듭제곱으로 나타내는 '로그 스케일'을 쓴다는 걸 명심해!</div></div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">맞아! 원자부터 지구, 우주까지 스케일이 너무 광범위하니까 <b>10의 거듭제곱</b>을 써야 직관적으로 파악하기 편하지. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">사람($10^0$)에 대한 지구($10^7$)의 비율은 $10^7 / 10^0 = 10^7$배! 정확하게 계산했네. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">원자에서 사람까지는 $10^0 / 10^{-10} = 10^{10}$배. 사람에서 지구까지는 $10^7$배야. 사람에서 원자로 내려가는 배율($10^{10}$)이 더 <b>크다</b>고! 작다고 했으니 틀렸어. (X)</span>
            </div>
`
        },
        {
            "no": 8,
            "topic": "측정 표준",
            "content": `
<div class="ans-correct-title">정답: ② ㄴ</div>
        <div class="concept-box"><div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div><div class="concept-content">현대의 길이 1m는 우주 절대 상수인 '빛의 속력'으로 재정의했어. 즉, 시간(s)이 곧 길이(m)를 결정하는 셈이지!</div></div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">빛의 속력($c$)으로 거리를 구하려면 엄청나게 <b>정밀한 시간(s) 측정 기술</b>(세슘 원자시계)이 필수적이야. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">전파의 속력(빛의 속력 $c$)은 측정 장소나 시간에 따라 변하면 안 돼. 우주 어디서나 안 변하는 <b>불변의 물리 상수</b>지! (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">현대 과학은 원자시계로 <b>'시간의 표준'을 먼저 완벽히 확립</b>한 뒤, 그걸 바탕으로 '길이의 표준'을 새롭게 정의했어. 순서가 반대야! (X)</span>
            </div>
        </div>
`
        },
        {
            "no": 9,
            "topic": "정보와 신호",
            "content": `
<div class="ans-correct-title">정답: ① ㄱ</div>
        <div class="concept-box"><div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div><div class="concept-content">자연계의 원래 신호는 아날로그이지만, 정보의 압축·저장·가공에 훨씬 유리한 건 디지털 방식이라는 점을 절대 잊지 마!</div></div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">온도, 소리, 빛 같은 자연의 정보는 원래 다 매끄러운 <b>아날로그(가)</b> 신호야. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
        <div class="fact-check-item">
            <span class="wrong-fact-label">ㄴ.</span>
            <span class="fact-check-text">아날로그 신호를 디지털 신호로 변환하는 과정에서는 연속된 값을 불연속적인 단위로 쪼개어 저장하므로, 필연적으로 미세한 정보의 손실(오차)이 발생 해. (X)</span>
        </div>
        <div class="fact-check-item">
            <span class="wrong-fact-label">ㄷ.</span>
            <span class="fact-check-text">디지털 방식(나)은 원본 아날로그보다 <b>정보를 압축하고 변형(편집)</b>하는 데 훨씬 유리하지! (X)</span>
        </div>
`
        },
        {
            "no": 10,
            "topic": "기본량과 유도량, 단위",
            "content": `
<div class="ans-correct-title">정답: ③ ㄱ, ㄴ</div>
        <div class="concept-box"><div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div><div class="concept-content">정답: ③ ㄱ, ㄴ

💡 [갓쌤의 1초 개념]
측정 도구(아날로그 vs 디지털 센서)의 원리와 측정의 불확실성을 이해하는 문제!
모든 과학적 측정에는 필연적으로 불확실성(오차)이 포함되며, 아무리 첨단 디지털 기기를 사용하더라도 오차를 '100% 완벽하게' 제거하는 것은 불가능하다는 과학의 기본 원칙을 잊지 마!</div></div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
                <span class="fact-check-label">ㄱ.</span>
                <span class="fact-check-text">온도 센서는 온도라는 아날로그 물리량을 기계가 읽을 수 있는 <b>전기 신호</b>로 바꿔주는 핵심 장치야. (O)</span>
            </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">액체 온도계(가)로 눈금을 읽을 때는 눈대중으로 어림잡아 읽는 과정에서 관측자에 따른 오차가 발생할 수밖에 없어. 뿐만 아니라, 자연계의 모든 물리적 측정에는 측정 도구의 한계나 외부 환경 요인으로 인해 반드시 불확실성(오차)이 포함된다는 사실! (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">첨단 기기를 쓰면 오차를 '줄일 수'는 있지만, <b>100% 완벽하게 제거하는 것은 물리적으로 절대 불가능</b>해! (X)</span>
            </div>
        </div>
`
        },
        {
            "no": 11,
            "topic": "측정 표준",
            "content": `
<div class="ans-correct-title">정답: ② ㄴ</div>
<div class="concept-box"><div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div><div class="concept-content">우리는 도구를 써서 한계를 넘어섰어! 전자 현미경으로 미시 세계(원자)를 뚫어보고, 전파 망원경으로 거시 세계(우주)를 엿보지!</div></div>
<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item">
    <span class="fact-check-label">ㄴ.</span>
    <span class="fact-check-text">빛(전파)이 우주를 날아오는 데 시간이 걸리니까, 멀리 있는 은하를 보는 건 결국 그 빛이 출발했던 <b>우주의 과거</b>를 보는 것과 같아. (O)</span>
</div>
<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지 팩트폭행! (함정 주의)</div>
    <div class="fact-check-item">
    <span class="wrong-fact-label">ㄱ.</span>
    <span class="fact-check-text">(가) 전자 현미경은 눈으로 볼 수 없는 아주 작은 <b>미시 세계</b>를 관측하는 데 딱이야. (X)</span>
    </div>

    <div class="fact-check-item">
        <span class="wrong-fact-label">ㄷ.</span>
        <span class="fact-check-text">빛의 속력은 우주의 절대 상수라서 <b>인위적으로 절대 증가시킬 수 없어.</b> (X)</span>
    </div>
</div>
`
        },
        {
            "no": 12,
            "topic": "표준의 확립",
            "content": `
<div class="ans-correct-title">정답: ⑤ ㄴ, ㄷ</div>
<div class="concept-box"><div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div><div class="concept-content">현대 과학의 단위(SI)는 썩어 문드러지는 쇳덩이(미터원기) 대신, 절대 변하지 않는 '자연 상수(빛의 속력)'를 기준으로 싹 다 갈아엎었어!</div></div>
<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item">
    <span class="fact-check-label">ㄴ.</span>
    <span class="fact-check-text">현대 1m의 정의는 빛이 1/299,792,458'초' 동안 간 거리야. 즉, 길이 기준이 <b>시간(s) 기준에 완벽하게 의존</b>하고 있지. (O)</span>
</div>
<div class="fact-check-item">
    <span class="fact-check-label">ㄷ.</span>
    <span class="fact-check-text">두 단위 모두 세슘 원자나 빛의 속력 같은 <b>자연의 기본 상수</b>를 바탕으로 확립되었어. 팩트! (O)</span>
</div>
<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지 팩트폭행! (함정 주의)</div>
    <div class="fact-check-item">
        <span class="wrong-fact-label">ㄱ.</span>
        <span class="fact-check-text">길이(m)와 시간(s)은 모든 물리량의 뼈대가 되는 <b>'기본량'</b>이야. 유도량이 아니라고! (X)</span>
    </div>
</div>
`
        },
        {
            "no": 13,
            "topic": "정보의 전달",
            "content": `
<div class="ans-correct-title">정답: ③ ㄱ, ㄷ</div>
<div class="concept-box"><div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div><div class="concept-content">센서가 하는 일은 단순해. 아날로그로 쏟아지는 자연의 정보(소리, 빛, 온도)를 기계가 알아먹게 '전기 신호'로 바꿔주는 거지!</div></div>
<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item">
    <span class="fact-check-label">ㄱ.</span>
    <span class="fact-check-text">초음파 센서가 메아리(아날로그)를 받아서 로봇이 계산할 수 있게 <b>전기적 신호</b>로 변환해 주는 거야. (O)</span>
</div>
<div class="fact-check-item">
    <span class="fact-check-label">ㄷ.</span>
    <span class="fact-check-text">초음파는 공기나 매질을 흔드는 연속적인 물리적 파동이므로 전형적인 <b>아날로그 신호</b>야. (O)</span>
</div>
<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지 팩트폭행! (함정 주의)</div>
    <div class="fact-check-item">
        <span class="wrong-fact-label">ㄴ.</span>
        <span class="fact-check-text">거리는 곧 '길이'니까 <b>기본량</b>이야! 시간과 속력을 조합해서 '계산'할 수는 있지만 물리량의 종류 자체는 기본량이지. (X)</span>
    </div>
</div>
`
        },
        {
            "no": 14,
            "topic": "정보의 전달",
            "content": `
<div class="ans-correct-title">정답: ⑤ ㄱ, ㄴ, ㄷ</div>
<div class="concept-box"><div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div><div class="concept-content">아날로그는 멀리 갈수록 지치고 잡음도 껴서 엉망이 되지만, 디지털은 0과 1만 구분하면 되니까 중간에 새것처럼 쌩쌩하게 복원할 수 있어!</div></div>
<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item">
    <span class="fact-check-label">ㄱ.</span>
    <span class="fact-check-text">구불구불 매끄럽게 이어지는 파형 (가)는 <b>아날로그 신호</b>가 맞아. (O)</span>
</div>
<div class="fact-check-item">
    <span class="fact-check-label">ㄴ.</span>
    <span class="fact-check-text">(나) 같은 디지털 신호는 세기가 약해져도 중계기(증폭기)를 거치면 <b>완벽하게 원래대로 쉽게 복원</b>할 수 있어. (O)</span>
</div>
<div class="fact-check-item">
    <span class="fact-check-label">ㄷ.</span>
    <span class="fact-check-text">대용량 정보를 장거리 전송할 때는 잡음에 강하고 복원이 쉬운 <b>디지털(나)이 압도적으로 유리</b>하지. (O)</span>
</div>

`
        },
        {
            "no": 15,
            "topic": "어림과 측정",
            "content": `
<div class="ans-correct-title">정답: ④ ㄴ, ㄷ</div>
<div class="concept-box"><div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div><div class="concept-content">어림(대충 찍기)은 과학 발전의 씨앗이야! 에라토스테네스도 어림으로 시작해서 지금의 정밀한 측정까지 발전해 온 거라고!</div></div>
<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item">
    <span class="fact-check-label">ㄴ.</span>
    <span class="fact-check-text">㉡은 정밀한 기기로 인공위성 등을 이용해 값을 알아낸 것이니 당연히 <b>측정</b>이 맞아. (O)</span>
</div>
<div class="fact-check-item">
    <span class="fact-check-label">ㄷ.</span>
    <span class="fact-check-text">현대 길이에 대한 국제 표준은 진공에서의 <b>빛의 속력(상수)</b>을 바탕으로 정의하고 있어. (O)</span>
</div>
<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지 팩트폭행! (함정 주의)</div>
    <div class="fact-check-item">
        <span class="wrong-fact-label">ㄱ.</span>
        <span class="fact-check-text">측정 장비가 정밀해져도 가설을 세우거나 일상생활을 할 때 <b>어림의 가치는 절대 소멸되지 않아.</b> 여전히 매우 중요하지! (X)</span>
    </div>
</div>
`
        },
        {
            "no": 16,
            "topic": "시공간의 규모",
            "content": `
<div class="ans-correct-title">정답: ③ ㄱ, ㄴ</div>
<div class="concept-box"><div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div><div class="concept-content">미시(눈에 안 보이는 작은 세상)부터 거시(우주급 큰 세상)까지! 10의 거듭제곱이 아니면 우리는 이 크기들을 감당할 수가 없어.</div></div>
<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item">
    <span class="fact-check-label">ㄱ.</span>
    <span class="fact-check-text">원자나 세포(가, 나)는 우리 눈에 보이지 않을 만큼 작은 <b>미시 세계</b>야. (O)</span>
</div>
<div class="fact-check-item">
    <span class="fact-check-label">ㄴ.</span>
    <span class="fact-check-text">오른쪽(다, 라)으로 갈수록 지구, 은하니까 공간의 규모가 <b>거시 세계</b>로 엄청나게 커지고 있지. (O)</span>
</div>
<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지 팩트폭행! (함정 주의)</div>
    <div class="fact-check-item">
        <span class="wrong-fact-label">ㄷ.</span>
        <span class="fact-check-text">(가) 원자 내부 같은 미세 구조를 보려면 빛 대신 전자를 쏘는 <b>전자 현미경</b>을 써야 해. 광학 현미경으로는 세포까지만 보여! (X)</span>
    </div>
</div>
`
        },
        {
            "no": 17,
            "topic": "표준의 확립",
            "content": `
<div class="ans-correct-title">정답: ⑤ ㄱ, ㄴ, ㄷ</div>
<div class="concept-box"><div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div><div class="concept-content">길이의 기준이 지구 자오선에서 미터원기(쇳덩이)로, 그리고 마침내 우주 어디서나 똑같은 '빛의 속력'으로 진화했어!</div></div>
<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item">
    <span class="fact-check-label">ㄱ.</span>
    <span class="fact-check-text">자오선 분할(가)이라는 인위적 기준에서, 우주 보편적인 법칙인 <b>빛의 속력(나)</b>으로 측정 표준이 진화한 거야. (O)</span>
</div>
<div class="fact-check-item">
    <span class="fact-check-label">ㄴ.</span>
    <span class="fact-check-text">과거나 현재나 모두 <b>'길이의 측정 표준'</b>을 확립하기 위해 노력한 방법들이지. (O)</span>
</div>
<div class="fact-check-item">
    <span class="fact-check-label">ㄷ.</span>
    <span class="fact-check-text">(나)는 빛이 진행한 시간을 바탕으로 거리를 재니까, 이걸 구현하려면 <b>초정밀 시간 측정 기술</b>이 무조건 먼저 있어야 해. (O)</span>
</div>

`
        },
        {
            "no": 18,
            "topic": "어림과 측정",
            "content": `
<div class="ans-correct-title">정답: ③ ㄱ, ㄷ</div>
<div class="concept-box"><div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div><div class="concept-content">과학에서 거시적 규모란 공간뿐만 아니라 '수백만 년' 같은 엄청난 시간 규모도 포함돼. 그래프의 가로축을 잘 봐!</div></div>
<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item">
    <span class="fact-check-label">ㄱ.</span>
    <span class="fact-check-text">가로축 단위가 $10^6$년(백만 년)이니까, 이건 인간이 체감할 수 없는 <b>거시적 시간 규모</b>가 맞아. (O)</span>
</div>
<div class="fact-check-item">
    <span class="fact-check-label">ㄷ.</span>
    <span class="fact-check-text">그래프를 보면 20(백만 년) 동안 1000km를 이동했어. $100,000,000cm / 20,000,000년 = 5cm/년$. 정확해! (O)</span>
</div>
<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지 팩트폭행! (함정 주의)</div>
    <div class="fact-check-item">
        <span class="wrong-fact-label">ㄴ.</span>
        <span class="fact-check-text">km는 SI 단위계에서 허용하긴 하지만 <b>기본 단위는 '미터(m)'</b>야! km는 접두어가 붙은 유도 단위 느낌이지. (X)</span>
    </div>
</div>
`
        },
        {
            "no": 19,
            "topic": "물리량과 단위",
            "content": `
<div class="ans-correct-title">정답: ⑤ B</div>
<div class="concept-box"><div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div><div class="concept-content">헷갈리지 마! 광년(ly)은 '빛이 1년 동안 날아간 거리'니까 길이 단위고, 속력이나 힘은 기본량들이 뭉쳐서 만들어진 '유도량'이야!</div></div>
<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item">
        <span class="fact-check-label">B</span>
        <span class="fact-check-text">질량의 기본 단위는 g이 아니고, kg이라는 거 잊지마! (O)</span>
    </div>
<div class="fact-check-item">
    <span class="fact-check-label">C</span>
    <span class="fact-check-text">km/h는 기본량인 거리의 단위 km를 기본량인 시간의 단위 h로 나눠서 만들어진 <b>'유도량'</b>이 확실해. 잘 알지! (O)</span>
</div>
<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지 팩트폭행! (함정 주의)</div>
    <div class="fact-check-item">
        <span class="wrong-fact-label">A</span>
        <span class="fact-check-text">광년(ly)은 시간의 단위가 아니라 빛이 1년 동안 이동한 <b>거리(길이)의 단위</b>야. 속지 마! (X)</span>
    </div>
</div>
`
        },
        {
            "no": 20,
            "topic": "어림과 측정",
            "content": `
<div class="ans-correct-title">정답: ①</div>
<div class="concept-box"><div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div><div class="concept-content">변인 통제 훈련! 길이만 바꿨을 땐 주기가 변했는데 질량만 바꿨을 땐 주기가 그대로네? 그럼 주기는 오직 '길이'랑만 썸타는 거지!</div></div>
<div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
<div class="fact-check-item">
    <span class="fact-check-label">①</span>
    <span class="fact-check-text">실험 결과를 보면 질량은 주기에 1도 영향을 못 주고, 길이에 의해서만 주기가 변했어. 그러니까 진자의 주기는 질량과 무관하고 <b>길이에 의해 결정된다</b>가 완벽한 가설이지! (O)</span>
</div>
<div class="wrong-fact-section">
    <div class="wrong-fact-title">🚨 오답 선지 팩트폭행! (함정 주의)</div>
    <div class="fact-check-item">
        <span class="wrong-fact-label">⑤</span>
        <span class="fact-check-text">이 실험은 측정 오차를 줄이는 게 목표가 아니라, 변인이 주기에 미치는 영향을 밝히는 탐구 과정이야. 핀트가 어긋났어. (X)</span>
    </div>
</div>
`
        }
    ]
};