import React from "react";
import "./Feedback.css";

import { useLocation } from "react-router-dom";


function Feedback() {
    const location = useLocation();
    const feedbackText =
        location.state?.feedback?.feedback ||
        "No feedback found. Please complete interview again.";

    return (
        <div className="feedback-container">
            <div className="feedback-glow"></div>
            <div className="feedback-content">
                <div className="feedback-header">
                    <div className="pulse-icon"></div>
                    <h3>AI Performance Analysis</h3>
                </div>

                <div className="feedback-body">
                    <p> <p style={{ whiteSpace: "pre-line" }}>
                        {feedbackText}
                    </p>
                    </p>
                </div>

                <div className="feedback-footer">
                    <span>Analysis complete based on industry standards</span>
                </div>
            </div>
        </div>
    );
}

export default Feedback;