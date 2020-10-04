import React from 'react';

import Task from './Task';

export default class TaskList extends React.Component {
    returnTasks() {
        return this.props.tasks.map(task => {
            return (
                <Task
                    key={task._id}
                    id={task._id}
                    description={task.description}
                    completed={task.completed}
                    delete={this.props.delete}
                    update={this.props.update}
                    toggleCompleted={this.props.toggleCompleted}
                />
            )
        });
    }

    render() {
        return (
            <div>
                {this.returnTasks()}
            </div>
        );
    }
}