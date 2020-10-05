const mongoose = require('mongoose');
const Todo = require('../../models/todo');
const Task = require('../../models/task');

const todoOneId = new mongoose.Types.ObjectId();
const todoOne = {
    _id: todoOneId,
    description: 'Todo 1'
};

const todoTwoId = new mongoose.Types.ObjectId();
const todoTwo = {
    _id: todoTwoId,
    description: 'Todo 2'
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First task',
    completed: false,
    todoId: todoOne._id
};

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second task',
    completed: true,
    todoId: todoOne._id
};

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third task',
    completed: false,
    todoId: todoTwo._id
};

const setupDatabase = async () => {
    await Todo.deleteMany();
    await Task.deleteMany();
    await new Todo(todoOne).save();
    await new Todo(todoTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
};

module.exports = {
    todoOneId,
    todoOne,
    todoTwoId,
    todoTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
};