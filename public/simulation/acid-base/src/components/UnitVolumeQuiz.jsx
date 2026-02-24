import React, { useState, useEffect, useCallback } from 'react';
import Confetti from 'react-confetti';

const UnitVolumeQuiz = () => {
    const [level, setLevel] = useState(1); // 1: 기초, 2: 보통, 3: 심화(킬러)
    const [problem, setProblem] = useState(null);

    // 사용자 입력 상태 관리
    const [answers, setAnswers] = useState({ q1: '', q2_na: '', q2_cl: '', q3: '' });
    const [feedback, setFeedback] = useState({ q1: null, q2: null, q3: null });
    const [showConfetti, setShowConfetti] = useState(false);

    // 난이도별 문제 생성기
    const generateProblem = useCallback((currentLevel) => {
        let acidUnit, acidVol, baseUnit, baseVol;
        let totalCl, totalH, totalNa, totalOH, remainingH, remainingOH, totalVolume, totalIonsSum, ionsPerUnitVolume;

        // "단위 부피당 모든 이온 수"가 무조건 정수(자연수)가 나올 때까지 반복
        while (true) {
            if (currentLevel === 1) {
                acidUnit = Math.floor(Math.random() * 3) + 1; // 1~3
                acidVol = (Math.floor(Math.random() * 3) + 1) * 10; // 10, 20, 30
                baseUnit = Math.floor(Math.random() * 3) + 1;
                baseVol = (Math.floor(Math.random() * 3) + 1) * 10;
            } else if (currentLevel === 2) {
                acidUnit = Math.floor(Math.random() * 5) + 2;
                acidVol = (Math.floor(Math.random() * 4) + 1) * 5; // 5, 10, 15, 20
                baseUnit = Math.floor(Math.random() * 5) + 2;
                baseVol = (Math.floor(Math.random() * 4) + 1) * 5;
            } else {
                acidUnit = Math.floor(Math.random() * 4) + 1;
                acidVol = Math.floor(Math.random() * 10) + 10; // 10~19
                baseUnit = Math.floor(Math.random() * 4) + 1;
                baseVol = Math.floor(Math.random() * 10) + 10;
            }

            totalCl = acidUnit * acidVol;
            totalH = acidUnit * acidVol;
            totalNa = baseUnit * baseVol;
            totalOH = baseUnit * baseVol;

            remainingH = 0;
            remainingOH = 0;

            if (totalH > totalOH) remainingH = totalH - totalOH;
            else remainingOH = totalOH - totalH;

            totalVolume = acidVol + baseVol;
            totalIonsSum = totalCl + totalNa + remainingH + remainingOH;

            // 정수 조건 확립 (1 이상의 자연수)
            if (totalIonsSum % totalVolume === 0 && totalIonsSum / totalVolume > 0) {
                ionsPerUnitVolume = totalIonsSum / totalVolume;
                break;
            }
        }

        setProblem({
            acidUnit, acidVol, baseUnit, baseVol,
            answers: {
                q1: totalVolume,
                q2_na: totalNa,
                q2_cl: totalCl,
                q3: ionsPerUnitVolume // 이제 무조건 정수
            }
        });

        // 상태 초기화
        setAnswers({ q1: '', q2_na: '', q2_cl: '', q3: '' });
        setFeedback({ q1: null, q2: null, q3: null });
        setShowConfetti(false);
    }, []);

    // 컴포넌트 마운트 및 레벨 변경 시 문제 새로 생성
    useEffect(() => {
        generateProblem(level);
    }, [level, generateProblem]);

    // 정답 제출 핸들러
    const handleSubmit = (qNum) => {
        if (!problem) return;

        const newFeedback = { ...feedback };
        let isAllCorrectSoFar = true;

        if (qNum === 1) {
            const val = Number(answers.q1);
            if (val === problem.answers.q1) {
                newFeedback.q1 = { isCorrect: true, msg: '정답입니다! 두 용액의 부피를 잘 더했습니다.' };
            } else {
                newFeedback.q1 = { isCorrect: false, msg: `힌트: 단순히 산의 부피(${problem.acidVol}mL)와 염기의 부피(${problem.baseVol}mL)를 더해보세요.` };
            }
        }

        if (qNum === 2) {
            const naVal = Number(answers.q2_na);
            const clVal = Number(answers.q2_cl);
            if (naVal === problem.answers.q2_na && clVal === problem.answers.q2_cl) {
                newFeedback.q2 = { isCorrect: true, msg: '완벽합니다! (단위 부피당 이온 수 × 해당 용액의 부피) 공식을 정확히 이해했네요.' };
            } else {
                newFeedback.q2 = { isCorrect: false, msg: `오답입니다. 힌트: Na⁺는 (염기의 단위부피당 이온수 × 염기 부피)로, Cl⁻는 (산의 단위부피당 이온수 × 산 부피)로 계산해보세요.` };
            }
        }

        if (qNum === 3) {
            const val = Number(answers.q3);
            if (val === problem.answers.q3) {
                newFeedback.q3 = { isCorrect: true, msg: '✨ 대단합니다! 중화 반응 후 물이 되어 사라진 이온까지 정확히 계산하여 킬러 문항을 맞혔습니다! ✨' };
                setShowConfetti(true);
            } else {
                newFeedback.q3 = { isCorrect: false, msg: `힌트: 혼합 용액 속에 실제로 남아있는 모든 이온의 총 개수(Na⁺, Cl⁻, 그리고 남은 H⁺나 OH⁻)를 구한 뒤, Q1에서 구한 '전체 부피'로 나누었는지 확인해보세요.` };
            }
        }

        setFeedback(newFeedback);
    };

    if (!problem) return <div>문제 로딩 중...</div>;

    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f2f5', borderRadius: '12px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Pretendard, sans-serif' }}>

            {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={500} />}

            <h2 style={{ textAlign: 'center', color: '#1f1f1f', marginBottom: '20px' }}>📝 2단계: 단위 부피당 이온 수 퀴즈 모듈</h2>

            {/* 개념 설명 카드 */}
            <div style={{ backgroundColor: '#e6fffb', border: '2px solid #36cfc9', borderRadius: '12px', padding: '20px', marginBottom: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <h3 style={{ color: '#08979c', marginTop: 0 }}>💡 필수 핵심 개념 (2022 개정안 반영)</h3>
                <p style={{ fontSize: '1.2em', fontWeight: 'bold', textAlign: 'center', padding: '15px', backgroundColor: '#fff', borderRadius: '8px', border: '1px dashed #36cfc9' }}>
                    특정 용액 속 이온의 총 개수 = (단위 부피당 이온 수) × (해당 용액의 부피)
                </p>
                <p style={{ color: '#555', margin: '10px 0 0 0', textAlign: 'center' }}>
                    ※ 구경꾼 이온(Na⁺, Cl⁻)은 혼합 후에도 총 개수가 변하지 않지만, 혼합 용액의 <b>단위 부피당 이온 수</b>를 구할 때는 <b>반드시 전체 부피</b>로 나누어 주어야 합니다.
                </p>
            </div>

            {/* 난이도 선택 바 */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
                <span style={{ fontWeight: 'bold', alignSelf: 'center', marginRight: '10px' }}>난이도 선택:</span>
                {[1, 2, 3].map(lvl => (
                    <button
                        key={lvl}
                        onClick={() => setLevel(lvl)}
                        style={{
                            padding: '10px 25px', fontSize: '1.1em', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer',
                            border: level === lvl ? 'none' : '1px solid #ccc',
                            backgroundColor: level === lvl ? '#1890ff' : '#fff',
                            color: level === lvl ? '#fff' : '#666',
                            boxShadow: level === lvl ? '0 4px 8px rgba(24,144,255,0.3)' : 'none',
                            transition: 'all 0.2s'
                        }}
                    >
                        {lvl === 1 ? '🌱 기초' : lvl === 2 ? '🌿 보통' : '🔥 심화 (킬러)'}
                    </button>
                ))}
            </div>

            {/* 문제 제시 컨테이너 */}
            <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', marginBottom: '30px' }}>
                <h3 style={{ borderBottom: '2px solid #f0f0f0', paddingBottom: '10px', marginTop: 0 }}>🧪 현재 실험 데이터</h3>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-around', margin: '20px 0' }}>
                    <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff1f0', borderRadius: '8px', border: '1px solid #ffccc7', textAlign: 'center' }}>
                        <h4 style={{ color: '#cf1322', marginTop: 0, fontSize: '1.2em' }}>염산 (HCl)</h4>
                        <p style={{ fontSize: '1.1em' }}>단위 부피당 이온 수: <strong>{problem.acidUnit}N</strong></p>
                        <p style={{ fontSize: '1.1em' }}>준비된 부피: <strong>{problem.acidVol} mL</strong></p>
                    </div>
                    <div style={{ flex: 1, padding: '20px', backgroundColor: '#e6f7ff', borderRadius: '8px', border: '1px solid #91d5ff', textAlign: 'center' }}>
                        <h4 style={{ color: '#096dd9', marginTop: 0, fontSize: '1.2em' }}>수산화 나트륨 (NaOH)</h4>
                        <p style={{ fontSize: '1.1em' }}>단위 부피당 이온 수: <strong>{problem.baseUnit}N</strong></p>
                        <p style={{ fontSize: '1.1em' }}>준비된 부피: <strong>{problem.baseVol} mL</strong></p>
                    </div>
                </div>
            </div>

            {/* 퀴즈 영역 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* Q1 */}
                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: '5px solid #d4b106' }}>
                    <h4>질문 1. 위 두 용액을 하나로 혼합했을 때, 혼합 용액의 전체 부피는 몇 mL 인가요?</h4>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input type="number" placeholder="예: 30" value={answers.q1} onChange={(e) => setAnswers({ ...answers, q1: e.target.value })} style={{ padding: '10px', fontSize: '1.1em', borderRadius: '6px', border: '1px solid #ccc', width: '150px' }} /> mL
                        <button onClick={() => handleSubmit(1)} style={{ padding: '10px 20px', backgroundColor: '#d4b106', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>정답 확인</button>
                    </div>
                    {feedback.q1 && <p style={{ color: feedback.q1.isCorrect ? '#52c41a' : '#ff4d4f', fontWeight: 'bold', marginTop: '10px' }}>{feedback.q1.msg}</p>}
                </div>

                {/* Q2 */}
                {feedback.q1?.isCorrect && (
                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: '5px solid #1890ff', animation: 'fadeIn 0.5s' }}>
                        <h4>질문 2. 혼합 전, 각 용액 속에 들어있던 구경꾼 이온인 Na⁺와 Cl⁻의 실제 개수(상댓값)는 각각 얼마인가요?</h4>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <div>
                                <label style={{ fontWeight: 'bold', marginRight: '5px' }}>Na⁺ 이온 수:</label>
                                <input type="number" placeholder="N" value={answers.q2_na} onChange={(e) => setAnswers({ ...answers, q2_na: e.target.value })} style={{ padding: '10px', fontSize: '1.1em', borderRadius: '6px', border: '1px solid #ccc', width: '100px' }} />
                            </div>
                            <div>
                                <label style={{ fontWeight: 'bold', marginRight: '5px' }}>Cl⁻ 이온 수:</label>
                                <input type="number" placeholder="N" value={answers.q2_cl} onChange={(e) => setAnswers({ ...answers, q2_cl: e.target.value })} style={{ padding: '10px', fontSize: '1.1em', borderRadius: '6px', border: '1px solid #ccc', width: '100px' }} />
                            </div>
                            <button onClick={() => handleSubmit(2)} style={{ padding: '10px 20px', backgroundColor: '#1890ff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>정답 확인</button>
                        </div>
                        {feedback.q2 && <p style={{ color: feedback.q2.isCorrect ? '#52c41a' : '#ff4d4f', fontWeight: 'bold', marginTop: '10px' }}>{feedback.q2.msg}</p>}
                    </div>
                )}

                {/* Q3 (Killer) */}
                {feedback.q2?.isCorrect && (
                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: '5px solid #722ed1', animation: 'fadeIn 0.5s' }}>
                        <h4 style={{ color: '#722ed1' }}>🔥 질문 3. 혼합 용액 속에 들어있는 '단위 부피당 모든 이온의 수'의 합은 얼마인가요?</h4>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <input type="number" placeholder="자연수 입력" value={answers.q3} onChange={(e) => setAnswers({ ...answers, q3: e.target.value })} style={{ padding: '10px', fontSize: '1.1em', borderRadius: '6px', border: '1px solid #ccc', width: '250px' }} /> N/mL
                            <button onClick={() => handleSubmit(3)} style={{ padding: '10px 20px', backgroundColor: '#722ed1', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>최종 정답 확인</button>
                        </div>
                        {feedback.q3 && <p style={{ color: feedback.q3.isCorrect ? '#52c41a' : '#ff4d4f', fontWeight: 'bold', marginTop: '10px', lineHeight: '1.4' }}>{feedback.q3.msg}</p>}

                        <button onClick={() => generateProblem(level)} style={{ marginTop: '20px', padding: '10px 15px', border: '1px solid #d9d9d9', backgroundColor: '#fafafa', cursor: 'pointer', borderRadius: '6px' }}>↻ 다른 수치로 다시 연습하기</button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default UnitVolumeQuiz;
