import React from 'react';
import io from 'socket.io-client';

import TodosContainer from './containers/TodosContainer';
import TasksContainer from './containers/TasksContainer';

export const socket = io('http://localhost:5000');

export default class App extends React.Component {
    componentDidMount() {
        socket.on('connect', () => {
            console.log('ws connect');
        });
    }

    render() {
        return (
            <div>
                <div>
                    <TodosContainer />
                </div>
                <div>
                    <TasksContainer
                        todoId='5f79ac12edc9232b6cbe335c'
                    />
                </div>
            </div>
        )
    }
}