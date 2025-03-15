const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const Workout = require('../models/Workout');

const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware')


// Adding Workouts (POST /api/workouts)
router.post('/', async (req, res) => {  // Removed '/api/workouts' -> now it's just '/'
    try {
        const newWorkout = new Workout(req.body);
        await newWorkout.save();
        res.status(201).json(newWorkout);
    } catch (error) {
        console.error("Error creating workout:", error);
        res.status(400).json({ error: "Unable to create workout. Please try again." });
    }
});

// Fetching All Workouts (GET /api/workouts)
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.status(200).json(workouts);
    } catch (error) {
        console.error("Error fetching workouts:", error);
        res.status(500).json({ error: "Error fetching workouts" });
    }
});

// Fetching a Specific Workout (GET /api/workouts/:id)
router.get('/:id', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) return res.status(404).json({ message: 'Workout not found' });
        res.status(200).json(workout);
    } catch (error) {
        console.error("Error fetching workout:", error);
        res.status(500).json({ error: "Error fetching workout" });
    }
});

// Updating Workouts (PUT /api/workouts/:id)
router.put('/:id', async (req, res) => {
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedWorkout) return res.status(404).json({ message: 'Workout not found' });
        res.status(200).json(updatedWorkout);
    } catch (error) {
        console.error("Error updating workout:", error);
        res.status(400).json({ error: "Unable to update workout" });
    }
});

// Deleting Workouts (DELETE /api/workouts/:id)
router.delete('/:id', async (req, res) => {
    try {
        const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
        if (!deletedWorkout) return res.status(404).json({ message: 'Workout not found' });
        res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
        console.error("Error deleting workout:", error);
        res.status(500).json({ error: "Unable to delete workout" });
    }
});


// ✅ Get Workout Streaks for a User


// Streak API - Get user workout streak based on range
router.get("/streaks/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { range } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day

    let startDate;
    if (range === "today") {
      startDate = today;
    } else if (range === "7days") {
      startDate = new Date();
      startDate.setDate(today.getDate() - 6);
    } else if (range === "1month") {
      startDate = new Date();
      startDate.setMonth(today.getMonth() - 1);
    } else {
      return res.status(400).json({ message: "Invalid range provided" });
    }

    console.log(`Fetching streak from ${startDate.toISOString()} to ${today.toISOString()}`);

    const workouts = await Workout.find({
      userId: userId,
      date: { $gte: startDate, $lte: today },
    });

    console.log(`Workouts found for range ${range}:`, workouts.length);

    res.json({ streak: workouts.length });
  } catch (error) {
    console.error("Error fetching workout streaks:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Add a new workout
router.post("/", async (req, res) => {
  try {
    const { userId, type, duration, intensity, date } = req.body;

    if (!userId || !type || !duration || !intensity || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newWorkout = new Workout({
      userId,
      type,
      duration,
      intensity,
      date: new Date(date), // Convert date string to ISO format
    });

    await newWorkout.save();
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(500).json({ error: "Failed to add workout" });
  }
});

module.exports = router;






