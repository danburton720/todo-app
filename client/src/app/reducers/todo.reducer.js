import {SET_TODOS, ADD_TODO, DELETE_TODO, SET_ACTIVE_TODO} from "../actions/todo.actions";
import isPopulatedArray from "../util/isPopulatedArray";

export const initialState = {
    active: null,
    list: []
};

function todoReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TODOS:
            return {
                ...state,
                active: isPopulatedArray(action.payload) ? action.payload[0]._id : state.active,
                list: action.payload
            };
        case ADD_TODO:
            return {
                ...state,
                active: action.payload._id,
                list: [...state.list, action.payload]
            };
        case DELETE_TODO:
            let filteredList = state.list.filter(todo => todo._id !== action.payload);
            return {
                ...state,
                list: filteredList,
                active: action.payload === state.active ? null : state.active
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