import React, { useState } from "react";
import axios from "axios";
import './style.css';

function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [code, setCode] = useState("");
  const [instructor, setInstructor] = useState("");
  const [credits, setCredits] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!courseName || !code || !instructor || !credits) {
      alert("Please fill all fields.");
      return;
    }
  const token = localStorage.getItem("auth");
  console.log("Frontend Token:", token);
 
    axios.post("http://localhost:6161/addcourse", 
      {
      courseName,
      code,
      instructor,
      credits,
     },
     {
        headers: {
           Authorization: `Bearer ${token}`
        },
      }

  )

    .then((res) => {
      alert("Course added successfully!");
      setCourseName("");
      setCode("");
      setInstructor("");
      setCredits("");
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to add course.");
    });
  };

  return (
    <div className="add-style">
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Name:</label><br />
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Course Code:</label><br />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Instructor:</label><br />
          <input
            type="text"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Credits:</label><br />
          <input
            type="number"
            min="3"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            required
          />
        </div>

        <br />
        <button type="submit" className="btn btn-success">Add Course</button>
      </form>
    </div>
  );
}

export default AddCourse;

