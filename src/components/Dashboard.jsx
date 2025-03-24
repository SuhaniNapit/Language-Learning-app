import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        streak: 0,
        totalScore: 0,
        wordsLearned: 0,
        lastActive: null,
        level: 1,
        experiencePoints: 0
    });

    // Simulated data - Replace this with actual API calls to your backend
    useEffect(() => {
        // Fetch user stats from your backend
        const fetchUserStats = async () => {
            try {
                // Replace with actual API call
                // const response = await fetch('your-api-endpoint/user-stats');
                // const data = await response.json();
                
                // Simulated data
                setStats({
                    streak: 5,
                    totalScore: 1250,
                    wordsLearned: 84,
                    lastActive: new Date().toLocaleDateString(),
                    level: 3,
                    experiencePoints: 2750
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

                <div className="stat-card level">
                    <div className="stat-icon">🏆</div>
                    <h3>Current Level</h3>
                    <p className="stat-value">{stats.level}</p>
                    <div className="progress-bar">
                        <div 
                            className="progress" 
                            style={{ width: `${(stats.experiencePoints % 1000) / 10}%` }}
                        ></div>
                    </div>
                    <p className="stat-subtitle">{1000 - (stats.experiencePoints % 1000)} XP to next level</p>
                </div>
            </div>

            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="action-buttons">
                    <button className="action-btn practice">
                        <span>🎯</span> Start Practice
                    </button>
                    <button className="action-btn translate">
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
