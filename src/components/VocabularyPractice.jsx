// src/components/VocabularyPractice.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VocabularyPractice.css'; // Optional: Create a CSS file for styling

const vocabularyList = [
    { word: 'Aberration', meaning: 'A departure from what is normal or expected.' },
    { word: 'Benevolent', meaning: 'Well-meaning and kindly.' },
    { word: 'Cacophony', meaning: 'A harsh, discordant mixture of sounds.' },
    { word: 'Debilitate', meaning: 'To weaken or harm.' },
    { word: 'Ebullient', meaning: 'Cheerful and full of energy.' },
    // Add more vocabulary words as needed
];

const VocabularyPractice = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showMeaning, setShowMeaning] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [currentWord, setCurrentWord] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWord = async () => {
            try {
                const response = await axios.get('https://random-word-api.herokuapp.com/word?number=1');
                setCurrentWord(response.data[0]); // Assuming the API returns an array of words
            } catch (error) {
                setError('Failed to fetch a new word.');
            }
        };

        fetchWord();
    }, []);

    const handleNext = (isCorrect) => {
        if (isCorrect) {
            setCorrectCount(correctCount + 1);
        }
        setTotalCount(totalCount + 1);
        setShowMeaning(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % vocabularyList.length);
        // Optionally, fetch a new word here
    };

    return (
        <div className="vocabulary-practice-container">
            <h1>Vocabulary Practice</h1>
            {error && <p>Error: {error}</p>}
            {currentWord ? (
                <div className="flashcard">
                    <h2>{showMeaning ? currentWord : currentWord}</h2>
                    <button onClick={() => setShowMeaning(!showMeaning)}>
                        {showMeaning ? 'Show Word' : 'Show Meaning'}
                    </button>
                    <button onClick={() => handleNext(true)}>Correct</button>
                    <button onClick={() => handleNext(false)}>Incorrect</button>
                </div>
            ) : (
                <p>Loading word...</p>
            )}
            <div className="score">
                <p>
                    Score: {correctCount} / {totalCount}
                </p>
            </div>
        </div>
    );
};

export default VocabularyPractice;