const mongoose = require("mongoose");


const dropSchema = new mongoose.Schema({
  studentId: String,
  courseId: String,
  reason: String,
});

const DropModel  = mongoose.model("DropRequest", dropSchema);
module.exports = DropModel;