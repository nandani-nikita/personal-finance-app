import React, { useState, useEffect } from 'react';
import './Income.css';


function Income() {
  const [incomeData, setIncomeData] = useState({
    userId: parseInt(localStorage.getItem('userId')),
    amount: 0,
    description: '',
    date: '',
  });

  const [message, setMessage] = useState('');
  const [income, setIncome] = useState(null);
  const [editingIncomeId, setEditingIncomeId] = useState(null);

  const userId = localStorage.getItem('userId'); // Get the userId from local storage
  const token = localStorage.getItem('token'); // Get the token from local storage

  const commonHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`, // Set the Authorization header with the token
  };

  const fetchIncomeDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/incomes/${userId}`, {
        headers: commonHeaders, // Include common headers
      });

      if (response.ok) {
        const incomeData = await response.json();
        setIncome(incomeData);
      } else {
        console.error('Error fetching income data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(incomeData);
      const response = await fetch('http://localhost:8000/income', {
        method: 'POST',
        headers: commonHeaders, // Include common headers
        body: JSON.stringify(incomeData),
      });

      if (response.ok) {
        setMessage('Income added successfully');
        fetchIncomeDetails();
      } else {
        setMessage('Failed to add income. Please check your data.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (incomeId) => {
    setEditingIncomeId(incomeId);
    const incomeToEdit = income.find((inc) => inc.id === incomeId);
    setIncomeData(incomeToEdit);
  };

  const handleDelete = async (incomeId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/income/${userId}/${incomeId}`, {
        method: 'DELETE',
        headers: commonHeaders, // Include common headers
      });

      if (response.ok) {
        setMessage('Income deleted successfully');
        fetchIncomeDetails();
      } else {
        setMessage('Failed to delete income');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/income/${userId}/${editingIncomeId}`, {
        method: 'PUT',
        headers: commonHeaders, // Include common headers
        body: JSON.stringify(incomeData),
      });

      if (response.ok) {
        setMessage('Income updated successfully');
        setEditingIncomeId(null);
        fetchIncomeDetails();
      } else {
        setMessage('Failed to update income');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      // Fetch income details only if userId is available
      fetchIncomeDetails();
    }
  }, [userId]);

  return (
    <div className="income-container">
      <h2>Add Income</h2>
      <div>
        <form onSubmit={editingIncomeId !== null ? handleUpdate : handleSubmit}>
          <div>
            <label>
              Amount:
              <input
                type="number"
                value={incomeData.amount}
                onChange={(e) =>
                  setIncomeData({ ...incomeData, amount: parseFloat(e.target.value) || 0 })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <input
                type="text"
                value={incomeData.description}
                onChange={(e) => setIncomeData({ ...incomeData, description: e.target.value })}
              />
            </label>
          </div>
          <div>
            <label>
              Date:
              <input
                type="datetime-local"
                value={incomeData.date}
                onChange={(e) => setIncomeData({ ...incomeData, date: e.target.value })}
              />
            </label>
          </div>
          <div>
            <button type="submit">
              {editingIncomeId !== null ? 'Update Income' : 'Add Income'}
            </button>
          </div>
        </form>
      </div>
      <p>{message}</p>
      {income ? (
        <div style={{ maxHeight: '40vh', overflowY: 'scroll' }}>
          <h3>Income Details</h3>
          <ul>
            {income.map((inc) => (
              <li key={inc.id}>
                <p>Amount: {inc.amount}</p>
                <p>Description: {inc.description}</p>
                <p>Date: {inc.date}</p>
                <button onClick={() => handleEdit(inc.id)}>Edit</button>
                <button onClick={() => handleDelete(inc.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default Income;
