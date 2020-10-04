import React from 'react';

import TaskList from '../components/task/TaskList';
import {addTask, deleteTask, getAllTasks, updateTask} from "../actions/task.actions";

import {connect} from "react-redux";
import AddTask from "../components/task/AddTask";

import isPopulatedArray from '../util/isPopulatedArray';
import {socket} from '../App';
import {activeTodoSelector} from '../selectors/todos.selector';
import SpinnerLoader from '../components/common/SpinnerLoader/SpinnerLoader';

import styles from '../../themes/tasks/taskspage.scss'

class TasksContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCompleted: false
        };
        this.showHideCompleted = this.showHideCompleted.bind(this);
        this.addTask = this.addTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.toggleCompleted = this.toggleCompleted.bind(this);
    }

    componentDidMount() {
        if (this.props.activeTodo !== null) {
            this.props.getAllTasks(this.props.activeTodo);
        }
        socket.on('reRenderTasks', (todoId) => {
            if (todoId === this.props.activeTodo) {
                this.props.getAllTasks(this.props.activeTodo, true);
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.activeTodo !== null && this.props.activeTodo !== prevProps.activeTodo) {
            this.props.getAllTasks(this.props.activeTodo);
        }
    }

    addTask(data) {
        this.props.addTask(this.props.activeTodo, data);
    }

    updateTask(taskId, data) {
        this.props.updateTask(this.props.activeTodo, taskId, data);
    }

    deleteTask(taskId) {
        this.props.deleteTask(this.props.activeTodo, taskId);
    }

    toggleCompleted(taskId, completed) {
        this.props.toggleCompleted(this.props.activeTodo, taskId, completed);
    }

    showHideCompleted() {
        this.setState({
            showCompleted: !this.state.showCompleted
        });
    }

    render() {
        if (this.props.activeTodo === null) {
            return (
                <div>
                    {this.props.hasTodos ? 'Select a todo' : 'Add a todo'}
                </div>
            );
        }

        if (!this.props.loaded) {
            return (
                <SpinnerLoader/>
            );
        }
        return (
            <div className={styles.tasksContainer}>
                <h1>{this.props.todo ? this.props.todo.description : ''}</h1>
                <AddTask onSubmit={this.addTask}/>
                {isPopulatedArray(this.props.complete) && (
                    <>
                        <div className={styles.showHideCompletedWrapper} onClick={this.showHideCompleted}>
                            <span
                                className={styles.showHideCompleted}
                            >
                                {this.state.showCompleted ? 'Hide ' : 'Show '}
                                completed tasks
                                ({this.props.complete.length})
                            </span>
                        </div>
                        {this.state.showCompleted && (
                            <div className={styles.completedTaskList}>
                                <TaskList
                                    delete={this.deleteTask}
                                    update={this.updateTask}
                                    toggleCompleted={this.toggleCompleted}
                                    tasks={this.props.complete}
                                />
                            </div>
                        )}
                    </>
                )}
                {isPopulatedArray(this.props.incomplete) ? (
                    <TaskList
                        delete={this.deleteTask}
                        update={this.updateTask}
                        toggleCompleted={this.toggleCompleted}
                        tasks={this.props.incomplete}
                    />
                ) : (
                    <div className={styles.emptyTaskList}>
                        <span>You currently have no tasks, to add a task click the <b>Add Task</b> button</span>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        complete: state.tasks.complete,
        incomplete: state.tasks.incomplete,
        loaded: state.tasks.loaded,
        activeTodo: state.todos.active,
        hasTodos: state.todos.loaded && isPopulatedArray(state.todos.list),
        ...activeTodoSelector(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTasks: (todoId, fetchingMore) => dispatch(getAllTasks(todoId, fetchingMore)),
        addTask: (todoId, data) => dispatch(addTask(todoId, data)),
        deleteTask: (todoId, taskId) => dispatch(deleteTask(todoId, taskId)),
        updateTask: (todoId, taskId, data) => dispatch(updateTask(todoId, taskId, data)),
        toggleCompleted: (todoId, taskId, completed) => dispatch(updateTask(todoId, taskId, {completed}))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer);