'use client';

import { useState } from "react";
import { storage } from "@/lib/firebaseClient";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, auth } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Upload() {
  const [file, setFile] = useState(null);

  const upload = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Not logged in");
      return;
    }

    const storageRef = ref(storage, `videos/${user.uid}/${file.name}`);
    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, "videos"), {
      player_id: user.uid, // 🔥 핵심 변경
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
