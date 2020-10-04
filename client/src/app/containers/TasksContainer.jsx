import React from 'react';
import {connect} from "react-redux";
import {getTasks, deleteTask, updateTask} from "../actions/task.actions";

import TaskList from '../components/task/TaskList';

class TasksContainer extends React.Component {

    componentDidMount() {
        this.props.getTasks();
    }

    render() {
        return (
            <div>
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
        list: state.tasks.list
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getTasks: () => dispatch(getTasks(ownProps.todoId)),
        deleteTask: (taskId) => dispatch(deleteTask(ownProps.todoId, taskId)),
        toggleCompleted: (taskId, completed) => dispatch(updateTask(ownProps.todoId, taskId, {completed}))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer);
