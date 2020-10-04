import React from 'react';
import {X} from 'react-feather';

import IconButton from '../common/IconButton/IconButton';

import Toggle from '../common/Toggle/Toggle';

export default class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: props.description
        };

        this.delete = this.delete.bind(this);
        this.toggleCompleted = this.toggleCompleted.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onBlurDescription = this.onBlurDescription.bind(this);
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onBlurDescription() {
        this.props.update(this.props.id, {
            description: this.state.description
        });
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
                <Toggle
                    enabled={this.props.completed}
                    onToggle={this.toggleCompleted}
                />
                <input
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    onBlur={this.onBlurDescription}
                />
                <IconButton icon={X} onClick={this.delete}/>
            </div>
        );
    }
}