import React, { useEffect, useState } from 'react';
import './Home.css';

function Home() {
  const [financialSummary, setFinancialSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    remainingBudget: 0,
  });

  const [savingsGoals, setSavingsGoals] = useState([]);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Define common headers for API requests with the token
    const commonHeaders = {
      'Authorization': `Bearer ${token}`,
    };

    // Fetch total income
    fetch(`http://localhost:8000/api/total-income/${userId}`, { headers: commonHeaders })
      .then((response) => response.json())
      .then((data) => setFinancialSummary((prevSummary) => ({ ...prevSummary, totalIncome: data.totalIncome })));

    // Fetch total expenses
    fetch(`http://localhost:8000/api/total-expenses/${userId}`, { headers: commonHeaders })
      .then((response) => response.json())
      .then((data) => setFinancialSummary((prevSummary) => ({ ...prevSummary, totalExpenses: data.totalExpenses })));

    // Fetch remaining budget
    fetch(`http://localhost:8000/api/remaining-budget/${userId}`, { headers: commonHeaders })
      .then((response) => response.json())
      .then((data) => setFinancialSummary((prevSummary) => ({ ...prevSummary, remainingBudget: data.remainingBudget })));

    // Fetch savings goals
    fetch(`http://localhost:8000/api/savings-goals/${userId}`, { headers: commonHeaders })
      .then((response) => response.json())
      .then((data) => setSavingsGoals(data));
  }, [userId, token]);

  return (
    <div className="home-container">
      <h2>Income, Expenses, Budget, Savings, and More</h2>
      <p>Welcome to your personal finance dashboard.</p>

      <div>
        <h3>Financial Summary</h3>
        <p>Total Income: Rs. {financialSummary.totalIncome}</p>
        <p>Total Expenses: Rs. {financialSummary.totalExpenses}</p>
        <p>Remaining Budget: Rs. {financialSummary.remainingBudget}</p>
      </div>

      <div>
        <h3>Savings Goals</h3>
        <ul>
          {savingsGoals.map((goal) => (
            <li key={goal.id}>
              <strong>{goal.name}</strong>
              <p>Progress: {((goal.currentAmount / goal.targetAmount) * 100).toFixed(2)}%</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
