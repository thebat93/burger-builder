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
    removeIngredientHandler = (type) => {

    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientAdded={this.addIngredientHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;