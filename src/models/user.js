const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
  // Method to create a new user
  async create(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );
    return result.insertId;
  },

  // Method to find a user by email
  async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows.length > 0 ? rows[0] : null;
  },

  // Method to validate the password
  async validatePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
};

module.exports = User;
