import axiosInstance from '../util/axiosInstance';
import {socket} from '../App';

export const SET_TODOS = 'SET_TODOS';
export const DELETE_TODO = 'DELETE_TODO';
export const SET_ACTIVE_TODO = 'SET_ACTIVE_TODO';

export const setActiveTodo = id => {
    return {
        type: SET_ACTIVE_TODO,
        payload: id
    };
};

export const getTodos = () => {
    return async dispatch => {
        try {
            const response = await axiosInstance.get('/todos');
            dispatch({
                type: SET_TODOS,
                payload: response.data
            });
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