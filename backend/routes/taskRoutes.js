const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/tasks', authMiddleware, taskController.createTask);
router.get('/tasks', authMiddleware, taskController.getAllByUser);
router.put('/tasks/:id', authMiddleware, taskController.editTask);
router.get('/tasks/:id', authMiddleware, taskController.getTaskById);
router.put('/tasks/status/:id', authMiddleware, taskController.updateStatus);
router.delete('/tasks/:id', authMiddleware, taskController.delete);

module.exports = router;