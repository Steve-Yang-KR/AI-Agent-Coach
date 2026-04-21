from fastapi import FastAPI
import cv2
import mediapipe as mp

app = FastAPI()

mp_pose = mp.solutions.pose

@app.post("/analyze")
def analyze(video_path: str):
    cap = cv2.VideoCapture(video_path)
    pose = mp_pose.Pose()

    knee_angles = []

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(image)

        if results.pose_landmarks:
            landmarks = results.pose_landmarks.landmark

            hip = landmarks[23]
            knee = landmarks[25]
            ankle = landmarks[27]

            angle = abs(hip.y - knee.y)
            knee_angles.append(angle)

    cap.release()

    avg = sum(knee_angles) / len(knee_angles) if knee_angles else 0

    if avg < 0.1:
        return {
            "today_training": "Bend your knees more",
            "message": "Your posture is too upright"
        }

    return {
        "today_training": "Good movement training",
        "message": "Nice posture overall"
    }
