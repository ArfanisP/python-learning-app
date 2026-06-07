const Progress = require("../models/Progress");

const saveProgress = async (req, res) => {
  try {
    const { lessonId, score, completed } = req.body;

    const progress = await Progress.create({
      userId: req.user._id,
      lessonId,
      score,
      completed,
    });

    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyProgress = async (req, res) => {
  try {
    const progress = await Progress.find({
      userId: req.user._id,
    })
      .populate("lessonId", "title category")
      .sort({ createdAt: -1 });

    res.json(progress);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  saveProgress,
  getMyProgress,
};