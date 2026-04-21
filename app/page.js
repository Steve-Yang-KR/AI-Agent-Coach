'use client';

import { useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Logged in");
  };

  return (
    <div>
      <h1>AI Coach Login</h1>

      <input placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />

      <button onClick={login}>Login</button>
    </div>
  );
}
