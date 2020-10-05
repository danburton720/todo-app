import {getTasks} from "./task.actions";

export const getAllTasks = ( todoId , fetchingMore) => {
    return async dispatch => {
        // fetch complete tasks
        dispatch(getTasks(todoId, true, fetchingMore));
        // fetch incomplete tasks
        dispatch(getTasks(todoId, false, fetchingMore));
    };
};
