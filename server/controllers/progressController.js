const Progress = require("../models/Progress");

const saveProgress = async (req, res) => {
  try {
    const { lessonId, score, completed } = req.body;

    const existingProgress = await Progress.findOne({
      userId: req.user._id,
      lessonId,
    });

    if (!existingProgress) {
      const progress = await Progress.create({
        userId: req.user._id,
        lessonId,
        score,
        completed,
      });

      return res.status(201).json({
        ...progress.toObject(),
        isBestScore: true,
      });
    }

    if (score > existingProgress.score) {
      const previousBest = existingProgress.score;

      existingProgress.score = score;
      existingProgress.completed =
        existingProgress.completed || completed;

      await existingProgress.save();

      return res.json({
        ...existingProgress.toObject(),
        previousBest,
        isBestScore: true,
      });
    }

    res.json({
      ...existingProgress.toObject(),
      isBestScore: false,
    });
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
      .sort({ updatedAt: -1 });

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
