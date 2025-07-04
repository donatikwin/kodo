import API from "../http";

export default class ProgressService {
  static async submitCourseProgress(courseId, duration, lessons) {
    const response = await API.post('/progress', {
      courseId,
      duration,
      lessons,
      completedAt: new Date()
    });
    return response.data;
  }
  static async getProgress() {
    const response = await API.get('/progress');
    return response.data;
  }
}
