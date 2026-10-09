const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  courseId: String,
  courseName: String,   
  schedule: String,     
  room: String          
});

const TimetableModel = mongoose.model("CourseTimetable", timetableSchema);
module.exports = TimetableModel;

