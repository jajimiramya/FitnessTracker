const mongoose = require("mongoose");

const MotivationSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  badges: [{ type: String }], // Array of achievements
  stories: [
    {
      name: String, // Name of the person sharing the story
      achievement: String, // Description of success
    },
  ],
});

module.exports = mongoose.model("Motivation", MotivationSchema);
