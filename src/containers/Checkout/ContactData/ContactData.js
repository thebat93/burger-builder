import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from'../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => { // обработчик нажатия на кнопку "заказать"
        e.preventDefault();
        this.setState({ loading: true }); // меняем состояние загрузки
        // формируем данные для отправки
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Igor',
                address: {
                    street: 'street',
                    zipcode: '111111',
                    country: 'Russia'
                },
                email: 'test@test.com'
            },
            delivery: 'fast'
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
        let form = (
            <form>
                <Input inputtype='input' type="email" name="email" placeholder="Your Email" />
                <Input inputtype='input' type="text" name="name" placeholder="Your Name" />
                <Input inputtype='input' type="text" name="street" placeholder="Your Street" />
                <Input inputtype='input' type="text" name="postal" placeholder="Your Postal Code" />
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