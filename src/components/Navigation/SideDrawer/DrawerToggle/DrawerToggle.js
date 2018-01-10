import React from 'react';

import classes from './DrawerToggle.css';

// переключатель для боковой панели

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;