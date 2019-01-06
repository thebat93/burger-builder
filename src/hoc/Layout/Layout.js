import React, { Component } from 'react';
import { connect } from 'react-redux';

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
            <React.Fragment>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} 
                    closed={this.closeSideDrawerHandler} />
                <main className={classes.Content}>
                    { this.props.children }
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null // флаг аутентификации
    };
};

export default connect(mapStateToProps)(Layout);