import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const CSATDataQuiz = () => {
    const [dataGrid, setDataGrid] = useState([]);
    const [csatContext, setCsatContext] = useState(null);
    const [highlightKeyIdx, setHighlightKeyIdx] = useState(null);

    // Canvas 드로잉 상태
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    // 퀴즈 모드 및 로직 상태
    const [quizMode, setQuizMode] = useState(1); // 1: 양이온, 2: 음이온, 3: 전체이온, 4: 이온수 비
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({ q1: '', q2: '' });
    const [feedbacks, setFeedbacks] = useState({ q1: null, q2: null });

    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, show: false, text: '' });

    // 1. 수능형 데이터 생성 로직
    const generateCSATData = useCallback(() => {
        const ratioCases = [
            { acid: 1, base: 1 }, { acid: 1, base: 2 }, { acid: 2, base: 1 }, { acid: 2, base: 3 }
        ];
        const targetRatio = ratioCases[Math.floor(Math.random() * ratioCases.length)];
        const C_acid = targetRatio.acid;
        const C_base = targetRatio.base;

        let experiments = [];
        let attempts = 0;

        // 이온 비 계산 헬퍼 함수
        const getRatioStr = (na, cl, h, oh) => {
            const ions = [na, cl, h, oh].filter(v => v > 0).sort((a, b) => b - a);
            const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
            const arrGcd = ions.reduce((acc, val) => gcd(acc, val));
            return ions.map(v => v / arrGcd).join(' : ');
        };

        while (experiments.length < 3 && attempts < 100) {
            attempts++;
            const vHCl = (Math.floor(Math.random() * 4) + 1) * 10;
            const vNaOH = (Math.floor(Math.random() * 4) + 1) * 10;

            const nH_initial = C_acid * vHCl;
            const nCl = C_acid * vHCl;
            const nNa = C_base * vNaOH;
            const nOH_initial = C_base * vNaOH;

            let nH = 0, nOH = 0;
            if (nH_initial > nOH_initial) nH = nH_initial - nOH_initial;
            else if (nOH_initial > nH_initial) nOH = nOH_initial - nH_initial;

            const sumCations = nNa + nH;
            const sumAnions = nCl + nOH;

            // 최대 지분 이온 찾기
            const ionsMap = { 'Na⁺': nNa, 'Cl⁻': nCl, 'H⁺': nH, 'OH⁻': nOH };
            const maxIon = Object.keys(ionsMap).reduce((a, b) => ionsMap[a] > ionsMap[b] ? a : b);

            if (sumCations === sumAnions) {
                experiments.push({
                    label: ['(가)', '(나)', '(다)'][experiments.length],
                    vHCl, vNaOH,
                    nNa, nH, nCl, nOH,
                    sumCations,
                    sumAnions,
                    totalIons: sumCations + sumAnions,
                    ionRatio: getRatioStr(nNa, nCl, nH, nOH),
                    maxIon,
                    totalVolume: vHCl + vNaOH,
                    waterGen: Math.min(nH_initial, nOH_initial),
                    isAcidic: nH > 0,
                    isBasic: nOH > 0,
                    isNeutral: nH === 0 && nOH === 0,
                });
            }
        }

        experiments.sort((a, b) => a.vNaOH - b.vNaOH);

        setDataGrid(experiments);
        setCsatContext({ acidRatio: C_acid, baseRatio: C_base });

        resetQuizState(1);
        clearCanvas();
    }, []);

    useEffect(() => {
        generateCSATData();
    }, [generateCSATData]);

    const resetQuizState = (mode) => {
        setQuizMode(mode);
        setStep(1);
        setAnswers({ q1: '', q2: '' });
        setFeedbacks({ q1: null, q2: null });
    };

    // Canvas 드로잉 핸들러
    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };
    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        const ctx = canvasRef.current.getContext('2d');
        ctx.lineTo(offsetX, offsetY);
        ctx.strokeStyle = 'rgba(207, 19, 34, 0.7)';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();
    };
    const stopDrawing = () => setIsDrawing(false);
    const clearCanvas = () => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    };

    const handleRowMouseMove = (e, row) => setTooltipPos({ x: e.clientX + 10, y: e.clientY + 10, show: true, text: `총 부피 = ${row.totalVolume} mL` });
    const handleRowMouseOut = () => setTooltipPos(prev => ({ ...prev, show: false }));
    const highlightClue = () => { setHighlightKeyIdx(1); setTimeout(() => setHighlightKeyIdx(null), 3000); };

    // ----------------------------------------------------
    // 각 퀴즈 모드별 정답 및 질문 반환 로직
    // ----------------------------------------------------
    const getQuizContent = () => {
        if (!dataGrid.length) return null;

        // 공통 정답 계산
        // Mode 1: 중화점 가까운 놈
        let minDiff = Infinity, closestLabel = '';
        dataGrid.forEach(ex => {
            const diff = Math.abs(ex.nH - ex.nOH);
            if (diff < minDiff) { minDiff = diff; closestLabel = ex.label; }
        });

        // Mode 2: 생성 물 분자
        const maxWater = Math.max(...dataGrid.map(ex => ex.waterGen));
        const maxWaterLabel = dataGrid.find(ex => ex.waterGen === maxWater).label;
        const acidLabels = dataGrid.filter(ex => ex.isAcidic).map(ex => ex.label).join(', ') || '없음';

        switch (quizMode) {
            case 1: // 양이온
                return {
                    colName: '모든 양이온 수<br/>(상댓값)',
                    dataKey: 'sumCations',
                    q1: { text: "질문 1. 세 번의 실험 중 섞인 H⁺와 OH⁻가 가장 많이 상쇄되어 중화점에 가장 가까운 용액은 무엇인가요?", ans: closestLabel },
                    q2: { text: "질문 2. 자료를 바탕으로 사용한 HCl과 NaOH의 농도 비(HCl:NaOH)를 간단한 정수비로 적어주세요. (예: 1:2)", ans: `${csatContext?.acidRatio}:${csatContext?.baseRatio}` }
                };
            case 2: // 음이온
                return {
                    colName: '모든 음이온 수<br/>(상댓값)',
                    dataKey: 'sumAnions',
                    q1: { text: "질문 1. 실험 (가)~(다) 중 생성된 물 분자 수가 가장 많은 실험은 어느 것인가요?", ans: maxWaterLabel },
                    q2: { text: "질문 2. 세 용액 중 산성 액성을 띠는 용액을 모두 적어주세요. (없다면 '없음'으로 기재)", ans: acidLabels }
                };
            case 3: // 전체 이온 수
                return {
                    colName: '전체 이온 수<br/>(상댓값)',
                    dataKey: 'totalIons',
                    q1: { text: "질문 1. 혼합 용액 (나)에 존재하는 전체 구경꾼 이온(Na⁺, Cl⁻) 수 상댓값의 합은 얼마인가요?", ans: String(dataGrid[1].nNa + dataGrid[1].nCl) },
                    q2: { text: "질문 2. 실험 (다)의 액성은 무엇인가요? (산성, 중성, 염기성 중 택1)", ans: dataGrid[2].isAcidic ? '산성' : dataGrid[2].isBasic ? '염기성' : '중성' }
                };
            case 4: // 이온 수 비
                return {
                    colName: '존재하는 모든 이온<br/>수의 비 (상댓값)',
                    dataKey: 'ionRatio',
                    q1: { text: "질문 1. 생성된 이온 수 비가 두 가지 숫자로만(예: 1:1) 나타나는 용액의 액성은 무엇인가요?", ans: '중성' },
                    q2: { text: "질문 2. 실험 (가)에서 가장 많이 존재하는 이온의 기호를 적어주세요.", ans: dataGrid[0].maxIon }
                };
            default: return null;
        }
    };

    const currentContent = getQuizContent();

    const checkAnswer = (qNum) => {
        const isQ1 = qNum === 1;
        const ansKey = isQ1 ? 'q1' : 'q2';
        const userAns = answers[ansKey].trim().replace(/\s/g, '');
        let realAns = isQ1 ? currentContent.q1.ans : currentContent.q2.ans;

        // 특수 예외 처리 (정수비 2:4를 1:2로 적거나 약분 이슈)
        let isCorrect = userAns === String(realAns).replace(/\s/g, '');

        // 괄호 포함 예외 처리: 사용자가 (가)를 가 로 적은 경우
        if (!isCorrect && realAns.includes('(')) {
            isCorrect = userAns === realAns.replace(/[()]/g, '');
        }

        setFeedbacks(prev => ({
            ...prev,
            [ansKey]: {
                ok: isCorrect,
                msg: isCorrect
                    ? (isQ1 ? '정답입니다! 훌륭합니다. 다음 단계로 넘어가세요.' : '🎉 퍼펙트! 완벽하게 문항을 해석했습니다.')
                    : '오답입니다. 다시 한번 표의 자료를 분석해보세요.'
            }
        }));

        if (isCorrect && isQ1) setStep(2);
    };

    if (!dataGrid.length) return <p>모의 평가 문항 출제 중...</p>;

    return (
        <div style={{ backgroundColor: '#fff', color: '#111', fontFamily: '"Batang", "Gungsuh", "Times New Roman", serif', padding: '40px', maxWidth: '1000px', margin: '0 auto', border: '1px solid #ccc', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>

            {tooltipPos.show && (
                <div style={{ position: 'fixed', top: tooltipPos.y, left: tooltipPos.x, backgroundColor: 'rgba(50,50,50,0.9)', color: '#fff', padding: '5px 10px', borderRadius: '4px', fontSize: '0.9em', pointerEvents: 'none', zIndex: 1000, fontFamily: 'sans-serif' }}>
                    {tooltipPos.text}
                </div>
            )}

            {/* 헤더 영역 */}
            <div style={{ borderBottom: '3px solid #000', paddingBottom: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <h1 style={{ fontSize: '2em', margin: 0, fontWeight: 'normal', letterSpacing: '2px' }}>2025학년도 가상 대학수학능력시험 모의평가</h1>
                <div style={{ fontSize: '1.2em', fontWeight: 'bold', border: '2px solid #000', padding: '5px 20px', borderRadius: '30px' }}>과학탐구 영역 (화학 Ⅰ)</div>
            </div>

            <div style={{ fontSize: '1.2em', lineHeight: '1.6', marginBottom: '20px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.4em', marginRight: '10px' }}>1.</span>
                표는 농도를 모르는 염산(HCl(aq))과 수산화 나트륨(NaOH(aq)) 수용액을 서로 다른 부피로 혼합한 실험 (가) ~ (다)에 대한 자료이다. (단, 혼합 용액의 부피는 혼합 전 각 용액의 부피의 합과 같다.)
            </div>

            {/* 상단 컨트롤러 (문제 유형 선택 및 툴) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', fontFamily: 'sans-serif' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 'bold', alignSelf: 'center', marginRight: '5px' }}>분석 자료 유형:</span>
                    {[
                        { id: 1, label: '모든 양이온 수' },
                        { id: 2, label: '모든 음이온 수' },
                        { id: 3, label: '전체 이온 수' },
                        { id: 4, label: '모든 이온수 비' }
                    ].map(m => (
                        <button key={m.id} onClick={() => resetQuizState(m.id)} style={{ padding: '6px 12px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc', background: quizMode === m.id ? '#1890ff' : '#f5f5f5', color: quizMode === m.id ? '#fff' : '#333', fontWeight: quizMode === m.id ? 'bold' : 'normal' }}>
                            {m.label}
                        </button>
                    ))}
                    <button onClick={() => generateCSATData()} style={{ marginLeft: '10px', padding: '6px 12px', cursor: 'pointer', background: '#fafafa', border: '1px dashed #999', borderRadius: '4px' }}>↻ 새 데이터 생성</button>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={clearCanvas} style={{ padding: '6px 12px', cursor: 'pointer', background: '#e6f7ff', border: '1px solid #91d5ff', borderRadius: '4px' }}>✏️ 펜 지우기</button>
                    <button onClick={highlightClue} style={{ padding: '6px 12px', cursor: 'pointer', background: '#fffb8f', border: '1px solid #d4b106', borderRadius: '4px' }}>💡 단서 하이라이트</button>
                </div>
            </div>

            {/* 데이터 렌더 영역 (표 + 그래프 + 캔버스) */}
            <div style={{ position: 'relative', border: '2px solid #333', padding: '20px', marginBottom: '30px' }} >
                <canvas
                    ref={canvasRef}
                    width={900} height={400}
                    style={{ position: 'absolute', top: 0, left: 0, zIndex: 10, cursor: 'crosshair', pointerEvents: isDrawing ? 'auto' : 'none' }}
                    onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
                />
                {/* 캔버스 드로잉을 허용할 패드 */}
                <div
                    onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9, cursor: 'crosshair' }}
                />

                <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '30px', justifyContent: 'space-around', pointerEvents: 'none' /* 캔버스 클릭 통과를 위함, 내부 요소는 별도 복구 */ }}>
                    {/* 실험 결과 표 */}
                    <table style={{ borderCollapse: 'collapse', borderTop: '2px solid #000', borderBottom: '2px solid #000', width: '45%', textAlign: 'center', pointerEvents: 'auto' }}>
                        <thead style={{ borderBottom: '1px solid #000', backgroundColor: '#f9f9f9' }}>
                            <tr>
                                <th style={{ padding: '15px' }} rowSpan="2">실험</th>
                                <th style={{ padding: '5px' }} colSpan="2">혼합 전 용액의 부피(mL)</th>
                                <th style={{ padding: '15px' }} rowSpan="2" dangerouslySetInnerHTML={{ __html: currentContent.colName }} />
                            </tr>
                            <tr>
                                <th style={{ padding: '5px', borderTop: '1px dotted #ccc' }}>HCl(aq)</th>
                                <th style={{ padding: '5px', borderTop: '1px dotted #ccc' }}>NaOH(aq)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataGrid.map((row, idx) => (
                                <tr
                                    key={idx}
                                    onMouseMove={(e) => handleRowMouseMove(e, row)}
                                    onMouseOut={handleRowMouseOut}
                                    style={{
                                        borderBottom: '1px dotted #999',
                                        backgroundColor: highlightKeyIdx === idx ? '#fffb8f' : 'transparent',
                                        transition: 'background-color 0.5s',
                                        cursor: 'help'
                                    }}
                                >
                                    <td style={{ padding: '15px', fontWeight: 'bold' }}>{row.label}</td>
                                    <td style={{ padding: '15px' }}>{row.vHCl}</td>
                                    <td style={{ padding: '15px' }}>{row.vNaOH}</td>
                                    <td style={{ padding: '15px', fontWeight: 'bold', fontSize: '1.2em' }}>{row[currentContent.dataKey]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* 추이 그래프 (힌트용) -> 이온수비 모드일때는 그래프 생략 */}
                    <div style={{ width: '50%', height: '250px', borderLeft: '1px dotted #ccc', paddingLeft: '20px', opacity: quizMode === 4 ? 0.3 : 1, pointerEvents: 'auto' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dataGrid} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="label" />
                                <YAxis label={{ value: '상댓값', angle: -90, position: 'insideLeft', offset: 15 }} />
                                <RechartsTooltip />
                                {quizMode !== 4 && <Line type="monotone" dataKey={currentContent.dataKey} name="데이터값" stroke="#333" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />}
                            </LineChart>
                        </ResponsiveContainer>
                        {quizMode === 4 && <div style={{ textAlign: 'center', marginTop: '-120px', fontWeight: 'bold' }}>이온 수 비 유형은<br />그래프가 제공되지 않습니다.</div>}
                    </div>
                </div>
            </div>

            {/* 단계별 논리 쿼리 영역 */}
            <div style={{ backgroundColor: '#fafafa', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'sans-serif' }}>
                <h3 style={{ marginTop: 0, color: '#0050b3' }}>자료 해석 훈련 - {['모든 양이온 수', '모든 음이온 수', '전체 이온 수', '모든 이온수 비'][quizMode - 1]} 편</h3>

                {/* Step 1 */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>{currentContent.q1.text}</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            disabled={step > 1} value={answers.q1} onChange={(e) => setAnswers(p => ({ ...p, q1: e.target.value }))}
                            placeholder="답변 입력" style={{ padding: '8px', minWidth: '100px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        {step === 1 && <button onClick={() => checkAnswer(1)} style={{ padding: '8px 16px', background: '#0050b3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>확인</button>}
                    </div>
                    {feedbacks.q1 && <p style={{ color: feedbacks.q1.ok ? '#389e0d' : '#cf1322', fontWeight: 'bold' }}>{feedbacks.q1.msg}</p>}
                </div>

                {/* Step 2 */}
                {step >= 2 && (
                    <div style={{ marginBottom: '20px', animation: 'fadeIn 0.5s' }}>
                        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>{currentContent.q2.text}</label>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <input
                                disabled={step > 2} value={answers.q2} onChange={(e) => setAnswers(p => ({ ...p, q2: e.target.value }))}
                                placeholder="답변 입력" style={{ padding: '8px', minWidth: '100px', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                            {step === 2 && <button onClick={() => checkAnswer(2)} style={{ padding: '8px 16px', background: '#cf1322', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>최종 제출</button>}
                        </div>
                        {feedbacks.q2 && <p style={{ color: feedbacks.q2.ok ? '#389e0d' : '#cf1322', fontWeight: 'bold' }}>{feedbacks.q2.msg}</p>}
                    </div>
                )}
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default CSATDataQuiz;
