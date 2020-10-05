import {SET_TASKS} from "../actions/task.actions";
import {DELETE_TODO} from '../actions/todo.actions';

export const initialState = {
    complete: [],
    incomplete: [],
    loaded: false,
    todoId: null
};

function taskReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TASKS:
            let taskState = {
                ...state,
                loaded: !!action.meta.loaded,
                todoId: action.meta.todoId
            };
            if(action.payload) {
                if (action.meta.completed) {
                    taskState.complete = action.payload
                } else {
                    taskState.incomplete = action.payload
                }
            }
            return taskState;
        case DELETE_TODO:
            if(action.payload === state.todoId) {
                return initialState;
            }
            return state;
        default:
            return state;
    }
}

export default taskReducer;