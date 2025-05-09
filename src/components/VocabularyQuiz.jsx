// src/components/VocabularyQuiz.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './VocabularyQuiz.css';

const wordBank = [
  { word: 'elated', question: 'What is the synonym of "elated"?', options: ['sad', 'angry', 'very happy', 'confused'], answer: 'very happy' },
  { word: 'benevolent', question: 'What does "benevolent" mean?', options: ['mean', 'kind and generous', 'selfish', 'rude'], answer: 'kind and generous' },
  { word: 'lucid', question: 'Choose the best definition for "lucid".', options: ['dark', 'boring', 'clear and easy to understand', 'complicated'], answer: 'clear and easy to understand' },
  { word: 'tedious', question: 'Which word means the opposite of "exciting"?', options: ['fun', 'tedious', 'quick', 'happy'], answer: 'tedious' },
  { word: 'meticulous', question: 'What is the synonym of "meticulous"?', options: ['careless', 'quick', 'very careful and precise', 'clumsy'], answer: 'very careful and precise' },
  { word: 'resilient', question: 'What does "resilient" mean?', options: ['weak', 'fragile', 'able to recover quickly', 'broken'], answer: 'able to recover quickly' },
  { word: 'ephemeral', question: 'Which word means "lasting a very short time"?', options: ['eternal', 'forever', 'ephemeral', 'infinite'], answer: 'ephemeral' },
  { word: 'gregarious', question: 'What is the antonym of "shy"?', options: ['gregarious', 'quiet', 'sad', 'reserved'], answer: 'gregarious' },
  { word: 'ambiguous', question: 'What does "ambiguous" mean?', options: ['clear', 'definite', 'open to more than one interpretation', 'obvious'], answer: 'open to more than one interpretation' },
  { word: 'candid', question: 'Choose the synonym for "candid".', options: ['dishonest', 'indirect', 'truthful and straightforward', 'deceitful'], answer: 'truthful and straightforward' },
  { word: 'vivid', question: 'Which word describes something very clear and detailed?', options: ['blurry', 'vivid', 'dim', 'faded'], answer: 'vivid' },
  { word: 'reluctant', question: 'What is the meaning of "reluctant"?', options: ['eager', 'willing', 'hesitant', 'happy'], answer: 'hesitant' },
  { word: 'serene', question: 'Which word is closest in meaning to "serene"?', options: ['peaceful', 'angry', 'noisy', 'fast'], answer: 'peaceful' },
  { word: 'diligent', question: 'What is the synonym of "diligent"?', options: ['lazy', 'careless', 'hardworking', 'slow'], answer: 'hardworking' },
  { word: 'obsolete', question: 'Which word best describes "no longer in use"?', options: ['modern', 'current', 'obsolete', 'trendy'], answer: 'obsolete' }
  // Add more...
];

const VocabularyQuiz = () => {
  const { user } = useAuth();
  const maxQuestions = 10;

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const shuffled = [...wordBank].sort(() => Math.random() - 0.5).slice(0, maxQuestions);
    setQuestions(shuffled);
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedOption === currentQuestion.answer;
    const newScore = isCorrect ? score + 1 : score;

    const answerEntry = {
      question: currentQuestion.question,
      options: currentQuestion.options,
      correctAnswer: currentQuestion.answer,
      selected: selectedOption,
      isCorrect,
    };

    const updatedAnswers = [...userAnswers, answerEntry];

    if (user?.username) {
      localStorage.setItem(`quizScore_${user.username}`, newScore);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setScore(newScore);
      setUserAnswers(updatedAnswers);
    } else {
      setScore(newScore);
      setUserAnswers(updatedAnswers);
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    const reshuffled = [...wordBank].sort(() => Math.random() - 0.5).slice(0, maxQuestions);
    setQuestions(reshuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setUserAnswers([]);
    setShowResult(false);

    if (user?.username) {
      localStorage.setItem(`quizScore_${user.username}`, 0);
    }
  };

  if (!questions.length) return <div>Loading quiz...</div>;

  return (
    <div className="quiz-container">
      <h1 style={{ color: '#2c3e50' }}>Vocabulary Quiz</h1>

      {!showResult && (
        <div className="question-card">
          <h2 style={{ color: '#333' }}>Question {currentIndex + 1} of {maxQuestions}</h2>
          <p style={{ fontWeight: 'bold', color: '#333' }}>{questions[currentIndex].question}</p>
          <div className="options">
            {questions[currentIndex].options.map((option, idx) => (
              <button
                key={idx}
                className={`option-btn ${selectedOption === option ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className="next-btn"
          >
            {currentIndex === maxQuestions - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      )}

      {showResult && (
        <div className="result-card">
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {maxQuestions}</p>

          <h3>Review Your Answers:</h3>
          <ul className="review-list">
            {userAnswers.map((entry, idx) => (
              <li key={idx} className="review-item">
                <p><strong>Q{idx + 1}:</strong> {entry.question}</p>
                <p>
                  Your Answer:{' '}
                  <span style={{ color: entry.isCorrect ? 'green' : 'red' }}>
                    {entry.selected || 'Not answered'}
                  </span>
                </p>
                {!entry.isCorrect && (
                  <p>
                    Correct Answer: <span style={{ color: 'green' }}>{entry.correctAnswer}</span>
                  </p>
                )}
              </li>
            ))}
          </ul>

          <button onClick={handleRestart}>Try Again</button>
        </div>
      )}
    </div>
  );
};

export default VocabularyQuiz;
