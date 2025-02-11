import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // Redirect to login if no token
      return;
    }

    console.log("Token:", token); // Debugging

    try {
      const response = await fetch("http://localhost:3001/api/tasks", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Tasks data:", data); // Debugging
        setTasks(data.tasks); // Update tasks state
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="home-container">
      <h1>Task Manager</h1>
      {tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available or failed to load tasks.</p>
      )}
    </div>
  );
};

export default Home;