const request = require('supertest');
const app = require('../../src/app');
const Todo = require('../models/todo');
const { todoOneId, todoOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create a new todo', async () => {
    const response = await request(app).post('/todos').send({
        description: 'Work tasks'
    }).expect(201);

    // Assert that the database was changed correctly
    const todo = await Todo.findById(response.body._id);
    expect(todo).not.toBeNull();

    // Assertions about the response
    expect(response.body.description).toBe('Work tasks');
});

