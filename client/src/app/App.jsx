import React from 'react';

import TodosContainer from './containers/TodosContainer';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <TodosContainer />
            </div>
        )
    }
}