import React from 'react';
import {connect} from 'react-redux';
import {addTodo, getTodos, deleteTodo, setActiveTodo} from '../actions/todo.actions';
import TodoList from '../components/todo/TodoList';
import AddTodo from '../components/todo/AddToDo';
import {socket} from '../App';

class TodosContainer extends React.Component {

    componentDidMount() {
        this.props.getTodos();
        socket.on('reRenderTodos', () => {
            this.props.getTodos();
        });
    }

    componentDidUpdate(prevProps) {
        if(this.props.active !== prevProps.active && prevProps.active !== null) {
            document.getElementById(`todo-${this.props.active}`).scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    render() {
        if (this.props.active === null) {
            return (
                <div>
                    Select a todo
                </div>
            )
        }
        return (
            <div>
                <AddTodo onSubmit={this.props.addTodo}/>
                <TodoList
                    active={this.props.active}
                    delete={this.props.deleteTodo}
                    todos={this.props.list}
                    onClickTodo={this.props.setActiveTodo}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        list: state.todos.list,
        active: state.todos.active
    };
};

export default connect(mapStateToProps, {getTodos, addTodo, deleteTodo, setActiveTodo})(TodosContainer);