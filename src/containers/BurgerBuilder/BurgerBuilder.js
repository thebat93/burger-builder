import React, { Component } from 'react';
// импортируем функцию connect для свзязи Реакта и Редакса
import { connect } from 'react-redux';

import Aux from '../../hoc/hocAux/hocAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandling/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderActions from '../../store/actions/index';


// контейнер для строителя бургера

class BurgerBuilder extends Component {
    state = {
        // теперь ingredients находятся в props
        // теперь totalPrice находится в props (как price)
        // теперь флаг возможности покупки бургера находится в props
        purchasing: false, // флаг состояния покупки бургера
        loading: false, // флаг состояния загрузки (во время отправки запроса)
        error: false // флаг ошибки
    }

    componentDidMount () {
        console.log(this.props);
        // axios.get('https://react-burger-builder-98f3a.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data })
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     }); // просто ловим ошибку чтобы отработал HOC обработчик ошибок
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
        this.setState({purchasing: true}); // меняем флаг состояния покупки
    }

    purchaseCancelHandler = () => { // Обработчик отмены заказа (нажатие на затемнение)
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => { // Обработчик продолжения заказа (нажатие на 'Continue')
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
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />; // по дефолту отображается спиннер потому что не загружены ингредиенты
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
                        ordered={this.purchaseHandler} />
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
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
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
        ingredients: state.ingredients,
        price: state.totalPrice
    };
};

// связываем props с вызовами экшенов
const mapDispatchToProps = (dispatch) => {
    return {
        //// Передаем в экшен тип и название ингредиента
        // Используем Action Creator вместо возвращения объекта
        // Исполняем функцию сразу же, чтобы возвращался объект
        onIngredientAdded: (ingredientName) => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
            // { 
            //     type: actionTypes.ADD_INGRIDIENTS, 
            //     ingredientName 
            // }
        onIngredientRemoved: (ingredientName) => dispatch(burgerBuilderActions.removeIngredient(ingredientName))
    };
};

// используем функцию connect()
export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(BurgerBuilder, axios) );