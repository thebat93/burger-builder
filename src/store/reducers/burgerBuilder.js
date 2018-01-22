// импортируем типы экшенов
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

// изначальное состояние
const initialState = {
    ingredients: null, // список ингредиентов не загружен
    totalPrice: 4, // цена по дефолту (только за булочки)
    error: false // флаг ошибки
}

// константа - цены ингредиентов
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

// редьюсер
// передаем в функцию состояние (по дефолту изначальное) и экшен
const reducer = (state = initialState, action) => {
    // ветвление в зависимости от типа экшена
    // всегда возращаем state
    switch (action.type) {
        case actionTypes.ADD_INGRIDIENTS:
            // // меняем state иммутабельно: возвращаем новый объект
            // return {
            //     ...state, // копируем все свойства на первом уровне 
            //     ingredients: {
            //         ...state.ingredients, // копируем все свойства на уровне ingredients
            //         // обновляем свойство выбранного ингредиента
            //         // название свойства передается в экшене
            //         [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            //     },
            //     totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            // };
            const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }; 
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
            return updateObject(state, updatedState);
        case actionTypes.REMOVE_INGRIDIENTS:
            const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }; 
            const updatedIngs = updateObject(state.ingredients, updatedIng);
            const updatedSt = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
            return updateObject(state, updatedSt);
        case actionTypes.SET_INGRIDIENTS:
            return updateObject(state,
                {
                    ...state,
                    ingredients: action.ingredients,
                    totalPrice: 4,
                    error: false
                });
        case actionTypes.FETCH_INGRIDIENTS_FAILED:
            return updateObject(state, { error: true });
        // если ни один тип не подошел, то возвращаем старый state
        default:
            return state;
    }
}

export default reducer;