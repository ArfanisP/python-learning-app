const express = require("express");

const {
  saveProgress,
  getMyProgress,
} = require("../controllers/progressController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, saveProgress);

router.get("/my-progress", protect, getMyProgress);

module.exports = router;