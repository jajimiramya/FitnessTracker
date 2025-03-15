const express = require("express");
const router = express.Router();
const Motivation = require("../models/Motivation");

// ✅ Fetch all users' achievements (badges)
router.get("/badges", async (req, res) => {
  try {
    const allMotivations = await Motivation.find({}, "userId badges");
    res.json(allMotivations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch achievements" });
  }
});

// ✅ Fetch all success stories
router.get("/stories", async (req, res) => {
  try {
    const allStories = await Motivation.find({}, "userId stories");
    res.json(allStories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch success stories" });
  }
});

// ✅ Add a new achievement (badge)
router.post("/badges", async (req, res) => {
  try {
    const { userId, badge } = req.body;
    if (!userId || !badge) return res.status(400).json({ error: "userId and badge are required" });

    let motivation = await Motivation.findOne({ userId });
    if (!motivation) motivation = new Motivation({ userId });

    motivation.badges.push(badge);
    await motivation.save();

    res.json({ success: true, message: "Achievement added", badges: motivation.badges });
  } catch (error) {
    res.status(500).json({ error: "Failed to add achievement" });
  }
});

// ✅ Add a new success story
router.post("/stories", async (req, res) => {
  try {
    const { userId, name, achievement } = req.body;
    if (!userId || !name || !achievement) {
      return res.status(400).json({ error: "userId, name, and achievement are required" });
    }

    let motivation = await Motivation.findOne({ userId });
    if (!motivation) motivation = new Motivation({ userId });

    motivation.stories.push({ name, achievement });
    await motivation.save();

    res.json({ success: true, message: "Story added", stories: motivation.stories });
  } catch (error) {
    res.status(500).json({ error: "Failed to add success story" });
  }
});

module.exports = router;
