const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure user is authenticated

// Create a new task
router.post('/tasks', authMiddleware, taskController.createTask);

// Get all tasks for a user
router.get('/tasks', authMiddleware, taskController.getAllByUser);

// Update a task status
router.put('/tasks/:id', authMiddleware, taskController.updateStatus);

// Delete a task
router.delete('/tasks/:id', authMiddleware, taskController.delete);

// Edit a task
router.put('/tasks/:id', taskController.editTask);

module.exports = router;
