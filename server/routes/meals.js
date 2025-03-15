const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");

const Meal = require('../models/Meal');


// ✅ Add a new meal


router.post("/", authMiddleware, async (req, res) => {
  try {
    //console.log("Received Meal Data:", req.body); // ✅ Debugging step

    const { mealName, calories, carbs, proteins, fats } = req.body;
    const userId = req.user.id; // Get user ID from middleware
    //console.log("useeeeeeeeeeeer id :"+ userId);

    if (!mealName || !calories || !carbs || !proteins || !fats) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const meal = new Meal({
      userId:req.body.userId,
      mealName,
      calories: parseFloat(calories) || 0, // Ensure numeric values
      carbs: parseFloat(carbs) || 0,
      proteins: parseFloat(proteins) || 0,
      fats: parseFloat(fats) || 0,
      timestamp: new Date(),
    });

    console.log("Meal Data Before Saving:", meal); // ✅ Debugging step

    await meal.save();
    res.status(201).json({ message: "Meal added successfully!", meal });
  } catch (error) {
    console.error("Error Adding Meal:", error);
    res.status(500).json({ error: "Failed to add meal" });
  }
});




// ✅ Get all meals for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    
    const meals = await Meal.find({ userId: req.body.userId }).sort({ createdAt: -1 });
    res.status(200).json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch meals" });
  }
});




// ✅ Delete a meal
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    if (meal.userId.toString() !== req.body.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await meal.deleteOne();
    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete meal" });
  }
});

// ✅ Correct CommonJS export
module.exports = router;
