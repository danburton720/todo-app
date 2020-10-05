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

test('Should get all tasks for todo', async () => {
    await request(app)
        .get(`/todos/${todoOneId}/tasks`)
        .send()
        .expect(200);
});

test('Should update task for todo', async () => {
    const response = await request(app)
        .patch(`/todos/${todoOneId}/tasks/${taskOne._id}`)
        .send({
            description: "Do some coding or something else"
        })
        .expect(200);
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
});

test('Should delete task for todo', async () => {
    const response = await request(app)
        .delete(`/todos/${todoTwoId}/tasks/${taskOne._id}`)
        .send()
        .expect(200);
});


