// импортируем типы экшенов
import * as actionTypes from './actions';

// изначальное состояние
const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 0
    },
    totalPrice: 4
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
                }
            }
        case actionTypes.REMOVE_INGRIDIENTS:
        return {
            ...state, // копируем все свойства на первом уровне 
            ingredients: {
                ...state.ingredients, // копируем все свойства на уровне ingredients
                // обновляем свойство выбранного ингредиента
                // название свойства передается в экшене
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            }
        }
        // если ни один тип не подошел, то возвращаем старый state
        default:
            return state;
    }
}

export default reducer;