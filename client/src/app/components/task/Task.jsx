import React from 'react';
import {Trash2} from 'react-feather';


export default class Task extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <input
                        value={this.props.description}
                    />
                </div>
            </div>
        );
    }
}