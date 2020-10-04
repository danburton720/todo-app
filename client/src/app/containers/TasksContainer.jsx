import React from 'react';
import {connect} from "react-redux";
import {getTasks} from "../actions/task.actions";

import TaskList from '../components/task/TaskList';

class TasksContainer extends React.Component {

    componentDidMount() {
        this.props.getTasks();
    }

    render() {
        return (
            <div>
                <TaskList
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer);
