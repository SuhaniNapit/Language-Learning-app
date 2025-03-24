import React from 'react';
import { useNavigate } from 'react-router-dom';
import languageImage from '../assets/language.png'; // Adjust the path as necessary
import './HomePage.css'; // Create this CSS file for additional styling

const HomePage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login'); // Navigate to the login page
    };

    return (
        <div className="home-page">
            <div className="description">
                <h2>Welcome to Our App!</h2>
                <p>Here you can translate, practice vocabulary, and study effectively.</p>
                <p>This app helps you learn new skills and improve your knowledge through interactive lessons and quizzes.</p>
                <p>Features include:</p>
                <li>Interactive lessons on various topics</li>
                <li>Vocabulary practice to enhance your language skills</li>
                <li>Study room for collaborative learning</li>
                <li>Chatbot assistance for quick queries</li>
                <p>Get started by clicking the button in the top right corner!</p>


                
            </div>
            <div className="image-container">
                <img src={languageImage} alt="Language Learning" className="language-image" />
            </div>
        </div>
    );
};

export default HomePage;
