import React, { useState } from "react";
import axios from "axios";
import './style.css';

function DropCourse() {
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!studentId || !courseId || !reason) {
      alert("Please fill in all fields.");
      return;
    }
 const token = localStorage.getItem("auth");
 console.log("Frontend Token:", token);
 
    axios.post( 
      "http://localhost:6161/dropcourse",
      { 
        studentId,courseId,reason
      },
       {
        headers: {
           Authorization: `Bearer ${token}` 
        },
      }

    )
    .then((res) => {
      alert("Course dropped successfully!");
      setStudentId("");
      setCourseId("");
      setReason("");
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to drop course.");
    });
  };

  return (
    <div className="add-style">
      <h2>Drop Course</h2>
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

        <div>
          <label>Reason:</label><br />
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        <br />
        <button type="submit" className="btn btn-success">Drop Course</button>
      </form>
    </div>
  );
}

export default DropCourse;
