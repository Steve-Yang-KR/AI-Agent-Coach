const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");

admin.initializeApp();
ffmpeg.setFfmpegPath(ffmpegPath);

// 🔥 메인 트리거
exports.analyzeVideo = functions.firestore
  .document("videos/{videoId}")
  .onCreate(async (snap) => {

    try {
      const data = snap.data();
      const userId = data.player_id;
      const videoUrl = data.video_url;

      console.log("📥 Video received:", videoUrl);

      const tempVideo = `/tmp/video.mp4`;
      const framePath = `/tmp/frame.jpg`;

      // ✅ 1. 영상 다운로드
      const response = await axios({
        url: videoUrl,
        method: "GET",
        responseType: "arraybuffer"
      });

      fs.writeFileSync(tempVideo, response.data);

      console.log("✅ Video downloaded");

      // ✅ 2. 프레임 추출
      await new Promise((resolve, reject) => {
        ffmpeg(tempVideo)
          .screenshots({
            timestamps: ["50%"],
            filename: "frame.jpg",
            folder: "/tmp"
          })
          .on("end", resolve)
          .on("error", reject);
      });

      console.log("📸 Frame extracted");

      // ✅ 3. AI 서버 호출 (MediaPipe)
      const aiResponse = await axios.post(
        "http://YOUR_AI_SERVER/analyze", // 🔥 여기 수정 필요
        {
          video_path: tempVideo
        }
      );

      const feedback = aiResponse.data;

      console.log("🤖 AI result:", feedback);

      // ✅ 4. Firestore 업데이트
      await admin.firestore()
        .collection("players")
        .doc(userId)
        .set({
          intention: feedback,
          last_updated: new Date()
        }, { merge: true });

      // ✅ 5. videos 상태 업데이트
      await snap.ref.update({
        analyzed: true,
        feedback: feedback
      });

      console.log("✅ Analysis complete");

      return null;

    } catch (error) {
      console.error("❌ Error:", error);

      // 실패 상태 저장
      await snap.ref.update({
        analyzed: false,
        error: error.message
      });

      return null;
    }
  });
