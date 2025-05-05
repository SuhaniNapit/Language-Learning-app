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
  
    const lastActiveKey = `lastActive_${user.username}`;
    const streakKey = `streak_${user.username}`;
    const badgeKey = `badges_${user.username}`;
  
    const storedLastActive = localStorage.getItem(lastActiveKey);
    const storedStreak = parseInt(localStorage.getItem(streakKey), 10);
    const storedBadges = JSON.parse(localStorage.getItem(badgeKey)) || [];
  
    let newStreak = 1;
    let badges = [...storedBadges];
  
    if (storedLastActive) {
      const lastActiveDate = new Date(storedLastActive);
      const diffTime = today.getTime() - lastActiveDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
      if (diffDays === 1) {
        // User visited yesterday, increase streak
        newStreak = (isNaN(storedStreak) ? 1 : storedStreak) + 1;
      } else if (diffDays > 1) {
        // Missed at least one day, reset streak
        newStreak = 1;
        badges = []; // Optional: reset badges if streak resets
      } else {
        // Same day login, keep streak unchanged
        newStreak = isNaN(storedStreak) ? 1 : storedStreak;
      }
    }
  
    // Save updated stats
    localStorage.setItem(lastActiveKey, todayString);
    localStorage.setItem(streakKey, newStreak.toString());
    localStorage.setItem(badgeKey, JSON.stringify(badges));
  
    const badgePoints = 100;
    const badgeScore = badges.length * badgePoints;
  
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
