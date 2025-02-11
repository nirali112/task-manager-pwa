const express = require('express');
const router = express.Router();
const taskController = require('../../backend/controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure user is authenticated

// Create a new task
router.post('/tasks', authMiddleware, taskController.createTask);

// Get all tasks for a user
router.get('/tasks', authMiddleware, taskController.getAllByUser);

// Update a task status
router.put('/tasks/status/:id', authMiddleware, taskController.updateStatus);

// Delete a task
router.delete('/tasks/:id', authMiddleware, taskController.delete);

// Edit a task
router.put('/tasks/:id', authMiddleware, taskController.editTask);

// Route to get a task by ID
router.get('/tasks/:id', taskController.getTaskById);


module.exports = router;
