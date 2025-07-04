const GoalModel = require('../models/goal-model');

class GoalService {
  async getGoals(userId) {
    return await GoalModel.find({ user: userId });
  }

  async addGoal(userId, text) {
    const goal = new GoalModel({ user: userId, text });
    return await goal.save();
  }

  async updateGoal(userId, goalId, done) {
    return await GoalModel.findOneAndUpdate(
      { _id: goalId, user: userId },
      { done },
      { new: true }
    );
  }

  async deleteGoal(userId, goalId) {
    return await GoalModel.findOneAndDelete({ _id: goalId, user: userId });
  }
}

module.exports = new GoalService();
