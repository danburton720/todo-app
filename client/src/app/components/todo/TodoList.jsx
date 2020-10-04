import React from 'react';

import Todo from './Todo';

import isPopulatedArray from '../../util/isPopulatedArray';

import styles from '../../../themes/todos/todoList.scss';

export default class TodoList extends React.Component {
    returnTodos() {
        if (isPopulatedArray(this.props.todos)) {
            return this.props.todos.map(todo => {
                return (
                    <Todo
                        key={todo._id}
                        id={todo._id}
                        active={todo._id === this.props.active}
                        description={todo.description}
                        onClick={this.props.onClickTodo}
                        delete={this.props.delete}
                    />
                )
            });
        }
    }

    render() {
        return (
            <div className={styles.todoList}>
                {this.returnTodos()}
            </div>
        );
    }
}