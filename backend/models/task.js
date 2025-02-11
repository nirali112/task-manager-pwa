const db = require('../config/db');

const Task = {
  // Method to create a new task
  async create(userId, title, description) {
    const [result] = await db.execute(
      'INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)',
      [userId, title, description]
    );
    return result.insertId;
  },

  // Method to get all tasks for a user
  async findAllByUser(userId) {
    const [rows] = await db.execute('SELECT * FROM tasks WHERE user_id = ?', [userId]);
    return rows;
  },

  // Method to find a task by its ID
  async findById(taskId) {
    const [rows] = await db.execute('SELECT * FROM tasks WHERE id = ?', [taskId]);
    console.log("rows: " , rows);
    return rows.length > 0 ? rows[0] : null;
  },

  // Method to update a task's title, description, and status
  async update(taskId, title, description, status) {
    try {
      console.log("Updating task ID:", taskId, "with title:", title, "description:", description, "status:", status);
      const [result] = await db.execute(
        'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
        [title, description, status, taskId]
      );
      console.log("Update result:", JSON.stringify(result));
      return result;
    } catch (err) {
      console.error("Error updating task:", err);
      throw err; // Re-throw the error so it can be handled by the controller
    }
  },

  // Method to update a task's status only
  async updateStatus(taskId, status) {
    const [result] =  await db.execute('UPDATE tasks SET status = ? WHERE id = ?', [status, taskId]);
    return result;
  },

  // Method to delete a task
  async delete(taskId) {
    await db.execute('DELETE FROM tasks WHERE id = ?', [taskId]);
  }
};

module.exports = Task;
