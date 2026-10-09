import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/Signin'); 
  };

  return (
    <div  className='dashboard-container'>
      
      <h1>Welcome to EduEnroll Dashboard</h1>

      <div>
        <Link to="/addcourse" >Add Course</Link> 
        <br></br>
        <br></br>
        <Link to="/registercourse">Register Course</Link>
        <br></br>
        <br></br>
        <Link to="/dropcourse">Drop Course</Link>
        <br></br>
        <br></br>
        <Link to="/timetable">Timetable</Link>
        <br></br>
        <br></br>
        <Link to="/feedback">Give Feedback</Link>
        <br></br>
        <br></br>
      </div>
  
      <br></br>
      <button onClick={handleLogout}  className="btn btn-success">Logout</button>
    </div>
  );
}

export default Dashboard;

