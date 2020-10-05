import React from 'react';
import classnames from 'classnames';
import {X} from "react-feather";

import IconButton from '../common/IconButton/IconButton';

import styles from '../../../themes/todos/todo.scss';

// use a pure component here so list only re-renders when
// props actually change (compares previous description prop with current)
export default class Todo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.delete = this.delete.bind(this);
    }

    onClick() {
        this.props.onClick(this.props.id);
    }

    delete(e) {
        e.stopPropagation();
        this.props.delete(this.props.id);
    }

    render() {
        return (
            <div id={`todo-${this.props.id}`} onClick={this.onClick}
                 className={classnames(styles.todoItem, this.props.active && styles.active)}>
                <span className={styles.todoDescription}>
                    {this.props.description}
                </span>
                <div className={styles.todoActions}>
                    <IconButton
                        icon={X}
                        onClick={this.delete}
                    />
                </div>
            </div>
        );
    }
}
