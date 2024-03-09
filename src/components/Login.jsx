import React, { useState } from 'react';
import PasswordMask from 'react-password-mask';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/api';
import NavBar from './NavBar';
import SideBar from './SideBar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful'); 
        alert("Login success")
        navigate('/dashboard');
        window.location.reload();
        localStorage.setItem('loginToken', data.token);
        localStorage.setItem('vendor', data.username);
        localStorage.setItem('firmName', data.firm);
      } else {
        setError(data.error); 
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Internal server error');
    }
  };

  return (
  <>
    <div className='navSection'>
      <Link to='/' className='link'>
        <div className="title" >
            Vendor Dashboard
        </div>
      </Link>
        <div className="company"></div>
        <div className="user">
          <span>if not registered?</span>
        <Link to='/register' className='link'>
        <span><u>
        Register
        </u>
         </span>
        </Link>
        </div>
    </div>
    <div className="authSection">
      <div className="authForm">
        <div className="auth-title">Login</div>
        {error && <div className="error-message"
        style = {{ color:'red' }}
        >{error}</div>}
        <form className="formSection" onSubmit={handleSubmit}>
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
            <PasswordMask
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

export default Login;
