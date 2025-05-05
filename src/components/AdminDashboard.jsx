import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [words, setWords] = useState([]);
    const [newWord, setNewWord] = useState('');
    const [newMeaning, setNewMeaning] = useState('');

    useEffect(() => {
        fetch('/api/vocabulary')
            .then(res => res.json())
            .then(data => {
                console.log('Fetched words:', data);
                if (Array.isArray(data)) {
                    setWords(data);
                } else {
                    console.error('Invalid data format:', data);
                }
            })
            .catch(err => console.error('Failed to fetch words', err));
    }, []);

    const handleAddWord = async () => {
        if (newWord && newMeaning) {
            try {
                const res = await fetch('http://localhost:5000/api/vocabulary/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ word: newWord, meaning: newMeaning }),
                });
                

                const data = await res.json();
                if (res.ok) {
                    setWords([...words, data.word]);
                    setNewWord('');
                    setNewMeaning('');
                    alert('Word added!');
                } else {
                    alert(data.error || 'Failed to add word');
                }
            } catch (err) {
                alert('Error connecting to server');
            }
        }
    };

    if (!user?.isAdmin) return <h2>Access Denied</h2>;

    return (
        <div className="dashboard-container">
            <h1>👑 Welcome Admin {user.username}</h1>

            <div className="add-word-form">
                <h3>Add New Vocabulary Word</h3>
                <input type="text" placeholder="Word" value={newWord} onChange={(e) => setNewWord(e.target.value)} />
                <input type="text" placeholder="Meaning" value={newMeaning} onChange={(e) => setNewMeaning(e.target.value)} />
                <button onClick={handleAddWord}>Add Word</button>
            </div>

            <div className="word-list">
                <h3>Vocabulary Words</h3>
                <ul>
                    {words.map((item, index) => (
                        item && item.word ? <li key={index}><strong>{item.word}</strong>: {item.meaning}</li> : null
                    ))}
                </ul>
            </div>

            <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
        </div>
    );
};

export default AdminDashboard;
