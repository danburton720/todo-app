import React from 'react';

export default class IconButton extends React.PureComponent {
    render() {
        const Icon = this.props.icon;
        return (
            <button onClick={this.props.onClick}>
                <Icon size={this.props.size}/>
            </button>
        );
    }
}