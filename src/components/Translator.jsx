// src/components/Translator.jsx
import React, { useState } from 'react';
import translatorImage from '../assets/translator.png'; // Ensure this is the correct path
import './Translator.css'; // Import the CSS for the Translator component

const Translator = () => {
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const handleTranslate = async () => {
        // Example API call (replace with actual translation API)
        const response = await fetch('https://api.example.com/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });
        const data = await response.json();
        setTranslatedText(data.translatedText);
    };

    return (
        <div className="translator">
            <h2 className="component-title">Translator</h2>
            <img src={translatorImage} alt="Translator" className="translator-image" />
            <textarea 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Enter text to translate"
            />
            <button onClick={handleTranslate}>Translate</button>
            <p>Translated Text: {translatedText}</p>
        </div>
    );
};

export default Translator;