// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Translator from './components/Translator';
import VocabularyPractice from './components/VocabularyPractice';
import StudyRoom from './components/StudyRoom';
import Chatbot from './components/Chatbot';
import './styles.css';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>E-Learning Language App</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/translator">Translator</Link></li>
                        <li><Link to="/vocabulary">Vocabulary Practice</Link></li>
                        <li><Link to="/study-room">Study Room</Link></li>
                        <li><Link to="/chatbot">Chatbot</Link></li>
                    </ul>
                </nav>
                <div className="container">
                    <Routes>
                        <Route path="/translator" element={<Translator />} />
                        <Route path="/vocabulary" element={<VocabularyPractice />} />
                        <Route path="/study-room" element={<StudyRoom />} />
                        <Route path="/chatbot" element={<Chatbot />} />
                        <Route path="/" element={<h2>Welcome to the E-Learning Language App!</h2>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
