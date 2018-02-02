import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from'../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandling/withErrorHandler';
import * as orderActions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: { // настройки для формы
            name: {
                elementType: 'input', // тип элемента
                elementConfig: { // аттрибуты элемента
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '', // значение элемента
                validation: { // правила для валидации
                    required: true
                },
                valid: false, // флаг валидности поля
                touched: false // флаг, показывающий было ли изменено значение поля
            },
            street: {
                elementType: 'input', // тип элемента
                elementConfig: { // аттрибуты элемента
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '', // значение элемента
                validation: {
                    required: true
                },
                valid: false, // флаг валидности поля
                touched: false // флаг, показывающий было ли изменено значение поля
            },
            zipcode: {
                elementType: 'input', // тип элемента
                elementConfig: { // аттрибуты элемента
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '', // значение элемента
                validation: {
                    required: true,
                    minLenght: 5,
                    maxLenght: 5
                },
                valid: false, // флаг валидности поля
                touched: false // флаг, показывающий было ли изменено значение поля
            },
            country: {
                elementType: 'input', // тип элемента
                elementConfig: { // аттрибуты элемента
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '', // значение элемента
                validation: {
                    required: true
                },
                valid: false, // флаг валидности поля
                touched: false // флаг, показывающий было ли изменено значение поля
            },
            email: {
                elementType: 'input', // тип элемента
                elementConfig: { // аттрибуты элемента
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '', // значение элемента
                validation: {
                    required: true
                },
                valid: false, // флаг валидности поля
                touched: false // флаг, показывающий было ли изменено значение поля
            },
            deliveryMethod: {
                elementType: 'select', // тип элемента
                elementConfig: { // аттрибуты элемента
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                valid: true,
                validation: {},
                value: 'fastest' // значение элемента
            },
        },
        formIsValid: false, // флаг валидности всей формы
        // loading: false // находится в Redux Store
    }

    inputChangedHandler = (e, inputIdentifier) => { // обработчик изменения значения инпутов (2-way binding)
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: e.target.value, // присваиваем новое значение
            // проверка валидности
            valid: checkValidity( e.target.value, this.state.orderForm[inputIdentifier].validation ),
            touched: true // поле было изменено
        }); 
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        }); 
        // проверка валидности всей формы
        let formIsValid = true; 
        for (let inputIdentifier in updatedOrderForm) { // проходим по всей форме
            // если хоть одно поле невалидно, то вся форма невалидна
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid });
    }

    orderHandler = (e) => { // обработчик нажатия на кнопку "заказать"
        e.preventDefault();
        const formData = {}; // объект { название: значение, ...}
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        // формируем данные для отправки
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        };
        this.props.onOrderBurger(order, this.props.token);
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) { // формируем массив из объектов
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                { formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(e) => this.inputChangedHandler(e, formElement.id)} />
                ))}
                <Button 
                    btnType="Success" 
                    clicked={this.orderHandler}
                    disabled={!this.state.formIsValid}>ORDER</Button>  
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                { form }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: ( orderData, token ) => dispatch( orderActions.purchaseBurger( orderData, token ) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));