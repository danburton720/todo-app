import {createSelector} from 'reselect';
import isPopulatedArray from '../util/isPopulatedArray';

const todoListState = (state) => state.todos.list;
const activeTodoState = (state) => state.todos.active;

export const activeTodoSelector = createSelector(
    todoListState,
    activeTodoState,
    (todoList, activeTodo) => {
        let todo;
        if(isPopulatedArray(todoList) && activeTodo !== null) {
            todo = todoList.find(e => e._id === activeTodo);
        }
        return {
            todo
        }
    }
);