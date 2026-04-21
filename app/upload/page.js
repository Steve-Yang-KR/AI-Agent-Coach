"use client";

import { useState } from "react";
import { storage } from "../../lib/firebase";
import { ref, uploadBytes } from "firebase/storage";

export default function Upload() {
  const [file, setFile] = useState(null);

  const upload = async () => {
    if (!file) return;

    const storageRef = ref(storage, `videos/${file.name}`);
    await uploadBytes(storageRef, file);

    alert("Uploaded!");
  };

  return (
    <div>
      <h1>Upload Training Video</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
    </div>
  );
}
