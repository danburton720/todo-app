const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

todoSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'todoId'
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;