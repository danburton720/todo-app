import {SET_TODOS} from "../actions/todo.actions";

export const initialState = {
    list: []
};

function todoReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TODOS:
            return {
                list: action.payload
            };
        default:
            return state;
    }
}

export default todoReducer;