// 전체 텍스트 폰트 크기 설정을 위한 스타일 제어 코드 (렌더링 시 적용 권장)
if (typeof document !== 'undefined') {
    document.documentElement.style.fontSize = "13px";
}

window.globalExamData = {
    title: "2028 대수능 예시문항 (통합과학)",
    settings: {
        fontSize: "13px"
    },
    explanations: [
        {
            no: 1,
            topic: "환경 변화와 생태계",
            content: `
                <b style="color: red;">정답: ③ (ㄱ, ㄷ)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                반가워! 드디어 첫 번째 문제구나. 생태계 평형에 영향을 미치는 환경 변화에 대한 문제네. (가)는 쓰레기니까
                <b>환경 오염</b>, (나)는 뉴트리아니까 <b>외래 생물 유입</b>이겠지?<br><br>
                <b>[오답 피하기]</b><br>
                <span class="text-blue-600">ㄱ.</span> (가)는 환경 오염 맞아요. (O)<br>
                <span class="text-blue-600">ㄴ.</span> (나)는 외래 생물 유입으로 인한 생태계 교란이야. 천연기념물 지정은 말이 안 되지! 퇴치해야 해. (X)<br>
                <span class="text-blue-600">ㄷ.</span> ㉠지구 온난화로 이끼 서식지가 사라지는 건 기온 상승 때문이지. (O)<br>
                <br><br>
                <b>[핵심]</b> 이 문제처럼 환경 변화의 원인과 그에 따른 생태계의 변화를 연결하는 문제는 자주 출제돼. 특히 지구 온난화는 
                <span class="highlight-yellow">기온 상승 → 빙하 감소 → 서식지 파괴</span>로 이어지는 흐름을 꼭 기억해 두렴!.
            `
        },
        {
            no: 2,
            topic: "측정 표준의 역사",
            content: `
                <b style="color: red;">정답: ⑤ (ㄱ, ㄴ, ㄷ)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                길이의 표준이 어떻게 변해왔는지 묻는 문제야. 순서는 <b>지구(C) → 금속 원기(A) → 빛(B)</b> 순서야.<br><br>
                <span class="text-blue-600">ㄱ.</span> 금속(A)은 온도에 따라 수축/팽창하니까 길이가 변해. 그래서 바뀐 거야. (O)<br>
                <span class="text-red-500">ㄴ.</span> 빛의 속력은 일정한데, 거리를 '시간'으로 정의하려면 시간을 아주 정밀하게 재야겠지? (O)<br>
                <span class="text-blue-600">ㄷ.</span> 지구 자오선(C) → 미터원기(A) → 빛의 속력(B). 순서 완벽해! (O)<br>
                <b>[핵심]</b> 과학 기술이 발달하면서 점점 더 <span class="highlight-yellow">'변하지 않는 기준'</span>을 찾아온 역사라고 이해하면 돼!
            `
        },
        {
            no: 3,
            topic: "물질의 밀도",
            content: `
                <b style="color: red;">정답: ⑤ (ㄱ, ㄴ, ㄷ)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                밀도 = <div class="fraction"><span>질량</span><span class="fdn">부피</span></div> 공식만 알면 끝!<br>
                길이, 질량, 시간, 전류, 온도, 물질의 양, 광도는 SI 단위계의 7가지 기본량에 해당해.<br><br>
                <span class="text-blue-600">ㄱ.</span> 질량은 변하지 않는 고유한 양, <b>기본량</b> 맞아. (O)<br>
                <span class="text-blue-600">ㄴ.</span> 밀도는 질량과 길이에서 유도된 거야. (부피는 길이의 세제곱이니까!) (O)<br>
                <span class="text-blue-600">ㄷ.</span> 정육면체의 구리 부피는 1cm³이고 얘가 들어가서 눈금실린더의 눈금이 1mL 늘었지? 즉, 같은 부피네~ (O)
            `
        },
        {
            no: 4,
            topic: "규산염과 반도체",
            content: `
                <b style="color: red;">정답: ④ (ㄴ, ㄷ)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                지각의 대부분은 규소(Si)와 산소(O)로 된 <b>규산염 광물</b>이야. 그림은 규소-산소 사면체네.<br><br>
                <span class="text-red-500">ㄱ.</span> 사면체 중심에 있는 ⓑ가 규소(Si)이고, 주변 ⓐ가 산소(O)야. 반도체를 만드는 원소 X는 바로 ⓑ인 규소란다. (X)<br>
                <span class="text-blue-600">ㄴ.</span> ㉠(규산염)에 해당하지. (O)<br>
                <span class="text-blue-600">ㄷ.</span> 규소로 만든 소자, 태양 전지... 바로 <b>반도체</b> 이야기지! ㉡에 해당해. (O)<br><br>
                <b>[핵심]</b> 지각의 구성 성분인 규소가 현대 기술의 핵심인 반도체로 이어진다는 점을 이해하는 게 핵심이야. 지각의 주요 구성 원소와 규산염 사면체의 구조(규소 1개와 산소 4개!)를 꼭 머릿속에 넣어두렴!
            `
        },
        {
            no: 5,
            topic: "생물과 환경의 상호작용",
            content: `
                <b style="color: red;">정답: ② (ㄴ)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                개미가 곰팡이를 기르고, 곰팡이가 토양을 비옥하게 만든대.<br><br>
                <span class="text-red-500">ㄱ.</span> 개미(A)는 곰팡이를 먹거나 이용하는 <b>소비자</b>야. 생산자는 식물이지. (X)<br>
                <span class="text-blue-600">ㄴ.</span> 곰팡이(생물)가 토양(비생물)을 비옥하게 했으니 (생물→비생물) 영향을 미치는 예 맞아. (O)<br>
                <span class="text-red-500">ㄷ.</span> ㉡은 개미끼리 역할 분담하는 거야. 이건 '개체군 내 상호작용'이지 개체군 '사이'가 아니야. (X)<br><br>
                <b>[핵심]</b>
                <span class="highlight-yellow">'개체군'은 같은 종의 모임</span>이라는 걸 잊지 마! 같은 개미들끼리 역할을 나누는 건 개체군 내의 질서이고, 개미와 곰팡이처럼 서로 다른 종이 영향을 주고받는 게 개체군 사이의 상호작용이야.
            `
        },
        {
            no: 6,
            topic: "빅데이터 활용",
            content: `
                <b style="color: red;">정답: ⑤ (ㄱ, ㄴ, ㄷ)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                기온, 기압, 습도 데이터를 분석했네.<br><br>
                <span class="text-blue-600">ㄱ.</span> 오차나 편향된 값을 처리하는 <b>전처리</b> 과정은 분석 결과의 신뢰성을 확보하기 위해 필수적이야. (O)<br>
                <span class="text-blue-600">ㄴ.</span> 그래프 봐봐. A시기(여름) 습도가 B시기(겨울)보다 훨씬 높고 변화폭도 커. (O)<br>
                <span class="text-blue-600">ㄷ.</span> 기온(실선)이 낮아질 때 기압(점선)이 올라가는 경향이 보이네. (O)
                <br><br><b>[핵심]</b> 그래프 해석은 눈을 크게 뜨고 추세를 읽는 게 중요해!
            `
        },
        {
            no: 7,
            topic: "흡열 반응과 발열 반응",
            content: `
                <b style="color: red;">정답: ③</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                온도가 낮아졌다? 열을 흡수했다는 뜻이야(<b>흡열 반응</b>).<br>
                그럼 반대 사례(<b>발열 반응</b>)를 찾아야겠지?<br><br>
                (가) 흡열 반응은 주위의 열을 흡수하니까 온도가 낮아져. <br>
                (나) 발열 반응의 예시는? <b>세포 호흡</b>, 연소, 손난로 등이 있지.<br>
                ①번 보기는 (가)가 '에너지를 방출'한다고 했으니 틀렸어. 흡수야!<br>
                정답은 <b>③번</b>이네. 세포 호흡은 대표적인 발열 반응이니까.
                <br><br><b>[핵심]</b> 흡열과 발열의 개념을 정확히 구분하는 게 포인트야! 주위 온도가 내려가면 흡열, 올라가면 발열! 이것만 기억해도 절반은 성공이야.
            `
        },
        {
            no: 8,
            topic: "자연 선택",
            content: `
                <b style="color: red;">정답: ④ (ㄴ, ㄷ)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                큰가시고기의 외피 조각이 환경에 따라 달라지는 진화 이야기야.<br><br>
                <span class="text-red-500">ㄱ.</span> 같은 종인데 외피 모양이 다른 건 <b>유전적 다양성</b>이야. (X)<br>
                <span class="text-blue-600">ㄴ.</span> 해수(왼쪽)에서는 ㉠(완전형) 비율이 압도적으로 높지? 생존에 유리하단 뜻이야. (O)<br>
                <span class="text-blue-600">ㄷ.</span> 다윈의 자연 선택설에 따르면, 생존에 유리한 변이가 자손에게 전달되면서 진화가 일어나는 거야. (O)
                <br><br><b>[핵심]</b> 환경에 따라 어떤 형질이 '선택'되는지를 그래프로 읽어내는 게 핵심이야! 해수와 담수에서 우세한 형질이 서로 다르다는 점을 통해 자연 선택의 원리를 완벽하게 이해했길 바라.
            `
        },
        {
            no: 9,
            topic: "기후 변화와 질병",
            content: `
                <b style="color: red;">정답: ① (ㄱ)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                모기 개체수와 기온 그래프를 분석하는 거야.<br><br>
                <span class="text-red-600">ㄱ.</span> 말라리아는 병원체가 모기를 매개로 인체에 침입하여 발생하는 대표적인 감염병이야. (O)<br>
                <span class="text-red-500">ㄴ.</span> ㉠그래프는 연도가 지날수록 올라가는 경향인데, 개체수는 최저기온이 15도 넘을 때 폭증해. ㉠은 최저 기온이야. (X)<br>
                <span class="text-blue-600">ㄷ.</span> 예측된 그래프를 보면 5월부터 3주차부터 최저기온이 15도를 넘겨. 그럼 모기가 나오겠지? (X)
                <br><br><b>[핵심]</b> 그래프에서 기준 온도(15℃)를 어느 선이 먼저 넘는지를 정확히 찾아내는 게 핵심이야! 최저 기온이 생명 활동의 마지노선 역할을 한다는 점을 기억하면 실생활 데이터 분석도 문제없어.
            `
        },
        {
            no: 10,
            topic: "에너지 효율",
            content: `
                <b style="color: red;">정답: ② (A > C > B)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                공급된 에너지가 같을 때 전기 에너지 생산량? 즉, <b>효율</b>을 비교하라는 거야!<br><br>
                A(수력): 10MJ → 8MJ (<b>80%</b>)<br>
                B(태양광): 1kJ(=1000J) → 200J (<b>20%</b>)<br>
                C(화력): 20kJ/g(=20MJ/kg) → 8MJ 생산 (20분의 8 = <b>40%</b>)<br>
                순서는 <b>A(80) > C(40) > B(20)</b> 정답!
                <br><br><b>[핵심]</b> 단위(MJ, kJ)가 다르게 나올 때는 하나로 통일해서 비교하는 게 핵심이야! 수력 발전이 에너지 변환 과정이 단순해서 효율이 상당히 높다는 상식도 챙겨두면 좋겠지?
            `
        },
        {
            no: 11,
            topic: "별의 내부 구조",
            content: `
                <b style="color: red;">정답: ③ (ㄱ, ㄴ)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                별은 진화하면서 <span class="highlight-yellow">중심부로 갈수록 더 무거운 원소</span>를 만들어내지?<br>
                원소 판별: 바깥쪽부터 수소 → 헬륨 → X(탄소) → 산소 → Y(규소) → Z(철) 순서야. <br>
                <br>
                <span class="text-blue-600">ㄱ.</span> 태양은 중심부에서 탄소(X)까지만 만들 수 있는 별이야. 하지만 이 별은 철(Z)까지 만들어냈지? 철을 만드는 핵융합 반응이 일어나려면 태양보다 훨씬 높은 온도와 압력이 필요해. 따라서 이 별의 중심부 온도는 태양보다 훨씬 높단다. (O)<br>
                <span class="text-blue-600">ㄴ.</span> X(탄소, 14족)와 Y(규소, 14족)는 같은 족 원소 맞아. (O)<br>
                <span class="text-red-500">ㄷ.</span> 지구 전체 질량비는 철(Fe) > 산소 > 규소 순이야. Z(Fe)가 Y(Si)보다 많아. (X)
                <br><br><b>[핵심]</b> 별의 중심부에서 철(Fe)이 만들어졌다는 건, 그 별의 운명이 초신성 폭발 직전까지 왔다는 신호야! 철은 가장 안정적인 원소라 더 이상 핵융합을 하지 못하고 붕괴하게 되거든. 이 흐름을 기억하면 별의 일생 단원은 마스터할 수 있어!
            `
        },
        {
            no: 12,
            topic: "산화 환원 반응",
            content: `
                <b style="color: red;">정답: ① (ㄱ)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                <span class="highlight-yellow">이온 종류 찾기</span> : 이온 수가 안 변하면 음이온이고 구경꾼이라 해. 그러니까 동그라미(●)는 음이온(Cl<sup>-</sup>)<br>
                반응 전에 있던 양이온은 전자를 얻어 금속으로 바뀌면서 이온 수 감소~. 환원된다고 해. 누구야? 네모(■)가 반응 후 사라졌으니 요놈이 X 이온<br>
                반응 후 새로 나타난 양이온은 넣어 준 금속이 전자를 잃고 바뀐 거야. 산화된다고 해. 
                세모(▲)가 새로 생겼으니 요놈이 Y 이온~<br>
                <span class="highlight-yellow">이온 전하량 찾기</span> : (이온 수 × 이온 1개의 전하량)은 항상 일정<br>
                즉, X<sup>a+</sup>의 수 × a = Y<sup>b+</sup>의 수 × b = Cl<sup>-</sup>의 수 × 1 <br>
                → 이것을 <span class="red-pen">전하량 보존 법칙</span>이라고도 해~<BR>

                <span class="text-blue-600">ㄱ.</span> ●는 Cl<sup>-</sup>야. (O)<br>
                <span class="text-red-500">ㄴ.</span> 산화된 것은 맞는데 과정이 틀림. Y는 X에게 전자를 주고 산화된거지 산소를 얻어 산화된 것이 아니야. (X)<br>
                <span class="text-red-500">ㄷ.</span> X<sup>a+</sup>의 수 × a = Y<sup>b+</sup>의 수 × b<br>
                3 * a = 2 * b → a:b = 2:3. (X) <br>
                <br><br><b>[핵심]</b> 산화와 환원의 정의, 이온의 종류 구별하기, 이온의 전하량 찾는 법을 확실히 마스터 해야 해~
            `
        },
        {
            no: 13,
            topic: "우주 초기 원소",
            content: `
                <b style="color: red;">정답: ① (ㄱ)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                (가)는 수소:헬륨 질량비 3:1. 빅뱅 우주론의 증거지.<br>
                (나)에서 별 S의 흡수선 위치가 수소(㉠)와 헬륨(㉡)의 선 위치를 포함하는 것을 볼 수 있지? 
                
                <br><br>
                <span class="text-blue-600">ㄱ.</span> 수소(㉠)와 헬륨(㉡) 원자핵은 빅뱅 직후 아주 초기에 만들어졌지만, 전자가 결합하여 '중성 원자'가 된 것은 우주의 온도가 약 3000K로 낮아진 빅뱅 후 약 38만 년 때란다. 이때부터 빛이 직진하면서 우주 배경 복사가 방출되었지! (O)<br>
                <span class="text-red-500">ㄴ.</span> 헬륨(㉡)의 일부는 별의 핵융합으로 만들어지기도 하지만, 우주에 존재하는 헬륨의 대부분은 빅뱅 초기(빅뱅 후 약 3분) 핵융합을 통해 이미 만들어졌단다. 별 내부에서 만들어진 양은 전체에 비하면 아주 적은 부분이야. (X)<br>
                <span class="text-red-500">ㄷ.</span> 스펙트럼에 다른 선들도 보이지? 수소, 헬륨 말고 다른 원소도 있다는 뜻이야. (X)
                <br><br><b>[핵심]</b> 별의 스펙트럼을 분석하면 그 별이 언제쯤 태어났는지, 어떤 원소로 이루어져 있는지 다 알 수 있어.
            `
        },
        {
            no: 14,
            topic: "전자 배치",
            content: `
                <b style="color: red;">정답: ④ (ㄴ, ㄷ)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                전자 껍질 규칙을 적용해보자.<br>
                산소(O): 1껍질(2), 2껍질(6), 원자가 전자 수 6<br>
                <div class="fraction"><span>원자가 전자 수</span><span class="fdn">전자가 들어 있는 전자껍질 수</span></div>=3, 
                표에서 이게 9a라고 했으니, a = <div class="fraction"><span>1</span><span class="fdn">3</span></div>이 된단다! 
                X:  6a = 2야. 2주기 원소라면 원자가 전자가 4개인 탄소(C)이고, 3주기라면 원자가 전자가 6개인 황(S)인데 원자 번호 범위(7~17)를 고려하면 황(S)이네.<br>
                Y:  3a = 1이야. 3주기 원소인 알루미늄(Al)이란다. .<br>
                Z: a = <div class="fraction"><span>1</span><span class="fdn">3</span></div>이니까 나트륨(Na)이네.<br><br>
                <span class="text-red-500">ㄱ.</span> Z(Na)는 전자 1개를 잃어야 네온(Ne)의 전자 배치를 갖지. (X)<br>
                <span class="text-blue-600">ㄴ.</span> X(S)와 O가 만나면 SO<SUB>2</SUB>. 비금속끼리니까 <b>공유 결합</b> 맞아. (O)<br>
                <span class="text-blue-600">ㄷ.</span> Y(Al)와 O가 만나면 Al<sub>2</sub>O<sub>3</sub>. 이온 결합 물질은 액체에서 전기 통하지. (O)
                <br><br><b>[핵심]</b>이온 결합과 공유 결합의 차이를 명확히 아는 거야! <span class="highlight-yellow">'금속 + 비금속'</span>은 이온 결합(액체에서 전기 통함), <span class="highlight-yellow">'비금속 + 비금속'</span>은 공유 결합(전기 안 통함)!
            `
        },
        {
            no: 15,
            topic: "탄소 순환",
            content: `
                <b style="color: red;">정답: ③ (ㄱ, ㄴ)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                순환 그림 맞추기!<br>
                ㉠ (산호 골격 생성): 해수에 녹아 있는 탄산 이온이 산호(생물권)의 골격이 되는 과정이야. 따라서 A는 수권<br>
                ㉡ (석탄의 생성): 생물권의 유기물이 땅속에 묻혀 화석 연료가 되는 과정이지? 생물권에서 지권으로 이동하는 거니까 B는 지권<br>
                남은 C는 기권이 되겠네!<br><br>
                <span class="text-blue-600">ㄱ.</span> A는 수권 맞아.(O)<br>
                <span class="text-blue-600">ㄴ.</span> 침전으로 석회암(지권 B)이 되면 지권의 탄소량은 늘어나지. (O)<br>
                <span class="text-red-500">ㄷ.</span> 광합성은 기권(C)의 이산화 탄소를 생물권이 흡수하는 과정이지만 ⓐ는 생물권에서 기권(C)으로 나가는 방향인 ㉢ 과정에 있으므로 '호흡'이 들어가야 적절하단다! (×)
                <br><br><b>[핵심]</b>탄소 순환 문제는 <span class="highlight-yellow">'어디서 어디로'</span> 이동하는지 화살표 방향을 보는 게 제일 중요해! 광합성은 기권 → 생물권, 호흡은 생물권 → 기권!
            `
        },
        {
            no: 16,
            topic: "전자기 유도",
            content: `
                <b style="color: red;">정답: ① (ㄱ)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                이 실험은 자석의 세기(자석의 개수)에 따라 유도 전류의 세기가 어떻게 변하는지 알아보는 실험이야.<br><br>
                <span class="text-blue-600">ㄱ.</span> 자석 개수를 다르게 한 건 <b>자기장의 세기</b> 변화를 주기 위해서야. (O)<br>
                <span class="text-red-500">ㄴ.</span> N극을 아래로 하는 건 전류의 <b>방향</b>을 보기 위함이지 세기가 아냐. (X)<br>
                <span class="text-red-500">ㄷ.</span> 높이를 h로 같게 하는 이유는 자석이 코일에 진입할 때의 속도를 일정하게 유지하기 위해서야. 속도가 다르면 전류의 세기에 영향을 줄 수 있기 때문이지. 코일을 통과하며 전환되는 에너지양은 자석의 세기에 따라 달라지므로, 에너지를 같게 하려는 의도는 아니란다. (×)<br>
                <br><br><b>[핵심]</b>전자기 유도 실험에서 유도 전류를 강하게 하려면 
                <br><span class="highlight-yellow">1. 자석을 빨리 움직이거나, </span>
                <br><span class="highlight-yellow">2. 자석의 세기를 키우거나, </span>
                <br><span class="highlight-yellow">3. 코일을 더 많이 감아야 해! </span>
                <br>이 실험은 그중에서 '자석의 세기'를 변수로 둔 실험이라는 점을 꼭 기억하렴!
            `
        },
        {
            no: 17,
            topic: "지질 시대와 대륙 분포",
            content: `
                <b style="color: red;">정답: ⑤ (ㄴ, ㄷ)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                (가)는 대륙이 뭉쳐있는 판게아(고생대 말, 2.7억년 전).<br>
                (나)는 대륙들이 뿔뿔이 흩어지고 있는 중생대 이후의 모습(1억년 전)이야.<br><br>
                <span class="text-red-500">ㄱ.</span> 삼엽충은 고생대를 대표하는 표준 화석이야. (가) 시기(중생대) 지층엔 삼엽충 없지. (X)<br>
                <span class="text-blue-600">ㄴ.</span> 판게아 형성(가)과 분리(나) 사이에 페름기 대멸종이 있었어. 판게아 형성으로 인한 서식지 감소 등이 주요 원인이었지! (O)<br>
                <span class="text-blue-600">ㄷ.</span> (나) 시기 이후인 신생대 제4기에는 빙하기는 여러 차례의 빙하기와 간빙기가 반복되었어. (O)
                <br><br><b>[핵심]</b>지질 시대 문제는 <span class="highlight-yellow">표준 화석(삼엽충-고생대, 암모나이트-중생대, 매머드-신생대)과 대륙의 모양을 매칭</span>하는 게 핵심이야! 판게아가 보이면 일단 '고생대 말'이라고 생각하고 문제를 풀어나가면 아주 쉬워질 거야!
            `
        },
        {
            no: 18,
            topic: "충격량과 안전모",
            content: `
                <b style="color: red;">정답: ② (ㄷ)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                그래프 면적(충격량)은 같아. 안전모를 쓰면 시간(t)을 늘려서 힘(F)을 줄이는 원리야.<br><br>
                <span class="text-red-500">ㄱ.</span> <div class="fraction"><span>마네킹이 받은 충격량</span><span class="fdn">충돌 시간</span></div>은 
                마네킹이 받은 평균 힘을 의미해. 충격량(면적)이 일정할 때, 충돌 시간이 가장 짧은 A가 평균 힘(그래프의 높이)이 가장 크고, 충돌 시간이 가장 긴 C가 평균 힘이 가장 작단다.(X)<br>
                <span class="text-red-500">ㄴ.</span> 마네킹이 벽에 충돌하기 시작하면 힘을 받아 속력이 줄어들기 시작해. 즉, 충돌하는 동안 운동량은 계속 감소하다가 정지하는 순간 0이 된단다. 
                t<sub>1</sub>은 충돌이 한창 진행 중인 시점이므로 운동량이 가장 큰 상태가 아니야.(X)<br>
                <span class="text-blue-600">ㄷ.</span> C가 A보다 충격 시간 길어서 힘을 덜 받아. 더 안전해. (O)
                <br><br><b>[핵심]</b>충격량이 일정할 때, <span class="highlight-yellow">시간을 길게 하면 힘이 줄어든다</span>는 이 마법 같은 공식을 꼭 기억해! 
                안전모뿐만 아니라 멀리뛰기를 하고 착지할 때 무릎을 굽히는 것도 다 이 원리 덕분이야.
            `
        },
        {
            no: 19,
            topic: "DNA 구조",
            content: `
                <b style="color: red;">정답: ⑤ (ㄴ, ㄷ)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                A-T 짝꿍, G-C 짝꿍.<br>
                A(15)니까 T도 15개 필요해. 근데 T가 20개 있네? 15쌍 가능.<br>
                C(13)니까 G도 13개 필요해. G는 25개 있으니 13쌍 가능.<br>
                총 염기쌍 = 15 + 13 = 28쌍. 뉴클레오타이드는 56개.<br><br>
                <span class="text-red-500">ㄱ.</span> 핵산(DNA, RNA)의 기본 단위체는 염기가 아니라 뉴클레오타이드야.(X)<br>
                <span class="text-blue-600">ㄴ.</span> 뉴클레오타이드 56개니까 인산도 56개. (O)<br>
                <span class="text-blue-600">ㄷ.</span> 구아닌(G)이랑 결합한 건 사이토신(C) 13개 맞아. (O)
                <br><br><b>[핵심]</b>DNA 모형을 만들 때는 <span class="highlight-yellow">상보적 결합 규칙(A-T, G-C)</span>과 <span class="highlight-yellow">뉴클레오타이드 구성 비율(당:인산:염기=1:1:1)</span>을 꼭 맞춰야 해!
            `
        },
        {
            no: 20,
            topic: "수평 투사 운동",
            content: `
                <b style="color: red;">정답: ⑤</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                1. 지구에서의 운동 (기준)
                (1) 연직 방향: A와 B 모두 중력을 받아 <span class="red-pen">등가속도 운동</span>을 하므로, 시간이 지남에 따라 아래로 떨어지는 간격이 점점 넓어져.
                (2) 수평 방향: B는 수평 방향으로 힘을 받지 않아 <span class="red-pen">등속 직선 운동</span>을 하므로, 옆으로 이동하는 간격이 일정하단다.
                2. 중력이 작은 행성에서의 변화
                (1) 연직 방향 변화: 중력 가속도(g)가 작아지면 같은 시간 동안 떨어지는 거리가 줄어들어. 즉, 점들 사이의 세로 간격이 지구보다 좁아져야 해. 
                (2) 수평 방향 변화: 수평 속도(v<sub>0</sub>)는 행성의 중력과 상관없이 일정해. 따라서 옆으로 이동하는 가로 간격은 지구와 동일하게 유지되어야 한단다.
                <br><br><b>[핵심]</b><span class="highlight-yellow">수평 운동은 등속, 연직 운동은 중력</span>만 기억해!
            `
        },
        {
            no: 21,
            topic: "인체 구성 원소",
            content: `
                <b style="color: red;">정답: ① (ㄱ)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                W는 3주기 2족 원소 → 마그네슘(Mg)<br> 
                원자가 전자 수의 비 (X:Y:Z = 2:2:3)를 만족하는 경우는 2가지 가능<br>
                <span class="red-pen">CASE Ⅰ</span> : 원자가 전자 수가 X=2, Y=2, Z=3)<br>
                → W와 중복되므로 모순<br>
                <span class="red-pen">CASE Ⅱ</span> :  원자가 전자 수가 X=4, Y=4, Z=6)<br>
                원자 번호가 Y>Z이므로 Z는 산소(O), Y는 규소(Si), X는 탄소(C)야.<BR>
                인체 질량비: 산소 > 탄소 > 수소 > 질소<br>
                <br>
                <span class="text-blue-600">ㄱ.</span> Mg는 금속 원소 맞지. (O)<br>
                <span class="text-red-500">ㄴ.</span> ㉠(가장 많은 것)은 산소(Z)야. (X)<br>
                <span class="text-red-500">ㄷ.</span> 포도당(C6H12O6) 합성엔 CO<sub>2</sub>가 필요해.(X)
                <br><br><b>[핵심]</b>인체를 구성하는 원소의 질량비 순서인 <span class="highlight-yellow">'산-탄-수-질' (산소 > 탄소 > 수소 > 질소)</span>은 수능까지 가져가야 할 필수 암기 포인트야!
            `
        },
        {
            no: 22,
            topic: "판의 경계",
            content: `
                <b style="color: red;">정답: ③ (ㄱ, ㄴ)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                A와 B는 서로 멀어지네? <b>발산형 경계</b>.<br>
                B와 C는 가까워지네? <b>수렴형 경계</b>.<br><br>
                <span class="text-blue-600">ㄱ.</span> A-B는 발산형이니까 맨틀 상승 맞아. (O)<br>
                <span class="text-blue-600">ㄴ.</span> B가 C보다 동쪽으로 더 빨리 가니까 C는 서쪽으로 가는 것처럼 보여. (O)<br>
                <span class="text-red-500">ㄷ.</span> ㉡에서 B와 C가 충돌하면 밀도가 큰 B가 C아래로 섭입하면서 C에서 호상 열도가 생겨. (X)
            `
        },
        {
            no: 23,
            topic: "효소와 유전자",
            content: `
                <b style="color: red;">정답: ① (ㄱ)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                이 실험은 카탈레이스라는 효소를 만드는 유전자에 돌연변이가 생겼을 때, 효소의 기능(촉매 작용)이 어떻게 변하는지 알아보는 거야.<BR>
                <span class="red-pen">실험 결과 분석</span><br>
                시험관 I (㉠): 정상 카탈레이스<br>
                → 기포가 발생했으니 촉매 반응이 잘 일어난 거지. <br>
                시험관 II (㉡): CAU → CAC <br>
                → 표를 보면 둘 다 같은 아미노산을 지정해. 즉, 아미노산 서열이 변하지 않았으므로 ㉡은 정상 카탈레이스와 기능이 같아 기포가 '발생함'(b)이 된단다.<br>
                시험관 III, IV (㉢, ㉣): 코돈이 변해 아미노산이 △에서 □로 바뀌었어. 아미노산이 바뀌자 효소의 입체 구조가 변해 기능을 잃었고 기포가 생기지 않았지. <br>
                <br>
                <span class="text-blue-600">ㄱ.</span> 실험 I(정상)에선 과산화수소가 분해되서 물(H<sub>2</sub>O)과 산소(O<sub>2</sub>)가 발생해. (O)<br>
                <span class="text-red-500">ㄴ.</span> ⓑ는 <b>'발생함'</b>이야. (X)<br>
                <span class="text-red-500">ㄷ.</span> 실험 결과 ㉡처럼 돌연변이가 일어나도 기능을 잃지 않는 경우가 있었지? 따라서 가설 ⓐ는 '아미노산이 바뀌는 돌연변이가 일어나면 기능을 잃을 것이다'와 같이 더 구체적이어야 한단다. (X) <br>
                <br><br><b>[핵심]</b><span class="highlight-yellow">코돈이 바뀌어도 지정하는 아미노산이 같다면 효소의 기능은 유지된다</span>는 게 이 문제의 가장 큰 함정이자 핵심이야!
            `
        },
        {
            no: 24,
            topic: "중화 반응",
            content: `
                <b style="color: red;">정답: ④</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                이거 킬러 문제다!<br>
                <span class="red-pen">STEP1</SPAN> : (가)～(다)의 전체 부피 동일<BR>
                → 혼합 후 최고 온도 ∝ 생성된 물 분자 수<BR>
                <span class="red-pen">STEP2</SPAN> : 생성된 물 분자 수 구하기<br>
                (1) <span class="highlight-yellow">산성 용액</span>에서 <BR>
                <span class="highlight-blue">생성된 물 분자수 = 구경꾼 양이온 수</span><BR>
                → OH<sup>-</sup>는 장렬히 전사하여 물로 바뀌니까 짝꿍인 구경꾼 양이온 수가 생성된 물 분자수야.<br>
                (2) <span class="highlight-yellow">염기성 용액</span>에서<br> 
                <span class="highlight-blue">생성된 물 분자수 = 구경꾼 음이온 수</span><BR>
                → H<sup>+</sup>는 장렬히 전사하여 물로 바뀌니까 짝꿍인 구경꾼 음이온 수가 생성된 물 분자수야.<br>                
                (3) 중성 용액에서<br>
                <span class="highlight-blue">생성된 물 분자수 = 구경꾼 음이온 수 = 구경꾼 양이온 수</span><BR>
                → 아무거나 골라서 세면 됨<br>
                <span class="red-pen">STEP3</SPAN> : 이온 수 구하기<br>
                모든 양이온 수  = 모든 음이온 수<br>
                (1) <span class="highlight-yellow">산성 용액</span>에서 <br>
                <span class="highlight-blue">Cl<SUP>-</SUP>의 수 = Na<SUP>+</SUP>의 수 + K<SUP>+</SUP>의 수 + H<SUP>+</SUP>의 수</span><BR>
                → 모든 이온 수의 절반은 산의 구경꾼 이온 수<BR>
                → (가)는 4가지 양이온 수가 같은 비율로 존재하니까 산성 아님<br>
                (2) <span class="highlight-yellow">중성 용액</span>에서 <br>
                <span class="highlight-blue">Cl<SUP>-</SUP>의 수 = Na<SUP>+</SUP>의 수 + K<SUP>+</SUP>의 수</span><BR>
                → 이온 종류가 3가지니까 (가)가 될 수 없네. 그럼 (가)는 염기성이군~<BR>
                (3) <span class="highlight-yellow">염기성 용액</span>에서 <br>
                <span class="highlight-blue">OH<SUP>-</SUP>의 수 + Cl<SUP>-</SUP>의 수 = Na<SUP>+</SUP>의 수 + K<SUP>+</SUP>의 수</span><BR>
                <span class="red-pen">STEP4</SPAN> : 적용<br>
                (가) HCl 10, NaOH 15, KOH 30의 입자 수를 각각 3N이라 해볼까?<br>
                → 생성된 물 분자 수 = 구경꾼 음이온 수 = 3N<BR>
                (나) HCl 20(6N), NaOH 20(4N), KOH 15(1.5N)<BR>
                → 산성이므로 생성된 물 분자수 = 구경꾼 양이온 수 = 5.5N<BR>
                (다) HCl 25(7.5N), NaOH 15(3N), KOH 15(1.5N)<BR>
                → 산성이므로 생성된 물 분자수 = 구경꾼 양이온 수 = 4.5N<BR>
                온도 비교 : t<sub>2</sub> > t<sub>3</sub> > t<sub>1</sub><br>
                (가)는 OH<SUP>-</SUP>가 3N, (다)는  H<SUP>+</SUP>가 3N <BR>
                → 혼합하면 중성<br>
            `
        },
        {
            no: 25,
            topic: "엘니뇨와 라니냐",
            content: `
                <b style="color: red;">정답: ② (ㄴ)</b><br><br>
                <b>[1타 강사의 족집게 해설]</b><br>
                태평양 적도 부근 해역의 20℃ 등수온선 깊이는 혼합층의 두께를 의미해. 이를 통해 동태평양과 서태평양을 구분하는 게 핵심이야!<br>
                <span class="highlight-yellow">1. 해역 판별 (㉠, ㉡)</span><br>
                평상시에 서태평양은 따뜻한 바닷물이 모여 혼합층이 두껍고(20℃ 등수온선이 깊음), 동태평양은 용승 현상으로 혼합층이 얇아(20℃ 등수온선이 얕음).
                따라서 깊이가 더 깊은 ㉡이 서태평양, 상대적으로 얕은 ㉠이 동태평양이란다. <br>
                <span class="highlight-yellow">2. 시기 판별 (A, B)</span><br>
                (1) <span class="red-pen">A 시기</span>: 동태평양(㉠)의 등수온선 깊이가 평소보다 깊어졌지? 이건 무역풍이 약해져서 따뜻한 물이 동쪽으로 이동한 엘니뇨 시기라는 증거야.<br>
                (2) <span class="red-pen">B 시기</span>: 반대로 동태평양(㉠)의 깊이가 아주 얕아졌어. 이건 무역풍이 강해져서 용승이 활발해진 시기란다.<br><br>
                <span class="text-red-500">ㄱ.</span> ㉡은 서태평양에 해당해. (그래프의 절대 깊이를 꼭 확인해!). (X)<br>
                <span class="text-blue-600">ㄴ.</span> 엘니뇨(A) 때 동태평양 비 많이 오지. 강수량 편차 (+). (O)<br>
                <span class="text-red-500">ㄷ.</span> 엘니뇨(A) 때는 서쪽과 동쪽의 해수면 높이 차이가 줄어들어. (X)
                <br><br><b>[핵심]</b>엘니뇨 문제는 <span class="highlight-yellow">'무역풍의 세기'</span>에서 모든 게 시작된다는 걸 잊지 마! 풍속이 변하면 바닷물의 이동이 변하고, 그게 수온과 기압, 강수량까지 도미노처럼 바꾸는 거란다. 이 흐름만 잡으면 기상학 마스터야!
            `
        }
    ]
};