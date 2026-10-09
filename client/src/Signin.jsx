import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';
function Signin() {
  const [email, setEmail] = useState("");       
  const [password, setPassword] = useState(""); 

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:6161/signin', { email, password })
      .then(result => {
        if (result.data.message === "Success") {
          const token = result.data.token;
          if (token) {
            localStorage.setItem("auth", token);
            console.log("Login successful: Token saved.");
            navigate("/dashboard");
          } else {
            alert("Login successful but no token received.");
          }
        } else {
          alert(result.data.message || "Login failed.");
        }
      })
      .catch(err => {
        console.error("Login error:", err);
        alert("Login failed. Invalid entry.");
      });
  };

  return (
    <div className="add-style">
      <form onSubmit={handleSubmit}>
        
        Enter Email
        <input 
          type="email" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <br />

        Enter Password
        <input 
          type="password" 
          name="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <br />

      
        <button className="btn btn-success">Signin</button>
      </form>
<br></br>
    
      <Link to="/register"className="btn btn-success">Sighup</Link>
    
    </div>
  );
}

export default Signin; 