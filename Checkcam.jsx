import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";

function Checkcam() {
  const { state } = useLocation();
  console.log(state);
  const nav = useNavigate();

  const webcamRef = useRef(null);
  const [name, setName] = useState();
  const [userId, setUserId] = useState("1");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  useEffect(() => {
    if (state[1] === "register") {
      setName(state[0]["name"]);
    } else {
      setName(state[0]);
    }
  }, []);

  // Capture image from webcam and send to Flask
  const captureImageAndSend = async (url) => {
    if (!name || !userId) {
      setMessage("Please enter Name and User ID");
      setMessageType("danger");
      return;
    }

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      setMessage("Failed to capture image");
      setMessageType("danger");
      return;
    }

    const blob = await fetch(imageSrc).then((res) => res.blob());
    const formData = new FormData();
    formData.append("name", name);
    formData.append("id", userId);
    formData.append("image", blob, "capture.jpg");

    try {
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);
      setMessageType(response.data.status === "success" ? "success" : "danger");
      if (state[1] === "register") {
        nav("/register", { state: state[0] });
      } else {
        if (String(response.data.id) == String(name)) {
          window.localStorage.setItem("id", response.data["id"]);
          window.localStorage.setItem("role", response.data["role"]);
          nav("/adddata");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error processing face");
      setMessageType("danger");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Face Recognition System</h2>

            {state[1] === "register" ? (
              <>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">User ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <></>
            )}

            {/* Webcam Video Feed */}
            <div className="mb-3 text-center">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="rounded shadow"
                width="100%"
              />
            </div>
            <div className="d-flex justify-content-between">
              {state[1] === "register" ? (
                <button
                  className="btn btn-primary w-48"
                  onClick={() =>
                    captureImageAndSend("http://127.0.0.1:5000/enroll")
                  }
                >
                  Enroll Face
                </button>
              ) : (
                <button
                  className="btn btn-success w-48"
                  onClick={() =>
                    captureImageAndSend("http://127.0.0.1:5000/authenticate")
                  }
                >
                  Authenticate Face
                </button>
              )}
            </div>

            {/* Message Display */}
            {message && (
              <div className={`alert mt-3 alert-${messageType}`} role="alert">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkcam;
