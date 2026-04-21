'use client';

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function Dashboard() {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "players", "player1"), (docSnap) => {
      setPlayer(docSnap.data());
    });

    return () => unsub();
  }, []);

  if (!player) return <div>Loading...</div>;

  return (
    <div>
      <h1>AI Coach Dashboard</h1>

      <h3>Today's Training</h3>
      <p>{player.intention?.today_training || "No training yet"}</p>

      <h3>Message</h3>
      <p>{player.intention?.message || "No message"}</p>
    </div>
  );
}
