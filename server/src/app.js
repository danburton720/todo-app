const path = require('path');
const express = require('express');
const boolParser = require('express-query-boolean');
const cors = require('cors');
require('./db/mongoose');

const todoRouter = require('./routers/todo');
const taskRouter = require('./routers/task');

const app = express();

app.use(express.json());
app.use(boolParser());
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(todoRouter);
app.use(taskRouter);

module.exports = app;