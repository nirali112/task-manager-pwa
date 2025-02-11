import React, { useState } from 'react';

interface TaskFormProps {
  initialTitle?: string;
  initialDescription?: string;
  initialStatus?: string;
  onSubmit: (title: string, description: string, status: string) => void;
  buttonText?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialTitle = '',
  initialDescription = '',
  initialStatus = 'Pending',
  onSubmit,
  buttonText = 'Save Task',
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [status, setStatus] = useState(initialStatus);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description, status);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description (Optional)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button type="submit" className="submit-button">{buttonText}</button>
    </form>
  );
};

export default TaskForm;
