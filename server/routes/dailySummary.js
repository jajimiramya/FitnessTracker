const express = require("express");
const router = express.Router();
const DailySummary = require("../models/DailySummary");
const Workout = require("../models/Workout");
const Meal = require("../models/Meal");
//const DailyGoals = require("../models/DailyGoals");
const DailyGoals = require("../models/dailyGoalModel");


/*router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    let summary = await DailySummary.findOne({ userId });

    // Fetch last workout
    const lastWorkout = await Workout.findOne({ userId }).sort({ date: -1 });

    // Fetch today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastWorkoutDate = lastWorkout ? new Date(lastWorkout.date).setHours(0, 0, 0, 0) : null;

    // Fetch today's calories consumed
    const mealsToday = await Meal.aggregate([
      { $match: { userId, date: { $gte: today } } },
      { $group: { _id: null, totalCalories: { $sum: "$calories" } } },
    ]);
    const caloriesConsumed = mealsToday.length ? mealsToday[0].totalCalories : 0;

    // Fetch today's calories burned
    const workoutsToday = await Workout.aggregate([
      { $match: { userId, date: { $gte: today } } },
      { $group: { _id: null, totalCalories: { $sum: "$caloriesBurned" } } },
    ]);
    const caloriesBurned = workoutsToday.length ? workoutsToday[0].totalCalories : 0;

    // 🏆 Function to Calculate Streak
    async function calculateWorkoutStreak(userId) {
      const workouts = await Workout.find({ userId }).sort({ date: -1 });

      if (workouts.length === 0) return 0; // No workouts, streak is 0

      let streak = 1; // Start with 1 (today counts)
      let lastDate = new Date(workouts[0].date);
      lastDate.setHours(0, 0, 0, 0); // Normalize time

      for (let i = 1; i < workouts.length; i++) {
        let currentDate = new Date(workouts[i].date);
        currentDate.setHours(0, 0, 0, 0);

        let diff = (lastDate - currentDate) / (1000 * 60 * 60 * 24); // Convert milliseconds to days

        if (diff === 1) {
          streak++; // Continue streak
        } else if (diff > 1) {
          break; // Streak is broken
        }

        lastDate = currentDate;
      }

      return streak;
    }

    // Calculate new streak
    const newStreak = await calculateWorkoutStreak(userId);

    // Update summary in the database
    if (!summary) {
      summary = new DailySummary({
        userId,
        caloriesConsumed,
        caloriesBurned,
        workoutsDone: 0,
        streakStatus: newStreak,
        lastWorkoutDate: today,
      });
    } else {
      summary.caloriesConsumed = caloriesConsumed;
      summary.caloriesBurned = caloriesBurned;
      summary.streakStatus = newStreak;
      summary.lastWorkoutDate = today;
    }

    await summary.save();
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch summary" });
  }
});*/



router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    let summary = await DailySummary.findOne({ userId });

    // Fetch today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch last workout
    const lastWorkout = await Workout.findOne({ userId }).sort({ date: -1 });
    const lastWorkoutDate = lastWorkout ? new Date(lastWorkout.date).setHours(0, 0, 0, 0) : null;

    // Fetch today's calories consumed (Fix: using `timestamp` instead of `date`)
    const mealsToday = await Meal.aggregate([
      { $match: { userId, timestamp: { $gte: today } } },
      { $group: { _id: null, totalCalories: { $sum: "$calories" } } },
    ]);
    const caloriesConsumed = mealsToday.length ? mealsToday[0].totalCalories : 0;

   // Fetch calories burned from Daily Goals instead of Workouts
   const dailyGoalsToday = await DailyGoals.findOne({ userId, date: { $gte: today } });
   const caloriesBurned = dailyGoalsToday ? dailyGoalsToday.caloriesBurned : 0;
   //console.log("Calories Burned from Goals:", caloriesBurned);
//console.log("DailySummary before update:", summary);

    // Count today's workouts
    const workoutsDone = await Workout.countDocuments({
      userId,
      date: { $gte: today },
    });

    // 🏆 Function to Calculate Streak
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

    // Update DailySummary in DB
    if (!summary) {
      summary = new DailySummary({
        userId,
        caloriesConsumed,
        caloriesBurned,
        workoutsDone,
        streakStatus: newStreak,
        lastWorkoutDate: lastWorkoutDate || today,
      });
    } else {
      summary.caloriesConsumed = caloriesConsumed;
      summary.caloriesBurned = caloriesBurned;
      summary.workoutsDone = workoutsDone;
      summary.streakStatus = newStreak;
      if (lastWorkout) {
        summary.lastWorkoutDate = lastWorkoutDate;
      }
    }

    await summary.save();
    res.json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch daily summary" });
  }
});




module.exports = router;
