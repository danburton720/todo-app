import {SET_TASKS} from "../actions/task.actions";

const initialState = {
    list: []
};

function taskReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TASKS:
            // for now just return the whole list
            return {
                list: action.payload
            };
        default:
            return state;
    }
}

export default taskReducer;