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
                    <TasksContainer />
                </div>
            </div>
        )
    }
}