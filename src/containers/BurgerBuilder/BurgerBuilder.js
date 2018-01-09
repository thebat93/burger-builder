import React, { Component } from 'react';

import Aux from '../../hoc/hocAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

// контейнер для строителя бургера

// константа - цены ингредиентов
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4, // цена по дефолту
        purchaseable: false, // флаг возможности покупки бургера
        purchasing: false // флаг состояния покупки бургера
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
        this.setState({
            // флаг возможности покупки true если число элементов больше 0
            purchaseable: sum > 0
        })
    }

    // обработчик добавления ингредиента
    // передается через props к BuildControl
    addIngredientHandler = (type) => {
        // старое число ингредиентов
        const oldCount = this.state.ingredients[type];
        // обновленнное число ингредиентов
        const updatedCount = oldCount + 1;
        // копируем объект с ингредиентами
        const updateIngredients = {
            ...this.state.ingredients
        };
        // обновляем число ингредиентов нужного типа
        updateIngredients[type] = updatedCount;
        // добавка к цене для 1 штуки ингрелиента нужного типа
        const priceAddition = INGREDIENT_PRICES[type];
        // старая цена
        const oldPrice = this.state.totalPrice;
        // новая цена
        const newPrice = oldPrice + priceAddition;
        // обновляем состояние
        this.setState({
            ingredients: updateIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updateIngredients);
    }

    // обработчик удаления ингридиента
    // передается через props к BuildControl
    removeIngredientHandler = (type) => {
        // старое число ингредиентов
        const oldCount = this.state.ingredients[type];
        // проверка на отрицательное число ингредиентов
        if (oldCount <= 0) {
            return;
        }
        // обновленнное число ингредиентов
        const updatedCount = oldCount - 1;
        // копируем объект с ингредиентами
        const updateIngredients = {
            ...this.state.ingredients
        };
        // обновляем число ингредиентов нужного типа
        updateIngredients[type] = updatedCount;
        // убавка от цены для 1 штуки ингрелиента нужного типа
        const priceDeduction = INGREDIENT_PRICES[type];
        // старая цена
        const oldPrice = this.state.totalPrice;
        // новая цена
        const newPrice = oldPrice - priceDeduction;
        // обновляем состояние
        this.setState({
            ingredients: updateIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updateIngredients);
    }

    purchaseHandler = () => { // Обработчик нажатия на кнопку заказа
        this.setState({purchasing: true}); // меняем флаг состояния покупки
    }

    purchaseCancelHandler = () => { // Обработчик отмены заказа (нажатие на затемнение)
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => { // Обработчик продолжения заказа (нажатие на 'Continue')
        alert('purchased!');
    }

    render() {
        // информация для отключения кнопки "Less"
        // по сути дела просто копия состояния ингредиентов
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            // назначаем true/false для каждого ингредиента
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        price={this.state.totalPrice.toFixed(2)}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;