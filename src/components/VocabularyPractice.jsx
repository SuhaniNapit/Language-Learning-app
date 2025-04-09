// src/components/VocabularyPractice.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VocabularyPractice.css';

const VocabularyPractice = () => {
    const [currentWord, setCurrentWord] = useState('');
    const [meaning, setMeaning] = useState('');
    const [pronunciationUrl, setPronunciationUrl] = useState('');
    const [feedback, setFeedback] = useState('');

    const apiKey = 'q8n8or3i298ia1nsdk1kpwkz1mgoeouka0gt3gc8dt129djnw';

    const fetchWord = async () => {
        try {
            // Step 1: Get random word
            const wordRes = await axios.get(`https://api.wordnik.com/v4/words.json/randomWord`, {
                params: {
                    hasDictionaryDef: true,
                    api_key: apiKey
                }
            });

            const word = wordRes.data.word;
            setCurrentWord(word);
            setFeedback('');

            // Step 2: Get meaning
            const defRes = await axios.get(`https://api.wordnik.com/v4/word.json/${word}/definitions`, {
                params: {
                    limit: 1,
                    api_key: apiKey
                }
            });

            const definition = defRes.data?.[0]?.text || 'No definition found.';
            setMeaning(definition);

            // Step 3: Get pronunciation
            const audioRes = await axios.get(`https://api.wordnik.com/v4/word.json/${word}/audio`, {
                params: {
                    limit: 1,
                    api_key: apiKey
                }
            });

            const audioUrl = audioRes.data?.[0]?.fileUrl || '';
            setPronunciationUrl(audioUrl);

        } catch (error) {
            console.error('Error fetching word:', error);
            setCurrentWord('');
            setMeaning('');
            setPronunciationUrl('');
            setFeedback('Error fetching word. Please try again.');
        }
    };

    useEffect(() => {
        fetchWord(); // Load first word
    }, []);

    const playPronunciation = () => {
        if (pronunciationUrl) {
            new Audio(pronunciationUrl).play();
        } else {
            alert('No pronunciation audio available.');
        }
    };

    return (
        <div className="vocabulary-practice-container">
            <h1 style={{ color: '#333' }}>Vocabulary Practice</h1>
            {currentWord && <h2>Word: {currentWord}</h2>}
            {pronunciationUrl && (
                <button onClick={playPronunciation}>🔊 Pronounce</button>
            )}
            <p><strong>Meaning:</strong> {meaning}</p>
            <button onClick={fetchWord}>Next Word</button>
            {feedback && <p style={{ color: 'red' }}>{feedback}</p>}
        </div>
    );
};

export default VocabularyPractice;
