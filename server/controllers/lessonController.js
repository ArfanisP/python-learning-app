const Lesson = require("../models/Lesson");

const createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);

    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();

    res.json(lessons);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createLesson,
  getLessons,
};