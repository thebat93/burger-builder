import React from 'react';

import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

// боковая панель

const sideDrawer = (props) => {
    let AttachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        AttachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={AttachedClasses.join(' ')} onClick={props.closed}>
                {/* <Logo height='11%' /> */}
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;