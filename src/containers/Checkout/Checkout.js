import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

// Детали заказа (контейнер)

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        for (let param of query.entries()) { // формируем объект ингредиентов из параметров запроса
            // [[salad, 1], [meat, 2], [bacon, 3]...]
            ingredients[param[0]] = +param[1];
        }
        this.setState({ ingredients });
    }

    checkoutCancelledHandler = () => { // обработчик нажатия на кнопку "отменить"
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => { // обработчик нажатия на кнопку "далее"
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
            </div>
        );
    }
}

export default Checkout;