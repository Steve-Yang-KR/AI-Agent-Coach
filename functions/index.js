exports.analyzeVideo = functions.firestore
  .document("videos/{videoId}")
  .onCreate(async (snap) => {

    const data = snap.data();
    const userId = data.player_id; // 🔥 UID 사용

    await admin.firestore()
      .collection("players")
      .doc(userId)
      .set({
        intention: {
          today_training: "Personal training based on your video",
          message: "Focus on your weak points!"
        }
      }, { merge: true });

    return null;
  });
