const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: String,
  courseCode: String,
  instructor: String,
  credits: Number,
});

const CourseModel = mongoose.model("Course", courseSchema);
module.exports = CourseModel;

