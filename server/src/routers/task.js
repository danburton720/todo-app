const express = require('express');
const Task = require('../models/task');

const router = new express.Router();

router.get('/todos/:todoId/tasks', async (req, res) => {
    const todoId = req.params.todoId;

    await Task.find({ todoId }).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.status(500).send()
    })
});

router.get('/todos/:todoId/tasks/:taskId', async (req, res) => {
    const _id = req.params.taskId;

    await Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    }).catch((e) => {
        res.status(500).send()
    });
});

router.post('/todos/:todoId/tasks', async (req, res) => {
    const task = new Task({
        ...req.body,
        todoId: req.params.todoId
    });
    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch('/todos/:todoId/tasks/:taskId', async (req, res) => {
    const taskId = req.params.taskId;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        const task = await Task.findOne({ _id: taskId });

        if (!task) {
            return res.status(404).send();
        }

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/todos/:todoId/tasks/:taskId', async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.taskId });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;