// src/components/StudyRoom.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import studyRoomImage from '../assets/studyroom.png'; // Ensure this is the correct path
import './StudyRoom.css'; // Import the CSS for the StudyRoom component

const StudyRoom = () => {
    const [sessions, setSessions] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const fetchSessions = async () => {
            const response = await axios.get('/api/studySession');
            setSessions(response.data);
        };
        fetchSessions();
    }, []);

    const createSession = async () => {
        const response = await axios.post('/api/studySession/create', { title });
        setSessions([...sessions, response.data]);
        setTitle('');
    };

    const joinSession = async (id) => {
        await axios.post(`/api/studySession/join/${id}`);
        // Optionally, redirect to a chat room or update UI
    };

    return (
        <div className="study-room">
            <h2 className="component-title">Study Room</h2>
            <img src={studyRoomImage} alt="Study Room" className="study-room-image" />
            <p>Join a study session with your peers!</p>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Session Title"
            />
            <button onClick={createSession}>Create Session</button>
            <ul>
                {sessions.map((session) => (
                    <li key={session._id}>
                        {session.title}
                        <button onClick={() => joinSession(session._id)}>Join</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudyRoom;