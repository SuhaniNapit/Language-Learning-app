const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const cookieSession = require('cookie-session');
const passport = require('passport');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Create this file later
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const translateRoutes = require('./routes/translate');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST'], // Allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions)); // Enable CORS with options
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    keys: [process.env.COOKIE_KEY],
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(bodyParser.json());

// Auth Routes
app.use('/api', authRoutes); // Use the auth routes

// Use the translation routes
app.use('/api', translateRoutes);

// Test route
app.get('/api/test', (req, res) => {
    res.send('Server is running!');
});

// Register route
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Log the received data
        console.log('Received registration request:', { username, email });

        // Create new user
        const newUser = new User({
            username,
            email,
            password: await bcrypt.hash(password, 10)
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Use the JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user and validate password
        // ... your authentication logic here

        // Generate token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ 
            message: 'Login successful',
            token,
            user: { id: user._id, email: user.email }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Protected route example
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Protected data', user: req.user });
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('joinRoom', (room) => {
        socket.join(room);
    });

    socket.on('chatMessage', (msg) => {
        io.to(msg.room).emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});