import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from './auth.types';

let token = localStorage.getItem('token');

const initState = {
    token: !!token,
    isAuth: token,
    loading: false,
    error: false
};

export const authReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case LOGIN_SUCCESS: {
            localStorage.setItem('token', payload);

            return {
                ...state,
                token: payload,  //token
                isAuth: true,
                loading: false,
                error: false
            }
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                loading: false,
                error: true
            }
        }
        case LOGOUT: {
            localStorage.removeItem('token');

            return {
                ...state,
                token: '',
                isAuth: false,
                loading: false,
                error: false
            }
        }
        default: return state;
    }
};