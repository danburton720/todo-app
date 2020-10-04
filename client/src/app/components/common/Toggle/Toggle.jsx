import React from 'react';

export default class Toggle extends React.Component {
    render() {
        return (
            <div
                onClick={this.props.onToggle}
            >
                <div>
                    <div/>
                </div>
            </div>
        )
    }
}