const express = require("express");
const router = express.Router();
const DailySummary = require("../models/DailySummary");
const Workout = require("../models/Workout");
const Meal = require("../models/Meal");
const DailyGoals = require("../models/dailyGoalModel");

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("User ID:", userId);

  try {
    // Fetch today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch last workout
    const lastWorkout = await Workout.findOne({ userId }).sort({ date: -1 });
    const lastWorkoutDate = lastWorkout ? new Date(lastWorkout.date).setHours(0, 0, 0, 0) : null;

    // Fetch today's calories consumed
    const mealsToday = await Meal.aggregate([
      { $match: { userId, timestamp: { $gte: today } } },
      { $group: { _id: null, totalCalories: { $sum: "$calories" } } },
    ]);
    const caloriesConsumed = mealsToday.length ? mealsToday[0].totalCalories : 0;

    // Fetch calories burned from Daily Goals
    const dailyGoalsToday = await DailyGoals.findOne({ userId, date: { $gte: today } });
    const caloriesBurned = dailyGoalsToday ? dailyGoalsToday.caloriesBurned : 0;

    // Count today's workouts
    const workoutsDone = await Workout.countDocuments({ userId, date: { $gte: today } });

    // 🏆 Function to Calculate Workout Streak
    async function calculateWorkoutStreak(userId) {
      const workouts = await Workout.find({ userId }).sort({ date: -1 });

      if (workouts.length === 0) return 0; // No workouts, streak is 0

      let streak = 1;
      let lastDate = new Date(workouts[0].date);
      lastDate.setHours(0, 0, 0, 0);

      for (let i = 1; i < workouts.length; i++) {
        let currentDate = new Date(workouts[i].date);
        currentDate.setHours(0, 0, 0, 0);

        let diff = (lastDate - currentDate) / (1000 * 60 * 60 * 24);

        if (diff === 1) {
          streak++;
        } else if (diff > 1) {
          break;
        }

        lastDate = currentDate;
      }

      return streak;
    }

    // Calculate new streak
    const newStreak = await calculateWorkoutStreak(userId);

    // 🔥 Use `findOneAndUpdate` for atomic update
    const updatedSummary = await DailySummary.findOneAndUpdate(
      { userId }, // Search criteria
      {
        $set: {
          caloriesConsumed,
          caloriesBurned,
          workoutsDone,
          streakStatus: newStreak,
          lastWorkoutDate: lastWorkout ? lastWorkoutDate : today,
        },
      },
      { upsert: true, new: true } // Create if not found, return updated document
    );

    res.json(updatedSummary);
  } catch (error) {
    console.error("Error fetching daily summary:", error);
    res.status(500).json({ error: "Failed to fetch daily summary" });
  }
});

module.exports = router;
