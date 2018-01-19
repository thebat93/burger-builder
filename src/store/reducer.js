// импортируем типы экшенов
import * as actionTypes from './actions';

// изначальное состояние
const initialState = {
    ingredients: null,
    totalPrice: 4
}

// редьюсер
// передаем в функцию состояние (по дефолту изначальное) и экшен
const reducer = (state = initialState, action) => {

}

export default reducer;