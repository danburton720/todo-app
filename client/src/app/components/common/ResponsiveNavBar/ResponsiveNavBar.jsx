import React from 'react';
import styles from './responsiveNavBar.scss';
import IconButton from '../IconButton/IconButton';
import {Menu, X} from 'react-feather';

export default class ResponsiveNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideMenu: false
        };
        this.toggleSideMenu = this.toggleSideMenu.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.showSideMenu && !prevState.showSideMenu) {
            document.getElementById('sideBar').className = 'sideBar show';
        }
        if(!this.state.showSideMenu && prevState.showSideMenu) {
            document.getElementById('sideBar').className = 'sideBar';
        }
    }

    toggleSideMenu() {
        this.setState({
            showSideMenu: !this.state.showSideMenu
        });
    }

    render() {
        return (
            <div className={styles.responsiveNavBar}>
                <IconButton
                    icon={this.state.showSideMenu ? X : Menu}
                    onClick={this.toggleSideMenu}
                />
            </div>
        )
    }
}