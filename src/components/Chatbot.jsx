// src/components/Chatbot.jsx
import React, { useState } from 'react';
import chatbotImage from '../assets/chatbot.png'; // Ensure this is the correct path
import './Chatbot.css'; // Import the CSS for the Chatbot component

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSend = () => {
        if (input.trim()) {
            // Add user message
            setMessages([...messages, { text: input, sender: 'user' }]);
            // Simulate a bot response (you can replace this with actual API call)
            setTimeout(() => {
                
            }, 1000);
            setInput(''); // Clear input field
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSend(); // Call handleSend when Enter is pressed
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-content">
                <h2 className="component-title">AI Chatbot Assistant</h2>
                <img src={chatbotImage} alt="Chatbot" className="component-image-small" />
                <div className="chat-window">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="input-area">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                    />
                    <button onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;