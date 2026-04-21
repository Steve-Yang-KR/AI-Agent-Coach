
"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const snapshot = await getDocs(collection(db, "requests"));
      setRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchRequests();
  }, []);

  const acceptRequest = async (id) => {
    await updateDoc(doc(db, "requests", id), {
      status: "accepted"
    });
    alert("Accepted!");
  };

  return (
    <div>
      <h1>Player Requests</h1>

      {requests.map(req => (
        <div key={req.id}>
          <p>Player: {req.player_id}</p>
          <p>Goal: {req.goal}</p>

          <button onClick={() => acceptRequest(req.id)}>Accept</button>
        </div>
      ))}
    </div>
  );
}
