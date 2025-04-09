// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        streak: 0,
        totalScore: 0,
        wordsLearned: 0,
        wordsTranslated: 0,
        lastActive: null
    });

    useEffect(() => {
        const fetchUserStats = async () => {
            try {
                setStats({
                    streak: 5,
                    totalScore: 1250,
                    wordsLearned: 84,
                    wordsTranslated: 157,
                    lastActive: new Date().toLocaleDateString()
                });
            } catch (error) {
                console.error('Error fetching user stats:', error);
            }
        };

        fetchUserStats();
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Welcome back, {user?.username || 'Learner'}! 👋</h1>
                <p className="last-active">Last active: {stats.lastActive}</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card streak">
                    <div className="stat-icon">🔥</div>
                    <h3>Current Streak</h3>
                    <p className="stat-value">{stats.streak} days</p>
                    <p className="stat-subtitle">Keep it going!</p>
                </div>

                <div className="stat-card score">
                    <div className="stat-icon">⭐</div>
                    <h3>Total Score</h3>
                    <p className="stat-value">{stats.totalScore}</p>
                    <p className="stat-subtitle">Points earned</p>
                </div>

                <div className="stat-card vocabulary">
                    <div className="stat-icon">📚</div>
                    <h3>Words Learned</h3>
                    <p className="stat-value">{stats.wordsLearned}</p>
                    <p className="stat-subtitle">Keep expanding!</p>
                </div>

                <div className="stat-card translated">
                    <div className="stat-icon">🌍</div>
                    <h3>Words Translated</h3>
                    <p className="stat-value">{stats.wordsTranslated}</p>
                    <p className="stat-subtitle">Great job!</p>
                </div>
            </div>

            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="action-buttons">
                    <button className="action-btn translate" onClick={() => navigate('/translator')}>
                        <span>🌐</span> Translate
                    </button>
                    <button className="action-btn vocabulary">
                        <span>📝</span> Vocabulary Quiz
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
