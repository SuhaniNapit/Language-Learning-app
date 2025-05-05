const express = require('express');
const router = express.Router();
const Vocabulary = require('../models/Vocabulary');

// Add a new vocabulary word (admin only)
router.post('/add', async (req, res) => {
    const { word, meaning } = req.body;
    if (!word || !meaning) return res.status(400).json({ error: 'Word and meaning required' });

    try {
        const newWord = new Vocabulary({ word, meaning });
        await newWord.save();
        res.status(201).json({ message: 'Word added', word: newWord });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add word' });
    }
});

// Get all vocabulary words
router.get('/', async (req, res) => {
    try {
        const words = await Vocabulary.find();
        res.status(200).json(words);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch words' });
    }
});

// Example in routes/vocabulary.js or similar



module.exports = router;
