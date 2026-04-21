const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.analyzeVideo = functions.firestore
  .document("videos/{videoId}")
  .onCreate(async (snap) => {

    const data = snap.data();
    const playerId = data.player_id;

    const feedback = ["Improve balance", "Good movement"];

    await snap.ref.update({
      analyzed: true,
      feedback
    });

    await admin.firestore()
      .collection("players")
      .doc(playerId)
      .set({
        intention: {
          today_training: "Balance + Dribbling (20min)",
          message: "Focus on stability today!"
        }
      }, { merge: true });

    return null;
  });
