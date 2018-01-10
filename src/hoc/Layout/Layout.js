import React, { Component } from 'react';

import Aux from '../hocAux/hocAux';
import classes from './Layout.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

// разметка компонентов

class Layout extends Component {
    state = {
        showSideDrawer: false // флаг состояния показа бокового меню
    }

    closeSideDrawerHandler = () => { // обработчик закрытия бокового меню
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => { // обработчик переключения сайдбара
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }
    
    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.closeSideDrawerHandler} />
                <main className={classes.Content}>
                    { this.props.children }
                </main>
            </Aux>
        );
    }
}

export default Layout;