const express = require("express");
const router = express.Router();
const tipsData = require("../models/tips");

// Get all tips
router.get("/", (req, res) => {
  res.json(tipsData);
});

module.exports = router;
