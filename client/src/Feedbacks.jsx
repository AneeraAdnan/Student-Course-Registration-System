import React, { useState } from 'react';
import axios from "axios";

function Feedback() {
  const [courseId, setCourseId] = useState('');
  const [userId, setUserId] = useState('');
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedback = {courseId,userId,rating,comments};
     try {
  
      await axios.post("http://localhost:6161/feedback", feedback);

      alert('Feedback submitted successfully!');
      setCourseId('');
      setUserId('');
      setRating('');
      setComments('');
    } 
    catch (err) {
      console.error("Failed to submit feedback:", err);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <div className="add-style">
      <h2>Submit Course Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course ID</label><br />
          <input
            type="text"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />
        </div>

        <div>
          <label>User ID</label><br />
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Rating</label><br />
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value="">Select Rating</option>
            <option value="1">Poor</option>
            <option value="2">Fair</option>
            <option value="3">Good</option>
            <option value="4">Very Good</option>
            <option value="5">Excellent</option>
          </select>
        </div>

        <div>
          <label>Comments</label><br />
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows="3"
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success" >Submit Feedback</button>
      </form>
    </div>
  );
}

export default Feedback;
