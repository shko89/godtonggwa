/**
 * 갓통과 B2B 멀티테넌트 채점 & 다차원 성적 분석 엔진 (B2B Grading & Analytics Engine)
 * 
 * 1. 10회분 Fit 20 모의고사 기존 DB 기반 실시간 채점
 * 2. 원점수(회차별 배점 총합 기준) 및 100점 환산 점수 동시 산출
 * 3. 물·화·생·지 4대 영역별 성취도(%) 자동 계산 (방사형 차트용)
 * 4. 학원 내부 통계(독립 격리) + 전국 누적 표본 벤치마크(전체 통합) 듀얼 산출
 */

(function(exports) {
    'use strict';

    // 1. 전국 누적 등급 컷 기준표 (2028 개정 수능 통합과학 공식 5등급제 백분위 기준)
    // 1등급: 상위 10% 이내 (10%)
    // 2등급: 상위 34% 이내 (24%)
    // 3등급: 상위 66% 이내 (32%)
    // 4등급: 상위 90% 이내 (24%)
    // 5등급: 상위 100% (10%)
    function calculateGradeFromPercentile(topPercentile) {
        if (topPercentile <= 10.0) return 1;
        if (topPercentile <= 34.0) return 2;
        if (topPercentile <= 66.0) return 3;
        if (topPercentile <= 90.0) return 4;
        return 5;
    }

    /**
     * 표준정규분포 누적밀도함수(CDF) 다항식 근사 (Abramowitz and Stegun)
     */
    function getCumulativeProbability(z) {
        if (z < -6.5) return 0.0;
        if (z > 6.5) return 1.0;
        const k = 1 / (1 + 0.2316419 * Math.abs(z));
        const poly = k * (0.319381530 + k * (-0.356563782 + k * (1.781477937 + k * (-1.821255978 + 1.330274429 * k))));
        const approx = 1.0 - (1.0 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z) * poly;
        return z < 0 ? 1.0 - approx : approx;
    }

    /**
     * 원점수 기반 전국 상위 백분위(%), 2028 5등급, 표준점수 일괄 산출
     */
    function calculatePercentileAndGrade(rawScore, maxScore, nationalAvg, nationalStd) {
        const avg = (nationalAvg !== undefined && nationalAvg > 0) ? nationalAvg : (maxScore * 0.65);
        const std = (nationalStd !== undefined && nationalStd > 0) ? nationalStd : (maxScore * 0.17);
        const z = (rawScore - avg) / (std || 1);
        const cumProb = getCumulativeProbability(z);
        const topPercentile = Math.max(0.1, Math.min(99.9, Math.round((1 - cumProb) * 1000) / 10));
        const grade = calculateGradeFromPercentile(topPercentile);
        const standardScore = Math.max(20, Math.min(80, Math.round(50 + 10 * z)));
        return {
            topPercentile: topPercentile,
            percentile: Math.round(cumProb * 1000) / 10,
            grade: grade,
            standardScore: standardScore
        };
    }

    /**
     * 핵심 채점 함수
     * @param {Object} examMeta - b2b_fit20_metadata.json의 해당 회차 객체 (questions, totalScore 등)
     * @param {Array<number>} submittedAnswers - 학생이 제출한 20개 답안 배열 [1~5]
     * @param {Object} context - { academyId, studentName, studentPhoneLast4 }
     * @param {Object} academyStats - 학원 내부 통계 { submissions: [...] }
     * @param {Object} nationalBenchmark - 전국 표본 통계 { totalCandidates, nationalAverage, scoreHistogram, itemCorrectRates }
     */
    function gradeSubmission(examMeta, submittedAnswers, context, academyStats, nationalBenchmark) {
        if (!examMeta || !examMeta.questions) {
            throw new Error('[GradingEngine] Valid exam metadata is required');
        }

        const questions = examMeta.questions;
        const maxScore = examMeta.totalScore;
        const questionCount = questions.length; // 20

        let rawScore = 0;
        const gradingResult = [];
        const itemDetails = [];

        // 물/화/생/지 4대 영역별 점수 누적기
        const domainTotals = {
            '물리학': { max: 0, earned: 0 },
            '화학': { max: 0, earned: 0 },
            '생명과학': { max: 0, earned: 0 },
            '지구과학': { max: 0, earned: 0 }
        };

        for (let i = 0; i < questionCount; i++) {
            const q = questions[i];
            const studentAns = Number(submittedAnswers[i] || 0);
            const isCorrect = (studentAns === Number(q.answer));

            gradingResult.push(isCorrect);

            const qScore = Number(q.score || 0);
            if (isCorrect) {
                rawScore += qScore;
            }

            // 영역별 집계 (키워드 매핑 지원)
            let domainKey = q.domain;
            if (!domainTotals[domainKey]) {
                const d = String(q.domain || '').toLowerCase();
                const t = String(q.topic || '').toLowerCase();
                if (d.includes('물리') || t.includes('역학') || t.includes('신호') || t.includes('운동') || t.includes('전기') || t.includes('측정') || t.includes('단위')) {
                    domainKey = '물리학';
                } else if (d.includes('화학') || t.includes('원소') || t.includes('결합') || t.includes('물질') || t.includes('스펙트럼') || t.includes('산화')) {
                    domainKey = '화학';
                } else if (d.includes('생명') || t.includes('세포') || t.includes('유전') || t.includes('단백질') || t.includes('효소')) {
                    domainKey = '생명과학';
                } else if (d.includes('지구') || t.includes('우주') || t.includes('판') || t.includes('지질') || t.includes('해수') || t.includes('환경')) {
                    domainKey = '지구과학';
                } else {
                    domainKey = '물리학';
                }
            }
            domainTotals[domainKey].max += qScore;
            if (isCorrect) {
                domainTotals[domainKey].earned += qScore;
            }

            // 전국 문항별 정답률 (없으면 기본값 추정치 매핑)
            const natCorrectRate = (nationalBenchmark && nationalBenchmark.itemCorrectRates && nationalBenchmark.itemCorrectRates[i]) 
                ? nationalBenchmark.itemCorrectRates[i] 
                : (q.difficulty === 3 ? 42.5 : (q.difficulty === 2 ? 68.0 : 88.5));

            itemDetails.push({
                num: i + 1,
                id: q.id,
                submittedAnswer: studentAns,
                correctAnswer: q.answer,
                isCorrect: isCorrect,
                score: qScore,
                earnedScore: isCorrect ? qScore : 0,
                domain: domainKey,
                topic: q.topic,
                difficulty: q.difficulty,
                nationalCorrectRate: natCorrectRate,
                explanation: q.explanation || ''
            });
        }

        rawScore = Math.round(rawScore * 10) / 10;
        const scaledScore = Math.round((rawScore / maxScore) * 1000) / 10; // 100점 만점 환산

        // 4대 영역별 성취도(%) 계산 (미출제 영역은 null)
        const areaScores = {};
        for (const [domain, data] of Object.entries(domainTotals)) {
            areaScores[domain] = data.max > 0 ? Math.round((data.earned / data.max) * 1000) / 10 : null;
        }

        // 1. [학원 내부 성적 - 독립 격리 계산]
        let academyRank = 1;
        let academyTotal = 1;
        let academyAvg = rawScore;
        let academyHighest = rawScore;

        if (academyStats && Array.isArray(academyStats.submissions)) {
            const scores = academyStats.submissions.map(s => s.rawScore).concat([rawScore]);
            academyTotal = scores.length;
            scores.sort((a, b) => b - a);
            academyRank = scores.indexOf(rawScore) + 1;
            academyHighest = Math.max(...scores);
            const sum = scores.reduce((a, b) => a + b, 0);
            academyAvg = Math.round((sum / scores.length) * 10) / 10;
        }

        // 2. [전국 벤치마크 지표 - 전체 통합 계산]
        let nationalAvg = (nationalBenchmark && nationalBenchmark.nationalAverage) || Math.round(maxScore * 0.65 * 10) / 10;
        let nationalStd = (nationalBenchmark && nationalBenchmark.nationalStdDev) || Math.round(maxScore * 0.17 * 10) / 10;
        let nationalPercentile = 15.0; // 기본 상위 15% 추정
        let estimatedGrade = 2;
        let nationalStandardScore = 50;

        if (nationalBenchmark && nationalBenchmark.scoreHistogram && Array.isArray(nationalBenchmark.scoreHistogram) && nationalBenchmark.scoreHistogram.length > 0) {
            // 점수 히스토그램 기반 백분위 계산
            let higherCount = 0;
            let total = nationalBenchmark.totalCandidates || 1000;
            for (const bucket of nationalBenchmark.scoreHistogram) {
                if (bucket.score > rawScore) {
                    higherCount += bucket.count;
                }
            }
            nationalPercentile = Math.max(0.1, Math.min(99.9, Math.round(((higherCount + 0.5) / total) * 1000) / 10));
            estimatedGrade = calculateGradeFromPercentile(nationalPercentile);
            const z = (rawScore - nationalAvg) / (nationalStd || 1);
            nationalStandardScore = Math.max(20, Math.min(80, Math.round(50 + 10 * z)));
        } else {
            // 2028 개정 통합과학 규준 모델 (Z-score 기반 표준 백분위 및 등급 산출)
            const normResult = calculatePercentileAndGrade(rawScore, maxScore, nationalAvg, nationalStd);
            nationalPercentile = normResult.topPercentile;
            estimatedGrade = normResult.grade;
            nationalStandardScore = normResult.standardScore;
        }

        const report = {
            examId: examMeta.examId,
            week: examMeta.week,
            title: examMeta.title,
            studentInfo: {
                studentName: (context && context.studentName) || '수강생',
                studentPhoneLast4: (context && context.studentPhoneLast4) || '0000',
                academyId: (context && context.academyId) || 'academy_default'
            },
            scores: {
                rawScore: rawScore,             // 원점수
                maxScore: maxScore,             // 해당 회차 만점 배점 총합 (31.0점 등)
                scaledScore: scaledScore        // 100점 환산 점수
            },
            areaScores: areaScores,             // 물·화·생·지 성취도 (%)
            academyStats: {
                rank: academyRank,              // 학원 내 석차
                totalStudents: academyTotal,    // 학원 내 총 응시 인원
                average: academyAvg,            // 학원 평균 점수
                highest: academyHighest         // 학원 최고점
            },
            nationalBenchmark: {
                percentile: nationalPercentile, // 전국 상위 백분위 (%)
                grade: estimatedGrade,          // 2028 통합과학 예상 등급 (1~5등급)
                standardScore: nationalStandardScore, // 표준점수
                average: nationalAvg,           // 전국 평균 점수
                totalSample: (nationalBenchmark && nationalBenchmark.totalCandidates) || 1000
            },
            gradingResult: gradingResult,
            itemDetails: itemDetails,
            submittedAt: new Date().toISOString()
        };

        return report;
    }

    exports.gradeSubmission = gradeSubmission;
    exports.calculateGradeFromPercentile = calculateGradeFromPercentile;
    exports.getCumulativeProbability = getCumulativeProbability;
    exports.calculatePercentileAndGrade = calculatePercentileAndGrade;

})(typeof module !== 'undefined' && module.exports ? module.exports : (window.B2BGradingEngine = {}));
