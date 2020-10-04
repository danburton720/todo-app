import {SET_TODOS, SET_ACTIVE_TODO} from "../actions/todo.actions";

export const initialState = {
    active: null,
    list: []
};

function todoReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TODOS:
            return {
                ...state,
                active: action.payload[0]._id,
                list: action.payload
            };
        case SET_ACTIVE_TODO:
            return {
                ...state,
                active: action.payload
            };
        default:
            return state;
    }
}

export default todoReducer;