const mongoose = require("mongoose");

const dailyGoalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: Date,
      required: true,
      default: () => {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0); // Normalize to UTC midnight
        return today;
      }
    },
    steps: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
    water: { type: Number, default: 0 },
    workoutDuration: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Ensure uniqueness per user per day
dailyGoalSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("DailyGoal", dailyGoalSchema);
