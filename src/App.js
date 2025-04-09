import React, { useEffect } from 'react';
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
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/ResetPassword';

function AppRoutes() {
    const { isLoggedIn, user, logout } = useAuth();

    useEffect(() => {
        const closeDropdown = (e) => {
            if (!e.target.matches('.profile-icon')) {
                const dropdown = document.getElementById('profile-dropdown');
                if (dropdown && dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
            }
        };

        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown);
    }, []);

    return (
        <div className="App">
            <header>
                <h1>LingoBuddy</h1>
                <div className="header-right">
                    {isLoggedIn ? (
                        <div className="profile-menu">
                            <div
                                className="profile-icon"
                                onClick={() => document.getElementById('profile-dropdown')?.classList.toggle('show')}
                            >
                                {user?.username?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div id="profile-dropdown" className="dropdown-content">
                                <Link to="/profile">My Profile</Link>
                                <Link to="/dashboard">Dashboard</Link>
                                <button onClick={logout}>Logout</button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/auth" className="get-started-button">Get Started</Link>
                    )}
                </div>
            </header>

            <div className="layout">
                <nav className="sidebar">
                    <ul>
                        <li><NavLink to="/" end>Home</NavLink></li>
                        {isLoggedIn ? (
                            <>
                                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                                <li><NavLink to="/translator">Translator</NavLink></li>
                                <li><NavLink to="/vocabulary">Vocabulary Practice</NavLink></li>
                                <li><NavLink to="/study-room">Study Room</NavLink></li>
                            </>
                        ) : (
                            <li><NavLink to="/auth">Login / Sign Up</NavLink></li>
                        )}
                    </ul>
                </nav>

                <div className="content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/auth" element={<AuthForm />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}
                        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/auth" />} />
                        <Route path="/translator" element={isLoggedIn ? <Translator /> : <Navigate to="/auth" />} />
                        <Route path="/vocabulary" element={isLoggedIn ? <VocabularyPractice /> : <Navigate to="/auth" />} />
                        <Route path="/study-room" element={isLoggedIn ? <StudyRoom /> : <Navigate to="/auth" />} />
                        <Route path="/chatbot" element={isLoggedIn ? <ElfsightChatbot /> : <Navigate to="/auth" />} />
                        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/auth" />} />
                    </Routes>
                </div>
            </div>

            <Footer />
            <ElfsightChatbot />
        </div>
    );
}

function App() {
    return (
        <GoogleOAuthProvider clientId="489995143272-fgcbvu9av49ln2gneondihtvqtk08lj5.apps.googleusercontent.com">
            <AuthProvider>
                <Router basename="/">
                    <AppRoutes />
                </Router>
            </AuthProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
