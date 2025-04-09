const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Signup 
router.post('/register', async (req, res) => {
    const { username, email, password, isAdmin } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, isAdmin });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Login 
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token, user: { username: user.username, isAdmin: user.isAdmin } });
});

module.exports = router;
