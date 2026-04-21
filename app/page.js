'use client';

import { useState } from "react";
import { auth } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>AI Coach Login</h1>

      <input onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />

      <br /><br />

      <button onClick={login}>Login</button>
      <button onClick={signup}>Sign Up</button>
    </div>
  );
}
