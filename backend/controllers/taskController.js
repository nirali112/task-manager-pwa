const Task = require('../models/task');

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  try {
    const taskId = await Task.create(userId, title, description);
    res.status(201).json({ id: taskId, title, description });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.getAllByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const tasks = await Task.findAllByUser(userId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

exports.editTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    await Task.update(id, title, description, status);
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await Task.updateStatus(id, status);
    res.status(200).json({ message: 'Task status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task status' });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    await Task.delete(id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};