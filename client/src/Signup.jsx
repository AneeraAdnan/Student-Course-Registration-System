import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:6161/register', {
      name,
      email,
      password,
      studentId            
    })
    .then(result => {
      console.log(result);
      navigate("/Signin");
    })
    .catch(err => {
      console.error("Signup error:", err);
      alert("Signup failed. Please try again.");
    });
  };

  return (
    <div className="add-style">
      <form onSubmit={handleSubmit}>
        <label>
          Enter Name
          <input 
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Enter Email
          <input 
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Enter Password
          <input 
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Enter Student ID
          <input 
            type="text"
            name="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </label>
        <br />

        <button className="btn btn-success" type="submit">Signup</button>
      </form>

      <br />

      <Link to="/Signin" className="btn btn-success">Signin</Link>
    </div>
  );
}

export default Signup;
