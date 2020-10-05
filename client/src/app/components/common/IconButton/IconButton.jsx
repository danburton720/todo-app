import React from 'react';

import styles from './iconButton.scss';

export default class IconButton extends React.PureComponent {
    render() {
        const Icon = this.props.icon;
        return (
            <button onClick={this.props.onClick} className={styles.iconButton}>
                <Icon size={this.props.size}/>
            </button>
        );
    }
}

IconButton.defaultProps = {
    size: 18
};