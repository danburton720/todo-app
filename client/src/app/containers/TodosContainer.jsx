import React from 'react';
import {connect} from 'react-redux';
import {getTodos} from '../actions/todo.actions';

class TodosContainer extends React.Component {

    componentDidMount() {
        this.props.getTodos();
    }

    returnTodos() {
        return this.props.list.map(todo => {
            return (
                <div>
                    {todo.description}
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                {this.returnTodos()}
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