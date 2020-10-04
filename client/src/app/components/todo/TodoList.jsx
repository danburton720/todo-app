import React from 'react';

import Todo from './Todo';

export default class TodoList extends React.Component {
    returnTodos() {
        return this.props.todos.map(todo => {
            return (
                <Todo
                    key={todo._id}
                    id={todo._id}
                    description={todo.description}
                    delete={this.props.delete}
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