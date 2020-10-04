import React from 'react';

import TodosContainer from './containers/TodosContainer';
import TasksContainer from './containers/TasksContainer';

export default class App extends React.Component {
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