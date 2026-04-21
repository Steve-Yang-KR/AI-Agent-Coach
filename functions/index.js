const functions = require("firebase-functions");
const admin = require("firebase-admin");
const OpenAI = require("openai");
const fs = require("fs");

admin.initializeApp();

// 🔥 OpenAI 설정
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 🔥 AI 분석 함수 (👉 여기 넣기)
async function analyzeWithAI(imagePath) {
  const base64 = fs.readFileSync(imagePath, "base64");

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Analyze soccer posture" },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64}`
            }
          }
        ]
      }
    ]
  });

  return {
    today_training: "AI generated training",
    message: res.choices[0].message.content
  };
}

// 🔥 Firestore 트리거
exports.analyzeVideo = functions.firestore
  .document("videos/{videoId}")
  .onCreate(async (snap) => {

    const data = snap.data();
    const userId = data.player_id;

    // 👉 지금은 임시 이미지 경로 (프레임 추출 후 연결)
    const imagePath = "/tmp/frame.jpg";

    // 🔥 AI 분석 실행
    const feedback = await analyzeWithAI(imagePath);

    // 👉 결과 저장
    await admin.firestore()
      .collection("players")
      .doc(userId)
      .set({
        intention: feedback
      }, { merge: true });

    return null;
  });
