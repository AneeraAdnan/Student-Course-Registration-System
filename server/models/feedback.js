const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  courseId: String,
  userId: String,
  rating: Number,
  comments: String
});

const FeedbackModel = mongoose.model("Feedback", feedbackSchema);
module.exports = FeedbackModel;

