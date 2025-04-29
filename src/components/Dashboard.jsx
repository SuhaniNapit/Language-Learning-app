// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    streak: 1,
    totalScore: 0,
    lastActive: null,
    badges: [],
  });

  useEffect(() => {
    if (!user) return;
  
    const today = new Date();
    const todayString = today.toLocaleDateString();
  
    const keyPrefix = `user_${user.username}`;
    const storedLastActive = localStorage.getItem(`${keyPrefix}_lastActive`);
    let storedStreak = parseInt(localStorage.getItem(`${keyPrefix}_streak`)) || 1;
    let storedBadges = JSON.parse(localStorage.getItem(`${keyPrefix}_badges`)) || [];
  
    let newStreak = storedStreak;
    let badges = [...storedBadges];
  
    if (storedLastActive) {
      const lastDate = new Date(storedLastActive);
      const diffTime = today - lastDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
  
      if (diffDays >= 2) {
        newStreak = 1;
        badges = [];
      } else if (diffDays >= 1) {
        newStreak += 1;
      }
      // If diffDays < 1 (same day), don't change streak
    } 
    // ELSE:
    // If no storedLastActive => assume user already existing => KEEP the old streak safely (don't reset!)
  
    // Calculate badge score (100 points per badge)
    const badgeScore = badges.length * 100;
  
    // Save today's last active
    localStorage.setItem(`${keyPrefix}_lastActive`, todayString);
    localStorage.setItem(`${keyPrefix}_streak`, newStreak);
    localStorage.setItem(`${keyPrefix}_badges`, JSON.stringify(badges));
  
    setStats({
      streak: newStreak,
      totalScore: badgeScore,
      lastActive: todayString,
      badges,
    });
  }, [user]);
  

  const handleStartQuiz = () => {
    navigate('/study-room');
  };

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
          <p className="stat-value">{stats.streak} {stats.streak === 1 ? 'day' : 'days'}</p>
          <p className="stat-subtitle">Keep it going!</p>
        </div>

        <div className="stat-card score">
          <div className="stat-icon">🏅</div>
          <h3>Badge Score</h3>
          <p className="stat-value">{stats.totalScore}</p>
          <p className="stat-subtitle">Points from badges</p>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-btn translate" onClick={() => navigate('/translator')}>🌐 Translate</button>
          <button className="action-btn vocabulary" onClick={handleStartQuiz}>📝 Vocabulary Quiz</button>
        </div>
      </div>

      <div className="badges-section">
        <h2>🏅 Your Badges</h2>
        {stats.badges.length > 0 ? (
          <ul className="badges-list">
            {stats.badges.map((badge, idx) => (
              <li key={idx} className="badge">{badge}</li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#2c3e50', marginTop: '10px' }}>
            No badges yet. Start building your streak! 💪
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
