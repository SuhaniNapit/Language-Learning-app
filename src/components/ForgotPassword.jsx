// src/components/ForgotPassword.jsx
import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isResetting, setIsResetting] = useState(false);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setMessage('Email found. Please enter a new password.');
                setMessageType('success');
                setIsResetting(true);
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Error finding email.');
                setMessageType('error');
            }
        } catch (error) {
            setMessage('Error finding email.');
            setMessageType('error');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match. Please try again.');
            setMessageType('error');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password: newPassword }),
            });

            if (response.ok) {
                setMessage('Password has been reset successfully.');
                setMessageType('success');
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Error resetting password.');
                setMessageType('error');
            }
        } catch (error) {
            setMessage('Error resetting password.');
            setMessageType('error');
        }
    };

    return (
        <div className="forgot-password">
            <h2>Forgot Password</h2>
            {!isResetting ? (
                <form onSubmit={handleEmailSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <form onSubmit={handleResetPassword}>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Reset Password</button>
                </form>
            )}
            {message && (
                <p className={`message ${messageType}`}>{message}</p>
            )}
        </div>
    );
};

export default ForgotPassword;
