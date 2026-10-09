const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name:String,
    studentId:Number,
    email:String,
    password:String
    
});

const StudentModel = mongoose.model("students", StudentSchema);
module.exports = StudentModel;
