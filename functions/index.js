const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// 🔥 여기 넣기 (👇 이 위치)
function analyzeFrame(framePath) {
  const random = Math.random();

  if (random < 0.3) {
    return {
      today_training: "Improve balance (15 min)",
      message: "Your posture seems unstable"
    };
  }

  if (random < 0.6) {
    return {
      today_training: "Dribbling drills (20 min)",
      message: "Good movement but improve control"
    };
  }

  return {
    today_training: "Sprint + agility (15 min)",
    message: "Nice speed, work on direction change"
  };
}

// 🔥 Firebase Trigger
exports.analyzeVideo = functions.firestore
  .document("videos/{videoId}")
  .onCreate(async (snap) => {

    const data = snap.data();
    const userId = data.player_id;

    // 👉 AI 분석 실행
    const feedback = analyzeFrame();

    // 👉 결과 저장
    await admin.firestore()
      .collection("players")
      .doc(userId)
      .set({
        intention: feedback
      }, { merge: true });

    return null;
  });
