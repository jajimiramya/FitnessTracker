const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    age: {
        type: Number,
        required: true,
        min: 10,
        max: 100
    },
    height: {
        type: Number,
        required: true,
        min: 50,
        max: 250
    },
    weight: {
        type: Number,
        required: true,
        min: 20,
        max: 300
    }
});

module.exports = mongoose.model('users', userSchema);
