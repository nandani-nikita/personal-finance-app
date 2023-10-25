import React from 'react';
import { Link } from 'react-router-dom';
function Welcome() {
    return (
        <div>
            <h1>Welcome to Your Personal Finance App</h1>
            <p>Get started by creating an account or logging in.</p>
            <button><Link to="/signup">Sign Up</Link></button>
            <button><Link to="/login">Log In</Link></button>
        </div>
    );
}

export default Welcome;
