const express = require('express');
const Todo = require('../models/todo');
const Task = require('../models/task');
const router = new express.Router();

router.get('/todos', async (req, res) => {
    await Todo.find({}).then((todos) => {
        res.send(todos)
    }).catch((e) => {
        res.status(500).send()
    })
});

router.get('/todos/:id', async (req, res) => {
    const _id = req.params.id;

    await Todo.findById(_id).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }

        res.send(todo)
    }).catch((e) => {
        res.status(500).send()
    });
});

router.post('/todos', async (req, res) => {
    const todo = new Todo(req.body);
    try {
        await todo.save();
        res.status(201).send(todo);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch('/todos/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        const todo = await Todo.findOne({ _id: req.params.id });

        if (!todo) {
            return res.status(404).send();
        }

        updates.forEach((update) => todo[update] = req.body[update]);
        await todo.save();
        res.send(todo);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id });
        if (!todo) {
            return res.status(404).send();
        }
        // delete associated tasks
        await Task.deleteMany({ todoId: todo._id });
        res.send(todo)
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;