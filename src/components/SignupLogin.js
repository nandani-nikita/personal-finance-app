import React, { useState } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import './styles.css';

function SignupLogin() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };
  return (
    <div className="container">
      <h1>Welcome to Your Personal Finance App</h1>
      <p>Get started by creating an account or logging in.</p>
      {isSignUp ? <SignUp /> : <Login />}
      <p>
        {isSignUp
          ? "Already have an account? "
          : "Don't have an account yet? "}
        <button onClick={toggleForm}>
          {isSignUp ? "Log In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}

export default SignupLogin;
