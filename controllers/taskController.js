const Task = require('../models/Task');

// Controller to get all tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

// Controller to create a new task
exports.createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
};

// Controller to update a task by ID
exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
};

// Controller to delete a task by ID
exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
};
