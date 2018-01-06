import React, { Component } from 'react';

import Aux from '../../hoc/hocAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        totalPrice: 4 // цена по дефолту
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
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo} />
            </Aux>
        );
    }
}

export default BurgerBuilder;