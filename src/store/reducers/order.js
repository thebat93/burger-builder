import * as actionTypes from '../actions/actionTypes';

// Начальный State
const initialState = {
    orders: [], // заказы
    loading: false, // флаг загрузки заказа
    purchased: false // флаг окончания заказа
};

const order = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            };
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                orderId: action.orderId,
                purchased: true
            };
            return {
                ...state,
                loading: false,
                // копируем старый массив и добавляем новый заказ
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export default order;