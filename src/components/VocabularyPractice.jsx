// src/components/VocabularyPractice.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VocabularyPractice.css'; // Optional: Create a CSS file for styling

const VocabularyPractice = () => {
    const [currentWord, setCurrentWord] = useState('');
    const [meaning, setMeaning] = useState('');
    const [pronunciation, setPronunciation] = useState('');
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);

    const fetchWord = async () => {
        const randomWords = ['voluminous', 'benevolent', 'cacophony', 'debilitate', 'ebullient']; // Example words
        const word = randomWords[Math.floor(Math.random() * randomWords.length)];
        
        try {
            const response = await axios.get(`https://od-api-sandbox.oxforddictionaries.com/api/v2/entries/en-gb/${word}`, {
                headers: {
                    'app_id': '20510944', // Your Application ID
                    'app_key': '926784d4ae8371bec37f1a48ef3a7c76' // Your Application Key
                }
            });

            const wordData = response.data; // Get the word data

            if (wordData) {
                setCurrentWord(wordData.id); // Word
                setMeaning(wordData.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]); // Get the first definition
                setPronunciation(wordData.results[0].lexicalEntries[0].pronunciations[0]?.audioFile || ''); // Get the audio URL if available
            } else {
                setFeedback('Word not found.');
            }
        } catch (error) {
            console.error('Error fetching word:', error);
            setFeedback('Error fetching word. Please try again.');
        }
    };

    useEffect(() => {
        fetchWord(); // Fetch a word when the component mounts
    }, []);

    const handleAnswerSubmit = () => {
        if (userAnswer.toLowerCase() === currentWord.toLowerCase()) {
            setFeedback('Correct!');
            setIsCorrect(true);
        } else {
            setFeedback(`Incorrect! The correct answer is: ${currentWord}`);
            setIsCorrect(false);
        }

        // Clear the answer and fetch a new word
        setUserAnswer('');
        fetchWord();
    };

    const playPronunciation = () => {
        if (pronunciation) {
            const audio = new Audio(pronunciation); // Create a new Audio object
            audio.play(); // Play the audio
        } else {
            alert('No pronunciation available for this word.');
        }
    };

    return (
        <div className="vocabulary-practice-container">
            <h1>Vocabulary Practice</h1>
            <h2>Word: {currentWord}</h2>
            <button onClick={playPronunciation}>🔊 Pronounce</button>
            <p>Meaning: {meaning}</p>
            <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here"
            />
            <button onClick={handleAnswerSubmit}>Submit</button>
            {feedback && <p style={{ color: isCorrect ? 'green' : 'red' }}>{feedback}</p>}
        </div>
    );
};

export default VocabularyPractice;