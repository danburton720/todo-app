import {getTodos, setActiveTodo, addTodo, deleteTodo} from '../../app/actions/todo.actions';
import axiosInstance from '../../app/util/axiosInstance';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {socket} from '../../app/util/socket';

const mockStore = configureMockStore([thunk]);
const mockAxios = new MockAdapter(axiosInstance);

jest.mock('../../app/util/socket', () => ({
    socket: {
        emit: jest.fn()
    }
}));

describe('todo actions', () => {

    let store;

    beforeEach(() => {
        store = mockStore();
        mockAxios.reset();
        jest.clearAllMocks();
    });

    describe('setActiveTodo', () => {
        it('should return an action of type \'SET_ACTIVE_TODO\' and a payload equal to the argument passed in', () => {
            expect(setActiveTodo(42)).toEqual({
                type: 'SET_ACTIVE_TODO',
                payload: 42
            });
        });
    });
    describe('getTasks', () => {
        describe('200 - OK', () => {
            it('should dispatch 2 actions, one with loaded false then another with a payload with loaded set to true', async () => {
                mockAxios.onGet('/todos').reply(200, [1, 2, 3])
                await store.dispatch(getTodos());
                expect(store.getActions().length).toBe(2);
                expect(store.getActions()[0]).toEqual({
                    type: 'SET_TODOS',
                    meta: {
                        loaded: false
                    }
                });
                expect(store.getActions()[1]).toEqual({
                    type: 'SET_TODOS',
                    meta: {
                        loaded: true
                    },
                    payload: [1,2,3]
                });
            });
            it('should dispatch 2 actions, one with loaded false then another with a payload with loaded set to true and call the callback passed in', async () => {
                mockAxios.onGet('/todos').reply(200, [1, 2, 3])
                const callback = jest.fn();
                await store.dispatch(getTodos(callback));
                expect(callback).toHaveBeenCalledTimes(1);
                expect(store.getActions().length).toBe(2);
                expect(store.getActions()[0]).toEqual({
                    type: 'SET_TODOS',
                    meta: {
                        loaded: false
                    }
                });
                expect(store.getActions()[1]).toEqual({
                    type: 'SET_TODOS',
                    meta: {
                        loaded: true
                    },
                    payload: [1,2,3]
                });
            });
        });
        describe('500 - Internal Server Error', () => {
            // no error handling within getTasks
        });
    });
    describe('addTodo', () => {
        describe('200 - OK', () => {
            it('should dispatch an action of type \'ADD_TODO\' and a payload equal to the response and call the callback passed in', async () => {
                const callback = jest.fn();
                mockAxios.onPost('/todos').reply(200, {
                    id: 123,
                    description: 'foo'
                });
                await store.dispatch(addTodo({
                    description: 'foo'
                }, callback));
                expect(store.getActions().length).toBe(1);
                expect(store.getActions()[0]).toEqual({
                    type: 'ADD_TODO',
                    payload: {
                        id: 123,
                        description: 'foo'
                    }
                });
                expect(callback).toHaveBeenCalledTimes(1);
                expect(socket.emit).toHaveBeenCalledTimes(1);
                expect(socket.emit).toHaveBeenCalledWith('todosChanged');
            });
        });
        describe('500 - Internal Server Error', () => {
            // no error handling within addTodo
        });
    });
    describe('deleteTodo', () => {
        describe('200 - OK', () => {
            it('should dispatch an action of type \'DELETE_TODO\' and a payload equal to the argument passed in', async () => {
                mockAxios.onDelete('/todos/123').reply(200);
                await store.dispatch(deleteTodo(123));
                expect(store.getActions().length).toBe(1);
                expect(store.getActions()[0]).toEqual({
                    type: 'DELETE_TODO',
                    payload: 123
                });
                expect(socket.emit).toHaveBeenCalledTimes(1);
                expect(socket.emit).toHaveBeenCalledWith('todosChanged');
            });
        });
        describe('500 - Internal Server Error', () => {
            // no error handling within deleteTodo
        });
    });
});