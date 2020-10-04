import React from 'react';

import styles from '../../../themes/todos/addtodo.scss';

export default class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            todo: {
                changed: false,
                value: ''
            }
        });

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTodo = this.onChangeTodo.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const data = {
            description: this.state.todo.value
        };
        this.props.onSubmit(data);
        this.setState({
            todo: {
                changed: false,
                value: ''
            }
        });
    }

    onChangeTodo(e) {
        this.setState({
            todo: {
                changed: true,
                value: e.target.value
            }
        })
    }

    render() {
        return (
            <form className={styles.addTodo} onSubmit={this.onSubmit}>
                <input
                    placeholder="add new todo list"
                    onChange={this.onChangeTodo}
                    value={this.state.todo.value}
                >
                </input>
                <div className={styles.buttonContainer}>
                    <button type="submit">add</button>
                </div>
            </form>
        );
    }
}