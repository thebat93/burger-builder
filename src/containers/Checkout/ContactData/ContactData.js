import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from'../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: { // настройки для формы
            name: {
                elementType: 'input', // тип элемента
                elementConfig: { // аттрибуты элемента
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '' // значение элемента
            },
            street: {
                elementType: 'input', // тип элемента
                elementConfig: { // аттрибуты элемента
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '' // значение элемента
            },
            zipcode: {
                elementType: 'input', // тип элемента
                elementConfig: { // аттрибуты элемента
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '' // значение элемента
            },
            country: {
                elementType: 'input', // тип элемента
                elementConfig: { // аттрибуты элемента
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '' // значение элемента
            },
            email: {
                elementType: 'input', // тип элемента
                elementConfig: { // аттрибуты элемента
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '' // значение элемента
            },
            deliveryMethod: {
                elementType: 'select', // тип элемента
                elementConfig: { // аттрибуты элемента
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: '' // значение элемента
            },
        },
        loading: false
    }

    inputChangedHandler = (e, inputIdentifier) => { // обработчик изменения значения инпутов
        const updatedOrderForm = { // копируем настройки всей формы
            ...this.state.orderForm
        };
        const updatedFormElement = { // копируем настройки конкретного элемента, который мы меняем
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = e.target.value; // присваиваем новое значение
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({ orderForm: updatedOrderForm });
    }

    orderHandler = (e) => { // обработчик нажатия на кнопку "заказать"
        e.preventDefault();
        this.setState({ loading: true }); // меняем состояние загрузки
        // формируем данные для отправки
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        };
        // отправляем данные через axios используя импортированный инстанс
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => 
                this.setState({ loading: false })
            );
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
            <form>
                { formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(e) => this.inputChangedHandler(e, formElement.id)} />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>  
            </form>
        );
        if (this.state.loading) {
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

export default ContactData;