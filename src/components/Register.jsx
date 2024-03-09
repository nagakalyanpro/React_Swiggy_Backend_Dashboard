import React, { useState } from "react";
import ReactPasswordMask from "react-password-mask";
import { API_URL } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message); 
        alert('Registration successfull!')
        navigate('/login')

      } else {
        if(data === "Email already taken"){
          alert('You are a registered vendor, Please Login')
          navigate('/login')
        }
        setError(data.error); 
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Internal server error");
    }
  };

  return (
<>
<div className='navSection'>
       <Link to='/' className="link">
       <div className="title">
            Vendor Dashboard
        </div>
       </Link>
        <div className="company"></div>
        <div className="user">
          <Link to='/login' className="link">
          <span>Login</span>
          </Link>
        </div>
    </div>
<div className="authSection reg">
      <div className="authForm">
        <div className="auth-title">Register</div>
        {error && <div className="error-message">{error}</div>}
        <form className="formSection" onSubmit={handleSubmit}>
          <div className="inp">
            <label>User Name</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ramesh"
            />
          </div>
          <div className="inp">
            <label>User Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ex.ramesh@ruby.com"
            />
          </div>
          <div className="inp">
            <label>Password</label>
            <ReactPasswordMask
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <div className="inp">
            <button className="btn-submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
</>
  );
};

export default Register;
