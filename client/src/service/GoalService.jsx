import API from "../http";

export default class GoalService {
  static async getGoals() {
    const response = await API.get("/goals");
    return response.data;
  }

  static async createGoal(text) {
    const response = await API.post("/goals", { text });
    return response.data;
  }

  static async updateGoal(id, done) {
    const response = await API.patch(`/goals/${id}`, { done });
    return response.data;
  }

  static async deleteGoal(id) {
    const response = await API.delete(`/goals/${id}`);
    return response.data;
  }
}
