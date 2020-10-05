import 'regenerator-runtime/runtime';

import axiosInstance from '../util/axiosInstance';
import {socket} from '../util/socket';

import {getAllTasks} from '../actions/index.actions';

export const SET_TASKS = 'SET_TASKS';

export const getTasks = ( todoId, completed, fetchingMore = false) => {
    return async dispatch => {
        dispatch({
            type: SET_TASKS,
            meta: {
                todoId,
                loaded: fetchingMore
            }
        });
        try {
            const response = await axiosInstance.get(`/todos/${todoId}/tasks`, {
                params: {
                    completed,
                    sortBy: 'createdAt:asc'
                }
            });
            dispatch({
                type: SET_TASKS,
                meta: {
                    todoId,
                    completed,
                    loaded: true
                },
                payload: response.data
            });
        }catch (e) {
            console.log(e);
        }
    };
};

export const addTask = ( todoId, data ) => {
    return async dispatch => {
        try {
            await axiosInstance.post(`/todos/${todoId}/tasks`, data);
            dispatch(getAllTasks(todoId, true));
            socket.emit('tasksChanged', todoId);
        }catch (e) {
            console.log(e);
        }
    };
};

export const deleteTask = ( todoId, taskId ) => {
    return async dispatch => {
        try {
            await axiosInstance.delete(`/todos/${todoId}/tasks/${taskId}`);
            dispatch(getAllTasks(todoId, true));
            socket.emit('tasksChanged', todoId);
        }catch (e) {
            console.log(e);
        }
    };
};

export const updateTask = ( todoId, taskId, data ) => {
    return async dispatch => {
        try {
            await axiosInstance.patch(`/todos/${todoId}/tasks/${taskId}`, data);
            dispatch(getAllTasks(todoId, true));
            socket.emit('tasksChanged', todoId);
        }catch (e) {
            console.log(e);
        }
    };
};