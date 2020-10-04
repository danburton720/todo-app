import React from 'react';
import {connect} from 'react-redux';
import {getTodos, deleteTodo} from '../actions/todo.actions';
import TodoList from '../components/todo/TodoList';

class TodosContainer extends React.Component {

    componentDidMount() {
        this.props.getTodos();
    }

    render() {
        return (
            <div>
                <TodoList
                    todos={this.props.list}
                    delete={this.props.deleteTodo}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        list: state.todos.list
    };
};

export default connect(mapStateToProps, {getTodos, deleteTodo})(TodosContainer);