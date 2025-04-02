const express = require('express');
const router = express.Router();
const StudySession = require('../models/StudySession');

// Create a new study session
router.post('/create', async (req, res) => {
    const { title } = req.body;
    const newSession = new StudySession({ title });
    await newSession.save();
    res.status(201).json(newSession);
});

// Join a study session
router.post('/join/:id', async (req, res) => {
    const sessionId = req.params.id;
    const userId = req.user._id; // Assuming user is authenticated and user ID is available

    const session = await StudySession.findById(sessionId);
    if (!session) return res.status(404).json({ message: 'Session not found' });

    session.users.push(userId);
    await session.save();
    res.status(200).json(session);
});

// Get all study sessions
router.get('/', async (req, res) => {
    const sessions = await StudySession.find().populate('users');
    res.status(200).json(sessions);
});

module.exports = router;
