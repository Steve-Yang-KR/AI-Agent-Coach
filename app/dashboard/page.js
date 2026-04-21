'use client';

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [player, setPlayer] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // 🔥 Firestore 실시간 구독
    const unsub = onSnapshot(
      doc(db, "players", "player1"),
      (docSnap) => {
        if (docSnap.exists()) {
          setPlayer(docSnap.data());
        } else {
          setPlayer({});
        }
      },
      (error) => {
        console.error("Firestore error:", error);
      }
    );

    return () => unsub();
  }, []);

  // 🔄 로딩 상태
  if (!player) return <div>Loading...</div>;

  return (
    <div>
      <h1>⚽ AI Coach Dashboard</h1>

      {/* ✅ 업로드 버튼 */}
      <button
        onClick={() => router.push("/upload")}
        style={{
          padding: "10px 16px",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        Upload Video
      </button>

      {/* ✅ 오늘 훈련 */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Today's Training</h3>
        <p>
          {player.intention?.today_training || "No training yet"}
        </p>
      </div>

      {/* ✅ 메시지 */}
      <div>
        <h3>Coach Message</h3>
        <p>
          {player.intention?.message || "No message"}
        </p>
      </div>
    </div>
  );
}
