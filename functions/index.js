const functions = require("firebase-functions");
const admin = require("firebase-admin");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const fs = require("fs");
const path = require("path");

admin.initializeApp();
ffmpeg.setFfmpegPath(ffmpegPath);

exports.analyzeVideo = functions.firestore
  .document("videos/{videoId}")
  .onCreate(async (snap) => {

    const data = snap.data();
    const userId = data.player_id;
    const videoUrl = data.video_url;

    const tempFile = `/tmp/video.mp4`;
    const frameFile = `/tmp/frame.jpg`;

    // 🔽 영상 다운로드
    const response = await fetch(videoUrl);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(tempFile, Buffer.from(buffer));

    // 🎬 프레임 추출
    await new Promise((resolve, reject) => {
      ffmpeg(tempFile)
        .screenshots({
          timestamps: ["50%"],
          filename: "frame.jpg",
          folder: "/tmp"
        })
        .on("end", resolve)
        .on("error", reject);
    });

    // 🧠 간단 AI 분석 (MVP)
    const feedback = analyzeFrame(frameFile);

    // ✅ 결과 저장
    await admin.firestore()
      .collection("players")
      .doc(userId)
      .set({
        intention: feedback
      }, { merge: true });

    return null;
  });
