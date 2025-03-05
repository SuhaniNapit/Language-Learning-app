// src/components/VocabularyPractice.jsx
import React from 'react';
import vocabularyImage from '../assets/vocabulary.png'; // Ensure this is the correct path
import './VocabularyPractice.css'; // Import the CSS for the VocabularyPractice component

const VocabularyPractice = () => {
    return (
        <div className="vocabulary-practice">
            <h2 className="component-title">Practice Your</h2>
            <img src={vocabularyImage} alt="Vocabulary Practice" className="vocabulary-image" />
            <p>Practice your vocabulary here!</p>
            {/* Add vocabulary practice logic here */}
            <ul>
                <li>Word 1: Definition</li>
                <li>Word 2: Definition</li>
                <li>Word 3: Definition</li>
            </ul>
        </div>
    );
};

export default VocabularyPractice;