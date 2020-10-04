import {SET_TASKS} from "../actions/task.actions";

const initialState = {
    complete: [],
    incomplete: []
};

function taskReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TASKS:
            let taskState = {
                ...state
            };
            // for now just set incomplete to payload
            taskState.incomplete = action.payload;
            return taskState;
        default:
            return state;
    }
}

export default taskReducer;