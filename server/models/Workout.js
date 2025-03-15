const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: { type: String, required: true },//modified
    type: { type: String, required: true },
    duration: { type: Number, required: true },// in minutes
    intensity: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    date: { type: Date, default: Date.now,required: true }
});

module.exports = mongoose.model('Workout', workoutSchema);