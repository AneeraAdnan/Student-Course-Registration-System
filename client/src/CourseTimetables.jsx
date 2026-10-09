import { useState, useEffect } from "react";
import axios from "axios";
import './style.css';
function CourseTimetable() {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [schedule, setSchedule] = useState("");
  const [room, setRoom] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    const newCourse = { courseId, courseName, schedule, room };

    axios.post("http://localhost:6161/timetable", newCourse)
      .then(() => {
        alert("Course added successfully");
        setCourses([...courses, newCourse]);
        setCourseId(""); setCourseName(""); setSchedule(""); setRoom("");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add");
      });
  };

  return (
    <div className="add-style">  
      <h2>Course Timetable</h2>

      <form onSubmit={handleSubmit}>
        Enter Course ID
        <input
          type="text"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          required
        />
        <br />

        Enter Course Name
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />
        <br />

        Enter Schedule
        <input
          type="text"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          required
        />
        <br />

        Enter Room No
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          required
        />
        <br />

        <button type="submit" className="btn btn-success">Add in timetable</button>
      </form>

    </div>
  );
 }

export default CourseTimetable;

