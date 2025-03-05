// src/components/StudyRoom.jsx
import React from 'react';
import studyRoomImage from '../assets/studyroom.png'; // Ensure this is the correct path
import './StudyRoom.css'; // Import the CSS for the StudyRoom component

const StudyRoom = () => {
    return (
        <div className="study-room">
            <h2 className="component-title">Study Room</h2>
            <img src={studyRoomImage} alt="Study Room" className="study-room-image" />
            <p>Join a study session with your peers!</p>
            {/* Implement study room features here */}
            <button>Start a Study Session</button>
        </div>
    );
};

export default StudyRoom;