// импортируем типы экшенов
import * as actionTypes from '../actions/actionTypes';

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
            // меняем state иммутабельно: возвращаем новый объект
            return {
                ...state, // копируем все свойства на первом уровне 
                ingredients: {
                    ...state.ingredients, // копируем все свойства на уровне ingredients
                    // обновляем свойство выбранного ингредиента
                    // название свойства передается в экшене
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGRIDIENTS:
        return {
            ...state, // копируем все свойства на первом уровне 
            ingredients: {
                ...state.ingredients, // копируем все свойства на уровне ingredients
                // обновляем свойство выбранного ингредиента
                // название свойства передается в экшене
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            },
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
        }
        // если ни один тип не подошел, то возвращаем старый state
        default:
            return state;
    }
}

export default reducer;