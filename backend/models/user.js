const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  findByEmail: async (email) => {
    const [user] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return user[0];
  },
  create: async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    return result.insertId;
  },
  validatePassword: async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  },
};

module.exports = User;