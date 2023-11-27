import React, { useState, useEffect } from 'react';
import './SavingGoals.css'


function SavingsGoals() {
  const [savingsGoalData, setSavingsGoalData] = useState({
    userId: parseInt(localStorage.getItem('userId')),
    name: '',
    targetAmount: 0,
    startDate: '',
    endDate: '',
  });

  const [message, setMessage] = useState('');
  const [savingsGoals, setSavingsGoals] = useState(null);
  const [editingSavingsGoalId, setEditingSavingsGoalId] = useState(null);

  const userId = localStorage.getItem('userId'); // Get the userId from local storage
  const token = localStorage.getItem('token'); // Get the token from local storage

  const commonHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`, // Set the Authorization header with the token
  };


  const fetchSavingsGoals = async () => {
    try {
      const response = await fetch(`http://20.163.179.25:8000/api/savings-goals/${userId}`, {
        method: 'GET',
        headers: commonHeaders,
      });
      if (response.ok) {
        const savingsGoalsData = await response.json();
        setSavingsGoals(savingsGoalsData);
      } else {
        console.error('Error fetching savings goals data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://20.163.179.25:8000/api/savings-goals/${userId}`, {
        method: 'POST',
        headers: commonHeaders,
        body: JSON.stringify(savingsGoalData),
      });

      if (response.ok) {
        setMessage('Savings goal added successfully');
        fetchSavingsGoals();
      } else {
        setMessage('Failed to add savings goal. Please check your data.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (goalId) => {
    setEditingSavingsGoalId(goalId);
    const savingsGoalToEdit = savingsGoals.find((goal) => goal.id === goalId);
    setSavingsGoalData(savingsGoalToEdit);
  };

  const handleDelete = async (goalId) => {
    try {
      const response = await fetch(`http://20.163.179.25:8000/api/savings-goals/${userId}/${goalId}`, {
        method: 'DELETE',
        headers: commonHeaders,
      });
      if (response.ok) {
        setMessage('Savings goal deleted successfully');
        fetchSavingsGoals();
      } else {
        setMessage('Failed to delete savings goal');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://20.163.179.25:8000/api/savings-goals/${userId}/${editingSavingsGoalId}`, {
        method: 'PUT',
        headers: commonHeaders,
        body: JSON.stringify(savingsGoalData),
      });

      if (response.ok) {
        setMessage('Savings goal updated successfully');
        setEditingSavingsGoalId(null);
        fetchSavingsGoals();
      } else {
        setMessage('Failed to update savings goal');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchSavingsGoals();
  }, []);

  return (
    <div className='savings-goals-container'>
      <h2>Add Savings Goal</h2>
      <div className='add-savings-goal-section'>
        <form onSubmit={editingSavingsGoalId !== null ? handleUpdate : handleSubmit}>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={savingsGoalData.name}
                onChange={(e) =>
                  setSavingsGoalData({ ...savingsGoalData, name: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Target Amount:
              <input
                type="number"
                value={savingsGoalData.targetAmount}
                onChange={(e) =>
                  setSavingsGoalData({ ...savingsGoalData, targetAmount: parseFloat(e.target.value) || 0 })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Start Date:
              <input
                type="date"
                value={savingsGoalData.startDate}
                onChange={(e) =>
                  setSavingsGoalData({ ...savingsGoalData, startDate: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              End Date:
              <input
                type="date"
                value={savingsGoalData.endDate}
                onChange={(e) =>
                  setSavingsGoalData({ ...savingsGoalData, endDate: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <button type="submit">
              {editingSavingsGoalId !== null ? 'Update Savings Goal' : 'Add Savings Goal'}
            </button>
          </div>
        </form>
      </div>
      <p>{message}</p>
      {savingsGoals ? (
        <div style={{ maxHeight: '40vh', overflowY: 'scroll' }}>
          <h3>Savings Goals</h3>
          <ul>
            {savingsGoals.map((goal) => (
              <li key={goal.id}>
                <p>Name: {goal.name}</p>
                <p>Target Amount: {goal.targetAmount}</p>
                <p>Current Amount: {goal.currentAmount}</p>
                <p>Start Date: {goal.startDate}</p>
                <p>End Date: {goal.endDate}</p>
                <button onClick={() => handleEdit(goal.id)}>Edit</button>
                <button onClick={() => handleDelete(goal.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

    </div>
  );
}

export default SavingsGoals;
