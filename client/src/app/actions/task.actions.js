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

export const addTask = ( todoId, data ) => {
    return async dispatch => {
        try {
            await axiosInstance.post(`/todos/${todoId}/tasks`, data);
            dispatch(getTasks(todoId));
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
            dispatch(getTasks(todoId));
        }catch (e) {
            console.log(e);
        }
    };
};

export const updateTask = ( todoId, taskId, data ) => {
    return async dispatch => {
        try {
            await axiosInstance.patch(`/todos/${todoId}/tasks/${taskId}`, data);
            dispatch(getTasks(todoId));
        }catch (e) {
            console.log(e);
        }
    };
};