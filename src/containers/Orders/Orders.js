import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandling/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

// контейнер для заказов

class Orders extends Component {
    // state = {
    //     orders: [],
    //     loading: true
    // }

    componentDidMount () { 
        this.props.onFetchOrders();
    }

    render () {
        let orders = <Spinner />;
        if (this.props.orders) {
            orders = this.props.orders.map( order => 
                    <Order 
                        ingredients={order.ingredients}
                        key={order.id}
                        price={+order.price} />
                );
        }
        return (
            <div>
                {orders}
            </div>       
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch( actions.fetchOrders() )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));