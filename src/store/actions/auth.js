// экшены, связанные с аутентификацией

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

export const auth = (email, password) => {
    return dispatch => {
        dispatch( authStart() );
    };
};