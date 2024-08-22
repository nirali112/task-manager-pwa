import React from 'react';
import TaskForm from '../components/TaskForm';
import '../styles/AddTask.css'
import { useNavigate } from 'react-router-dom';

const AddTask: React.FC = () => {
  const navigate = useNavigate();

  const handleAddTask = async (title: string, description: string) => {
    const token = localStorage.getItem('token'); // Get the JWT token from localStorage

    try {
      const response = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the JWT token in the request header
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        // Task created successfully, redirect to the home page or tasks list
        navigate('/');
      } else {
        const errorData = await response.json();
        console.error('Failed to create task:', errorData.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  return (
    <div>
      <header>
        <h1>Add New Task</h1>
      </header>
      <main>
        <TaskForm onSubmit={handleAddTask} buttonText="Create Task" />
        <button className="add-task-button" onClick={() => navigate('/')}>Back to Task List</button>
      </main>
    </div>
  );
};

export default AddTask;
