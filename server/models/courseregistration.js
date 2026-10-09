const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  studentId: String,
  courseId: String,
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

const RegistrationModel = mongoose.model("CourseRegistration", registrationSchema);
module.exports = RegistrationModel;
