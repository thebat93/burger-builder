import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// Все Actions Creators, относящиеся к Заказу Бургера

export const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId,
        orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error
    };
};

const purchaseBurgerStart = (orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};

// Не отображается в Redux DevTools
export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch( purchaseBurgerStart() );
        // отправляем данные через axios используя импортированный инстанс
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch( purchaseBurgerSuccess(response.data.name, orderData) );
            })
            .catch(error => {
                dispatch( purchaseBurgerFail(error) );
            });
    }
};
