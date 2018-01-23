// экшены, связанные с аутентификацией

import axios from 'axios';
import * as actionTypes from './actionTypes';

// Action Creators

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSucess = authData => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};

// Async Action Creator
// Не отображается в Redux DevTools

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch( authStart() );
        // Данные для отправки
        const authData = {
            email, password,
            returnSecureToken: true
        };
        // URL для регистрации
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCyqOtfIX5Um1BfCT_Y-ZgrTcUNLCxYDtQ';
        if (!isSignup) {
            // URL для входа
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCyqOtfIX5Um1BfCT_Y-ZgrTcUNLCxYDtQ';
        }
        // Отправляем запрос с данными
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch( authSucess(response.data) ); // запускаем экшен удачной аутентификации
            })
            .catch(error => { // В случае ошибки
                console.log(error);
                dispatch( authFail(error) ); // запускаем экшен неудачной аутентификации
            });
    };
};