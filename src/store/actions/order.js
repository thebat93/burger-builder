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

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch( fetchOrdersStart() );
        axios.get('/orders.json') // получаем список заявок
        .then(result => {
            const fetchedOrders = [];
            for (let key in result.data) {
                fetchedOrders.push({
                    ...result.data[key],
                    id: key
                });
            }
            // при успешном исходе диспатчим экшен fetchOrdersSuccess
            dispatch( fetchOrdersSuccess(fetchedOrders) );        
        })
        .catch(error => {
            // при неудачном исходе диспатчим экшен fetchOrdersFail
            dispatch( fetchOrdersFail(error) );  
        });
    }
};