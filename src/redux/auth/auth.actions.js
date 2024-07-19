import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from './auth.types';

export const login = (creds) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const queryParams = new URLSearchParams({
            email: creds.email,
            password: creds.password
        }).toString();
        const url = `https://notesapp-api-ygsd.onrender.com/user/login?${queryParams}`;

        const res = await axios.post(url);
        res.data.token ? dispatch({ type: LOGIN_SUCCESS, payload: res.data.token }) : dispatch({ type: LOGIN_ERROR });
    }
    catch (err) {
        dispatch({ type: LOGIN_ERROR });
    }
};

export const logout = () => ({ type: LOGOUT });