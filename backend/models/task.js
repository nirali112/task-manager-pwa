const db = require('../config/db');

const Task = {
  findAllByUser: async (userId) => {
    const [tasks] = await db.execute('SELECT * FROM tasks WHERE user_id = ?', [userId]);
    return tasks;
  },
  create: async (userId, title, description) => {
    const [result] = await db.execute('INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)', [userId, title, description]);
    return result.insertId;
  },
  update: async (id, title, description, status) => {
    await db.execute('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, id]);
  },
  delete: async (id) => {
    await db.execute('DELETE FROM tasks WHERE id = ?', [id]);
  },
  findById: async (id) => {
    const [task] = await db.execute('SELECT * FROM tasks WHERE id = ?', [id]);
    return task[0];
  },
  updateStatus: async (id, status) => {
    await db.execute('UPDATE tasks SET status = ? WHERE id = ?', [status, id]);
  },
};

module.exports = Task;