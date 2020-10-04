import axiosInstance from '../util/axiosInstance';
import {getTasks} from "./task.actions";
import {socket} from '../App';

export const SET_TODOS = 'SET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const SET_ACTIVE_TODO = 'SET_ACTIVE_TODO';

export const setActiveTodo = id => {
    return {
        type: SET_ACTIVE_TODO,
        payload: id
    };
};

export const getTodos = (callback) => {
    return async dispatch => {
        dispatch({
            type: SET_TODOS,
            meta: {
                loaded: false
            }
        });
        try {
            const response = await axiosInstance.get('/todos');
            dispatch({
                type: SET_TODOS,
                meta: {
                    loaded: true
                },
                payload: response.data
            });
            if(callback) {
                callback();
            }
        } catch (e) {
            console.log(e);
        }
    };
};

export const addTodo = (data, callback) => {
    return async dispatch => {
        try {
            const response = await axiosInstance.post(`/todos`, data);
            dispatch({
                type: ADD_TODO,
                payload: response.data
            });
            callback();
            socket.emit('todosChanged');
        } catch (e) {
            console.log(e);
        }
    };
};

export const deleteTodo = (todoId) => {
    return async dispatch => {
        try {
            await axiosInstance.delete(`/todos/${todoId}`);
            dispatch({
                type: DELETE_TODO,
                payload: todoId
            });
            socket.emit('todosChanged');
        } catch (e) {
            console.log(e);
        }
    };
};