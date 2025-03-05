// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import Translator from './components/Translator';
import VocabularyPractice from './components/VocabularyPractice';
import StudyRoom from './components/StudyRoom';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import './styles.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <div className="App">
                <header>
                    <h1>LingoBuddy</h1>
                    <Link to="/auth" className="get-started-button">Get Started</Link>
                </header>
                <div className="layout">
                    <nav className="sidebar">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/translator">Translator</Link></li>
                            <li><Link to="/vocabulary">Vocabulary Practice</Link></li>
                            <li><Link to="/study-room">Study Room</Link></li>
                            <li><Link to="/chatbot">Chatbot</Link></li>
                        </ul>
                    </nav>
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/auth" element={<AuthForm setIsLoggedIn={setIsLoggedIn} />} />
                            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/auth" />} />
                            <Route path="/translator" element={<Translator />} />
                            <Route path="/vocabulary" element={<VocabularyPractice />} />
                            <Route path="/study-room" element={<StudyRoom />} />
                            <Route path="/chatbot" element={<Chatbot />} />
                        </Routes>
                    </div>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
