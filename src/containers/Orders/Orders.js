import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandling/withErrorHandler';

// контейнер для заказов

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount () { 
        axios.get('/orders.json') // получаем список заявок
            .then(result => {
                const fetchedOrders = [];
                for (let key in result.data) {
                    fetchedOrders.push({
                        ...result.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: fetchedOrders });                
            })
            .catch(error => {
                this.setState({ loading: false });  
            });
    }

    render () {
        return (
            <div>
                <Order />
                <Order />
            </div>       
        );
    }
}

export default withErrorHandler(Orders, axios);