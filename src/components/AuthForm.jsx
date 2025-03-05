import React, { useState } from 'react';
import './AuthForm.css'; // Import the CSS for the AuthForm component
import { GoogleLogin } from '@react-oauth/google';

const AuthForm = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
    const [error, setError] = useState(''); // State to hold error messages

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Clear previous errors

        try {
            const response = await fetch(`http://localhost:5000/api/${isLogin ? 'login' : 'register'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, phone, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setIsLoggedIn(true); // Set login state
            } else {
                setError(data.error); // Set error message
            }
        } catch (err) {
            setError('An error occurred. Please try again.'); // Handle any unexpected errors
        }
    };

    const handleOAuthLogin = (provider) => {
        if (provider === 'Google') {
            // Handle Google login
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                    setIsLoggedIn(true); // Set login state
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />;
        }
    };

    return (
        <div className="auth-form">
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {!isLogin && (
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                )}
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
            <div className="oauth-buttons">
                <button onClick={() => handleOAuthLogin('Google')}>Login with Google</button>
                <button onClick={() => handleOAuthLogin('Facebook')}>Login with Facebook</button>
            </div>
            <p onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Create an account' : 'Already have an account?'}
            </p>
        </div>
    );
};

export default AuthForm;
