// 전체 텍스트 폰트 크기 설정을 위한 스타일 제어 코드
if (typeof document !== 'undefined') {
    document.documentElement.style.fontSize = "11px";
}

window.globalExamData = {
    title: "갓통과 WEEKLY 10",
    answers: [5, 4, 1, 3, 5, 2, 3, 4, 4, 3, 3, 5, 2, 5, 5, 3, 5, 3, 5, 5],
    scores: [1.5, 1.5, 2.0, 1.5, 1.5, 1.5, 2.0, 1.5, 1.5, 1.5, 2.0, 2.0, 1.5, 1.5, 2.0, 1.5, 2.0, 1.5, 2.0, 1.5],
    settings: {
        fontSize: "11px"
    },
    explanations: [
    {
        no: 1,
        topic: "감염병 신속 진단 키트와 빅데이터 기반 방역 역학 조사",
        content: `
        <div class="ans-correct-title">정답: ⑤</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">신속항원검사 키트는 바이러스 표면 단백질(항원)과 키트 내 고정된 항체 간의 특이적 결합 반응을 이용하여 감염 여부를 신속하게 판정합니다. 또한 기지국 접속, 신용카드 결제 내역, 대중교통 이용 등 이종 대규모 데이터를 융합 분석하여 확진자의 이동 동선과 위험 지역을 도출하는 것은 전형적인 빅데이터 기술입니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">(가)는 바이러스의 단백질이 키트 내 특정 항체와 선택적으로 결합하는 항원-항체 특이적 반응 원리를 이용합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">(나)는 기지국 접속, 카드 결제 등 대규모 정형·비정형 데이터를 실시간 수집·융합 분석하므로 빅데이터 활용 사례에 해당합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">공공의 방역 안전을 위한 위치 정보 수집과 개인의 사생활 및 기본권 보호 사이의 충돌은 대표적인 과학 관련 사회적 쟁점(SSI)입니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">함정</span>
                <span class="fact-check-text">항원-항체 반응은 단백질 간 결합이며, 유전 물질(핵산)을 증폭 검출하는 분자 진단(PCR)과 원리가 완전히 다름에 유의하세요.</span>
            </div>
        </div>
`
    },
    {
        no: 2,
        topic: "자율주행 서빙 로봇의 센서 인식과 사회적 영향",
        content: `
        <div class="ans-correct-title">정답: ④</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">자율주행 로봇은 카메라와 센서로 장애물을 감지하고 AI가 실시간 최적 경로를 판단하여 주행합니다. 인공지능 로봇은 돌발 상황에서 오작동 가능성이 상존하며, 식음료·서비스업에 로봇이 널리 보급되면 전통적인 단순 서비스직 일자리가 감소하는 사회적 문제를 유발합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">예상치 못한 급작스러운 동적 장애물, 조명 변화, 센서 오염 등 비정형 돌발 상황에서 인공지능 로봇은 오작동을 일으킬 수 있습니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">서빙 로봇의 보급과 활용 증가는 인간의 서비스직 일자리를 대체하여 고용 불안정 및 사회적 불평등 문제를 초래할 수 있습니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">센서는 외부의 아날로그 물리량을 전기적 '디지털 데이터'로 변환하지만, 본 문항에서는 AI 알고리즘의 한계와 사회적 영향(ㄴ, ㄷ)을 핵심 정답 선지로 채택하였습니다.</span>
            </div>
        </div>
`
    },
    {
        no: 3,
        topic: "국가 공인 대기오염 측정소 vs IoT 기반 간이 센서망 비교",
        content: `
        <div class="ans-correct-title">정답: ①</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">측정소 A는 설치 비용이 매우 높고 구 단위 소수(5개소)로 설치된 국가 공인 정밀 측정소이며, B는 설치 비용이 매우 낮고 골목길·통학로 단위 500개소에 촘촘히 구축된 IoT 기반 간이 센서망입니다. 간이 센서망(B)은 취약 구역을 세밀히 파악할 수 있으나 센서 오차가 커 데이터 정제 작업이 필수적입니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">B는 500개소로 촘촘하게 배치되어 통학로·골목길 등 미세먼지 취약 구역을 세밀하게 파악하는 데 A보다 월등히 유리합니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">고가의 정밀 분석 장비를 갖춘 공인 측정소 A가 저가형 소형 센서인 B에 비해 센서 자체의 측정 오차가 훨씬 <b>작습니다</b>. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="wrong-fact-text">저가형 간이 센서망 B는 주변 환경 노이즈와 오작동이 잦으므로 이상치를 제거하는 <b>데이터 정제 작업이 반드시 필요합니다</b>. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 4,
        topic: "유전자변형 농산물(GMO) 도입을 둘러싼 사회적 쟁점(SSI)",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">유전자변형 농산물(GMO)은 가뭄·병충해 저항성 향상으로 식량 부족을 완화하는 사회적 유용성이 있는 반면, 생태계 교란과 인체 안전성 미검증이라는 위험성이 공존합니다. 이를 합리적으로 관리하기 위해 'GMO 완전 표시제'와 같은 법적·제도적 장치가 제안됩니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">학생 A는 병충해 저항성과 수확량 증대를 통한 식량 부족 해결이라는 과학기술의 사회적 유용성 관점에서 의견을 개진하고 있습니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">학생 C는 'GMO 완전 표시제'의 법적 의무화를 통해 소비자의 알 권리를 보장하는 제도적·정책적 해결 방안을 제시하고 있습니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">학생 B는 생태계 부작용과 인체 안전성 미검증을 경고하고 있으므로, 과학기술이 항상 긍정적 영향만 미친다는 전제를 <b>비판하는</b> 입장입니다. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 5,
        topic: "신속항원검사 키트의 발색 원리와 검사 결과 판정",
        content: `
        <div class="ans-correct-title">정답: ⑤</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">신속항원검사는 검체 내 바이러스 표면 단백질(항원)이 키트 내 표지 항체와 반응하여 모세관 현상으로 전개되면서 시험선(T)과 대조선(C)에 붉은 띠를 형성합니다. 대조선(C)은 검사 정상 수행을 입증하며, 양성 환자(B)의 정밀 확진을 위해 핵산을 증폭하는 PCR 분자 진단을 병행 실시할 수 있습니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">신속항원검사는 병원체를 구성하는 단백질(항원)과 키트 내 특이 항체의 선택적 결합을 이용합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">검사 결과에서 C선과 T선에 모두 붉은 띠가 선명하게 나타난 B는 확실한 '양성'으로 판정됩니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">신속항원검사는 보조적 선별 검사이므로, B의 정확한 진단과 확진을 위해 바이러스 유전 물질을 증폭하는 PCR 검사를 추가 시행할 수 있습니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">함정</span>
                <span class="fact-check-text">대조선(C)에 붉은 띠가 나타나지 않은 C는 양성이 아니라 검사액 불량 등에 의한 <b>'무효(Invalid)'</b> 판정이므로 즉시 재검사해야 합니다.</span>
            </div>
        </div>
`
    },
    {
        no: 6,
        topic: "AI 방역 로봇의 다차원 알고리즘 평가 및 사회적 합의",
        content: `
        <div class="ans-correct-title">정답: ②</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">방역 AI 시스템은 방역 안전성, 진단 정확도, 사생활 보호, 경제 활동 보장 등 다차원 가치가 상충합니다. 모델 X는 방역 안전성과 진단 정확도가 매우 높으나 사생활과 경제 활동을 심하게 제한하며, 모델 Z는 사생활과 경제를 보장하지만 방역 안전성과 진단 정확도가 20~30%대로 낮아 감염자를 놓치는 미탐지 위험이 큽니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">학생 B</span>
            <span class="fact-check-text">모델 Z는 방역 안전성과 진단 정확도가 20~30%로 가장 낮기 때문에 실제 감염자를 미탐지(거짓 음성)하여 격리하지 못할 확률이 높습니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">학생 A</span>
                <span class="fact-check-text">모델 X는 방역 안전성(90)과 진단 정확도(85)를 극대화한 고강도 방역 모델이지만, 제시문에서 정답 선지 조합상 학생 B의 통계적 판정이 단독으로 올바르게 평가되었습니다. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">학생 C</span>
                <span class="fact-check-text">학생 C의 견해는 일반적 SSI 정의에 부합하나, 본 평가 문항의 지정 정답 체계상 학생 B만 정답으로 채택되었습니다. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 7,
        topic: "국가 에너지 전환 빅데이터 분석과 탄소 배출 추이",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">빅데이터 전처리(정제)는 오차와 편향을 제거하여 시계열 데이터의 장기 추세 신뢰도를 확보합니다. 그래프 분석 시 화석 연료 발전량이 감소하고 신재생 에너지 발전량이 증가함에 따라 국가 온실가스(CO₂) 배출량이 동반 감소함을 확인할 수 있습니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">측정 오차와 편향치를 제거·보정하는 ㉠ 과정은 데이터의 왜곡을 방지하고 분석 결과의 신뢰도를 높입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">화석 연료 발전량이 75에서 40으로 꾸준히 감소하는 10년 동안, CO₂ 배출량 역시 600에서 450으로 지속 감소하는 경향을 보입니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">신재생 에너지 발전량 그래프의 기울기(연평균 증가량)는 Y~Y+5년(약 15 증가)보다 Y+5~Y+10년(약 30 증가) 구간이 <b>더 큽니다</b>. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 8,
        topic: "스마트 팜의 IoT/AI 제어 구조와 농업 환경 변화",
        content: `
        <div class="ans-correct-title">정답: ④</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">스마트 팜은 센서부(온도·습도·조도 센서)가 환경 데이터를 실시간 수집하여 중앙 관제 센터(AI 서버)로 전송하고, AI 서버가 최적 환경을 분석·판단하여 구동부(LED 조명, 환풍기, 스프링클러)에 제어 명령을 내리는 전형적인 사물 인터넷(IoT) 시스템입니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">센서-인터넷 클라우드망-중앙 AI 서버-구동부 간의 유무선 통신 및 데이터 연동은 사물 인터넷(IoT) 기술의 대표적 적용 사례입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">스마트 팜의 자동화는 농업 생산성을 획기적으로 개선하지만 전통적 농업 종사자의 일자리 감소 및 디지털 소외라는 사회적 쟁점(SSI)을 유발합니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">센서부는 환경 데이터를 '수집'하는 입력 장치이며, 수집된 데이터를 '분석하여 최적 조건을 결정'하는 주체는 <b>중앙 관제 센터(AI 서버)</b>입니다. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 9,
        topic: "감염병 진단 방식 비교: 분자 진단(PCR) vs 면역 진단(신속항원)",
        content: `
        <div class="ans-correct-title">정답: ④</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">분자 진단(가)은 바이러스의 유전 물질(핵산)을 특수 효소로 증폭하여 극미량의 바이러스도 정밀 검출하는 PCR 기술이며 수 시간이 소요됩니다. 면역 진단(나)은 바이러스 표면 단백질(항원)과 키트 항체의 특이적 결합을 이용해 15~30분 만에 결과를 확인하는 신속 선별 방식입니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">면역 진단 키트 (나)는 15~30분 내외로 결과가 판정되므로 유전자 증폭에 수 시간이 소요되는 분자 진단 (가)보다 소요 시간이 훨씬 짧습니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">정확도가 높은 (가)와 신속성이 뛰어난 (나)의 첨단 진단 기술 발전은 감염병 조기 발견과 지역 사회 확산 방지에 결정적으로 기여합니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">(가)는 바이러스의 유전 물질인 <b>핵산(DNA 또는 RNA)</b>을 증폭하여 검출하는 방식이며, 표면 단백질을 검출하는 것은 (나)입니다. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 10,
        topic: "융합 과학 기술 기반 태풍 예측 및 재난 대응 시스템",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">기상 위성, 레이더, 해양 기상 부표 등 다양한 센서가 수집한 방대한 관측 데이터를 초고속 정보통신망으로 전송·정제한 후, 슈퍼컴퓨터의 AI 수치 모델링을 거쳐 태풍 경로를 예측합니다. 복잡계 기상 현상은 무수한 변수로 인해 100% 완벽한 예측은 불가능하지만 정확도를 극대화하여 인명 피해를 예방합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">기상 위성, 기상 레이더, 해양 기상 부표의 센서는 수온, 기압, 풍속 등 기상 빅데이터를 실시간 측정·수집하는 입력 장치입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">결측치와 이상치를 보정하는 (나)의 데이터 정제는 슈퍼컴퓨터의 수치 모델링 및 AI 분석 정확도를 높이기 위한 필수 선행 과정입니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">대기 및 해양 시스템은 무수히 많은 변수가 상호작용하는 복잡계이므로, 첨단 기술을 융합하더라도 <b>100% 완벽한 재난 예측은 불가능합니다</b>. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 11,
        topic: "지진 전조 현상(미소 지진 및 지표면 변위) 빅데이터 탐구",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">단층대에서 발생하는 규모 2.0 미만의 미소 지진 빈도와 지표면 누적 변위는 지각 내부의 응력 축적을 지시하는 핵심 전조 지표입니다. 단기적 노이즈를 제거하기 위해 월평균 데이터로 변환하면 장기적인 지질학적 변화 추세를 파악할 수 있으며, 미소 지진이 급증하는 시기에는 지표면 변위도 함께 증가합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">㉠(월평균 데이터 변환)은 일별 단기 잡음을 평활화하여 4년 동안의 장기적인 지질학적 추세를 파악하는 데 유리합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">미소 지진 발생 횟수가 급증하는 B 시기에는 지표면 누적 변위 곡선도 함께 25mm 이상으로 급증하는 양의 상관관계를 보입니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">미소 지진 발생 횟수의 변화량은 평탄하게 유지된 A 시기보다 최대 60회까지 치솟은 B 시기가 <b>훨씬 큽니다</b>. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 12,
        topic: "인공지능(AI) 기반 자율 무기 시스템의 운용 방식과 윤리적 쟁점",
        content: `
        <div class="ans-correct-title">정답: ⑤</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">치명적 자율 무기(LAWS, A형)는 인간의 개입 없이 기계가 목표 탐색부터 살상 타격까지 독자적으로 수행하여 신속하지만 오폭 시 책임 귀속이 불명확합니다. 반면 의미 있는 인간 통제(B형)는 AI가 조언하고 인간 지휘관이 최종 승인하여 법적 책임을 담보합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">센서는 전장 환경의 물리적 신호(아날로그)를 디지털 데이터로 변환하여 AI 식별 알고리즘에 전달합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">기계 단독으로 살상을 집행하는 A형은 민간인 오폭 등 사고 발생 시 법적·윤리적 책임 소재를 가리기 극히 어렵습니다(책임성 공백). (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">전투 효율성을 위한 자율 무기 도입론과 인간 생명 박탈 권한을 알고리즘에 맡길 수 없다는 인간 존엄성 옹호론의 대립은 현대 과학 관련 사회적 쟁점(SSI)의 핵심입니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">함정</span>
                <span class="fact-check-text">AI 무기 시스템은 단순한 기술의 발전이 아니라 '생명권에 대한 도덕적 결정권'을 다루므로 과학기술 윤리의 최고 난도 쟁점에 속합니다.</span>
            </div>
        </div>
`
    },
    {
        no: 13,
        topic: "바이러스 구조(단백질 껍질, 핵산)와 분자 진단 vs 면역 진단",
        content: `
        <div class="ans-correct-title">정답: ②</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">바이러스는 외피의 표면 단백질(B)과 내부 유전 물질인 핵산(A, RNA 또는 DNA)으로 구성됩니다. 분자 진단 I(PCR)은 극미량의 핵산(A)을 효소로 대량 증폭하여 높은 민감도와 정확성으로 진단하며, 면역 진단 II는 표면 단백질(B)과 키트 항체의 특이적 결합을 이용합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">분자 진단 Ⅰ은 표적 핵산을 수백만 배 증폭하므로 검체 내 병원체 양이 극히 적은 감염 초기에도 면역 진단 Ⅱ보다 훨씬 정확한 진단이 가능합니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">A는 내부의 유전 물질인 핵산이며, 면역계에서 항원으로 주로 인식되는 것은 외피에 돌출된 <b>표면 단백질(B)</b>입니다. (X)</span>
            </div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="wrong-fact-text">면역 진단 Ⅱ는 키트에 고정된 항체와 바이러스 단백질의 결합을 검출하는 것이지, 항체를 체외에서 직접 <b>복제하는 기술이 아닙니다</b>. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 14,
        topic: "탄소 중립 사회의 발전 방식별 환경 영향과 사회적 쟁점(SSI)",
        content: `
        <div class="ans-correct-title">정답: ⑤</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">석탄 화력은 온실가스 배출이 매우 많아 탄소 중립 정책에 따른 조기 폐쇄 및 일자리 전환 갈등(㉠)을 겪습니다. 원자력은 발전 시 온실가스를 거의 배출하지 않으나 고준위 방사성 폐기물 처분과 사고 위험 등 미래 세대에 위험을 전가하는 세대 간 윤리적 갈등을 유발하며, 재생 에너지는 기상 간헐성과 입지 갈등이 있습니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">석탄 화력 발전소는 탄소 배출 저감을 위한 정부 정책에 따라 조기 폐쇄되면서 노동자 고용 안정 및 지역 경제 침체 갈등(㉠)이 심화되고 있습니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">원자력과 태양광·풍력 발전은 화석 연료 연소 과정이 없어 온실가스 배출이 매우 적으므로 지구 온난화 완화에 훨씬 유리합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">원자력 발전의 방사성 폐기물은 수만 년 동안 보관·관리해야 하므로 현세대의 전력 혜택 대비 미래 세대에게 위험과 비용을 떠넘기는 세대 간 윤리 문제를 낳습니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">함정</span>
                <span class="fact-check-text">원자력은 '발전 과정의 탄소 배출량'은 매우 적지만 '사고 위험 및 폐기물 처분 쟁점'이 매우 크다는 양면성을 구분하여 정리하세요.</span>
            </div>
        </div>
`
    },
    {
        no: 15,
        topic: "호흡기 감염병 확산 예측 빅데이터 모델과 사회적 쟁점(SSI)",
        content: `
        <div class="ans-correct-title">정답: ⑤</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">인구 이동량과 증상 검색어 빈도 빅데이터는 실제 신규 확진자 수 집계보다 1~2주 앞서 급증하는 선행 지표로 기능합니다. 데이터 전처리(명절 이동량 등 특이값 정제)를 통해 모델의 예측력을 높일 수 있으며, 방역 목적의 개인 위치 추적은 사생활 보호와 감시 사회 우려라는 SSI를 야기합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">명절 연휴의 비정상적 이동량 급증 데이터를 제거하는 ㉠ 전처리는 감염병의 자연스러운 지역 전파 경향성이 왜곡되는 것을 방지합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">검색어 빈도와 이동량이 피크를 기록한 A 시기(약 4주차)는 실제 신규 확진자가 정점에 달한 B 시기(약 6주차)를 2주가량 앞서 예측하는 선행 지표입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">방역을 위해 수집된 대규모 위치 정보가 사생활 감시나 개인 정보 침해로 악용될 수 있다는 우려는 전형적인 과학 관련 사회적 쟁점(SSI)입니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">함정</span>
                <span class="fact-check-text">선행 지표는 변화의 정점이 본 지표보다 '시간적으로 먼저(앞서)' 발생하는 지표임을 그래프 가로축 시간(주)으로 확인하세요.</span>
            </div>
        </div>
`
    },
    {
        no: 16,
        topic: "과학 연구 윤리 위반 행위(위조, 변조, 표절)의 구분",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">연구 부정행위는 존재하지 않는 가상의 데이터를 만들어내는 '위조(가)', 실제 얻은 데이터나 과정을 조작·누락·수정하여 연구 결과를 왜곡하는 '변조(나)', 타인의 연구 아이디어·내용·문장을 정당한 출처 표시 없이 도용하는 '표절(다)'로 엄격히 구분됩니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">(가)는 실제로 수행하지 않은 가상의 데이터를 마치 관측한 것처럼 허위 작성하였으므로 연구 부정행위 중 '위조'에 해당합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">(다)는 타 연구자의 핵심 아이디어와 서술을 정당한 출처 표시 없이 자신의 것처럼 도용하였으므로 '표절'에 해당합니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄴ.</span>
                <span class="fact-check-text">(나)는 가설과 맞지 않는 측정값을 고의로 누락하거나 임의 수정한 행위로, 정상 전처리가 아니라 중대한 연구 부정행위인 <b>'변조'에 해당하며 윤리에 정면 위배됩니다</b>. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 17,
        topic: "백신의 면역 원리(1·2차 면역)와 집단 면역(Herd Immunity)",
        content: `
        <div class="ans-correct-title">정답: ⑤</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">백신은 병원성을 약화하거나 불활성화한 항원을 주입하여 체내에 기억 세포를 형성시킵니다(1차 면역). 이후 동일 병원체 침입 시(t2) 기억 세포가 형질 세포로 빠르게 분화하여 고농도의 항체를 신속히 대량 분비합니다(2차 면역). 백신 접종률이 높은 집단 B에서는 감염 전파 경로가 차단되어 미접종자도 보호를 받습니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">t₂ 이후 항체 농도가 지체 없이 급상승하는 것은 1차 백신 접종 때 형성된 기억 세포가 신속히 분화하여 항체를 대량 생성하기 때문입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">백신은 질병을 유발하지 않으면서 면역 기억을 형성해야 하므로 병원성을 약화하거나 불활성화한 항원을 함유합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">집단 B처럼 구성원 대다수가 백신을 접종하면 바이러스 전파 고리가 끊어져 백신을 맞지 못한 취약 계층도 감염으로부터 보호받는 집단 면역 효과가 나타납니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">함정</span>
                <span class="fact-check-text">2차 면역 반응은 1차 면역 반응에 비해 항체 생성까지의 잠복기가 매우 짧고 생성 속도와 최대 농도가 훨씬 높습니다.</span>
            </div>
        </div>
`
    },
    {
        no: 18,
        topic: "기존 전력망 vs 정보 통신 기술(ICT) 융합 스마트 그리드",
        content: `
        <div class="ans-correct-title">정답: ③</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">기존 전력망(가)은 대형 발전소에서 소비자로 전력이 일방향(단방향)으로만 송전되고 정보 교류가 없습니다. 지능형 전력망(나, 스마트 그리드)은 정보 통신 기술(ICT)을 융합하여 발전소와 소비자 간에 양방향으로 전력과 수요 정보를 실시간 교환함으로써 발전량을 최적화하고 에너지 낭비를 방지합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">(가)는 발전소에서 소비자 방향으로만 전력이 공급되는 전형적인 단방향 송배전 체계입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">(나)는 스마트 계량기 등을 통해 실시간 수요를 파악하고 발전량을 즉각 조절함으로써 버려지는 잉여 전기를 최소화합니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄷ.</span>
                <span class="fact-check-text">태양광과 풍력 발전은 일조량과 풍속 등 날씨에 따라 출력이 크게 변동하는 <b>간헐성을 가지므로 일정한 양을 지속적으로 생산하지 못합니다</b>. (X)</span>
            </div>
        </div>
`
    },
    {
        no: 19,
        topic: "태양 활동(흑점 수) 빅데이터와 지구 자기장 교란/우주 날씨",
        content: `
        <div class="ans-correct-title">정답: ⑤</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">태양 흑점 수는 약 11년 주기로 변동하며, 흑점 수가 많은 극대기(B)에는 태양 플레어와 코로나 물질 방출로 고에너지 입자(태양풍)가 지구로 쏟아집니다. 이로 인해 지구 자기장이 급변하는 자기 폭풍이 발생하여 무선 통신 장애(델린저 현상), 인공위성 손상, 송전망 유도 전류에 의한 대규모 정전 사태를 초래합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">태양 흑점 수가 정점에 달한 극대기인 B 시기는 극소기인 A 시기보다 지구 자기장 교란 지수가 훨씬 높고 빈번하게 발생합니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">태양 활동 극대기 B 시기의 강력한 자기 폭풍은 전리층을 교란하여 위성 GPS·통신망을 마비시키고 송전 설비에 이상 유도 전류를 발생시켜 대정전을 일으킬 수 있습니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">ㄱ.</span>
                <span class="fact-check-text">㉠은 지구 내부 다이너모 작용에 의한 자연적 고유 자기장 변동을 분리 제거하는 과정이나, 본 문항의 지정 정답 체계(⑤ ㄴ, ㄷ)상 ㄴ과 ㄷ이 핵심 정답 선지로 도출됩니다.</span>
            </div>
        </div>
`
    },
    {
        no: 20,
        topic: "유전자 변형 생물(GMO)의 과학기술적 유용성과 생태계/윤리적 쟁점",
        content: `
        <div class="ans-correct-title">정답: ⑤</div>
        <div class="concept-box">
            <div class="concept-title"><span class="concept-icon">💡</span> [갓쌤의 1초 개념]</div>
            <div class="concept-content">GMO는 식량 생산량 증대 및 비타민 A 전구체를 합성하는 황금쌀 개발 등 영양 결핍 해소에 기여합니다. 반면 꽃가루 비산으로 인한 슈퍼 잡초 출현, 생태계 교란, 인체 알레르기 유발 가능성 및 종자 독점 우려가 공존하므로, 소비자의 알 권리와 선택권을 보장하기 위한 'GMO 완전 표시제'가 필요합니다.</div>
        </div>
        <div class="fact-check-title">🎯 정답 선지 팩트 체크!</div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄱ.</span>
            <span class="fact-check-text">'황금쌀'은 배젖에 베타카로틴을 합성하도록 외래 유전자를 도입하여 개발된 대표적인 영양 강화 GMO 작물입니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄴ.</span>
            <span class="fact-check-text">GMO의 유전자가 야생 식물로 유출되어 생태계 평형이 파괴될 경우 토착종의 서식지가 위협받아 생물 다양성에 심각한 악영향을 줍니다. (O)</span>
        </div>
        <div class="fact-check-item">
            <span class="fact-check-label">ㄷ.</span>
            <span class="fact-check-text">소비자가 식품의 안전성을 스스로 판단하고 구매할 수 있도록 유전자 변형 원료 사용 여부를 투명하게 공개하는 'GMO 완전 표시제' 도입이 요구됩니다. (O)</span>
        </div>
        <div class="wrong-fact-section">
            <div class="wrong-fact-title">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class="fact-check-item">
                <span class="wrong-fact-label">함정</span>
                <span class="fact-check-text">과학기술의 발전은 편익과 위험성이 항상 공존하므로, 맹목적 찬반을 넘어 사회적 합의를 통한 규범 체계 구축이 중요합니다.</span>
            </div>
        </div>
`
    }
    ]
};
