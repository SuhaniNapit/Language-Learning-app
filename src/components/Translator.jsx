// src/components/Translator.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Translator = () => {
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const handleTranslate = async () => {
        // Example API call (replace with actual translation API)
        const response = await axios.post('https://api.example.com/translate', { text });
        setTranslatedText(response.data.translatedText);
    };

    return (
        <div className="translator">
            <h2>Translator</h2>
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