from flask import Flask, request, jsonify
import cv2
import numpy as np
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "static"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# ------------------ Enroll Face ------------------
@app.route("/enroll", methods=["POST"])
def enroll_face():
    name = request.form.get("name")
    user_id = request.form.get("id")
    file = request.files["image"]

    if not file:
        return jsonify({"status": "failure", "message": "No image received"})

    # Convert image to OpenCV format
    np_img = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_GRAYSCALE)

    # Detect face and store image
    faces = face_cascade.detectMultiScale(img, 1.1, 5)
    
    if len(faces) == 0:
        return jsonify({"status": "failure", "message": "No face detected"})

    # Save multiple images for enrollment
    for i in range(5):
        x, y, w, h = faces[0]  # Use the first detected face
        cropped_face = img[y:y+h, x:x+w]  # Crop the detected face
        path = f"{UPLOAD_FOLDER}/{name}_{user_id}_{i}.jpg"
        cv2.imwrite(path, cropped_face)

    return jsonify({"status": "success", "message": "Face enrolled successfully"})

# ------------------ Authenticate Face ------------------
@app.route("/authenticate", methods=["POST"])
def authenticate_face_any_user():
    file = request.files.get("image")
    if not file:
        return jsonify({"status": "failure", "message": "No image receiv    ed"})

    # Convert to OpenCV grayscale
    np_img = np.frombuffer(file.read(), np.uint8)
    captured_image = cv2.imdecode(np_img, cv2.IMREAD_GRAYSCALE)

    # Detect face in captured image
    faces = face_cascade.detectMultiScale(captured_image, 1.1, 5)
    if len(faces) == 0:
        return jsonify({"status": "failure", "message": "No face detected"})

    x, y, w, h = faces[0]
    captured_face = captured_image[y:y+h, x:x+w]

    # Go through all registered users
    checked_users = set()
    for filename in os.listdir(UPLOAD_FOLDER):
        if filename.endswith(".jpg"):
            try:
                name, user_id, index = filename.split("_")
                index = index.split(".")[0]
                if (name, user_id) in checked_users:
                    continue  # Already checked this user

                # Load all 5 images for this user
                enrolled_faces = []
                for i in range(5):
                    path = f"{UPLOAD_FOLDER}/{name}_{user_id}_{i}.jpg"
                    if os.path.exists(path):
                        enrolled_faces.append(cv2.imread(path, cv2.IMREAD_GRAYSCALE))

                # Compare with all enrolled faces of this user
                for enrolled_face in enrolled_faces:
                    result = cv2.matchTemplate(captured_face, enrolled_face, cv2.TM_CCOEFF_NORMED)
                    if cv2.minMaxLoc(result)[1] > 0.5:  # Match threshold
                        return jsonify({
                            "status": "success",
                            "message": f"Face recognized as {name}",
                            "name": name,
                            "id": user_id
                        })

                checked_users.add((name, user_id))
            except Exception as e:
                continue

    return jsonify({"status": "failure", "message": "wrong Face not recognized"})


if __name__ == "__main__":
    app.run(debug=True)
