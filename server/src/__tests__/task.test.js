const request = require('supertest');
const app = require('../../src/app');
const Task = require('../../src/models/task');
const { todoOneId,
    todoOne,
    todoTwoId,
    todoTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create task for todo', async () => {
    const response = await request(app)
        .post(`/todos/${todoOneId}/tasks`)
        .send({
            description: "Do some coding"
        })
        .expect(201);
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
});
