// 전체 텍스트 폰트 크기 설정을 위한 스타일 제어 코드
if (typeof document !== 'undefined') {
    document.documentElement.style.fontSize = "11px";
}

window.globalExamData = {
    title: "갓통과 WEEKLY 04",
    answers: [3, 3, 4, 4, 1, 5, 5, 1, 3, 2, 1, 2, 5, 3, 3, 3, 3, 1, 2, 1],
    scores: [1.5, 2, 2, 1.5, 2, 1.5, 2, 1.5, 1.5, 2, 2, 2, 2.5, 1.5, 2, 2.5, 2, 1.5, 1.5, 1.5],
    settings: {
        fontSize: "11px"
    },
    "explanations": [
    {
        "no": 1,
        "topic": "지구 시스템의 층상 구조",
        "content": "
        <div class=\"ans-correct-title\">정답: ③ ㄱ, ㄷ</div>
        <div class=\"concept-box\">
            <div class=\"concept-title\"><span class=\"concept-icon\">💡</span> [갓쌤의 1초 개념]</div>
            <div class=\"concept-content\">기권과 수권의 층상 구조를 묻는 문제야. (가)는 기권으로 A는 대류권, B는 성층권, C는 중간권, D는 열권이야. (나)는 수권으로 E는 혼합층, F는 수온 약층, G는 심해층이지. 각 층의 특징을 정확히 연결해야 해!</div>
        </div>
        <div class=\"fact-check-title\">🎯 정답 선지 팩트 체크!</div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄱ.</span>
            <span class=\"fact-check-text\">(가)의 B는 성층권으로, 오존층이 존재하여 태양의 자외선을 흡수하기 때문에 높이가 올라갈수록 기온이 상승한단다. (O)</span>
        </div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄷ.</span>
            <span class=\"fact-check-text\">(가)의 B(성층권)와 (나)의 F(수온 약층)는 모두 위쪽의 온도가 높고 아래쪽의 온도가 낮아서 안정한 층을 이루어. 따라서 대류 현상이 억제되지. (O)</span>
        </div>
        <div class=\"wrong-fact-section\">
            <div class=\"wrong-fact-title\">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄴ.</span>
                <span class=\"fact-check-text\">(나)의 E는 바람에 의해 바닷물이 섞여 수온이 일정한 혼합층이야. 바람이 강할수록 바닷물이 더 깊은 곳까지 섞이므로 혼합층의 두께는 <b>두꺼워진다</b>는 걸 명심해! (X)</span>
            </div>
        </div>
        "
    },
    {
        "no": 2,
        "topic": "지구 시스템 구성 요소 간의 물 순환",
        "content": "
        <div class=\"ans-correct-title\">정답: ③ ㄱ, ㄷ</div>
        <div class=\"concept-box\">
            <div class=\"concept-title\"><span class=\"concept-icon\">💡</span> [갓쌤의 1초 개념]</div>
            <div class=\"concept-content\">물의 증발량과 강수량 그래프야. (가)는 증발량이 강수량보다 훨씬 많은 수권(바다)이고, (나)는 강수량이 증발량보다 많은 지권(육지)이야.</div>
        </div>
        <div class=\"fact-check-title\">🎯 정답 선지 팩트 체크!</div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄱ.</span>
            <span class=\"fact-check-text\">(가)는 증발량이 강수량보다 많으므로 수권(바다)이 맞아. (O)</span>
        </div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄷ.</span>
            <span class=\"fact-check-text\">(나) 육지에서 강수량(96)과 증발량(60)의 차이인 36만큼이 지표수나 지하수의 형태로 (가) 바다로 흘러가 물의 평형을 맞춰. (O)</span>
        </div>
        <div class=\"wrong-fact-section\">
            <div class=\"wrong-fact-title\">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄴ.</span>
                <span class=\"fact-check-text\">물 순환을 일으키는 가장 근원적인 에너지는 지구 내부 에너지가 아니라 <b>태양 복사 에너지</b>란다. (X)</span>
            </div>
        </div>
        "
    },
    {
        "no": 3,
        "topic": "중력에 의한 수평으로 던진 물체의 운동",
        "content": "
        <div class=\"ans-correct-title\">정답: ④ ㄴ, ㄷ</div>
        <div class=\"concept-box\">
            <div class=\"concept-title\"><span class=\"concept-icon\">💡</span> [갓쌤의 1초 개념]</div>
            <div class=\"concept-content\">수평으로 던진 공의 궤적을 비교하는 문제야. 행성 A에서 던진 공이 바닥에 닿기까지 4칸을, B는 2칸을 내려갔어(수평 간격 동일). A에서 낙하하는 데 시간이 더 오래 걸렸다는 뜻이므로 t<sub>A</sub> > t<sub>B</sub>야.</div>
        </div>
        <div class=\"fact-check-title\">🎯 정답 선지 팩트 체크!</div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄴ.</span>
            <span class=\"fact-check-text\">동일한 높이를 낙하하는 데 A가 더 오래 걸렸으므로, A의 중력 가속도가 B보다 작아. (O)</span>
        </div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄷ.</span>
            <span class=\"fact-check-text\">연직 방향의 평균 속력은 (이동 거리/걸린 시간)인데 거리는 같고 시간은 A가 크므로, 평균 속력은 A가 B보다 작아. (O)</span>
        </div>
        <div class=\"wrong-fact-section\">
            <div class=\"wrong-fact-title\">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄱ.</span>
                <span class=\"fact-check-text\">모눈종이 상에서 A는 바닥에 도달하기까지 4구간, B는 2구간이 지났으므로 <b>t<sub>A</sub> > t<sub>B</sub></b>가 맞아. (X)</span>
            </div>
        </div>
        "
    },
    {
        "no": 4,
        "topic": "판의 경계와 지각 변동",
        "content": "
        <div class=\"ans-correct-title\">정답: ④ ㄴ, ㄷ</div>
        <div class=\"concept-box\">
            <div class=\"concept-title\"><span class=\"concept-icon\">💡</span> [갓쌤의 1초 개념]</div>
            <div class=\"concept-content\">해령과 섭입대가 나타나는 판의 경계 모식도야. A는 맨틀 대류가 상승하여 판이 멀어지는 발산형 경계(해령)이고, B는 밀도가 큰 판이 작은 판 아래로 들어가는 수렴형 경계(섭입대)야.</div>
        </div>
        <div class=\"fact-check-title\">🎯 정답 선지 팩트 체크!</div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄴ.</span>
            <span class=\"fact-check-text\">A(해령)에서는 천발 지진만 발생하지만, B(섭입대)에서는 파고들어 가는 판을 따라 깊은 곳에서 신발 지진까지 발생해. (O)</span>
        </div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄷ.</span>
            <span class=\"fact-check-text\">발산형 경계인 A에서는 양옆으로 당기는 장력이, 수렴형 경계인 B에서는 양쪽에서 미는 횡압력이 주로 작용해. (O)</span>
        </div>
        <div class=\"wrong-fact-section\">
            <div class=\"wrong-fact-title\">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄱ.</span>
                <span class=\"fact-check-text\">A 하부에는 맨틀 대류의 <b>상승부</b>가 위치한단다. 하강부는 B 아래에 있어. (X)</span>
            </div>
        </div>
        "
    },
    {
        "no": 5,
        "topic": "지구 시스템의 탄소 순환",
        "content": "
        <div class=\"ans-correct-title\">정답: ① ㄱ</div>
        <div class=\"concept-box\">
            <div class=\"concept-title\"><span class=\"concept-icon\">💡</span> [갓쌤의 1초 개념]</div>
            <div class=\"concept-content\">화석 연료 사용에 따른 탄소 배출과 각 권역의 탄소량 변화야. 인간 활동으로 배출된 탄소가 기권에 축적되거나 수권에 흡수되는 양상을 보여주고 있어.</div>
        </div>
        <div class=\"fact-check-title\">🎯 정답 선지 팩트 체크!</div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄱ.</span>
            <span class=\"fact-check-text\">화석 연료는 지권에 저장된 탄소인데, 연소 과정을 통해 기권(CO₂)으로 이동해. (O)</span>
        </div>
        <div class=\"wrong-fact-section\">
            <div class=\"wrong-fact-title\">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄴ.</span>
                <span class=\"fact-check-text\">2010년 그래프를 보면 배출량(약 9)은 기권 증가량(약 4.4)과 수권 흡수량(약 2.5)의 합보다 커. 나머지 탄소는 생물권 등으로 흡수된단다. (X)</span>
            </div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄷ.</span>
                <span class=\"fact-check-text\">수권(바다)이 탄소(이산화 탄소)를 많이 흡수할수록 해양 산성화가 진행되어 해수의 산성도는 오히려 <b>높아져</b>(pH는 낮아짐). (X)</span>
            </div>
        </div>
        "
    },
    {
        "no": 6,
        "topic": "지구 시스템의 구성 요소",
        "content": "
        <div class=\"ans-correct-title\">정답: ⑤ ㄱ, ㄴ, ㄷ</div>
        <div class=\"concept-box\">
            <div class=\"concept-title\"><span class=\"concept-icon\">💡</span> [갓쌤의 1초 개념]</div>
            <div class=\"concept-content\">각 권역의 특징을 설명하고 있어. A는 질소와 산소를 공급하는 기권, B는 면적이 가장 넓은 수권, C는 규산염 물질이 주성분인 지권이야.</div>
        </div>
        <div class=\"fact-check-title\">🎯 정답 선지 팩트 체크!</div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄱ.</span>
            <span class=\"fact-check-text\">A(기권)에는 수증기, 이산화 탄소 등 온실 기체가 있어 온실 효과가 일어나. (O)</span>
        </div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄴ.</span>
            <span class=\"fact-check-text\">B(수권)의 바다는 수온에 따라 혼합층, 수온 약층, 심해층의 층상 구조를 이루어. (O)</span>
        </div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄷ.</span>
            <span class=\"fact-check-text\">지진 해일(쓰나미)이 발생해 해안가 지형을 변화시키는 것은 수권(B)과 지권(C)의 상호작용이야. (O)</span>
        </div>
        "
    },
    {
        "no": 7,
        "topic": "수평으로 던진 물체의 운동",
        "content": "
        <div class=\"ans-correct-title\">정답: ⑤ ㄱ, ㄴ, ㄷ</div>
        <div class=\"concept-box\">
            <div class=\"concept-title\"><span class=\"concept-icon\">💡</span> [갓쌤의 1초 개념]</div>
            <div class=\"concept-content\">비행기에서 투하한 구호 물품의 운동이야. 물품은 수평으로는 등속 직선 운동, 연직으로는 자유 낙하 운동을 해. (나)에서 3초일 때 연직 속도가 30m/s이므로 중력 가속도는 10m/s²이야.</div>
        </div>
        <div class=\"fact-check-title\">🎯 정답 선지 팩트 체크!</div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄱ.</span>
            <span class=\"fact-check-text\">물품이 낙하하는 동안 질량은 변하지 않으므로 작용하는 중력의 크기는 일정해. (O)</span>
        </div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄴ.</span>
            <span class=\"fact-check-text\">비행기의 고도는 연직 방향으로 낙하한 거리와 같아. (나) 그래프의 면적인 1/2 × 3 × 30 = 45m가 맞아. (O)</span>
        </div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄷ.</span>
            <span class=\"fact-check-text\">수평 속력이 커져도 연직 방향의 중력 가속도와 높이는 변함이 없으므로 지면에 닿는 시간은 똑같이 3초야. (O)</span>
        </div>
        "
    },
    {
        "no": 8,
        "topic": "판의 경계 (발산형 경계)",
        "content": "
        <div class=\"ans-correct-title\">정답: ① ㄱ</div>
        <div class=\"concept-box\">
            <div class=\"concept-title\"><span class=\"concept-icon\">💡</span> [갓쌤의 1초 개념]</div>
            <div class=\"concept-content\">해양 지각의 연령 분포야. 수평 거리 200km 지점에서 연령이 0이므로, 이곳이 새로운 지각이 생성되는 발산형 경계(해령)라는 것을 알 수 있어.</div>
        </div>
        <div class=\"fact-check-title\">🎯 정답 선지 팩트 체크!</div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄱ.</span>
            <span class=\"fact-check-text\">연령이 0인 지점을 중심으로 양쪽으로 갈수록 연령이 많아지므로 발산형 경계야. (O)</span>
        </div>
        <div class=\"wrong-fact-section\">
            <div class=\"wrong-fact-title\">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄴ.</span>
                <span class=\"fact-check-text\">X쪽 판은 200km 이동에 10백만년, Y쪽 판은 200km(400-200) 이동에 5백만년이 걸렸어. 따라서 <b>Y가 속한 판이 더 빨라</b>. (X)</span>
            </div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄷ.</span>
                <span class=\"fact-check-text\">200km 지점은 해령이므로 판이 <b>생성</b>되는 곳이야. 섭입은 수렴형 경계에서 일어나. (X)</span>
            </div>
        </div>
        "
    },
    {
        "no": 9,
        "topic": "중력을 받는 물체의 운동",
        "content": "
        <div class=\"ans-correct-title\">정답: ③ A, B</div>
        <div class=\"concept-box\">
            <div class=\"concept-title\"><span class=\"concept-icon\">💡</span> [갓쌤의 1초 개념]</div>
            <div class=\"concept-content\">수평 방향으로 던진 물체에 대한 세 학생의 대화야. 연직 방향으로는 중력을 받아 자유 낙하 운동을 하고, 수평 방향으로는 힘을 받지 않아 등속 직선 운동을 하지.</div>
        </div>
        <div class=\"fact-check-title\">🎯 정답 선지 팩트 체크!</div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">A.</span>
            <span class=\"fact-check-text\">수평으로 던져도 연직 방향으로는 자유 낙하와 똑같이 가속되므로, 동일한 높이에서 동시에 떨어뜨리면 지면에 동시에 도달해. (O)</span>
        </div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">B.</span>
            <span class=\"fact-check-text\">수평 방향으로는 작용하는 힘이 0이므로 속력이 변하지 않는 등속 직선 운동을 해. (O)</span>
        </div>
        <div class=\"wrong-fact-section\">
            <div class=\"wrong-fact-title\">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">C.</span>
                <span class=\"fact-check-text\">물체의 질량이 커도 중력 가속도는 일정하므로, 공기 저항이 없다면 떨어지는 데 걸리는 시간은 <b>질량과 관계없이 같아</b>. (X)</span>
            </div>
        </div>
        "
    },
    {
        "no": 10,
        "topic": "판의 이동과 경계",
        "content": "
        <div class=\"ans-correct-title\">정답: ② ㄴ</div>
        <div class=\"concept-box\">
            <div class=\"concept-title\"><span class=\"concept-icon\">💡</span> [갓쌤의 1초 개념]</div>
            <div class=\"concept-content\">판 A와 B의 이동 속도를 화살표로 나타냈어. A가 B보다 속도가 빠르므로 A가 B를 뒤에서 따라잡아 충돌하는 수렴형 경계가 형성돼.</div>
        </div>
        <div class=\"fact-check-title\">🎯 정답 선지 팩트 체크!</div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄴ.</span>
            <span class=\"fact-check-text\">두 판이 충돌하는 수렴형 경계이므로, 밀도가 더 큰 판이 아래로 섭입하는 섭입대가 발달할 수 있어. (O)</span>
        </div>
        <div class=\"wrong-fact-section\">
            <div class=\"wrong-fact-title\">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄱ.</span>
                <span class=\"fact-check-text\">A가 B보다 빨라서 판이 서로 모여들고 있으므로 <b>수렴형 경계</b>야. 보존형은 어긋나는 경계지. (X)</span>
            </div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄷ.</span>
                <span class=\"fact-check-text\">A에서 B를 보면, A가 더 빠르므로 B는 상대적으로 뒤처지게 되어 <b>서쪽</b>으로 이동하는 것으로 보인단다. (X)</span>
            </div>
        </div>
        "
    },
    {
        "no": 11,
        "topic": "지구의 열수지 (위도별 복사 에너지)",
        "content": "
        <div class=\"ans-correct-title\">정답: ① ㄱ</div>
        <div class=\"concept-box\">
            <div class=\"concept-title\"><span class=\"concept-icon\">💡</span> [갓쌤의 1초 개념]</div>
            <div class=\"concept-content\">위도별 태양 복사 에너지 흡수량과 지구 복사 에너지 방출량 그래프야. 저위도는 흡수량이 많아 에너지가 남고, 고위도는 방출량이 많아 에너지가 부족해.</div>
        </div>
        <div class=\"fact-check-title\">🎯 정답 선지 팩트 체크!</div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄱ.</span>
            <span class=\"fact-check-text\">저위도(적도~38°) 지역은 흡수량이 방출량보다 많아 에너지가 과잉 상태야. (O)</span>
        </div>
        <div class=\"wrong-fact-section\">
            <div class=\"wrong-fact-title\">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄴ.</span>
                <span class=\"fact-check-text\">위도별 에너지 불균형을 해소하는 열 수송은 주로 <b>기권(대기)과 수권(해수)의 순환</b>을 통해 일어나. (X)</span>
            </div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄷ.</span>
                <span class=\"fact-check-text\">위도 38°는 에너지 과잉과 부족이 0이 되는 교차점이지만, 저위도에서 고위도로 열이 통과하는 지점이므로 열수송량은 <b>최대</b>가 된단다. (X)</span>
            </div>
        </div>
        "
    },
    {
        "no": 12,
        "topic": "지구 시스템의 탄소 순환",
        "content": "
        <div class=\"ans-correct-title\">정답: ② ㄴ</div>
        <div class=\"concept-box\">
            <div class=\"concept-title\"><span class=\"concept-icon\">💡</span> [갓쌤의 1초 개념]</div>
            <div class=\"concept-content\">탄소가 세 권역 사이에서 이동하는 과정이야. ㉠ 화석 연료의 연소는 지권(C)에서 기권(A)으로, ㉡ 탄산칼슘의 침전은 수권(B)에서 지권(C)으로, ㉢ 기체의 용해는 기권(A)에서 수권(B)으로의 이동이야.</div>
        </div>
        <div class=\"fact-check-title\">🎯 정답 선지 팩트 체크!</div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄴ.</span>
            <span class=\"fact-check-text\">수온이 높아지면 기체의 용해도가 감소하므로, 기권에서 수권으로 녹아들어가는(용해되는) 탄소의 양은 감소해. (O)</span>
        </div>
        <div class=\"wrong-fact-section\">
            <div class=\"wrong-fact-title\">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄱ.</span>
                <span class=\"fact-check-text\">A는 기권이므로 탄소는 주로 <b>이산화 탄소(CO₂)</b> 형태로 존재해. 탄산칼슘(CaCO₃)은 지권이나 수권에 있어. (X)</span>
            </div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄷ.</span>
                <span class=\"fact-check-text\">탄소는 지구 시스템 내에서 권역 간에 이동할 뿐, 우주로 빠져나가지 않으므로 전체 탄소량은 <b>항상 일정하게 보존돼</b>. (X)</span>
            </div>
        </div>
        "
    },
    {
        "no": 13,
        "topic": "포물선 운동과 자유 낙하 운동",
        "content": "
        <div class=\"ans-correct-title\">정답: ⑤ ㄱ, ㄴ, ㄷ</div>
        <div class=\"concept-box\">
            <div class=\"concept-title\"><span class=\"concept-icon\">💡</span> [갓쌤의 1초 개념]</div>
            <div class=\"concept-content\">수평으로 던진 물체(B)와 자유 낙하 하는 물체(A)가 충돌하는 현상이야. 두 물체는 연직 방향으로는 똑같은 운동을 하기 때문에 공중에서 만날 수 있지.</div>
        </div>
        <div class=\"fact-check-title\">🎯 정답 선지 팩트 체크!</div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄱ.</span>
            <span class=\"fact-check-text\">두 물체 모두 연직 방향으로는 똑같은 중력 가속도(g)를 받기 때문에 같은 시간 동안 같은 높이만큼 낙하해. (O)</span>
        </div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄴ.</span>
            <span class=\"fact-check-text\">B가 운동하는 동안 공기 저항이 없으므로, B에 작용하는 알짜힘은 오직 아래를 향하는 일정한 중력뿐이야. (O)</span>
        </div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄷ.</span>
            <span class=\"fact-check-text\">B를 더 빠르게 던지면 수평 거리 L을 이동하는 데 걸리는 시간이 짧아져. 시간이 짧아지면 낙하하는 거리도 짧아지므로 더 높은 곳에서 충돌하게 돼. (O)</span>
        </div>
        "
    },
    {
        "no": 14,
        "topic": "수렴형 경계 모형 실험",
        "content": "
        <div class=\"ans-correct-title\">정답: ③ ㄱ, ㄷ</div>
        <div class=\"concept-box\">
            <div class=\"concept-title\"><span class=\"concept-icon\">💡</span> [갓쌤의 1초 개념]</div>
            <div class=\"concept-content\">밀도가 다른 두 점토 블록을 충돌시키는 실험이야. 실제 판의 충돌에서 밀도가 큰 판이 작은 판 아래로 섭입하는 과정을 모델링했어.</div>
        </div>
        <div class=\"fact-check-title\">🎯 정답 선지 팩트 체크!</div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄱ.</span>
            <span class=\"fact-check-text\">판과 판이 모여드는 수렴형 경계 중에서도 섭입대가 형성되는 원리를 알아보는 실험이야. (O)</span>
        </div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄷ.</span>
            <span class=\"fact-check-text\">해양판(태평양판)이 대륙판(유라시아판) 아래로 섭입하면서 형성된 일본 해구가 대표적인 섭입대 지형이야. (O)</span>
        </div>
        <div class=\"wrong-fact-section\">
            <div class=\"wrong-fact-title\">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄴ.</span>
                <span class=\"fact-check-text\">밀도가 1.2인 A보다 밀도가 1.5인 B가 더 무겁기 때문에, <b>B가 A의 아래로 파고들어 가는 현상</b>이 관찰될 거야. (X)</span>
            </div>
        </div>
        "
    },
    {
        "no": 15,
        "topic": "탄소 순환과 해양 산성화",
        "content": "
        <div class=\"ans-correct-title\">정답: ③ ㄱ, ㄷ</div>
        <div class=\"concept-box\">
            <div class=\"concept-title\"><span class=\"concept-icon\">💡</span> [갓쌤의 1초 개념]</div>
            <div class=\"concept-content\">(가)에서 생물의 호흡(C→A)이 있으므로 C는 생물권, A는 기권이고, 남은 B는 수권이야. (나)는 대기 중 CO₂가 증가함에 따라 바다가 산성화(pH 감소)되는 현상이지.</div>
        </div>
        <div class=\"fact-check-title\">🎯 정답 선지 팩트 체크!</div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄱ.</span>
            <span class=\"fact-check-text\">화석 연료는 지권에 매장되어 있고, 이를 연소시키면 기권(A)으로 탄소가 방출돼. (O)</span>
        </div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄷ.</span>
            <span class=\"fact-check-text\">A(기권)에서 C(생물권)로 탄소가 이동하는 과정은 광합성이야. 이때 빛(태양) 에너지가 유기물의 화학 에너지로 전환된단다. (O)</span>
        </div>
        <div class=\"wrong-fact-section\">
            <div class=\"wrong-fact-title\">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄴ.</span>
                <span class=\"fact-check-text\">해수의 pH가 낮아져 산성화되면 조개류나 산호 등 해양 생물이 탄산칼슘(CaCO₃) 골격을 형성하기가 <b>매우 어려워져</b> 생태계가 위협받게 돼. (X)</span>
            </div>
        </div>
        "
    },
    {
        "no": 16,
        "topic": "대기 대순환과 표층 해류",
        "content": "
        <div class=\"ans-correct-title\">정답: ③ ㄱ, ㄷ</div>
        <div class=\"concept-box\">
            <div class=\"concept-title\"><span class=\"concept-icon\">💡</span> [갓쌤의 1초 개념]</div>
            <div class=\"concept-content\">위도별 동서 방향 풍속을 통해 바람의 종류를 파악해야 해. A구간(0~30도)은 (-)풍속이므로 무역풍(동풍)이 불고, B구간(30~60도)은 (+)이므로 편서풍(서풍)이 부는 지역이야.</div>
        </div>
        <div class=\"fact-check-title\">🎯 정답 선지 팩트 체크!</div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄱ.</span>
            <span class=\"fact-check-text\">A구간에서는 동에서 서로 부는 무역풍이 불기 때문에, 이에 의해 형성된 표층 해류(북적도 해류)도 동에서 서로 흐르게 돼. (O)</span>
        </div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄷ.</span>
            <span class=\"fact-check-text\">A구간의 무역풍이 평년보다 약해지는 현상을 엘니뇨라고 해. 엘니뇨 시기에는 따뜻한 해수가 동태평양에 머물러 상승 기류가 발생하므로 동태평양 적도 부근의 강수량이 증가한단다. (O)</span>
        </div>
        <div class=\"wrong-fact-section\">
            <div class=\"wrong-fact-title\">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄴ.</span>
                <span class=\"fact-check-text\">쿠로시오 해류는 무역풍에 의해 동에서 서로 이동하던 바닷물이 대륙에 막혀 고위도로 꺾여 흐르는 해류이므로, <b>A구간 바람</b>이 직접적인 원인이야. (X)</span>
            </div>
        </div>
        "
    },
    {
        "no": 17,
        "topic": "수평으로 던진 물체의 속도 그래프",
        "content": "
        <div class=\"ans-correct-title\">정답: ③ ㄱ, ㄷ</div>
        <div class=\"concept-box\">
            <div class=\"concept-title\"><span class=\"concept-icon\">💡</span> [갓쌤의 1초 개념]</div>
            <div class=\"concept-content\">수평 방향으로 던진 물체의 두 속도 성분 그래프야. 수평 속력은 일정(A)하고, 연직 속력은 중력에 의해 시간에 비례하여 증가(B)하지.</div>
        </div>
        <div class=\"fact-check-title\">🎯 정답 선지 팩트 체크!</div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄱ.</span>
            <span class=\"fact-check-text\">시간에 따라 변하지 않고 일정한 값을 유지하는 직선 A가 수평 방향 속력이 맞아. (O)</span>
        </div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄷ.</span>
            <span class=\"fact-check-text\">2t<sub>0</sub>일 때 수평 이동 거리는 사각형 면적(v<sub>0</sub> × 2t<sub>0</sub> = 2v<sub>0</sub>t<sub>0</sub>)이고, 연직 거리는 삼각형 면적(1/2 × 2t<sub>0</sub> × 2v<sub>0</sub> = 2v<sub>0</sub>t<sub>0</sub>)으로 서로 같아. (O)</span>
        </div>
        <div class=\"wrong-fact-section\">
            <div class=\"wrong-fact-title\">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄴ.</span>
                <span class=\"fact-check-text\">t<sub>0</sub>일 때 수평 거리는 사각형 면적(v<sub>0</sub>t<sub>0</sub>)이고, 연직 거리는 삼각형 면적인 1/2 v<sub>0</sub>t<sub>0</sub>이야. 따라서 연직 낙하 거리는 수평 이동 거리의 2배가 아니라 <b>절반(0.5배)</b>이란다. (X)</span>
            </div>
        </div>
        "
    },
    {
        "no": 18,
        "topic": "권역별 탄소의 저장 형태",
        "content": "
        <div class=\"ans-correct-title\">정답: ① ㄱ</div>
        <div class=\"concept-box\">
            <div class=\"concept-title\"><span class=\"concept-icon\">💡</span> [갓쌤의 1초 개념]</div>
            <div class=\"concept-content\">각 권역의 탄소 저장 형태야. A는 이산화 탄소가 있으므로 기권, B는 탄산 이온이 녹아 있으므로 수권, C는 화석 연료와 탄산칼슘 암석이 있으므로 지권이야.</div>
        </div>
        <div class=\"fact-check-title\">🎯 정답 선지 팩트 체크!</div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄱ.</span>
            <span class=\"fact-check-text\">지구 시스템 전체 탄소의 99% 이상이 지권(C)에 탄산칼슘(석회암)의 형태로 저장되어 있어. (O)</span>
        </div>
        <div class=\"wrong-fact-section\">
            <div class=\"wrong-fact-title\">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄴ.</span>
                <span class=\"fact-check-text\">대기 대순환은 <b>기권(A)</b>의 이동을 통해 열을 수송하는 현상이야. B(수권)는 해수 순환을 담당하지. (X)</span>
            </div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄷ.</span>
                <span class=\"fact-check-text\">해수의 온도가 상승하면 기체의 용해도가 낮아져 수권에서 기권(A)으로 이산화 탄소가 방출되므로, A에 저장되는 탄소량은 오히려 <b>증가해</b>. (X)</span>
            </div>
        </div>
        "
    },
    {
        "no": 19,
        "topic": "판의 경계 (대륙판과 대륙판의 충돌)",
        "content": "
        <div class=\"ans-correct-title\">정답: ② ㄴ</div>
        <div class=\"concept-box\">
            <div class=\"concept-title\"><span class=\"concept-icon\">💡</span> [갓쌤의 1초 개념]</div>
            <div class=\"concept-content\">두 대륙판이 횡압력을 받아 충돌하면서 거대한 습곡 산맥이 형성되는 수렴형(충돌형) 경계의 모식도야. 대표적으로 히말라야산맥이 있지.</div>
        </div>
        <div class=\"fact-check-title\">🎯 정답 선지 팩트 체크!</div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄴ.</span>
            <span class=\"fact-check-text\">두 대륙판은 밀도가 비슷하고 가벼워서 어느 한 판이 맨틀 속으로 깊이 섭입하지 못해 뚜렷한 섭입대가 형성되지 않아. (O)</span>
        </div>
        <div class=\"wrong-fact-section\">
            <div class=\"wrong-fact-title\">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄱ.</span>
                <span class=\"fact-check-text\">안데스산맥은 해양판과 대륙판이 충돌하여 섭입대가 형성되는 경계에서 만들어졌어. 이 모형은 <b>히말라야산맥</b>에 적합해. (X)</span>
            </div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄷ.</span>
                <span class=\"fact-check-text\">대륙판의 충돌로 지각이 매우 두꺼워지기 때문에 마그마가 생성되더라도 지표로 뚫고 나오기 힘들어 화산 활동은 <b>거의 일어나지 않아</b>. (X)</span>
            </div>
        </div>
        "
    },
    {
        "no": 20,
        "topic": "지구 시스템의 진화 과정",
        "content": "
        <div class=\"ans-correct-title\">정답: ① ㄱ</div>
        <div class=\"concept-box\">
            <div class=\"concept-title\"><span class=\"concept-icon\">💡</span> [갓쌤의 1초 개념]</div>
            <div class=\"concept-content\">남세균의 광합성으로 바다에 산소가 축적되고, 이후 기권으로 방출되어 오존층이 형성되며 육상 생물이 출현한 일련의 과정을 설명하고 있어.</div>
        </div>
        <div class=\"fact-check-title\">🎯 정답 선지 팩트 체크!</div>
        <div class=\"fact-check-item\">
            <span class=\"fact-check-label\">ㄱ.</span>
            <span class=\"fact-check-text\">㉠ 남세균의 광합성은 태양 에너지를 흡수하여 유기물 형태의 화학 에너지로 전환하는 과정이 맞아. (O)</span>
        </div>
        <div class=\"wrong-fact-section\">
            <div class=\"wrong-fact-title\">🚨 오답 선지는 왜 틀렸을까? (함정 주의)</div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄴ.</span>
                <span class=\"fact-check-text\">㉡ 오존층(기권)이 자외선을 차단하여 생물이 바다에서 육상으로 진출하게 된 사건으로, <b>기권과 생물권의 상호작용</b>이 핵심이야. (X)</span>
            </div>
            <div class=\"fact-check-item\">
                <span class=\"wrong-fact-label\">ㄷ.</span>
                <span class=\"fact-check-text\">광합성은 이미 존재하는 탄소와 산소, 수소 원자들을 재조합하는 화학 반응일 뿐, 원자의 총량을 변화시키지는 않으므로 산소 원자의 총량은 <b>일정하게 보존된단다</b>. (X)</span>
            </div>
        </div>
        "
    }
]
};