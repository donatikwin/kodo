const ProgressModel = require('../models/progress-model');

class ProgressService {
  async addCompletedCourse(userId, courseData) {
    let progress = await ProgressModel.findOne({ userId });

    if (!progress) {
      progress = new ProgressModel({ userId, courses: [courseData] });
    } else {
      progress.courses.push(courseData);
    }

    await progress.save();
    return progress;
  }

  async getProgress(userId) {
    const progress = await ProgressModel.findOne({ userId }).populate('userId', 'username email');
    return progress;
  }
}

module.exports = new ProgressService();
