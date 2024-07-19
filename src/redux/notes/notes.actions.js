import axios from 'axios';
import { SUCCESS_NOTES, REQUEST_NOTES, ERROR_NOTES, CREATE_NOTE } from './notes.types';

let api = 'https://notesapp-api-ygsd.onrender.com';

export const getNotes = () => async (dispatch) => {
    dispatch({ type: REQUEST_NOTES });

    try {
        const res = await axios.get(`${api}/notes`, {
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

    const queryParams = new URLSearchParams({
        title: note.title,
        note: note.note
    }).toString();
    const urlWithParams = `https://notesapp-api-ygsd.onrender.com/notes/create?${queryParams}`;

    await axios.post(urlWithParams, {}, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    dispatch({ type: CREATE_NOTE });
    dispatch(getNotes());
};