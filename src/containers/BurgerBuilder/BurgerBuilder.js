import React, { Component } from 'react';
// импортируем функцию connect для свзязи Реакта и Редакса
import { connect } from 'react-redux';

import Aux from '../../hoc/hocAux/hocAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandling/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';


// контейнер для строителя бургера

class BurgerBuilder extends Component {
    state = { // свойства в State переехали в Redux Store
        // теперь ingredients находятся в props
        // теперь totalPrice находится в props (как price)
        // теперь флаг возможности покупки бургера находится в props
        purchasing: false, // флаг состояния покупки бургера
        // теперь флаг состояния загрузки (во время отправки запроса) находится в props
        // теперь флаг ошибки находится в props
    }

    componentDidMount () {
        console.log(this.props);
        // инициализация инредиентов
        this.props.onInitIngredients();
    }

    // проверка возможности покупки
    updatePurchaseState (ingredients) {
        // суммарное количество ингредиентов
        // создаем массив из названий ингредиентов
        const sum = Object.keys(ingredients)
            // проходим по нему и меняем названия ингредиентов на их количество
            .map(ingredientKey => {
                return ingredients[ingredientKey]
            })
            // суммируем количество
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            // флаг возможности покупки true если число элементов больше 0
            return sum > 0;
    }

    purchaseHandler = () => { // Обработчик нажатия на кнопку заказа
        if (this.props.isAuthenticated) { // если пользователь вошел
            this.setState({ purchasing: true }); // меняем флаг состояния покупки
        } else { // если пользователь не вошел
            this.props.onSetAuthRedirectPath('/checkout'); // меняем ссылку редиректа после входа пользователя
            this.props.history.push('/auth'); // редерект на страницу авторизации
        }
    }

    purchaseCancelHandler = () => { // Обработчик отмены заказа (нажатие на затемнение)
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => { // Обработчик продолжения заказа (нажатие на 'Continue')
        this.props.onInitPurchase(); // сбрасываем флаг окончания заказа по дефолту (начало нового заказа)
        this.props.history.push('/checkout');
        // const queryParams = []; // формируем массив параметров
        // for (let i in this.state.ingredients) { // превращаем в формат НАЗВАНИЕ_ИНГРЕДИЕНТА=ЧИСЛО
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.props.price); // передаем дополнительно полную стоимость
        // const queryString = queryParams.join('&'); // собираем параметры в строку, разделенную "&"
        // this.props.history.push({ // программно переходим на роут "/checkout" и передаем строку с параметрами
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
    }

    render() {
        // информация для отключения кнопки "Less"
        // по сути дела просто копия состояния ингредиентов
        const disabledInfo = {
            ...this.props.ingredients
        }
        for (let key in disabledInfo) {
            // назначаем true/false для каждого ингредиента
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        // детали заказа
        let orderSummary = null; // по дефолту не отображаются потому что не загружены ингредиенты
        // бургер и контролы
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />; // по дефолту отображается спиннер потому что не загружены ингредиенты
        if (this.props.ingredients) { // если загружены ингредиенты, то отображаем соответствующие компоненты
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated} />
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    price={this.props.price.toFixed(2)}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    ingredients={this.props.ingredients} />
            );
        }
        // отображаем спиннер вместо деталей заказа спиннер если происходит отправка запроса
        // if (this.state.loading) {
        //     orderSummary = <Spinner />;
        // }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                { burger }
            </Aux>
        );
    }
}

// связываем props с свойствами state
const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

// связываем props с вызовами экшенов
const mapDispatchToProps = (dispatch) => {
    return {
        //// Передаем в экшен тип и название ингредиента
        // Используем Action Creator вместо возвращения объекта
        // Исполняем функцию сразу же, чтобы возвращался объект
        onIngredientAdded: (ingredientName) => dispatch( burgerBuilderActions.addIngredient(ingredientName) ),
            // { 
            //     type: actionTypes.ADD_INGRIDIENTS, 
            //     ingredientName 
            // }
        onIngredientRemoved: (ingredientName) => dispatch( burgerBuilderActions.removeIngredient(ingredientName) ),
        onInitIngredients: () => dispatch( burgerBuilderActions.initIngredients() ),
        onInitPurchase: () => dispatch( burgerBuilderActions.purchaseInit() ),
        onSetAuthRedirectPath: (path) => dispatch( burgerBuilderActions.setAuthRedirectPath(path) )
    };
};

// используем функцию connect()
export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(BurgerBuilder, axios) );