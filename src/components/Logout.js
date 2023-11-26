import React from 'react';
import './Logout.css'; // Import your CSS file

function Logout() {
  const handleLogout = () => {
    // Perform logout actions here, e.g., clear local storage
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    // Optionally, you can redirect the user to the login page or perform other actions upon logout.
    // Example: window.location.href = '/login'; // Redirect to the login page
    window.location.href = '/'; // Redirect to the login page
  };

  return (
    <div className="logout-container">
      <h2>Logout</h2>
      <p>Are you sure you want to log out?</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
