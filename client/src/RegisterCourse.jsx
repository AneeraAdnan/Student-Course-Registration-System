import React, { useState } from "react";
import axios from "axios";
import './style.css';

function RegisterCourse() {
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!studentId || !courseId) {
      alert("Please fill in both fields.");
      return;
    }

    const token = localStorage.getItem("auth");
    console.log("Frontend Token:", token);

    axios.post(
      "http://localhost:6161/registercourse",
      { studentId, courseId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    )
    .then((res) => {
      alert("Course registered successfully!");
      setStudentId("");
      setCourseId("");
    })
    .catch((err) => {
      console.error("Registration error:", err.response?.data || err.message);
      alert("Failed to register course.");
    });
  };

  return (
    <div className="add-style">
      <h2>Register Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student ID:</label><br />
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Course ID:</label><br />
          <input
            type="text"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />
        </div>

        <br />
        <button type="submit" className="btn btn-success">Register</button>
      </form>
    </div>
  );
}

export default RegisterCourse;
