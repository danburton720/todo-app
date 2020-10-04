import axiosInstance from '../util/axiosInstance';

export const SET_TASKS = 'SET_TASKS';

export const getTasks = ( todoId ) => {
    return async dispatch => {
        try {
            const response = await axiosInstance.get(`/todos/${todoId}/tasks`);
            dispatch({
                type: SET_TASKS,
                payload: response.data
            });
        }catch (e) {
            console.log(e);
        }
    };
};