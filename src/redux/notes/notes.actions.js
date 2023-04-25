import axios from 'axios';
import { SUCCESS_NOTES, REQUEST_NOTES, ERROR_NOTES, CREATE_NOTE } from './notes.types';

export const getNotes = () => async (dispatch) => {
    dispatch({ type: REQUEST_NOTES });

    try {
        const res = await axios.get(`${process.env.REACT_APP_DB_URL}/notes`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch({ type: SUCCESS_NOTES, payload: res.data });
        return res.data;
    }
    catch (err) {
        dispatch({ type: ERROR_NOTES });
    }
};

export const createNote = (note) => async (dispatch) => {
    await axios.post(`${process.env.REACT_APP_DB_URL}/notes/create`, note, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    dispatch({ type: CREATE_NOTE });
    dispatch(getNotes());
};