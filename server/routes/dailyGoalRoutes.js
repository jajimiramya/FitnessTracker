const router = require("express").Router();
const DailyGoal = require("../models/dailyGoalModel");
const authMiddleware = require("../middlewares/authMiddleware");

// Create or Update Daily Goal
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { userId, steps = 0, calories = 0, water = 0, workoutDuration = 0 } = req.body;
    const date = new Date().setHours(0, 0, 0, 0); // Normalize date to store only YYYY-MM-DD

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Find existing record and update or create new one
    const dailyGoal = await DailyGoal.findOneAndUpdate(
      { userId, date }, // Search by userId and date
      { $set: { steps, calories, water: parseFloat(water), workoutDuration } }, // Update fields
      { new: true, upsert: true } // Return updated document or create if not found
    );

    res.status(201).json({ message: "Daily goal saved!", dailyGoal });
  } catch (error) {
    console.error("Error saving daily goal:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/today", authMiddleware, async (req, res) => {
  console.log("✅ Inside GET /today route");
  console.log("✅ Checking req.user:", req.user);

  if (!req.user || !req.user.userId) {
      console.log("❌ No user ID found!");
      return res.status(400).json({ error: "User ID is required" });
  }

  try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      console.log("🔍 Querying database for:", req.user.userId, startOfDay, endOfDay);

      const dailyGoals = await DailyGoal.find({
          userId: req.user.userId,
          date: { $gte: startOfDay, $lte: endOfDay }
      });

      console.log("✅ Found Daily Goals:", dailyGoals);

      if (!dailyGoals || dailyGoals.length === 0) {
          return res.status(404).json({ message: "No daily goals found for today." });
      }

      // Explicitly set response content type
      res.setHeader("Content-Type", "application/json");

      return res.status(200).json(dailyGoals);

  } catch (error) {
      console.log("❌ Error fetching daily goals:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
  }
});



//GET /api/daily-goals/:date - Fetch goals for a specific date
// Get daily goals for a specific date
router.get("/:date", authMiddleware, async (req, res) => {
  try {
      const { date } = req.params; // Extract date from URL
      const userId = req.user.userId; // Get user ID from auth middleware

      const goals = await DailyGoal.find({ userId, date });

      if (!goals.length) {
          return res.status(404).json({ success: false, message: "No goals found for this date." });
      }

      res.status(200).json({ success: true, data: goals });
  } catch (error) {
      console.error("Error fetching daily goals:", error);
      res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Update a Daily Goal by ID
router.put("/:id", authMiddleware, async (req, res) => {
  try {
      const goalId = req.params.id;
      const { waterIntake, steps, calories, workoutCompleted } = req.body;

      // ✅ Validate input (ensure at least one field is present)
      if (!waterIntake && !steps && !calories && !workoutCompleted) {
          return res.status(400).json({ success: false, message: "At least one field is required to update." });
      }

      // ✅ Find and update the goal
      const updatedGoal = await DailyGoal.findByIdAndUpdate(
          goalId,
          { waterIntake, steps, calories, workoutCompleted },
          { new: true } // Return updated document
      );

      if (!updatedGoal) {
          return res.status(404).json({ success: false, message: "Daily goal not found." });
      }

      res.status(200).json({ success: true, data: updatedGoal });
  } catch (error) {
      console.error("Error updating daily goal:", error);
      res.status(500).json({ success: false, message: "Server error." });
  }
});

// ✅ Delete a Daily Goal by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
      const goalId = req.params.id;

      // ✅ Find and delete the goal
      const deletedGoal = await DailyGoal.findByIdAndDelete(goalId);

      if (!deletedGoal) {
          return res.status(404).json({ success: false, message: "Daily goal not found." });
      }

      res.status(200).json({ success: true, message: "Daily goal deleted successfully." });
  } catch (error) {
      console.error("Error deleting daily goal:", error);
      res.status(500).json({ success: false, message: "Server error." });
  }
});


/*router.get("/history/:days", authMiddleware, async (req, res) => {
  try {
      const { days } = req.params;
      const userId = req.user.userId;

      // Get dates within the past 'days' period
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      const history = await DailyGoal.find({
          userId,
          date: { $gte: startDate }
      }).sort({ date: 1 });

      if (!history.length) {
          return res.status(404).json({ success: false, message: "No historical data found." });
      }

      res.status(200).json({ success: true, data: history });
  } catch (error) {
      console.error("Error fetching history:", error);
      res.status(500).json({ success: false, message: "Server error" });
  }
});*/
router.get("/history/:days", authMiddleware, async (req, res) => {
  try {
      const { days } = req.params;
      //const userId = req.user?.userId;
      const userId = req.user.userId;

      if (!userId) {
          return res.status(400).json({ success: false, message: "User ID not found in request" });
      }

      // Calculate the correct UTC start date
      const startDate = new Date();
      startDate.setUTCDate(startDate.getUTCDate() - days);
      startDate.setUTCHours(0, 0, 0, 0);

      // Set end date to the current UTC day
      const endDate = new Date();
      endDate.setUTCHours(23, 59, 59, 999);

      console.log("User ID:", userId);
      console.log("Start Date (UTC):", startDate.toISOString());
      console.log("End Date (UTC):", endDate.toISOString());

      const history = await DailyGoal.find({
          userId,
          date: { $gte: startDate, $lte: endDate }  // Use UTC date range
      }).sort({ date: 1 });

      if (!history.length) {
          return res.status(404).json({ success: false, message: "No historical data found." });
      }

      res.status(200).json({ success: true, data: history });
  } catch (error) {
      console.error("Error fetching history:", error);
      res.status(500).json({ success: false, message: "Server error" });
  }
});



module.exports = router;
