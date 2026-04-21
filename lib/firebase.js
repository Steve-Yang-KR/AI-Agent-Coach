

// /lib/firebase.js

"use client";

import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const storage = getStorage(app);
