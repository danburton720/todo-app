const path = require('path');
const express = require('express');
require('./db/mongoose');

const todoRouter = require('./routers/todo');

const app = express();

app.use(express.json());
app.use(todoRouter);

module.exports = app;