const goalService = require('../service/goal-service');

class GoalController {
  async getGoals(req, res, next) {
    try {
      const goals = await goalService.getGoals(req.user.id);
      res.json(goals);
    } catch (e) {
      next(e);
    }
  }

  async addGoal(req, res, next) {
    try {
      const { text } = req.body;
      const goal = await goalService.addGoal(req.user.id, text);
      res.json(goal);
    } catch (e) {
      next(e);
    }
  }

  async updateGoal(req, res, next) {
    try {
      const { done } = req.body;
      const goal = await goalService.updateGoal(req.user.id, req.params.id, done);
      res.json(goal);
    } catch (e) {
      next(e);
    }
  }

  async deleteGoal(req, res, next) {
    try {
      await goalService.deleteGoal(req.user.id, req.params.id);
      res.json({ success: true });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new GoalController();
