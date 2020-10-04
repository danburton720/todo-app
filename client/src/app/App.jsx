import React from 'react';
import io from 'socket.io-client';
import TodosContainer from './containers/TodosContainer';
import TasksContainer from './containers/TasksContainer';
import ResponsiveNavBar from './components/common/ResponsiveNavBar/ResponsiveNavBar';

import styles from '../themes/index.scss';

export const socket = io('http://localhost:5000');

export default class App extends React.Component {
    componentDidMount() {
        socket.on('connect', () => {
            console.log('ws connect');
        });
    }

    render() {
        return (
            <div className={styles.app}>
                <ResponsiveNavBar />
                <div id='sideBar' className={styles.sideBar}>
                    <TodosContainer/>
                </div>
                <div className={styles.main}>
                    <TasksContainer/>
                </div>
            </div>
        );
    }
}