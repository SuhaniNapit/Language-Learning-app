// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, NavLink } from 'react-router-dom';
import HomePage from './components/HomePage';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import Translator from './components/Translator';
import VocabularyPractice from './components/VocabularyPractice';
import StudyRoom from './components/StudyRoom';
import Footer from './components/Footer';
import './styles.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import ElfsightChatbot from './components/ElfsightChatbot';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Create a separate component for the routes that need auth
function AppRoutes() {
    const { isLoggedIn } = useAuth();

    return (
        <div className="App">
            <header>
                <h1>LingoBuddy</h1>
                {!isLoggedIn && (
                    <Link to="/auth" className="get-started-button">Get Started</Link>
                )}
            </header>
            <div className="layout">
                <nav className="sidebar">
                    <ul>
                        <li><NavLink to="/" end>Home</NavLink></li>
                        {isLoggedIn ? (
                            // Show these links only when user is logged in
                            <>
                                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                                <li><NavLink to="/translator">Translator</NavLink></li>
                                <li><NavLink to="/vocabulary">Vocabulary Practice</NavLink></li>
                                <li><NavLink to="/study-room">Study Room</NavLink></li>
                            </>
                        ) : (
                            // Show these links when user is not logged in
                            <li><NavLink to="/auth">Login / Sign Up</NavLink></li>
                        )}
                    </ul>
                </nav>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/auth" element={<AuthForm />} />
                        {/* Protected Routes */}
                        <Route 
                            path="/dashboard" 
                            element={isLoggedIn ? <Dashboard /> : <Navigate to="/auth" />} 
                        />
                        <Route 
                            path="/translator" 
                            element={isLoggedIn ? <Translator /> : <Navigate to="/auth" />} 
                        />
                        <Route 
                            path="/vocabulary" 
                            element={isLoggedIn ? <VocabularyPractice /> : <Navigate to="/auth" />} 
                        />
                        <Route 
                            path="/study-room" 
                            element={isLoggedIn ? <StudyRoom /> : <Navigate to="/auth" />} 
                        />
                        <Route 
                            path="/chatbot" 
                            element={isLoggedIn ? <ElfsightChatbot /> : <Navigate to="/auth" />} 
                        />
                    </Routes>
                </div>
            </div>
            <Footer />
        </div>
    );
}

// Main App component
function App() {
    return (
        <GoogleOAuthProvider clientId="your-google-client-id">
            <AuthProvider>
                <Router basename="/">
                    <AppRoutes />
                </Router>
            </AuthProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
