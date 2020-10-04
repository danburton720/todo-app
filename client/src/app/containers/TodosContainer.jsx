import React from 'react';
import {connect} from 'react-redux';
import {getTodos} from '../actions/todo.actions';
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

export default connect(mapStateToProps, {getTodos})(TodosContainer);