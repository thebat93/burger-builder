import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

// Детали заказа (контейнер)

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // }

    // componentWillMount () {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;

    //     for (let param of query.entries()) { // формируем объект ингредиентов из параметров запроса
    //         // [[salad, 1], [meat, 2], [bacon, 3]...]
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         }
    //         else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ ingredients, totalPrice: price });
    // }

    checkoutCancelledHandler = () => { // обработчик нажатия на кнопку "отменить"
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => { // обработчик нажатия на кнопку "далее"
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        let summary = <Redirect to="/" />; // если ингредиенты не обнаружены, то редиректим на начальную страницу
        if (this.props.ingredients) {
            summary = (
                <div>
                    <CheckoutSummary 
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData} />
                </div>
                );
        }
        return summary;
    }
}

const mapStateToProps = (state) => { // связываем свойства store из Redux с props
    return {
        ingredients: state.burgerBuilder.ingredients
    }
};

export default connect(mapStateToProps)(Checkout);