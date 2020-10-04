import React from 'react';
import {connect} from "react-redux";

import {addTask, getTasks, deleteTask, updateTask} from "../actions/task.actions";
import {socket} from '../App';
import {activeTodoSelector} from '../selectors/todos.selector';
import isPopulatedArray from '../util/isPopulatedArray';

import TaskList from '../components/task/TaskList';
import AddTask from '../components/task/AddTask';

class TasksContainer extends React.Component {
    constructor(props) {
        super(props);

        this.addTask = this.addTask.bind(this);
        this.toggleCompleted = this.toggleCompleted.bind(this);
    }

    componentDidMount() {
        if (this.props.activeTodo != null) {
            this.props.getTasks(this.props.activeTodo);
        }
        socket.on('reRenderTasks', (todoId) => {
            if (todoId === this.props.activeTodo) {
                this.props.getTasks(this.props.activeTodo);
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.activeTodo !== null && this.props.activeTodo !== prevProps.activeTodo) {
            this.props.getTasks(this.props.activeTodo);
        }
    }

    addTask(data) {
        this.props.addTask(this.props.activeTodo, data);
    }

    toggleCompleted(taskId, completed) {
        this.props.toggleCompleted(this.props.activeTodo, taskId, completed);
    }

    render() {
        return (
            <div>
                <AddTask onSubmit={this.addTask}/>
                <TaskList
                    delete={this.props.deleteTask}
                    toggleCompleted={this.props.toggleCompleted}
                    tasks={this.props.list}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.tasks,
        activeTodo: state.todos.active,
        ...activeTodoSelector(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTasks: (todoId) => dispatch(getTasks(todoId)),
        addTask: (todoId, data) => dispatch(addTask(todoId, data)),
        deleteTask: (todoId, taskId) => dispatch(deleteTask(todoId, taskId)),
        toggleCompleted: (todoId, taskId, completed) => dispatch(updateTask(todoId, taskId, {completed}))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer);
