import React from 'react';

import {Plus} from 'react-feather';

import styles from '../../../themes/tasks/addtask.scss';

export default class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            add: false,
            task: {
                changed: false,
                value: ''
            }
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTask = this.onChangeTask.bind(this);
        this.toggleAdd = this.toggleAdd.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        if (!this.invalidTask()) {
            const data = {
                description: this.state.task.value
            };
            this.props.onSubmit(data);
            this.setState({
                add: false,
                task: {
                    changed: false,
                    value: ''
                }
            });
        }
    }

    onChangeTask(e) {
        this.setState({
            task: {
                changed: true,
                value: e.target.value
            }
        })
    }

    toggleAdd() {
        this.setState({
            add: !this.state.add
        });
    }

    invalidTask() {
        return !this.state.task.changed || this.state.task.value.length === 0;
    }

    render() {
        if (this.state.add) {
            return (
                <form className={styles.addTaskForm} onSubmit={this.onSubmit}>
                    <input
                        placeholder="Jot down a task..."
                        onChange={this.onChangeTask}
                        value={this.state.task.value}
                    />
                    <div>
                        <button disabled={this.invalidTask()} className='primary mr1' type="submit">Add</button>
                        <button onClick={this.toggleAdd} className='primary inverted' type="button">Cancel</button>
                    </div>
                </form>
            );
        }
        return (
            <div onClick={this.toggleAdd} className={styles.addTask}>
                <Plus size={18}/>
                <span>Add Task</span>
            </div>
        );
    }
}