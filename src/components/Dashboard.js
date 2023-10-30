import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css'; // Import your CSS file

function Dashboard() {
  return (
    <div className="dashboard-container">
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Home</Link>
            </li>
            <li>
              <Link to="income">Income</Link>
            </li>
            <li>
              <Link to="expense">Expense</Link>
            </li>
            <li>
              <Link to="savings">Savings</Link>
            </li>
            <li>
              <Link to="saving-contribution">Saving-Contibution</Link>
            </li>
            <li>
              <Link to="logout">Logout</Link>
            </li>
            {/* <li>
              <Link to="help">Help</Link>
            </li>
            <li>
              <Link to="support">Support</Link>
            </li> */}
          </ul>
        </nav>
      </header>

      <Outlet /> {/* Render the nested routes */}
    </div>
  );
}

export default Dashboard;


