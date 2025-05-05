import React, { useEffect, useState } from 'react';
import staticWords from '../data/VocabularyData'; // old words with audio
import './VocabularyPractice.css';

const VocabularyPractice = () => {
  const [dynamicWords, setDynamicWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allWords, setAllWords] = useState([]);

  useEffect(() => {
    const fetchDynamicWords = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/vocabulary/all');
        const data = await res.json();
        setDynamicWords(data);
      } catch (err) {
        console.error('Error fetching dynamic words:', err);
      }
    };

    fetchDynamicWords();
  }, []);

  useEffect(() => {
    // Merge static and dynamic words once dynamic words are fetched
    const merged = [...staticWords, ...dynamicWords];
    setAllWords(merged);
  }, [dynamicWords]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % allWords.length);
  };

  const playAudio = () => {
    const currentWord = allWords[currentIndex];
    if (currentWord.audio) {
      const audio = new Audio(currentWord.audio);
      audio.play();
    } else {
      alert('No audio available for this word.');
    }
  };

  if (allWords.length === 0) return <p>Loading words...</p>;

  const currentWord = allWords[currentIndex];

  return (
    <div className="vocab-practice-container" style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ color: '#2c3e50', textAlign: 'center', marginBottom: '20px' }}>Vocabulary Practice</h2>
      <div className="vocab-card" style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
        <h3 style={{ color: '#34495e' }}>{currentWord.word}</h3>
        <p style={{ color: '#7f8c8d', fontSize: '18px' }}><strong>Meaning:</strong> {currentWord.meaning}</p>
        {currentWord.audio && (
          <button onClick={playAudio} style={{ margin: '10px', padding: '10px 20px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>🔊 Play Audio</button>
        )}
        <button onClick={handleNext} style={{ margin: '10px', padding: '10px 20px', backgroundColor: '#2ecc71', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Next Word ➡️</button>
      </div>
    </div>
  );
};

export default VocabularyPractice;
