// src/components/Translator.jsx
import React, { useState } from 'react';
import translatorImage from '../assets/translator.png'; // Ensure this is the correct path
import './Translator.css'; // Import the CSS for the Translator component

const Translator = () => {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [error, setError] = useState('');

    const handleTranslate = async () => {
        setError('');
        try {
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=en|es`);
            
            if (!response.ok) {
                throw new Error('Translation failed');
            }

            const data = await response.json();
            setTranslatedText(data.responseData.translatedText); // Set the translated text
        } catch (err) {
            setError(err.message); // Handle errors
        }
    };

    return (
        <div className="translator">
            <h2 className="component-title">Translator</h2>
            <img src={translatorImage} alt="Translator" className="translator-image" />
            <textarea 
                value={inputText} 
                onChange={(e) => setInputText(e.target.value)} 
                placeholder="Enter text to translate"
            />
            <button onClick={handleTranslate}>Translate</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {translatedText && (
                <div>
                    <h2>Translated Text:</h2>
                    <p>{translatedText}</p>
                </div>
            )}
        </div>
    );
};

export default Translator;