// экшены, связанные с аутентификацией

import axios from 'axios';
import * as actionTypes from './actionTypes';

// Action Creators

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSucess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};

export const logout = () => {
    // очищаем Local Storage
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

// проверка прекращения валидности токена (через 1 час после логинизации)
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch( logout() );
        }, expirationTime * 1000);
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
                // вычисление срока годности токена
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                // сохраняем полученный токен в Local Storage
                localStorage.setItem('token', response.data.idToken);
                // сохраняем срок годности токена в Local Storage
                localStorage.setItem('expirationDate', expirationDate);
                // сохраняем ИД пользователя в Local Storage
                localStorage.setItem('userId', response.data.localId);
                // запускаем экшен удачной аутентификации
                dispatch( authSucess(response.data.idToken, response.data.localId) );
                // запускаем экшен проверки окончания времени жизни токена
                dispatch( checkAuthTimeout(response.data.expiresIn) );
            })
            .catch(error => { // В случае ошибки
                console.log(error);
                dispatch( authFail(error.response.data.error) ); // запускаем экшен неудачной аутентификации
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    };
};

// проверка состояния логина (каждый раз при загрузке приложения)
export const authCheckState = () => {
    return dispatch => {
        // получаем токен из Local Storage
        const token = localStorage.getItem('token');
        // если он не обнаружен, то выполняем действие logout
        if (!token) {
            dispatch( logout() );
        } else { // иначе выполняем действие authSuccess
            // получаем срок годности токена
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            // проверяем, не закончился ли срок годности токена
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch( authSucess(token, userId) );
                dispatch( checkAuthTimeout(expirationDate.getSeconds() - new Date().getSeconds()) );
            } else {
                dispatch( logout() );
            }
        }
    };
};