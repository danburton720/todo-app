import React from 'react';
import {X} from "react-feather";

import IconButton from '../common/IconButton/IconButton';

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
            <div id={`todo-${this.props.id}`} onClick={this.onClick}>
                <span>
                    {this.props.description}
                </span>
                <div>
                    <IconButton
                        icon={X}
                        onClick={this.delete}
                    />
                </div>
            </div>
        );
    }
}
