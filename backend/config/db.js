const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin', // replace with your MySQL root password
  database: 'task_manager_pwa',
});

module.exports = pool.promise();