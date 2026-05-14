import React, { useState, useRef } from "react";
import Questions from "./Questions";
import axios from 'axios';
import './Home.css';
import { useNavigate } from 'react-router-dom';
function Home() {
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("");
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate()
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  const generateQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/generate",
        { role, level },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      // Parsing the AI result
      const parsedQuestions = JSON.parse(response.data.result);
      setQuestions(parsedQuestions);
    navigate('/questions', { state: { questions: parsedQuestions } });
    } catch (e) {
      console.error("Error fetching questions:", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className={`main-layout ${questions ? 'interview-mode' : ''}`}>
        
        {/* Left Side: Video Preview */}
        <section className="media-column">
          <div className="video-viewport">
            <video ref={videoRef} autoPlay playsInline muted className={cameraActive ? 'visible' : ''} />
            {!cameraActive && (
              <div className="video-placeholder">
                <div className="glow-orb"></div>
                <p>System Standby</p>
              </div>
            )}
            <div className="video-overlay-labels">
              <span className={`status-pill ${cameraActive ? 'live' : ''}`}>
                {cameraActive ? "Live Preview" : "Camera Offline"}
              </span>
            </div>
          </div>

          <div className="media-actions">
            <button 
              className={`camera-toggle-btn ${cameraActive ? 'active' : ''}`} 
              onClick={startCamera}
            >
              {cameraActive ? "🎥 Camera Active" : "📹 Enable Camera"}
            </button>
          </div>
        </section>

        {/* Right Side: Configuration & Questions */}
        <section className="content-column">
          {!questions ? (
            <div className="glass-form-card fade-in">
              <header className="form-header">
                <div className="logo-icon">🤖</div>
                <h1>Interview Setup</h1>
                <p>Customize your AI session parameters</p>
              </header>

              <div className="form-body">
                <div className="input-field">
                  <label>Professional Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Fullstack Developer"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>

                <div className="input-field">
                  <label>Difficulty Tier</label>
                  <select value={level} onChange={(e) => setLevel(e.target.value)}>
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner / Junior</option>
                    <option value="Intermediate">Intermediate / Mid</option>
                    <option value="Senior">Senior / Expert</option>
                  </select>
                </div>

                <div className="action-spacer"></div>

                <button 
                  className={`launch-btn ${loading ? 'loading' : ''}`} 
                  onClick={generateQuestions}
                  disabled={!role || !level || !cameraActive || loading}
                >
                  {loading ? "Generating Questions..." : "Begin Session"}
                </button>
                {!cameraActive && <p className="camera-hint">Camera must be enabled to begin</p>}
              </div>
            </div>
          ) : (
            <div className="questions-view slide-up">
              <button className="exit-btn" onClick={() => setQuestions(null)}>
                <span>←</span> Exit Interview
              </button>
              {/* <Questions questions={questions} /> */}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Home;