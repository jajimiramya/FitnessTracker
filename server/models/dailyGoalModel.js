const mongoose = require("mongoose");

const DailyGoalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  steps: { type: Number, required: true },
  calories: { type: Number, required: true },
  water: { type: Number, required: true },
  workoutDuration: { type: Number, required: true },
  date: { type: Date, required: true }, // Keep date as a Date object
}, { timestamps: true });

// Ensure unique combination of userId and date
DailyGoalSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("DailyGoal", DailyGoalSchema);
