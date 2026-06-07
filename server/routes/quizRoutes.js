const express = require("express");

const {
  createQuiz,
  getAllQuizzes,
  getQuizzesByLesson,
} = require("../controllers/quizController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllQuizzes);

router.get("/:lessonId", getQuizzesByLesson);

router.post("/", protect, createQuiz);

module.exports = router;