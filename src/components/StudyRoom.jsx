// src/components/StudyRoom.jsx
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import studyRoomImage from '../assets/studyroom.png'; // Ensure this is the correct path
import './StudyRoom.css'; // Import the CSS for the StudyRoom component

const socket = io('http://localhost:5000'); // Adjust the URL if needed

const StudyRoom = () => {
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [members, setMembers] = useState([]);
    const [isJoined, setIsJoined] = useState(false); // Track if the user has joined the room
    const [studyTime, setStudyTime] = useState(0); // Track study time in seconds
    const [timer, setTimer] = useState(null); // Timer reference

    const joinRoom = () => {
        if (room) {
            socket.emit('joinRoom', room);
            setIsJoined(true); // Set to true when the user joins the room
            setStudyTime(0); // Reset study time
            startTimer(); // Start the timer
        }
    };

    const startTimer = () => {
        setTimer(setInterval(() => {
            setStudyTime((prevTime) => prevTime + 1); // Increment study time every second
        }, 1000));
    };

    const sendMessage = () => {
        if (message) {
            const messageData = { room, message };
            socket.emit('sendMessage', messageData);
            setMessage('');
        }
    };

    useEffect(() => {
        socket.on('receiveMessage', (messageData) => {
            setMessages((prevMessages) => [...prevMessages, messageData.message]);
        });

        socket.on('updateMembers', (membersList) => {
            setMembers(membersList);
        });

        return () => {
            socket.off('receiveMessage');
            socket.off('updateMembers');
            clearInterval(timer); // Clear the timer when the component unmounts
        };
    }, [timer]);

    return (
        <div className="study-room">
            <h2 className="component-title">Study Room</h2>
            <img src={studyRoomImage} alt="Study Room" className="study-room-image" />
            <p>Join a study session with your peers!</p>
            {!isJoined ? (
                <>
                    <input
                        type="text"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        placeholder="Enter room name"
                    />
                    <button onClick={joinRoom}>Join Room</button>
                </>
            ) : (
                <div>
                    <h3>Members in Room:</h3>
                    <ul>
                        {members.map((member, index) => (
                            <li key={index}>{member}</li>
                        ))}
                    </ul>

                    <h3>Study Time: {Math.floor(studyTime / 60)}:{('0' + (studyTime % 60)).slice(-2)} minutes</h3>

                    <h3>Messages</h3>
                    <ul>
                        {messages.map((msg, index) => (
                            <li key={index}>{msg}</li>
                        ))}
                    </ul>

                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here"
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}
        </div>
    );
};

export default StudyRoom;