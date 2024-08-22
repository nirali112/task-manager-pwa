import React from 'react';
import TaskList from '../components/TaskList'; // Assuming TaskList.tsx is in the components folder
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Home.css'; // CSS for styling

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to login
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Task Manager</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      <main className="home-main">
        <TaskList />
        <Link to="/add-task">
          <button className="add-task-button">Add New Task</button>
        </Link>
      </main>
    </div>
  );
};

export default Home;
