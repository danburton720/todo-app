import React from 'react';
import {X} from "react-feather";

import IconButton from '../common/IconButton/IconButton';

// use a pure component here so list only re-renders when
// props actually change (compares previous description prop with current)
export default class Todo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete() {
        this.props.delete(this.props.id)
    }

    render() {
        return (
            <div>
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