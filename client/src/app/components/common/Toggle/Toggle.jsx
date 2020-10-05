import React from 'react';

import classnames from 'classnames';
import styles from './toggle.scss';

export default class Toggle extends React.Component {
    render() {
        return (
            <div
                className={classnames(styles.toggleWrapper, this.props.enabled && styles.active)}
                onClick={this.props.onToggle}
            >
                <div className={styles.toggle}>
                    <div className={styles.innerToggle}/>
                </div>
            </div>
        )
    }
}