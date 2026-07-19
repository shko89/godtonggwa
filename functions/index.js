const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.processExamSubmissionV2 = onDocumentCreated(
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
            await db.runTransaction(async (t) => {
                const doc = await t.get(examRef);
                let participantCount = 0;
                let totalScoreSum = 0;
                let totalScoreSqSum = 0;

                if (doc.exists) {
                    const currentData = doc.data();
                    participantCount = currentData.participantCount || 0;
                    totalScoreSum = currentData.totalScoreSum || 0;
                    totalScoreSqSum = currentData.totalScoreSqSum || 0;
                }

                t.set(examRef, {
                    participantCount: participantCount + 1,
                    totalScoreSum: totalScoreSum + rawScore,
                    totalScoreSqSum: totalScoreSqSum + (rawScore * rawScore),
                    lastUpdated: admin.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
            });

            await snap.ref.update({ 
                status: 'processed', 
                processedAt: admin.firestore.FieldValue.serverTimestamp() 
            });
            
            console.log(`[${examId}] 점수(${rawScore}점) 안전하게 통계 집계 완료.`);
            
        } catch (error) {
            console.error("서버 트랜잭션 에러:", error);
        }
    }
);

// 선생님의 Gemini API 키가 안전하게 삽입되었습니다.
const GEMINI_API_KEY = "AIzaSyCo5JomXHpiW-zW1EEBbPsI_iBWU67SXXo";

exports.processAiTutorQueueV2 = onDocumentCreated(
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

exports.confirmTossPayment = onRequest({ cors: true, invoker: 'public' }, async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    let decodedToken;
    try {
        decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    const uid = decodedToken.uid;
    const { paymentKey, orderId, amount, packageId } = req.body;

    if (!paymentKey || !orderId || !amount || !packageId) {
        return res.status(400).json({ success: false, message: 'Missing parameters' });
    }

    try {
        // Toss Payments API 호출
        const secretKey = "test_sk_Z1aOwX7K8m2K56L222R78yQxzvNP";
        const basicToken = Buffer.from(secretKey + ":").toString("base64");

        const tossResponse = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
            method: "POST",
            headers: {
                "Authorization": `Basic ${basicToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                paymentKey,
                orderId,
                amount: Number(amount)
            })
        });

        const tossResult = await tossResponse.json();

        if (!tossResponse.ok) {
            console.error("Toss Error:", tossResult);
            return res.status(400).json({ success: false, message: tossResult.message || 'Payment confirmation failed' });
        }

        // Firestore 권한 부여 (개별 패키지)
        await db.collection("users").doc(uid).collection("my_packages").doc(packageId).set({
            status: "active",
            purchasedAt: admin.firestore.FieldValue.serverTimestamp(),
            orderId: orderId,
            paymentKey: paymentKey,
            amount: Number(amount)
        }, { merge: true });

        // 주문 내역 상태 업데이트
        try {
            await db.collection("orders").doc(orderId).update({
                status: "paid",
                paidAt: admin.firestore.FieldValue.serverTimestamp()
            });
        } catch (e) {
            console.error("Order status update failed (might not exist):", e);
        }

        // 인피니티 정기구독권(All-Pass)인 경우 전역 권한 부여
        if (packageId === "infinity_2028") {
            await db.collection("users").doc(uid).set({
                hasAllPass: true
            }, { merge: true });
            console.log(`[All-Pass Granted] User: ${uid}`);
        }

        return res.status(200).json({ success: true, message: 'Payment confirmed and access granted' });

    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});