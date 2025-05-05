// src/components/AdminAddWord.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './AdminAddWord.css';

const AdminAddWord = () => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [audio, setAudio] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/vocabulary', {
        word,
        meaning,
        audio,
      });
      setSuccess(`Word "${res.data.word}" added successfully!`);
      setWord('');
      setMeaning('');
      setAudio('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to add word');
    }
  };

  return (
    <div className="admin-add-word-container">
      <h2>Add New Vocabulary Word</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Word"
          required
        />
        <input
          type="text"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          placeholder="Meaning"
          required
        />
        <input
          type="text"
          value={audio}
          onChange={(e) => setAudio(e.target.value)}
          placeholder="Audio URL (optional)"
        />
        <button type="submit">Add Word</button>
      </form>
      {success && <p className="success-msg">{success}</p>}
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default AdminAddWord;
