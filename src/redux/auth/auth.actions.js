import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from './auth.types';

export const login = (creds) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const res = await axios.post(`${process.env.REACT_APP_DB_URL}/user/login`, creds);
        res.data.token ? dispatch({ type: LOGIN_SUCCESS, payload: res.data.token }) : dispatch({ type: LOGIN_ERROR });
    }
    catch (err) {
        dispatch({ type: LOGIN_ERROR });
    }
};

export const logout = () => ({ type: LOGOUT });