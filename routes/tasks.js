const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const mongoose = require('mongoose');

// Get all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        console.log("Tasks:", tasks); // Log tasks to verify deadline is included
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Create a new task
router.post('/tasks', async (req, res) => {
    console.log("Request body:", req.body); // Log to confirm deadline is included
    
    const { title, completed, deadline } = req.body; 
    const task = new Task({
        title,
        completed: completed || false,
        deadline: deadline ? new Date(deadline) : null // Ensure it's saved as a Date object
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// Update a task by ID
router.put('/tasks/:id', async (req, res) => {
    const { title, completed, deadline } = req.body;

    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (title !== undefined) task.title = title;
        if (completed !== undefined) task.completed = completed;
        if (deadline !== undefined) task.deadline = new Date(deadline); // Update deadline if provided

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Delete a task
router.delete('/tasks/:id', async (req, res) => {
    try {
        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Attempt to delete the task by ID
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        res.json({ message: 'Task deleted' });
    } catch (err) {
        console.error("Delete error:", err); // Logs the exact error for troubleshooting
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
