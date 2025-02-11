import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import '../styles/AddTask.css'; // Reuse the same CSS for styling

const EditTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<{ title: string; description?: string; status: string }>({
    title: '',
    description: '',
    status: 'Pending',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Task not found');
        }

        const data = await response.json();
        setTask(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching task:', err);
        setError('Failed to load task. Please try again later.');
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleEditTask = async (title: string, description: string, status: string) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, status }),
      });

      if (response.ok) {
        navigate('/');
      } else {
        const errorData = await response.json();
        console.error('Failed to update task:', errorData.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="add-task-container"> {/* Reusing the styling class from AddTask */}
      <header>
        <h1>Edit Task</h1>
      </header>
      <main>
        <TaskForm
          initialTitle={task.title}
          initialDescription={task.description}
          initialStatus={task.status}
          onSubmit={handleEditTask}
          buttonText="Update Task"
        />
        <button onClick={() => navigate('/')} className="back-button">Back to Task List</button>
      </main>
    </div>
  );
};

export default EditTask;
