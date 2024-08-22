require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes'); // Auth routes (login, register)
const taskRoutes = require('./src/routes/taskRoutes'); // Task routes if you have them
const db = require('./src/config/db'); // MySQL connection
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
}));

// Test database connection
db.getConnection()
  .then(connection => {
    console.log('Connected to MySQL database!');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to MySQL database:', err);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes); // Use this if you have task routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
