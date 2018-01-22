import * as actionTypes from './actionTypes';

// Action Creator: Добваление ингредиента

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGRIDIENTS,
        ingredientName
    };
};

// Action Creator: Удаление ингредиента

export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGRIDIENTS,
        ingredientName
    };
};