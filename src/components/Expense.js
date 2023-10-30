import React, { useState, useEffect } from 'react';
import './Expense.css'

function Expense() {
  const [expenseData, setExpenseData] = useState({
    userId: parseInt(localStorage.getItem('userId')),
    amount: 0,
    description: '',
    category: '',
    date: '',
  });

  const [message, setMessage] = useState('');
  const [expenses, setExpenses] = useState(null);
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  const userId = localStorage.getItem('userId'); // Get the userId from local storage
  const token = localStorage.getItem('token'); // Get the token from local storage

  const commonHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`, // Set the Authorization header with the token
  };

  const fetchExpenseDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/expenses/${userId}`, {
        headers: commonHeaders, // Include common headers
      });

      if (response.ok) {
        const expenseData = await response.json();
        setExpenses(expenseData);
      } else {
        console.error('Error fetching expense data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/expense', {
        method: 'POST',
        headers: commonHeaders, // Include common headers
        body: JSON.stringify(expenseData),
      });

      if (response.ok) {
        setMessage('Expense added successfully');
        fetchExpenseDetails();
      } else {
        setMessage('Failed to add expense. Please check your data.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (expenseId) => {
    setEditingExpenseId(expenseId);
    const expenseToEdit = expenses.find((exp) => exp.id === expenseId);
    setExpenseData(expenseToEdit);
  };

  const handleDelete = async (expenseId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/expense/${userId}/${expenseId}`, {
        method: 'DELETE',
        headers: commonHeaders, // Include common headers
      });

      if (response.ok) {
        setMessage('Expense deleted successfully');
        fetchExpenseDetails();
      } else {
        setMessage('Failed to delete expense');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/expense/${userId}/${editingExpenseId}`, {
        method: 'PUT',
        headers: commonHeaders, // Include common headers
        body: JSON.stringify(expenseData),
      });

      if (response.ok) {
        setMessage('Expense updated successfully');
        setEditingExpenseId(null);
        fetchExpenseDetails();
      } else {
        setMessage('Failed to update expense');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      // Fetch expense details only if userId is available
      fetchExpenseDetails();
    }
  }, [userId]);

  return (
    <div className="expense-container">
      <h2>Add Expense</h2>
      <div>
        <form onSubmit={editingExpenseId !== null ? handleUpdate : handleSubmit}>
          <div>
            <label>
              Amount:
              <input
                type="number"
                value={expenseData.amount}
                onChange={(e) =>
                  setExpenseData({ ...expenseData, amount: parseFloat(e.target.value) || 0 })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <input
                type="text"
                value={expenseData.description}
                onChange={(e) => setExpenseData({ ...expenseData, description: e.target.value })}
              />
            </label>
          </div>
          <div>
            <label>
              Category:
              <input
                type="text"
                value={expenseData.category}
                onChange={(e) => setExpenseData({ ...expenseData, category: e.target.value })}
              />
            </label>
          </div>
          <div>
            <label>
              Date:
              <input
                type="datetime-local"
                value={expenseData.date}
                onChange={(e) => setExpenseData({ ...expenseData, date: e.target.value })}
              />
            </label>
          </div>
          <div>
            <button type="submit">
              {editingExpenseId !== null ? 'Update Expense' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
      <p>{message}</p>
      {expenses ? (
        <div style={{ maxHeight: '40vh', overflowY: 'scroll' }}>
          <h3>Expense Details</h3>
          <ul>
            {expenses.map((exp) => (
              <li key={exp.id}>
                <p>Amount: {exp.amount}</p>
                <p>Description: {exp.description}</p>
                <p>Category: {exp.category}</p>
                <p>Date: {exp.date}</p>
                <button onClick={() => handleEdit(exp.id)}>Edit</button>
                <button onClick={() => handleDelete(exp.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default Expense;
