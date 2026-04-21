'use client';

import { useState } from "react";
import { storage } from "@/lib/firebaseClient";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Upload() {
  const [file, setFile] = useState(null);

  const upload = async () => {
    if (!file) return;

    const storageRef = ref(storage, `videos/${file.name}`);
    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, "videos"), {
      player_id: "player1",
      video_url: url,
      analyzed: false
    });

    alert("Uploaded!");
  };

  return (
    <div>
      <h1>Upload Video</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
    </div>
  );
}
