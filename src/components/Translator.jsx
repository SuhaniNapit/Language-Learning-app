// src/components/Translator.jsx
import React, { useState } from 'react';
import './Translator.css';
import axios from 'axios';

const Translator = () => {
    const [sourceText, setSourceText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLang, setSourceLang] = useState('en');
    const [targetLang, setTargetLang] = useState('es');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'it', name: 'Italian' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'ja', name: 'Japanese' },
        { code: 'ko', name: 'Korean' },
        { code: 'zh', name: 'Chinese' },
        { code: 'hi', name: 'Hindi' },
        { code: 'ar', name: 'Arabic' }
    ];

    const handleTranslate = async () => {
        if (!sourceText.trim()) return;
        
        setIsLoading(true);
        try {
            const response = await axios.post(
                `https://translation.googleapis.com/language/translate/v2?key=AIzaSyAeEbgYCjBa2qsoGsxVKI3OSs8nOzZ-4BY`,
                {
                    q: sourceText,
                    target: targetLang,
                }
            );

            setTranslatedText(response.data.data.translations[0].translatedText);
            setError('');
        } catch (error) {
            console.error('Error translating text:', error);
            setError('Translation failed. Please try again.');
            setTranslatedText('');
        } finally {
            setIsLoading(false);
        }
    };

    const swapLanguages = () => {
        const tempLang = sourceLang;
        setSourceLang(targetLang);
        setTargetLang(tempLang);
        const tempText = sourceText;
        setSourceText(translatedText);
        setTranslatedText(tempText);
    };

    return (
        <div className="translator-container">
            <h1>Language Translator</h1>
            <div className="language-selector">
                <div className="select-container">
                    <select
                        value={sourceLang}
                        onChange={(e) => setSourceLang(e.target.value)}
                    >
                        {languages.map(lang => (
                            <option key={lang.code} value={lang.code}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button className="swap-btn" onClick={swapLanguages}>
                    🔄
                </button>

                <div className="select-container">
                    <select
                        value={targetLang}
                        onChange={(e) => setTargetLang(e.target.value)}
                    >
                        {languages.map(lang => (
                            <option key={lang.code} value={lang.code}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="translation-area">
                <div className="text-container">
                    <textarea
                        value={sourceText}
                        onChange={(e) => setSourceText(e.target.value)}
                        placeholder="Enter text to translate..."
                        className="text-input"
                    />
                    <button className="clear-btn" onClick={() => setSourceText('')}>
                        ✕
                    </button>
                </div>

                <div className="text-container">
                    <textarea
                        value={translatedText}
                        readOnly
                        placeholder="Translation will appear here..."
                        className="text-input"
                    />
                    <button 
                        className="copy-btn"
                        onClick={() => navigator.clipboard.writeText(translatedText)}
                    >
                        Copy
                    </button>
                </div>
            </div>

            <button 
                className="translate-btn" 
                onClick={handleTranslate}
                disabled={isLoading || !sourceText.trim()}
            >
                {isLoading ? 'Translating...' : 'Translate'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Translator;