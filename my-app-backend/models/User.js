const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }, 
    resetToken: { type: String },
    resetTokenExpiration: { type: Date },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
