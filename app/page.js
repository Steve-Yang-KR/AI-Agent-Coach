'use client';

import { useState } from "react";
import { auth } from "../lib/firebase";
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { useRouter } from "next/navigation"; // 🔥 추가

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter(); // 🔥 추가

  // ✅ 로그인
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Logged in!");

      router.push("/dashboard"); // 🔥 핵심
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // ✅ 회원가입
  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>AI Coach Login</h1>

      <input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={login}>Login</button>
      <button onClick={signup}>Sign Up</button>
    </div>
  );
}
