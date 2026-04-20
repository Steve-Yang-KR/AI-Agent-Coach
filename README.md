# SSOT AI Coach Platform (MVP)

## Features
- Firebase Auth (login)
- Coach Dashboard (Next.js)
- Player Requests
- Video Upload (Firebase Storage)
- AI Feedback (Firebase Functions)
- BDI Agent (Belief, Desire, Intention auto-update)

## Setup

### 1. Install
npm install

### 2. Firebase config
Edit /lib/firebase.js

### 3. Run
npm run dev

### 4. Deploy
Use Vercel

### 5. Functions
cd functions
npm install
firebase deploy --only functions
