import React, { useState, useEffect, useCallback } from 'react';

const KillerLogicEngine = () => {
    const [step, setStep] = useState(1);
    const [problemData, setProblemData] = useState(null);

    // (가) 상태
    const [gaHypothesis, setGaHypothesis] = useState('');
    const [gaIons, setGaIons] = useState({ na: 0, cl: 0, k: 0, h: 0, oh: 0 });
    const [gaFeedback, setGaFeedback] = useState(null);

    // 단위 부피당 이온 수 상태 (Step 2)
    const [ratioAns, setRatioAns] = useState({ a: '', b: '', c: '' });
    const [ratioFeedback, setRatioFeedback] = useState(null);

    // (나) 상태 (Step 3)
    const [naHypothesis, setNaHypothesis] = useState('');
    const [naIons, setNaIons] = useState({ na: 0, cl: 0, k: 0, h: 0, oh: 0 });
    const [naFeedback, setNaFeedback] = useState(null);

    const [showReport, setShowReport] = useState(false);

    // ------------------------------------------
    // 무작위 문제(가설 검증 시나리오) 생성기
    // ------------------------------------------
    const generateProblem = useCallback(() => {
        let candidates = [];

        // a, b, c = 단위 부피(10mL)당 이온 수 (1~4)
        // v1, v2, v3 = 사용 용액 부피 단위 (1~4) * 10

        const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
        const getRatio = (arr) => {
            const valid = arr.filter(v => v > 0).sort((x, y) => x - y);
            if (valid.length < 2) return null;
            const div = valid.reduce((acc, v) => gcd(acc, v));
            return valid.map(v => v / div).join(' : ');
        };

        for (let a = 1; a <= 4; a++) {
            for (let b = 1; b <= 4; b++) {
                for (let c = 1; c <= 4; c++) {
                    for (let v1 = 1; v1 <= 4; v1++) {
                        for (let v2 = 1; v2 <= 3; v2++) {
                            for (let v3 = 1; v3 <= 3; v3++) {
                                const hclVol = v1 * 10, naohVol = v2 * 10, kohVol = v3 * 10;
                                const nCl = a * hclVol, nNa = b * naohVol, nK = c * kohVol;
                                const nH = Math.max(0, nCl - nNa - nK);
                                const nOH = Math.max(0, nNa + nK - nCl);

                                const allRatio = (nH === 0 && nOH === 0) ? getRatio([nCl, nNa, nK]) : null;
                                const catRatio = getRatio([nNa, nK, nH]);
                                const anRatio = getRatio([nCl, nOH]);

                                if (allRatio) candidates.push({ type: 'all', typeLabel: '모든 이온 수의 비', a, b, c, hclVol, naohVol, kohVol, ratioStr: allRatio, nCl, nNa, nK, nH, nOH });
                                if (nH > 0 && catRatio) candidates.push({ type: 'cations', typeLabel: '모든 양이온 수의 비', a, b, c, hclVol, naohVol, kohVol, ratioStr: catRatio, nCl, nNa, nK, nH, nOH });
                                if (nOH > 0 && anRatio) candidates.push({ type: 'anions', typeLabel: '모든 음이온 수의 비', a, b, c, hclVol, naohVol, kohVol, ratioStr: anRatio, nCl, nNa, nK, nH, nOH });
                            }
                        }
                    }
                }
            }
        }

        // 섞기
        candidates.sort(() => Math.random() - 0.5);

        let chosenScenario = null;
        let chosenNa = null;

        // CSAT 킬러 문항 엄밀성 검증 (나)의 정답이 단 1개로 도출되는가?
        for (let sc of candidates) {
            const na_vHCl = (Math.floor(Math.random() * 4) + 1) * 10;
            const na_vNaOH = (Math.floor(Math.random() * 4) + 1) * 10;
            const na_vKOH = (Math.floor(Math.random() * 4) + 1) * 10;
            if (na_vHCl === sc.hclVol && na_vNaOH === sc.naohVol && na_vKOH === sc.kohVol) continue;

            const getNaOutcome = (ta, tb, tc) => {
                const cl = ta * na_vHCl, na = tb * na_vNaOH, k = tc * na_vKOH;
                const h = Math.max(0, cl - na - k);
                const oh = Math.max(0, na + k - cl);
                const hypo = h > 0 ? 'acidic' : oh > 0 ? 'basic' : 'neutral';
                const valid = [cl, na, k, h, oh].filter(v => v > 0).sort((x, y) => x - y);
                const div = valid.reduce((acc, v) => gcd(acc, v));
                const ratioStr = valid.map(v => v / div).join(':');
                return { hypo, ratioStr, h, oh };
            };

            const trueOutcome = getNaOutcome(sc.a, sc.b, sc.c);
            let isUnique = true;

            for (let ta = 1; ta <= 4; ta++) {
                for (let tb = 1; tb <= 4; tb++) {
                    for (let tc = 1; tc <= 4; tc++) {
                        const tcl = ta * sc.hclVol, tna = tb * sc.naohVol, tk = tc * sc.kohVol;
                        const th = Math.max(0, tcl - tna - tk);
                        const toh = Math.max(0, tna + tk - tcl);

                        let tRatio = null;
                        if (sc.type === 'all' && th === 0 && toh === 0) tRatio = getRatio([tcl, tna, tk]);
                        if (sc.type === 'cations' && th > 0) tRatio = getRatio([tna, tk, th]);
                        if (sc.type === 'anions' && toh > 0) tRatio = getRatio([tcl, toh]);

                        // 타겟(가) 조건을 만족하는가?
                        if (tRatio === sc.ratioStr) {
                            const testOutcome = getNaOutcome(ta, tb, tc);
                            if (testOutcome.hypo !== trueOutcome.hypo || testOutcome.ratioStr !== trueOutcome.ratioStr) {
                                isUnique = false;
                                break;
                            }
                        }
                    }
                    if (!isUnique) break;
                }
                if (!isUnique) break;
            }

            if (isUnique) {
                chosenScenario = sc;
                chosenNa = { vHCl: na_vHCl, vNaOH: na_vNaOH, vKOH: na_vKOH, outcome: trueOutcome };
                break;
            }
        }

        if (!chosenScenario) {
            // 만약 고립된 조합이 없으면 폴백으로 단순 선택
            chosenScenario = candidates[0];
            const na_vHCl = 10, na_vNaOH = 20, na_vKOH = 30;
            const getNaOutcome = (ta, tb, tc) => {
                const cl = ta * na_vHCl, na = tb * na_vNaOH, k = tc * na_vKOH;
                const h = Math.max(0, cl - na - k), oh = Math.max(0, na + k - cl);
                const valid = [cl, na, k, h, oh].filter(v => v > 0).sort((x, y) => x - y);
                return { hypo: h > 0 ? 'acidic' : oh > 0 ? 'basic' : 'neutral', ratioStr: valid.map(v => v / valid.reduce((acc, v) => gcd(acc, v))).join(':') };
            };
            chosenNa = { vHCl: na_vHCl, vNaOH: na_vNaOH, vKOH: na_vKOH, outcome: getNaOutcome(chosenScenario.a, chosenScenario.b, chosenScenario.c) };
        }

        setProblemData({
            ga: chosenScenario,
            na: chosenNa,
            ans: {
                a: chosenScenario.a, b: chosenScenario.b, c: chosenScenario.c,
                na_acidic: chosenNa.outcome.hypo === 'acidic', na_basic: chosenNa.outcome.hypo === 'basic', na_neutral: chosenNa.outcome.hypo === 'neutral',
                na_ratio: chosenNa.outcome.ratioStr
            }
        });

        // 상태 초기화
        setStep(1);
        setGaHypothesis('');
        setGaIons({ na: 0, cl: 0, k: 0, h: 0, oh: 0 });
        setGaFeedback(null);
        setRatioAns({ a: '', b: '', c: '' });
        setRatioFeedback(null);
        setNaHypothesis('');
        setNaIons({ na: 0, cl: 0, k: 0, h: 0, oh: 0 });
        setNaFeedback(null);
        setShowReport(false);
    }, []);

    useEffect(() => {
        generateProblem();
    }, [generateProblem]);

    // 유틸리티
    const handleIonChange = (target, ion, val) => {
        const num = Math.max(0, parseInt(val) || 0);
        if (target === 'ga') setGaIons(p => ({ ...p, [ion]: num }));
        else setNaIons(p => ({ ...p, [ion]: num }));
    };

    const calculateBalance = (ions) => {
        const cations = ions.na + ions.k + ions.h;
        const anions = ions.cl + ions.oh;
        return { cations, anions, isBalanced: cations === anions && cations > 0 };
    };

    // --- (가) 로직 검증 ---
    const checkGaLogic = () => {
        if (!gaHypothesis) {
            setGaFeedback({ type: 'error', msg: '먼저 (가)에 대한 액성 가설을 설정해주세요.' });
            return;
        }
        const { cations, anions, isBalanced } = calculateBalance(gaIons);

        if (gaIons.h > 0 && gaIons.oh > 0) {
            setGaFeedback({ type: 'error', msg: '💥 치명적 모순: H⁺와 OH⁻는 공존할 수 없습니다. 한계 반응물을 찾아 0으로 만드세요.' });
            return;
        }
        if (gaHypothesis === 'acidic' && gaIons.h === 0) {
            setGaFeedback({ type: 'warning', msg: '🤔 가설 모순: 산성이라고 가정했지만 H⁺가 존재하지 않습니다. 가설이나 이온 수를 수정하세요.' });
            return;
        }
        if (gaHypothesis === 'basic' && gaIons.oh === 0) {
            setGaFeedback({ type: 'warning', msg: '🤔 가설 모순: 염기성이라고 가정했지만 OH⁻가 존재하지 않습니다. 가설이나 이온 수를 수정하세요.' });
            return;
        }
        if (gaHypothesis === 'neutral' && (gaIons.h > 0 || gaIons.oh > 0)) {
            setGaFeedback({ type: 'warning', msg: '🤔 가설 모순: 중성이라고 가정했지만 H⁺나 OH⁻가 남아있습니다.' });
            return;
        }
        if (!isBalanced) {
            setGaFeedback({ type: 'error', msg: `🚫 전하 불균형: 양이온 전하합(${cations})과 음이온 전하합(${anions})이 일치하지 않습니다.` });
            return;
        }

        const existingIons = Object.values(gaIons).filter(v => v > 0);
        const sorted = [...existingIons].sort((a, b) => a - b);
        const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
        const div = sorted.reduce((a, b) => gcd(a, b));
        let ratioStr;

        // 유형에 따른 올바른 이온 비율 검증
        if (problemData.ga.type === 'all') {
            const allRatio = sorted.map(v => v / div).join(' : ');
            ratioStr = allRatio;
        } else if (problemData.ga.type === 'cations') {
            const cats = [gaIons.na, gaIons.k, gaIons.h].filter(v => v > 0).sort((a, b) => a - b);
            if (cats.length < 2) return setGaFeedback({ type: 'error', msg: '양이온의 종류가 부족합니다.' });
            const cDiv = cats.reduce((a, b) => gcd(a, b));
            ratioStr = cats.map(v => v / cDiv).join(' : ');
        } else if (problemData.ga.type === 'anions') {
            const ans = [gaIons.cl, gaIons.oh].filter(v => v > 0).sort((a, b) => a - b);
            if (ans.length < 2) return setGaFeedback({ type: 'error', msg: '음이온의 종류가 부족합니다.' });
            const aDiv = ans.reduce((a, b) => gcd(a, b));
            ratioStr = ans.map(v => v / aDiv).join(' : ');
        }

        // 비율을 띄어쓰기 무시하고 비교
        const strip = s => s.replace(/\s/g, '');
        if (strip(ratioStr) !== strip(problemData.ga.ratioStr)) {
            setGaFeedback({ type: 'warning', msg: `🤔 조건 불일치: 예측하신 ${problemData.ga.typeLabel} 비율이 ${ratioStr} 입니다. 문제의 조건(${problemData.ga.ratioStr})과 일치하지 않습니다.` });
            return;
        }

        setGaFeedback({ type: 'success', msg: '🎉 완벽합니다! 모순 없는 가설과 이온 수 상댓값을 증명해냈습니다. 다음 추론을 개방합니다.' });
        setStep(2);
    };

    // --- 단위 부피당 이온 수 비 로직 검증 ---
    const checkRatioLogic = () => {
        const { a, b, c } = ratioAns;
        const ra = Number(a), rb = Number(b), rc = Number(c);

        if (ra > 0 && rb > 0 && rc > 0) {
            // Check if student's ratio produces the (가) ratio properly
            const nCl = ra * problemData.ga.hclVol;
            const nNa = rb * problemData.ga.naohVol;
            const nK = rc * problemData.ga.kohVol;
            const nH = Math.max(0, nCl - nNa - nK);
            const nOH = Math.max(0, nNa + nK - nCl);
            const hType = nH > 0 ? 'acidic' : nOH > 0 ? 'basic' : 'neutral';

            const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
            const getRatio = arr => {
                const valid = arr.filter(v => v > 0).sort((x, y) => x - y);
                if (valid.length < 2) return null;
                const div = valid.reduce((acc, v) => gcd(acc, v));
                return valid.map(v => v / div).join(' : ');
            };

            let tRatio = null;
            if (problemData.ga.type === 'all' && hType === 'neutral') tRatio = getRatio([nCl, nNa, nK]);
            if (problemData.ga.type === 'cations' && hType === 'acidic') tRatio = getRatio([nNa, nK, nH]);
            if (problemData.ga.type === 'anions' && hType === 'basic') tRatio = getRatio([nCl, nOH]);

            const strip = s => s ? s.replace(/\s/g, '') : '';
            if (strip(tRatio) === strip(problemData.ga.ratioStr) && hType === gaHypothesis) {
                setRatioFeedback({ type: 'success', msg: '✨ 천재적입니다! (가)의 이온 수와 부피를 통해 단위 부피당 이온 수 비를 정확히 역산했습니다.' });
                setStep(3);
                return;
            }
        }

        setRatioFeedback({ type: 'error', msg: `오답입니다. 단위 부피당 이온 수 비로 계산한 결과가 (가)의 조건(${problemData.ga.typeLabel} ${problemData.ga.ratioStr})과 모순을 일으킵니다.` });
    };

    // --- (나) 로직 검증 ---
    const checkNaLogic = () => {
        if (!naHypothesis) {
            setNaFeedback({ type: 'error', msg: '먼저 (나)에 대한 액성 가설을 설정해주세요.' });
            return;
        }
        const { cations, anions, isBalanced } = calculateBalance(naIons);

        if (naIons.h > 0 && naIons.oh > 0) return setNaFeedback({ type: 'error', msg: '💥 치명적 모순: H⁺와 OH⁻는 공존할 수 없습니다.' });
        if (naHypothesis === 'acidic' && naIons.h === 0) return setNaFeedback({ type: 'warning', msg: '🤔 가설 모순: 산성조건 위배' });
        if (naHypothesis === 'basic' && naIons.oh === 0) return setNaFeedback({ type: 'warning', msg: '🤔 가설 모순: 염기성조건 위배' });
        if (!isBalanced) return setNaFeedback({ type: 'error', msg: `🚫 전하 불균형: 양이온(${cations}) vs 음이온(${anions})` });

        // 학생이 도출한 ra, rb, rc를 바탕으로 타겟 (나) 비율과 액성 검증
        const { a: ra, b: rb, c: rc } = ratioAns;
        const userA = Number(ra), userB = Number(rb), userC = Number(rc);
        const vHCl = problemData.na.vHCl, vNaOH = problemData.na.vNaOH, vKOH = problemData.na.vKOH;

        const targetCl = userA * vHCl, targetNa = userB * vNaOH, targetK = userC * vKOH;
        const targetH = Math.max(0, targetCl - targetNa - targetK);
        const targetOH = Math.max(0, targetNa + targetK - targetCl);

        const actualIons = [targetCl, targetNa, targetK, targetH, targetOH].filter(v => v > 0).sort((x, y) => x - y);
        const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
        const div = actualIons.reduce((a, b) => gcd(a, b));
        const targetRatioStr = actualIons.map(v => v / div).join(':');

        // 유저 입력 분석
        const userIons = Object.values(naIons).filter(v => v > 0).sort((a, b) => a - b);
        const userDiv = userIons.reduce((a, b) => gcd(a, b));
        const userRatioStr = userIons.map(v => v / userDiv).join(':');

        // 액성 검사
        const targetHypothesis = targetH > 0 ? 'acidic' : targetOH > 0 ? 'basic' : 'neutral';

        if (naHypothesis === targetHypothesis && targetRatioStr === userRatioStr) {
            setNaFeedback({ type: 'success', msg: '🏆 완벽한 추론입니다! 모든 킬러 조건을 뚫고 정답에 도달했습니다!' });
            setShowReport(true);
        } else {
            setNaFeedback({ type: 'warning', msg: `🤔 추론 오류: 전하량 보존은 맞으나, 도출된 단위 부피당 이온 수 비(${userA}:${userB}:${userC})에 따른 실제 (나)의 혼합 결과와 다릅니다. (부피: HCl ${vHCl}, NaOH ${vNaOH}, KOH ${vKOH})` });
        }
    };

    const renderGauge = (ions) => {
        const { cations, anions } = calculateBalance(ions);
        const max = Math.max(cations, anions, 1);
        const catWidth = (cations / max) * 100;
        const anWidth = (anions / max) * 100;

        return (
            <div style={{ marginTop: '15px', padding: '10px', background: '#f5f5f5', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 10px 0', textAlign: 'center' }}>⚖️ 실시간 전하량 밸런스</h4>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '50%', background: '#ccc', height: '20px', borderRadius: '10px 0 0 10px', display: 'flex', justifyContent: 'flex-end', overflow: 'hidden' }}>
                        <div style={{ width: `${catWidth}%`, background: '#1890ff', height: '100%', transition: 'width 0.3s' }}></div>
                    </div>
                    <div style={{ padding: '0 10px', fontWeight: 'bold' }}>vs</div>
                    <div style={{ width: '50%', background: '#ccc', height: '20px', borderRadius: '0 10px 10px 0', overflow: 'hidden' }}>
                        <div style={{ width: `${anWidth}%`, background: '#cf1322', height: '100%', transition: 'width 0.3s' }}></div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85em', marginTop: '5px' }}>
                    <span>Σ 양이온: {cations}</span>
                    <span>Σ 음이온: {anions}</span>
                </div>
            </div>
        );
    };

    if (!problemData) return <div style={{ padding: '40px', textAlign: 'center' }}>엔진 초기화 중...</div>;

    return (
        <div style={{ display: 'flex', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>

            {/* 왼쪽: 상황 제시 패널 */}
            <div style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', alignSelf: 'flex-start' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #722ed1', paddingBottom: '10px', marginBottom: '20px' }}>
                    <h2 style={{ color: '#722ed1', margin: 0 }}>🔥 킬러 문항: 혼합 3염기-산 추론</h2>
                    <button onClick={generateProblem} style={{ padding: '6px 12px', background: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9em' }}>↻ 새 문제 생성</button>
                </div>

                <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px', borderLeft: '4px solid #722ed1' }}>
                    <p style={{ margin: '0 0 10px 0' }}>단위 부피당 이온 수가 각각 <strong>a</strong>, <strong>b</strong>, <strong>c</strong> 인 HCl, NaOH, KOH 용액이 있다. 다음은 이를 혼합한 실험이다.</p>
                    <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                        <li><strong>(가) 혼합</strong>: HCl {problemData.ga.hclVol}mL + NaOH {problemData.ga.naohVol}mL + KOH {problemData.ga.kohVol}mL </li>
                        <li style={{ color: '#cf1322' }}>💡 (가)에 존재하는 <strong>{problemData.ga.typeLabel}</strong>는 <strong>{problemData.ga.ratioStr}</strong> 이다.</li>
                        <li style={{ marginTop: '10px' }}><strong>(나) 혼합</strong>: HCl {problemData.na.vHCl}mL + NaOH {problemData.na.vNaOH}mL + KOH {problemData.na.vKOH}mL</li>
                    </ul>
                </div>

                <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
                    <h3 style={{ margin: '0 0 15px 0' }}>📊 한계 반응물 (Limiting Reactant) 추적기</h3>
                    <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '10px' }}>입력한 이온 데이터에 따라 완전히 소멸한 이온이 자동 비활성화됩니다.</p>

                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        {['H⁺', 'OH⁻'].map(ionStr => {
                            const currentIons = step === 1 ? gaIons : naIons;
                            const isDead = currentIons[ionStr.toLowerCase().replace('⁺', '').replace('⁻', '')] === 0;
                            return (
                                <div key={ionStr} style={{
                                    padding: '10px 20px', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.2em',
                                    background: isDead ? '#eee' : '#e6f7ff',
                                    color: isDead ? '#aaa' : '#0050b3',
                                    border: `2px solid ${isDead ? '#ccc' : '#1890ff'}`,
                                    transition: 'all 0.3s'
                                }}>
                                    {ionStr} {isDead && '(소멸)'}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* 오른쪽: 가설 검증 엔진 인터페이스 */}
            <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* Step 1: (가) 분석 */}
                <div style={{ background: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: step === 1 ? '2px solid #1890ff' : '1px solid #ddd', opacity: step < 1 ? 0.4 : 1 }}>
                    <h3 style={{ margin: '0 0 15px 0' }}>[추론 1단계] (가) 용액의 숨겨진 비례식 풀이</h3>

                    <div style={{ marginBottom: '15px' }}>
                        <span style={{ fontWeight: 'bold', marginRight: '10px' }}>🧭 (가)의 액성 가설 설정:</span>
                        <select disabled={step !== 1} value={gaHypothesis} onChange={e => setGaHypothesis(e.target.value)} style={{ padding: '8px', borderRadius: '4px' }}>
                            <option value="">-- 액성 선택 --</option>
                            <option value="acidic">산성일 것이다 (H⁺ 생존)</option>
                            <option value="neutral">중성일 것이다 (H⁺, OH⁻ 공멸)</option>
                            <option value="basic">염기성일 것이다 (OH⁻ 생존)</option>
                        </select>
                    </div>

                    <p style={{ fontSize: '0.9em', margin: '0 0 10px 0' }}>예측한 (가)의 이온 수 상댓값을 자유롭게 입력하여 문제의 {problemData.ga.typeLabel} {problemData.ga.ratioStr} 를 증명하세요.</p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {['Na', 'Cl', 'K', 'H', 'OH'].map(ion => (
                            <div key={ion} style={{ display: 'flex', flexDirection: 'column', width: '60px' }}>
                                <label style={{ textAlign: 'center', fontWeight: 'bold' }}>{ion}{['Na', 'K', 'H'].includes(ion) ? '⁺' : '⁻'}</label>
                                <input disabled={step !== 1} type="number" min="0" value={gaIons[ion.toLowerCase()]} onChange={e => handleIonChange('ga', ion.toLowerCase(), e.target.value)} style={{ padding: '8px', textAlign: 'center', borderRadius: '4px', border: '1px solid #ccc' }} />
                            </div>
                        ))}
                    </div>

                    {renderGauge(gaIons)}

                    {step === 1 && (
                        <button onClick={checkGaLogic} style={{ marginTop: '15px', width: '100%', padding: '12px', background: '#1890ff', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1em' }}>가설 검증 / 논리 실행</button>
                    )}
                    {gaFeedback && <div style={{ marginTop: '15px', padding: '10px', borderRadius: '4px', background: gaFeedback.type === 'error' ? '#fff2f0' : gaFeedback.type === 'warning' ? '#fffbe6' : '#f6ffed', color: gaFeedback.type === 'error' ? '#cf1322' : gaFeedback.type === 'warning' ? '#d4b106' : '#389e0d', fontWeight: 'bold' }}>{gaFeedback.msg}</div>}
                </div>

                {/* Step 2: 농도비 계산 */}
                <div style={{ background: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: step === 2 ? '2px solid #1890ff' : '1px solid #ddd', opacity: step < 2 ? 0.4 : 1 }}>
                    <h3 style={{ margin: '0 0 15px 0' }}>[추론 2단계] 단위 부피당 이온 수 비(a, b, c) 확정</h3>
                    <p style={{ fontSize: '0.9em', margin: '0 0 10px 0' }}>스텝 1에서 도출한 구경꾼 이온의 개수와 혼합 부피 데이터를 역추적하여, 세 용액의 단위 부피당 이온 수 비를 구하세요.</p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>a : b : c = </span>
                        <input disabled={step !== 2} type="number" placeholder="a" value={ratioAns.a} onChange={e => setRatioAns(p => ({ ...p, a: e.target.value }))} style={{ width: '50px', padding: '8px', textAlign: 'center' }} /> :
                        <input disabled={step !== 2} type="number" placeholder="b" value={ratioAns.b} onChange={e => setRatioAns(p => ({ ...p, b: e.target.value }))} style={{ width: '50px', padding: '8px', textAlign: 'center' }} /> :
                        <input disabled={step !== 2} type="number" placeholder="c" value={ratioAns.c} onChange={e => setRatioAns(p => ({ ...p, c: e.target.value }))} style={{ width: '50px', padding: '8px', textAlign: 'center' }} />
                        {step === 2 && <button onClick={checkRatioLogic} style={{ padding: '8px 16px', background: '#722ed1', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>입력</button>}
                    </div>
                    {ratioFeedback && <div style={{ marginTop: '10px', color: ratioFeedback.type === 'error' ? '#cf1322' : '#389e0d', fontWeight: 'bold' }}>{ratioFeedback.msg}</div>}
                </div>

                {/* Step 3: (나) 분석 */}
                <div style={{ background: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: step === 3 ? '2px solid #1890ff' : '1px solid #ddd', opacity: step < 3 ? 0.4 : 1 }}>
                    <h3 style={{ margin: '0 0 15px 0' }}>[추론 3단계] (나) 용액 최종 액성 돌파</h3>

                    <div style={{ marginBottom: '15px' }}>
                        <span style={{ fontWeight: 'bold', marginRight: '10px' }}>🧭 (나)의 액성 가설 설정:</span>
                        <select disabled={step !== 3} value={naHypothesis} onChange={e => setNaHypothesis(e.target.value)} style={{ padding: '8px', borderRadius: '4px' }}>
                            <option value="">-- 액성 선택 --</option>
                            <option value="acidic">산성일 것이다 (H⁺ 생존)</option>
                            <option value="neutral">중성일 것이다 (H⁺, OH⁻ 공멸)</option>
                            <option value="basic">염기성일 것이다 (OH⁻ 생존)</option>
                        </select>
                    </div>

                    <p style={{ fontSize: '0.9em', margin: '0 0 10px 0' }}>확정된 단위 부피당 이온 수 비를 바탕으로 (나)의 각각 혼합된 이온 상댓값을 계산해 넣으세요.</p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {['Na', 'Cl', 'K', 'H', 'OH'].map(ion => (
                            <div key={ion} style={{ display: 'flex', flexDirection: 'column', width: '60px' }}>
                                <label style={{ textAlign: 'center', fontWeight: 'bold' }}>{ion}{['Na', 'K', 'H'].includes(ion) ? '⁺' : '⁻'}</label>
                                <input disabled={step !== 3} type="number" min="0" value={naIons[ion.toLowerCase()]} onChange={e => handleIonChange('na', ion.toLowerCase(), e.target.value)} style={{ padding: '8px', textAlign: 'center', borderRadius: '4px', border: '1px solid #ccc' }} />
                            </div>
                        ))}
                    </div>

                    {step === 3 && renderGauge(naIons)}

                    {step === 3 && (
                        <button onClick={checkNaLogic} style={{ marginTop: '15px', width: '100%', padding: '12px', background: '#cf1322', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1em' }}>최종 정답 확인</button>
                    )}
                    {naFeedback && <div style={{ marginTop: '15px', padding: '10px', borderRadius: '4px', background: naFeedback.type === 'error' ? '#fff2f0' : naFeedback.type === 'warning' ? '#fffbe6' : '#f6ffed', color: naFeedback.type === 'error' ? '#cf1322' : naFeedback.type === 'warning' ? '#d4b106' : '#389e0d', fontWeight: 'bold' }}>{naFeedback.msg}</div>}
                </div>
            </div>

            {/* 최종 리포트 모달 */}
            {showReport && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
                    <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', maxWidth: '600px', width: '90%', animation: 'slideUp 0.5s' }}>
                        <h1 style={{ color: '#722ed1', textAlign: 'center', marginBottom: '30px' }}>🏆 킬러 로직 클리어 리포트</h1>
                        <p style={{ fontSize: '1.1em', lineHeight: '1.6' }}>놀라운 논리력을 보여주셨습니다! 정답을 향한 당신의 사고 추적 경로입니다.</p>

                        <ul style={{ padding: 0, listStyle: 'none', margin: '20px 0' }}>
                            <li style={{ padding: '15px', borderLeft: '4px solid #1890ff', background: '#e6f7ff', marginBottom: '10px' }}>
                                <strong>Step 1. 모순 배제 가설 채택</strong><br />
                                주어진 <strong>{problemData.ga.typeLabel} {problemData.ga.ratioStr}</strong> 조건을 읽고, 양팔 저울의 전하량 보존 법칙을 지키면서 (가)의 액성이 <strong>{problemData.ga.type === 'cations' ? '산성' : problemData.ga.type === 'anions' ? '염기성' : '중성'}</strong> 임을 완벽하게 증명해냈습니다!
                            </li>
                            <li style={{ padding: '15px', borderLeft: '4px solid #722ed1', background: '#f9f0ff', marginBottom: '10px' }}>
                                <strong>Step 2. 미지수 역추적 성공</strong><br />
                                입력한 이온의 개수를 각 용액의 부피로 나누어 단위 부피당 이온 수 비를 정확하게 계산해냈습니다.
                            </li>
                            <li style={{ padding: '15px', borderLeft: '4px solid #cf1322', background: '#fff2f0' }}>
                                <strong>Step 3. 최종 한계 반응물 확인</strong><br />
                                스스로 역추적한 단위 부피당 이온 수 비를 (나)의 변경된 부피({problemData.na.vHCl}, {problemData.na.vNaOH}, {problemData.na.vKOH}) 데이터에 적용하여, 최종적인 액성을 오차 없이 완벽히 도출해 냈습니다.
                            </li>
                        </ul>

                        <button onClick={() => { setShowReport(false); generateProblem(); }} style={{ width: '100%', padding: '15px', background: '#722ed1', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.1em', cursor: 'pointer', fontWeight: 'bold' }}>새로운 킬러 문항 생성</button>
                    </div>
                </div>
            )}

            <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default KillerLogicEngine;
