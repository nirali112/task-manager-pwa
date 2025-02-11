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
    console.error('Error creating task:', err);
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