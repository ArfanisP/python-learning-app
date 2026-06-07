const express = require("express");

const {
  createLesson,
  getLessons,
} = require("../controllers/lessonController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getLessons);

router.post("/", protect, createLesson);

module.exports = router;