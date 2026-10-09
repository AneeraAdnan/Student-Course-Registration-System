const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Mytokenization =  require("./middlewares/Mytokenization");
const CourseModel = require("./models/course");
const StudentModel = require("./models/student");
const RegistrationModel = require("./models/courseregistration");
const TimetableModel = require("./models/coursetimetable");
const DropModel = require("./models/drop");
const FeedbackModel = require("./models/feedback");

const { signinValidation, signupValidation } = require("./middlewares/MyValidator");

const app = express();
app.use(express.json());
app.use(cors());

// ====================== SIGNUP =========================

app.post("/register", signupValidation, async (req, res) => {
  const { name, email, password, studentId } = req.body;

  try {
  
    const existingStudent = await StudentModel.findOne({ email: email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already registered" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const newStudent = new StudentModel({
      name,
      email,
      password: hashedPassword,
      studentId,
    });

    await newStudent.save();

    return res.status(201).json({ message: "Student registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// ====================== SIGNIN ============================

app.post("/signin", signinValidation, async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await StudentModel.findOne({ email: email.toLowerCase().trim() });
    if (!student) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

  
    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

   
    return res.status(200).json({
      message: "Success",
      email: student.email,
      name: student.name,
      token,
    });

  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//==================== ADD COURSE =========================

app.post("/addcourse",Mytokenization,async (req, res) => {
  const { courseName, code, instructor, credits } = req.body;

  if (!courseName || !code|| !instructor || credits === undefined) {
    return res.status(400).json({ message: "All fields are required." });
  }
const alreadyexisting = await CourseModel.findOne({courseCode:code})
if (alreadyexisting)
{
  return res.status(400).json({ message: "course code already exist" });
}
else {
  CourseModel.create({
    courseName,
    courseCode: code,                                  
    instructor,
    credits,
  })
    .then((newCourse) => {
      res.status(201).json({ message: "Course added successfully.", course: newCourse });
    })
    .catch((err) => {
      console.error("Error adding course:", err);
      res.status(500).json({ message: "Failed to add course", error: err.message });
    });
}  
});

// ================== DROP COURSE ========================

app.post("/dropcourse",Mytokenization, async (req, res) => {
  const { studentId, courseId, reason } = req.body;

  if (!studentId || !courseId || !reason) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    
    const dropRequest = await DropModel.create({ studentId, courseId, reason });

    
    const deletedRegistration = await RegistrationModel.findOneAndDelete({ studentId, courseId });

    if (!deletedRegistration) {
      return res.status(404).json({ message: "No registration found to delete." });
    }

    res.status(201).json({
      message: "Course dropped successfully.",
      dropRequest,
      deletedRegistration
    });
  } catch (err) {
    console.error("Error dropping course:", err);
    res.status(500).json({ message: "Failed to drop course", error: err.message });
  }
});

// =========== ADD COURSE TO TIMETABLE ================

app.post("/timetable", Mytokenization,(req, res) => {
  const { courseId, courseName, schedule, room } = req.body;

  if (!courseId || !courseName || !schedule || !room) {
    return res.status(400).json({ message: "All fields are required." });
  }

  TimetableModel.create({ courseId, courseName, schedule, room })
    .then((newCourse) => {
      res.status(201).json({ message: "Course added successfully", newCourse });
    })
    .catch((err) => {
      console.error("Error adding course:", err);
      res.status(500).json({ message: "Failed to add course", error: err.message });
    });
});

// ================== REGISTER COURSE ======================

app.post("/registercourse", Mytokenization, (req, res) => {
  const { studentId, courseId } = req.body;

  if (!studentId || !courseId) {
    return res.status(400).json({ message: "Both Student ID and Course ID are required." });
  }

  RegistrationModel.create({ studentId, courseId })
    .then((registration) => {
      res.status(201).json({ message: "Course registered successfully!", registration });
    })
    .catch((err) => {
      console.error("Course registration error:", err);
      res.status(500).json({ message: "Failed to register course", error: err.message });
    });
});



// ================== SUBMIT FEEDBACK ======================

app.post("/feedback", (req, res) => {
  const { courseId, userId, rating, comments } = req.body;

  if (!courseId || !userId || !rating || !comments) {
    return res.status(400).json({ message: "All fields are required." });
  }

  FeedbackModel.create({ courseId, userId, rating, comments })
    .then((feedback) => res.status(201).json({ message: "Feedback saved", feedback }))
    .catch((err) => {
      console.error("Error saving feedback:", err);
      res.status(500).json({ message: "Failed to save feedback", error: err.message });
    });
});

// ================= CONNECT TO MONGODB AND START SERVER =====================

const PORT = process.env.PORT || 6161;
mongoose.connect("mongodb://localhost:27017/edu", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
