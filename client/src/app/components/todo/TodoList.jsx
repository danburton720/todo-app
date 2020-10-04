import React from 'react';

import Todo from './Todo';

export default class TodoList extends React.Component {
    returnTodos() {
        return this.props.todos.map(todo => {
            return (
                <Todo
                    key={todo._id}
                    description={todo.description}
                />
            )
        });
    }

    render() {
        return (
            <div>
                {this.returnTodos()}
            </div>
        );
    }
}