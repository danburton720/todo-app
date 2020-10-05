import {getTasks, addTask, deleteTask, updateTask} from '../../app/actions/task.actions';
import axiosInstance from '../../app/util/axiosInstance';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {socket} from '../../app/util/socket';
import {getAllTasks} from '../../app/actions/index.actions';

jest.mock('../../app/util/socket', () => ({
    socket: {
        emit: jest.fn()
    }
}));

jest.mock('../../app/actions/index.actions', () => ({
    getAllTasks: jest.fn()
}));

const mockStore = configureMockStore([thunk]);
const mockAxios = new MockAdapter(axiosInstance);

describe('task actions', () => {

    let store;

    beforeEach(() => {
        store = mockStore();
        mockAxios.reset();
        jest.clearAllMocks();
    });

    describe('getTasks', () => {
        describe('200 - OK', () => {
            it('should dispatch 2 actions, one with loaded false then another with a payload with loaded set to true and completed set to false', async () => {
                mockAxios.onGet('/todos/1/tasks').reply(200, [1, 2, 3])
                await store.dispatch(getTasks(1, false, false));
                expect(store.getActions().length).toBe(2);
                expect(store.getActions()[0]).toEqual({
                    type: 'SET_TASKS',
                    meta: {
                        todoId: 1,
                        loaded: false
                    }
                });
                expect(store.getActions()[1]).toEqual({
                    type: 'SET_TASKS',
                    meta: {
                        todoId: 1,
                        completed: false,
                        loaded: true
                    },
                    payload: [1,2,3]
                });
            });
            it('should dispatch 2 actions, one with loaded false then another with a payload with loaded set to true and completed set to true', async () => {
                mockAxios.onGet('/todos/1/tasks').reply(200, [1, 2, 3])
                await store.dispatch(getTasks(1, true, false));
                expect(store.getActions().length).toBe(2);
                expect(store.getActions()[0]).toEqual({
                    type: 'SET_TASKS',
                    meta: {
                        todoId: 1,
                        loaded: false
                    }
                });
                expect(store.getActions()[1]).toEqual({
                    type: 'SET_TASKS',
                    meta: {
                        todoId: 1,
                        completed: true,
                        loaded: true
                    },
                    payload: [1,2,3]
                });
            });
            it('should dispatch 2 actions, one with loaded true then another with a payload with loaded still set to true and completed set to false', async () => {
                mockAxios.onGet('/todos/1/tasks').reply(200, [1, 2, 3])
                await store.dispatch(getTasks(1, false, true));
                expect(store.getActions().length).toBe(2);
                expect(store.getActions()[0]).toEqual({
                    type: 'SET_TASKS',
                    meta: {
                        todoId: 1,
                        loaded: true
                    }
                });
                expect(store.getActions()[1]).toEqual({
                    type: 'SET_TASKS',
                    meta: {
                        todoId: 1,
                        completed: false,
                        loaded: true
                    },
                    payload: [1,2,3]
                });
            });
        });
        describe('500 - Internal Server Error', () => {
            // no error handling within getTasks however to mock a 500 response the following would be done
            // mockAxios.onGet('/todos/1/tasks').reply(500);
        });
    });
    describe('addTask', () => {
        describe('200 - OK', () => {
            it('should call getAllTasks and socket.emit', async () => {
                const dispatch = jest.fn();
                mockAxios.onPost('/todos/1/tasks').reply(200);
                await addTask(1, {
                    description: 'foo'
                })(dispatch);
                expect(getAllTasks).toHaveBeenCalledTimes(1);
                expect(getAllTasks).toHaveBeenCalledWith(1, true);
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(socket.emit).toHaveBeenCalledTimes(1);
                expect(socket.emit).toHaveBeenCalledWith('tasksChanged', 1);
            });
        });
        describe('500 - Internal Server Error', () => {
            // no error handling within addTask
        });
    });
    describe('deleteTask', () => {
        describe('200 - OK', () => {
            it('should call getAllTasks and socket.emit', async () => {
                const dispatch = jest.fn();
                mockAxios.onDelete('/todos/1/tasks/2').reply(200);
                await deleteTask(1, 2)(dispatch);
                expect(getAllTasks).toHaveBeenCalledTimes(1);
                expect(getAllTasks).toHaveBeenCalledWith(1, true);
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(socket.emit).toHaveBeenCalledTimes(1);
                expect(socket.emit).toHaveBeenCalledWith('tasksChanged', 1);
            });
        });
        describe('500 - Internal Server Error', () => {
            // no error handling within addTask
        });
    });
    describe('updateTask', () => {
        describe('200 - OK', () => {
            it('should call getAllTasks and socket.emit', async () => {
                const dispatch = jest.fn();
                mockAxios.onPatch('/todos/1/tasks/2', {
                    description: 'New description'
                }).reply(200);
                await updateTask(1, 2, {
                    description: 'New description'
                })(dispatch);
                expect(getAllTasks).toHaveBeenCalledTimes(1);
                expect(getAllTasks).toHaveBeenCalledWith(1, true);
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(socket.emit).toHaveBeenCalledTimes(1);
                expect(socket.emit).toHaveBeenCalledWith('tasksChanged', 1);
            });
        });
        describe('500 - Internal Server Error', () => {
            // no error handling within addTask
        });
    });
});