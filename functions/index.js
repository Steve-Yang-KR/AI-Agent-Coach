const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.analyzeVideo = functions.firestore
  .document("videos/{videoId}")
  .onCreate(async (snap, context) => {

    const data = snap.data();
    const playerId = data.player_id;

    // 🎯 초간단 AI 분석 (MVP)
    const feedback = [
      "Improve your balance",
      "Good movement",
      "Bend your knees more"
    ];

    // ✅ videos 업데이트
    await snap.ref.update({
      analyzed: true,
      feedback
    });

    // ✅ players 업데이트 (Dashboard 연결)
    await admin.firestore()
      .collection("players")
      .doc(playerId)
      .update({
        intention: {
          today_training: "Balance training + dribbling (20 min)",
          message: "Focus on balance today!"
        }
      });

    return null;
  });
