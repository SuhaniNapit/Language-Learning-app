// ==== AuthForm.jsx ====
import React, { useState } from 'react';
import './AuthForm.css';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const AuthForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!isLogin) {
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            if (!validatePassword(password)) {
                setError('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
                return;
            }
        }

        try {
            const response = await fetch(`http://localhost:5000/api/${isLogin ? 'login' : 'signup'}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: isLogin ? undefined : username,
                    email,
                    password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                if (isLogin) {
                    login(data);
                    navigate('/dashboard');
                } else {
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

    const handleForgotPassword = () => {
        navigate('/forgot-password');
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
                <div className="form-group password-group">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                </div>
                {!isLogin && (
                    <div className="form-group password-group">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
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
                        login(credentialResponse);
                        navigate('/dashboard');
                    }}
                    onError={() => {
                        setError('Google login failed');
                    }}
                />
            </div>

            <p onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </p>

            <p>
                <button onClick={handleForgotPassword}>Forgot Password?</button>
            </p>
        </div>
    );
};

export default AuthForm;
