import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user?.isAdmin) {
        return <h2>Access Denied</h2>;
    }

    return (
        <div className="dashboard-container">
            <h1>👑 Welcome, Admin {user.username}!</h1>
            <p>This is the admin panel.</p>
            <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
        </div>
    );
};

export default AdminDashboard;
