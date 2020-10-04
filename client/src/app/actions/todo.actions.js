import axiosInstance from '../util/axiosInstance';

export const SET_TODOS = 'SET_TODOS';

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
            dispatch(getTodos());
        } catch (e) {
            console.log(e);
        }
    };
};