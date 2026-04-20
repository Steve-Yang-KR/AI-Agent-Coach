"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Messages() {
  const [text, setText] = useState("");

  const sendMessage = async () => {
    await addDoc(collection(db, "messages"), {
      text,
      created_at: new Date()
    });

    alert("Sent!");
  };

  return (
    <div>
      <h1>Message</h1>

      <input onChange={(e) => setText(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
