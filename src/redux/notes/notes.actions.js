import axios from 'axios';
import { SUCCESS_NOTES, REQUEST_NOTES, ERROR_NOTES, CREATE_NOTE } from './notes.types';

export const getNotes = () => async (dispatch) => {
    dispatch({ type: REQUEST_NOTES });

    try {
        const res = await axios.get('https://notesapp-api-ygsd.onrender.com/notes', {
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
    await axios.post(`https://notesapp-api-ygsd.onrender.com/notes/create`, note, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    dispatch({ type: CREATE_NOTE });
};