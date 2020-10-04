import React from 'react';

export default class AddTask extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            task: {
                changed: false,
                value: ''
            }
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTask = this.onChangeTask.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const data = {
            description: this.state.task.value
        };
        this.props.onSubmit(data);
        this.setState({
            task: {
                changed: false,
                value: ''
            }
        });
    }

    onChangeTask(e) {
        this.setState({
            task: {
                changed: true,
                value: e.target.value
            }
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    placeholder="task name"
                    onChange={this.onChangeTask}
                    value={this.state.task.value}
                />
                <button type="submit">add</button>
            </form>
        );
    }
}