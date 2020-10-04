import React from 'react';
import {connect} from 'react-redux';
import {addTodo, deleteTodo, getTodos, setActiveTodo} from '../actions/todo.actions';
import TodoList from '../components/todo/TodoList';
import AddTodo from '../components/todo/AddTodo';

import {Plus} from 'react-feather';
import {socket} from '../App';
import SpinnerLoader from '../components/common/SpinnerLoader/SpinnerLoader';

import styles from '../../themes/todos/todosContainer.scss';

class TodosContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newTodo: false
        };
        this.addNewTodo = this.addNewTodo.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.hideAddTodo = this.hideAddTodo.bind(this);
    }

    componentDidMount() {
        this.props.getTodos();
        socket.on('reRenderTodos', () => {
            this.props.getTodos();
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.active !== prevProps.active && prevProps.active !== null) {
            document.getElementById(`todo-${this.props.active}`).scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    addNewTodo() {
        this.setState({
            newTodo: !this.state.newTodo
        });
    }

    addTodo(...args) {
        this.props.addTodo(...args, () => {
            this.hideAddTodo()
        });
    }

    hideAddTodo() {
        this.setState({
            newTodo: false
        });
    }

    render() {
        return (
            <div className={styles.todosContainer}>
                {this.props.loaded ? (
                    <>
                        <div className={styles.todosHeader}>
                            <h2>{this.state.newTodo ? 'Add Todo List' : 'Todo Lists'}</h2>
                            {this.state.newTodo && (
                                <AddTodo onSubmit={this.addTodo} cancel={this.hideAddTodo}/>
                            )}
                        </div>
                        <TodoList
                            active={this.props.active}
                            delete={this.props.deleteTodo}
                            todos={this.props.list}
                            onClickTodo={this.props.setActiveTodo}
                        />
                        {!this.state.newTodo && (
                            <div className={styles.addTodo} onClick={this.addNewTodo}>
                                <Plus size={18}/>
                                <span>Add Todo List</span>
                            </div>
                        )}
                    </>
                ) : (
                    <SpinnerLoader />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        list: state.todos.list,
        active: state.todos.active,
        loaded: state.todos.loaded,
    };
};

export default connect(mapStateToProps, {getTodos, addTodo, deleteTodo, setActiveTodo})(TodosContainer);