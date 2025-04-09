// ==== Profile.jsx ====
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';
import { Eye, EyeOff } from 'lucide-react';

const Profile = () => {
    const { user, login } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [show, setShow] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                username: user.username || '',
                email: user.email || '',
            }));
        }
    }, [user]);

    const isValidEmail = (email) => /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/.test(email);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.email !== user.email && !isValidEmail(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (formData.newPassword) {
            if (formData.newPassword !== formData.confirmNewPassword) {
                setError('New passwords do not match');
                return;
            }
            if (formData.newPassword.length < 6) {
                setError('New password must be at least 6 characters long');
                return;
            }
        }

        try {
            const response = await fetch('http://localhost:5000/api/profile/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                login(data);
                setSuccess('Profile updated successfully!');
                setIsEditing(false);
                setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                }));
            } else {
                setError(data.error || 'Failed to update profile');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="profile-container">
            <h2>Profile Settings</h2>
            {(error || success) && (
                <div className={`alert ${error ? 'alert-error' : 'alert-success'}`}>
                    {error || success}
                </div>
            )}

            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <h3>{user?.username || 'User'}</h3>
                </div>

                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            disabled={!isEditing}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            required
                        />
                    </div>

                    {isEditing && (
                        <>
                            <div className="form-group password-group">
                                <label>Current Password</label>
                                <input
                                    type={show.current ? 'text' : 'password'}
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <span className="toggle-password" onClick={() => setShow(p => ({ ...p, current: !p.current }))}>
                                    {show.current ? <EyeOff size={18} /> : <Eye size={18} />}
                                </span>
                            </div>

                            <div className="form-group password-group">
                                <label>New Password (optional)</label>
                                <input
                                    type={show.new ? 'text' : 'password'}
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                                <span className="toggle-password" onClick={() => setShow(p => ({ ...p, new: !p.new }))}>
                                    {show.new ? <EyeOff size={18} /> : <Eye size={18} />}
                                </span>
                            </div>

                            {formData.newPassword && (
                                <div className="form-group password-group">
                                    <label>Confirm New Password</label>
                                    <input
                                        type={show.confirm ? 'text' : 'password'}
                                        name="confirmNewPassword"
                                        value={formData.confirmNewPassword}
                                        onChange={handleChange}
                                    />
                                    <span className="toggle-password" onClick={() => setShow(p => ({ ...p, confirm: !p.confirm }))}>
                                        {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </span>
                                </div>
                            )}
                        </>
                    )}

                    <div className="profile-actions">
                        {!isEditing ? (
                            <button type="button" className="edit-button" onClick={() => setIsEditing(true)}>
                                Edit Profile
                            </button>
                        ) : (
                            <>
                                <button type="submit" className="save-button">Save Changes</button>
                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setError('');
                                        setFormData(prev => ({
                                            ...prev,
                                            currentPassword: '',
                                            newPassword: '',
                                            confirmNewPassword: ''
                                        }));
                                    }}
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
