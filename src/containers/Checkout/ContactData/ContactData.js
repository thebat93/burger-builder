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
                value: '', // значение элемента
                validation: { // правила для валидации
                    required: true
                },
                valid: false // флаг валидности поля
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
                valid: false
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
                valid: false
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
                valid: false
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
                valid: false
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

    checkValidity = (value, rules) => { // проверка валидности
        let isValid = true;

        if (rules.required) { // если поле должно быть required
            isValid = value.trim() !== '' && isValid; // устанавливаем новое значение валидности
        }

        if (rules.minLenght) { // если поле имеет ограничение на количество символов
            isValid = value.length >= rules.minLenght && isValid;
        }

        if (rules.maxLenght) { // если поле имеет ограничение на количество символов
            isValid = value.length <= rules.maxLenght && isValid;
        }
        // вернет true только если все проверки успешно прошли
        return isValid; // вернули boolean
    }

    inputChangedHandler = (e, inputIdentifier) => { // обработчик изменения значения инпутов (2-way binding)
        const updatedOrderForm = { // копируем настройки всей формы
            ...this.state.orderForm
        };
        const updatedFormElement = { // копируем настройки конкретного элемента, который мы меняем
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = e.target.value; // присваиваем новое значение
        // проверка валидности
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement);
        this.setState({ orderForm: updatedOrderForm });
    }

    orderHandler = (e) => { // обработчик нажатия на кнопку "заказать"
        e.preventDefault();
        this.setState({ loading: true }); // меняем состояние загрузки
        const formData = {}; // объект { название: значение, ...}
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        // формируем данные для отправки
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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
            <form onSubmit={this.orderHandler}>
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