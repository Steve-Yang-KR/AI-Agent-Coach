'use client';

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Dashboard() {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "players", "player1"));

      if (snap.exists()) {
        setPlayer(snap.data());
      } else {
        setPlayer({});
      }
    };

    fetch();
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
