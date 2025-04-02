const mongoose = require('mongoose');

const StudySessionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('StudySession', StudySessionSchema);
