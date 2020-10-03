const path = require('path');
const express = require('express');
require('./db/mongoose');

const todoRouter = require('./routers/todo');
const taskRouter = require('./routers/task');

const app = express();

app.use(express.json());
app.use(todoRouter);
app.use(taskRouter);

module.exports = app;