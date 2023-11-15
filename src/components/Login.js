import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';


function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('hiii');
      const response = await fetch('http://20.163.179.25:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      console.log(response);
      if (response.ok) {
        // Login successful, update the message and navigate to the dashboard
        setLoginMessage('Login successful');
        var resp = await response.json()
        localStorage.setItem('userId', resp.userId);
        localStorage.setItem('token', resp.token);
        // Navigate to the dashboard
        navigate('/dashboard');
      } else {
        // Login failed, handle the error
        setLoginMessage('Login failed. Please check your email and password.');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </label>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>

      {/* Display the login message */}
      <p>{loginMessage}</p>
    </div>
  );
}

export default Login;

