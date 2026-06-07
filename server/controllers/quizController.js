const Quiz = require("../models/Quiz");

const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);

    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();

    res.json(quizzes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getQuizzesByLesson = async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      lessonId: req.params.lessonId,
    });

    res.json(quizzes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createQuiz,
  getAllQuizzes,
  getQuizzesByLesson,
};