import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.css';

import * as actions from '../../store/actions/index';

// Страница входа пользователя

class Auth extends Component {
    state = {
        controls: { // Поля ввода
            email: {
                elementType: 'input', // тип элемента
                elementConfig: { // аттрибуты элемента
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '', // значение элемента
                validation: { // правила для валидации
                    required: true,
                    isEmail: true
                },
                valid: false, // флаг валидности поля
                touched: false // флаг, показывающий было ли изменено значение поля
            },
            password: {
                elementType: 'input', // тип элемента
                elementConfig: { // аттрибуты элемента
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '', // значение элемента
                validation: { // правила для валидации
                    required: true,
                    minLength: 6
                },
                valid: false, // флаг валидности поля
                touched: false // флаг, показывающий было ли изменено значение поля
            }
        },
        isSignup: true // Режим входа / регистрации
    };
    
    checkValidity = (value, rules) => { // проверка валидности
        let isValid = true;

        if (rules.required) { // если поле должно быть required
            isValid = value.trim() !== '' && isValid; // устанавливаем новое значение валидности
        }
        if (rules.minLength) { // если поле имеет ограничение на количество символов
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) { // если поле имеет ограничение на количество символов
            isValid = value.length <= rules.maxLength && isValid;
        }
        // вернет true только если все проверки успешно прошли
        return isValid; // вернули boolean
    }

    inputChangedHandler = (event, controlName) => { // обработчик изменения значения инпутов (2-way binding)
        const updatedControls = { // копируем настройки всей формы
            ...this.state.controls,
            [controlName]: { // обновляем свойства контрола
                ...this.state.controls[controlName],
                value: event.target.value, // присваиваем введенное значение, подключаем 2-way binding
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation), // проверка валидности
                touched: true // поле было изменено
            }
        };
        this.setState({ controls: updatedControls });
    };

    // Обработчик сабмита формы
    submitHandler = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    };

    // Обработчик смены режима
    switchAuthModeHandler = () => {
        this.setState( prevState => {
            return { isSignup: !prevState.isSignup };
        });
    };

    render () {
        const formElementsArray = []; // массив [{ id поля, конфигурация }, {...}, ...] 
        for (let key in this.state.controls) { // формируем массив из объектов
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        const form = formElementsArray.map( formElement => (// формируем JSX формы
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(e) => this.inputChangedHandler(e, formElement.id)} />
        ));
        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO { this.state.isSignup ? 'SIGNIN' : 'SIGNUP' }</Button>
            </div>
        );
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch( actions.auth(email, password, isSignup) ) // присоединяем к Action Creator
    };
};

export default connect(null, mapDispatchToProps)(Auth);