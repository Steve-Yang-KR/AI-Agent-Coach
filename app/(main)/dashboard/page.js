'use client';

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [player, setPlayer] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let unsubscribeFirestore = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
        return;
      }

      const ref = doc(db, "players", user.uid);

      unsubscribeFirestore = onSnapshot(ref, (docSnap) => {
        setPlayer(docSnap.data() || {});
      });
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, []);

  if (!player) return <div>Loading...</div>;

  return (
    <div>
      <h1>⚽ AI Coach Dashboard</h1>

      <h3>Today's Training</h3>
      <p>{player.intention?.today_training || "No training yet"}</p>

      <h3>Message</h3>
      <p>{player.intention?.message || "No message"}</p>
    </div>
  );
}
