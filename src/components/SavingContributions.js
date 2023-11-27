import React, { useState, useEffect } from 'react';
import './SavingContributions.css';


function SavingsContributions() {
  const [contributionData, setContributionData] = useState({
    userId: parseInt(localStorage.getItem('userId')),
    savingsGoalId: 0, // Initialize to 0
    amount: 0,
    date: '',
  });

  const [message, setMessage] = useState('');
  const [contributions, setContributions] = useState(null);
  const [categories, setCategories] = useState([]);

  const userId = localStorage.getItem('userId'); // Get the userId from local storage
  const token = localStorage.getItem('token'); // Get the token from local storage

  const commonHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`, // Set the Authorization header with the token
  };

  useEffect(() => {
    // Fetch categories
    fetch(`http://20.163.179.25:8000/api/categories/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        if (data.length > 0) {
          // Initialize contributionData with the first category
          let goal = {
            userId: userId, // Set the userId
            savingsGoalId: data[0].id,
            amount: 0,
            date: '',
          };
          setContributionData(goal);
        }
      });

      fetchContributions();
  }, [userId]); // Include userId in dependencies

  // Fetch contributions
  const fetchContributions = async () => {
    try {
      const response = await fetch(`http://20.163.179.25:8000/api/savings-contributions/${userId}`, {
        headers: commonHeaders, // Include common headers
      });

      if (response.ok) {
        const contributionsData = await response.json();
        setContributions(contributionsData);
      } else {
        // Handle error when fetching contributions
        console.error('Error fetching contributions');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://20.163.179.25:8000/api/savings-contributions/${userId}/${contributionData.savingsGoalId}`, {
        method: 'POST',
        headers: commonHeaders, // Include common headers
        body: JSON.stringify(contributionData),
      });

      if (response.ok) {
        // Contribution added successfully
        setMessage('Contribution added successfully');
        // Fetch and display the added contributions
        fetchContributions();
      } else {
        // Contribution addition failed, handle the error
        setMessage('Failed to add contribution. Please check your data.');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
    }
  };

  return (
    <div className="contributions-container">
      <h2>Add Contribution</h2>
      <div className="add-contribution-section">
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Category Name:
              <select
                value={contributionData.savingsGoalId}
                onChange={(e) => setContributionData({ ...contributionData, savingsGoalId: e.target.value })}
              >
                <option key='0' value='0' disabled hidden>
                  Select
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Amount:
              <input
                type='number'
                value={contributionData.amount}
                onChange={(e) => setContributionData({ ...contributionData, amount: parseFloat(e.target.value) || 0 })}
              />
            </label>
          </div>
          <div>
            <label>
              Date:
              <input
                type='date'
                value={contributionData.date}
                onChange={(e) => setContributionData({ ...contributionData, date: e.target.value })}
              />
            </label>
          </div>
          <div>
            <button type='submit'>Add Contribution</button>
          </div>
        </form>
      </div>

      {/* Display the message */}
      <p>{message}</p>

      {contributions ? (
        <div style={{ maxHeight: '40vh', overflowY: 'scroll' }}>
          <h3>Contribution Details</h3>
          <ul>
            {contributions.map((contribution) => (
              <li key={contribution.id}>
                <p>Category Name: {contribution.savingsGoal.name}</p>
                <p>Amount: {contribution.amount}</p>
                <p>Date: {contribution.date}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default SavingsContributions;
