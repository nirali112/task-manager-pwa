import React from 'react';

interface TaskItemProps {
  id: number;
  title: string;
  description?: string;
  status: string;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, description, status, onDelete, onEdit }) => {
  return (
    <div className="task-item">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      <p>Status: <strong>{status}</strong></p>
      <div className="task-item-buttons">
        <button onClick={() => onEdit(id)}>Edit</button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
