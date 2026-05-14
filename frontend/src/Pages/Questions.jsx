import React, { useState, useEffect, useRef } from "react";
import "./Questions.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
function Questions() {
    const [isRecording, setIsRecording] = useState(false);
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState(null);
    const videoRef = useRef(null);
    const socketRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate()

    const currentQuestion = location.state?.questions || "How do you handle high-pressure situations?";

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                if (videoRef.current) videoRef.current.srcObject = stream;
            });

        //     socketRef.current = new WebSocket("ws://localhost:8081");
        //     return () => socketRef.current?.close();
    }, []);

    const handleStartInterview = () => {
        setIsRecording(true);
        // socketRef.current.send(JSON.stringify({ type: "START_INTERVIEW" }));
    };

    const handleFinishResponse = async () => {
        setIsRecording(false);
        // socketRef.current.send(JSON.stringify({
        //   type: "SUBMIT_ANSWER",
        //   question: currentQuestion,
        //   answer: answer
        // }));

        try {
            const response = await axios.post(
                "https://ai-based-mock-interview.onrender.com/api/evaluate",
                { question: currentQuestion, answer },
                {
                    withCredentials: true
                }
            );
            const data = response.data;

            setFeedback(data);
            navigate('/feedback', { state: { feedback: data } });
        } catch (e) {
            console.error("Error getting response", e.message);
        } finally {
            setIsRecording(false);
        }


    };

    return (
        <div className="interview-grid">
            {/* LEFT COLUMN: Camera + Question Underneath */}
            <div className="left-column">
                <div className="video-container">
                    <video ref={videoRef} autoPlay muted playsInline className="live-video" />

                    <div className="recording-indicator">
                        <div className={`dot ${isRecording ? "active" : ""}`}></div>
                        <span>{isRecording ? "LIVE" : "READY"}</span>
                    </div>

                    <div className="video-actions-overlay">
                        {!isRecording ? (
                            <button className="start-btn" onClick={handleStartInterview}>
                                Start Interview
                            </button>
                        ) : (
                            <button className="stop-btn" onClick={handleFinishResponse}>
                                Submit Answer
                            </button>
                        )}
                    </div>
                </div>

                {/* Question positioned directly under camera */}
                <div className="question-under-camera">
                    <span className="badge">Active Question</span>
                    <p className="question-text">
                        <span className="q-prefix">Q:</span> {currentQuestion}
                    </p>
                </div>
            </div>

            {/* RIGHT COLUMN: Large Text Area */}
            <div className="right-column">
                <div className="input-pane">
                    <label className="input-label">Written Response / Notes</label>
                    <textarea
                        className="main-textarea"
                        placeholder="Structure your thoughts here..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />

                </div>
            </div>
        </div>
    );
}

export default Questions;