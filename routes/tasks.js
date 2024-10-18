const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Define routes for tasks and map them to controller functions
router.get('/tasks', taskController.getTasks);  // Get all tasks
router.post('/tasks', taskController.createTask);  // Create a new task
router.put('/tasks/:id', taskController.updateTask);  // Update a task by ID
router.delete('/tasks/:id', taskController.deleteTask);  // Delete a task by ID

module.exports = router;
