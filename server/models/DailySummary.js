const mongoose = require("mongoose");

const DailySummarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  caloriesConsumed: { type: Number, default: 0 },
  caloriesBurned: { type: Number, default: 0 },
  workoutsDone: { type: Number, default: 0 },
  streakStatus: { type: Number, default: 0 },
  lastWorkoutDate: { type: Date, default: null }, // Stores last workout date
});

module.exports = mongoose.model("DailySummary", DailySummarySchema);
