const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.processExamSubmission = onDocumentCreated(
    "exam_submissions_queue/{docId}",
    async (event) => {
        const snap = event.data;
        if (!snap) return;

        const data = snap.data();
        const examId = data.examId;
        const rawScore = data.rawScore;

        if (!examId || rawScore === undefined) {
            return console.log("유효하지 않은 데이터입니다.");
        }

        const examRef = db.collection('exams').doc(examId);

        try {
            const batch = db.batch();

            // 1. 모의고사 전체 통계 병합 (트랜잭션 없이 increment 연산으로 성능 극대화)
            batch.set(examRef, {
                participantCount: admin.firestore.FieldValue.increment(1),
                totalScoreSum: admin.firestore.FieldValue.increment(rawScore),
                totalScoreSqSum: admin.firestore.FieldValue.increment(rawScore * rawScore),
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            }, { merge: true });

            // 2. 개별 문항 통계 병합 (문항당 정답률, 선지별 통계)
            const evaluatedAnswers = data.evaluatedAnswers || [];
            evaluatedAnswers.forEach(ans => {
                if (ans.qId) {
                    const qRef = db.collection('questions').doc(ans.qId);
                    const isCorrect = ans.isCorrect;
                    const studentMark = ans.studentMark.toString();
                    
                    const statsUpdates = {
                        totalAttempts: admin.firestore.FieldValue.increment(1)
                    };
                    if (isCorrect) {
                        statsUpdates.correctCount = admin.firestore.FieldValue.increment(1);
                    }
                    
                    const distractorUpdates = {};
                    if (studentMark >= "1" && studentMark <= "5") {
                        distractorUpdates[studentMark] = admin.firestore.FieldValue.increment(1);
                    }
                    
                    const updates = { stats: statsUpdates };
                    if (Object.keys(distractorUpdates).length > 0) {
                        updates.distractorStats = distractorUpdates;
                    }
                    
                    batch.set(qRef, updates, { merge: true });
                }
            });

            // 3. 큐 상태 업데이트
            batch.update(snap.ref, { 
                status: 'processed', 
                processedAt: admin.firestore.FieldValue.serverTimestamp() 
            });

            await batch.commit();
            
            console.log(`[${examId}] 점수(${rawScore}점) 및 문항 통계 안전하게 집계 완료.`);
            
        } catch (error) {
            console.error("서버 트랜잭션 에러:", error);
        }
    }
);

// 선생님의 Gemini API 키가 안전하게 삽입되었습니다.
const GEMINI_API_KEY = "AIzaSyAWXnF3qQgYeIK2vhEuxN0M54lxHUFt7oE";

exports.processAiTutorQueue = onDocumentCreated(
    "ai_tutor_queue/{docId}",
    async (event) => {
        const snap = event.data;
        if (!snap) return;

        const data = snap.data();
        const { postId, title, content } = data;

        if (!postId || !content) {
            console.log("유효하지 않은 AI 튜터 요청입니다.");
            return;
        }

        try {
            // 1. Gemini API 프롬프트 구성 (탐구 유도형 프롬프트)
            const prompt = `당신은 '갓통과' 모의고사 서비스의 다정하고 똑똑한 AI 튜터입니다.
학생이 게시판에 올린 다음 질문에 답변해주세요.
단, 정답을 바로 알려주지 말고, 스스로 탐구하고 생각할 수 있도록 힌트와 관련된 핵심 개념 위주로 친절하게 3~4문장으로 설명해주세요.

[학생 질문 제목]: ${title}
[학생 질문 내용]: ${content}`;

            // 2. Gemini API 직접 호출 (fetch 사용 - Node.js 18 이상 내장)
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            if (!response.ok) {
                throw new Error(`Gemini API 호출 실패: ${response.status}`);
            }

            const resultData = await response.json();
            const aiText = resultData.candidates?.[0]?.content?.parts?.[0]?.text || "AI 튜터가 답변을 생성하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";

            // 3. Firestore 게시글 댓글에 AI 답변 안전하게 추가 (arrayUnion 사용)
            const postRef = db.collection('artifacts').doc('godtonggwa_v1').collection('public').doc('data').collection('godtonggwa_board').doc(postId);
            
            await postRef.update({
                comments: admin.firestore.FieldValue.arrayUnion({
                    authorId: "ai_tutor_bot",
                    authorName: "🤖 AI 튜터",
                    text: aiText,
                    isAi: true,
                    createdAt: Date.now()
                })
            });

            // 4. 큐 문서 상태 업데이트
            await snap.ref.update({ 
                status: 'processed', 
                processedAt: admin.firestore.FieldValue.serverTimestamp() 
            });

            console.log(`[${postId}] 게시글에 AI 튜터 답변 등록 완료!`);

        } catch (error) {
            console.error("AI 튜터 처리 중 에러:", error);
            await snap.ref.update({ status: 'error', errorMsg: error.message });
        }
    }
);