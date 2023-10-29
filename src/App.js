import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/SignupLogin';
import Home from './components/Home'; // Import Home component
import Income from './components/Income'; // Import Income component
import Expense from './components/Expense'; // Import Expense component
import SavingContributions from './components/SavingContributions'; // Import SavingContributions component
import Savings from './components/Savings'; // Import Savings component
import Logout from './components/Logout'; // Import Logout component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="income" element={<Income />} />
          <Route path="expense" element={<Expense />} />
          <Route path="saving-contribution" element={<SavingContributions />} />
          <Route path="savings" element={<Savings />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
   
  );
}

export default App;


