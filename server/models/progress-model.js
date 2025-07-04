const { Schema, model, Types } = require('mongoose');

const CourseProgressSchema = new Schema({
  courseId: { type: String, required: true },
  duration: { type: Number, required: true },
  lessons: { type: Number, required: true },
  completedAt: { type: Date, required: true }
});

const ProgressSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  courses: [CourseProgressSchema]
});

module.exports = model('Progress', ProgressSchema);
