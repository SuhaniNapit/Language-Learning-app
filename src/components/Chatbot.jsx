// src/components/Chatbot.jsx
import React from 'react';

const Chatbot = () => {
    return (
        <div className="chatbot">
            <h2>AI Chatbot Assistant</h2>
            <p>Ask me anything!</p>
            {/* Implement chatbot logic here */}
            <input type="text" placeholder="Type your question..." />
            <button>Send</button>
        </div>
    );
};

export default Chatbot;