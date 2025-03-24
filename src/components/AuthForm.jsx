import React, { useState } from 'react';
import './AuthForm.css'; // Import the CSS for the AuthForm component
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useAuth } from '../context/AuthContext'; // Import useAuth

const AuthForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Use the auth context

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!isLogin && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/${isLogin ? 'login' : 'register'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            const data = await response.json();
            console.log('Response:', data); // For debugging

            if (response.ok) {
                if (isLogin) {
                    // Handle login success
                    login(data); // This will set the token and user data
                    navigate('/dashboard');
                } else {
                    // Handle registration success
                    alert('Registration successful! Please login.');
                    setIsLogin(true);
                }
            } else {
                setError(data.error || 'An error occurred');
            }
        } catch (err) {
            console.error('Auth error:', err);
            setError('An error occurred. Please try again.');
        }
    };

    const handleOAuthLogin = async (provider) => {
        if (provider === 'Google') {
            return (
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                        login(credentialResponse);
                        navigate('/dashboard');
                    }}
                    onError={() => {
                        console.log('Login Failed');
                        setError('Google login failed');
                    }}
                />
            );
        }
    };

    return (
        <div className="auth-form">
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {!isLogin && (
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                )}
                <button type="submit" className="submit-button">
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
            
            <div className="auth-divider">
                <span>OR</span>
            </div>
            
            <div className="google-auth-container">
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                        login(credentialResponse);
                        navigate('/dashboard');
                    }}
                    onError={() => {
                        console.log('Login Failed');
                        setError('Google login failed');
                    }}
                />
            </div>

            <p onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </p>
        </div>
    );
};

export default AuthForm;
