const Progress = require('../models/progress-model');

class ProgressController {
  async updateProgress(req, res) {
    try {
      const userId = req.user.id;
      const { courseId, duration, lessons } = req.body;

      let progress = await Progress.findOne({ userId });

      if (!progress) {
        progress = new Progress({ userId, courses: [] });
      }

      const existingCourseIndex = progress.courses.findIndex(
        (course) => course.courseId === courseId
      );

      if (existingCourseIndex !== -1) {
        progress.courses[existingCourseIndex].duration = duration;
        progress.courses[existingCourseIndex].lessons = lessons;
        progress.courses[existingCourseIndex].completedAt = new Date();
      } else {
        progress.courses.push({
          courseId,
          duration,
          lessons,
          completedAt: new Date()
        });
      }

      await progress.save();
      res.json(progress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при обновлении прогресса' });
    }
  }

  async getProgress(req, res) {
    try {
      const userId = req.user.id;
      const progress = await Progress.findOne({ userId });

      if (!progress) {
        return res.json({ courses: [] });
      }

      res.json(progress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при получении прогресса' });
    }
  }
}

module.exports = new ProgressController();
