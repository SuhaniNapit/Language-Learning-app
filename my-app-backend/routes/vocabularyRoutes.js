const express = require('express');
const router = express.Router();
const VocabularyWord = require('../models/VocabularyWord');

// Add a new word (admin)
router.post('/add', async (req, res) => {
  try {
    const { word, meaning } = req.body;
    const newWord = new VocabularyWord({ word, meaning });
    await newWord.save();
    res.status(201).json({ message: 'Word added successfully' });
  } catch (error) {
    console.error('Error adding word:', error);
    res.status(500).json({ error: 'Failed to add word' });
  }
});

// Get all vocabulary words
router.get('/all', async (req, res) => {
  try {
    const words = await VocabularyWord.find({});
    res.status(200).json(words);
  } catch (error) {
    console.error('Error fetching words:', error);
    res.status(500).json({ error: 'Failed to fetch words' });
  }
});

module.exports = router;
