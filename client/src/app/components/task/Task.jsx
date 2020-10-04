import React from 'react';
import {Trash2} from 'react-feather';

import IconButton from '../common/IconButton/IconButton';

export default class Task extends React.Component {
    constructor(props) {
        super(props);

        this.delete = this.delete.bind(this);
        this.toggleCompleted = this.toggleCompleted.bind(this);
    }

    delete() {
        this.props.delete(this.props.id)
    }

    toggleCompleted() {
        this.props.toggleCompleted(this.props.id, !this.props.completed)
    }

    render() {
        return (
            <div>
                <div>
                    <button
                        enabled={this.props.completed}
                        onToggle={this.toggleCompleted}
                    >
                        TempToggle
                    </button>
                    <input
                        value={this.props.description}
                    />
                </div>
                <IconButton icon={Trash2} onClick={this.delete}/>
            </div>
        );
    }
}