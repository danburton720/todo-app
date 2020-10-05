import {combineReducers} from 'redux';
import todoReducers from './todo.reducer';
import taskReducers from './task.reducer';

export default combineReducers({
    todos: todoReducers,
    tasks: taskReducers
});