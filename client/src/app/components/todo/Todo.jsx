import React from 'react';

// use a pure component here so list only re-renders when
// props actually change (compares previous description prop with current)
export default class Todo extends React.PureComponent {
    render() {
        return (
            <div>
                <span>
                    {this.props.description}
                </span>
            </div>
        );
    }
}