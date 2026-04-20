'use client';
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Dashboard() {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "players", "player1"));
      setPlayer(snap.data());
    };
    fetch();
  }, []);

  if (!player) return <div>Loading...</div>;

  return (
    <div>
      <h1>AI Coach</h1>
      <p>{player.intention?.today_training}</p>
      <p>{player.intention?.message}</p>
    </div>
  );
}
