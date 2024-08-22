import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem'; // Import the TaskItem component
import '../styles/TaskList.css'; // CSS for styling

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Fetch tasks from the backend when the component loads
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/api/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setTasks(tasks.filter(task => task.id !== id)); // Remove the task from the state
    }
  };

  const handleEdit = (id: number) => {
    window.location.href = `/edit-task/${id}`;
  };

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id}>
          <TaskItem
            id={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
