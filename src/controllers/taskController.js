const Task = require('../models/task');
const db = require('../config/db');
exports.createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    let query = 'INSERT INTO tasks (user_id, title';
    let values = [req.user.id, title];
    let placeholders = '?, ?';

    if (description !== undefined && description !== null) {
      query += ', description';
      placeholders += ', ?';
      values.push(description);
    }

    query += `) VALUES (${placeholders})`;

    const [result] = await db.execute(query, values);

    res.status(201).json({ id: result.insertId, title, description });
  } catch (err) {
    console.error('Error creating task:', err);  // Log the actual error
    res.status(500).json({ error: 'Failed to create task' });
  }
};



exports.getAllByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const tasks = await Task.findAllByUser(userId);
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.editTask = async (req, res) => {
  const { id } = req.params; // Get the task ID from the URL params
  const { title, description, status } = req.body; // Get the updated details from the request body

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await Task.update(id, title, description, status); // Update the task
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await Task.updateStatus(id, status);
    res.status(200).json({ message: 'Task status updated' });
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    await Task.delete(id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
