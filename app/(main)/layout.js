'use client';

import { useRouter } from "next/navigation";

export default function MainLayout({ children }) {
  const router = useRouter();

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      <div style={{
        width: "200px",
        background: "#111",
        color: "#fff",
        padding: "20px"
      }}>
        <h2>⚽ AI Coach</h2>

        <p onClick={() => router.push("/dashboard")}>Dashboard</p>
        <p onClick={() => router.push("/upload")}>Upload</p>
        <p onClick={() => router.push("/")}>Logout</p>
      </div>

      <div style={{ flex: 1, padding: "20px" }}>
        {children}
      </div>

    </div>
  );
}
