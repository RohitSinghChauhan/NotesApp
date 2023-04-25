import { REQUEST_NOTES, SUCCESS_NOTES, ERROR_NOTES, CREATE_NOTE } from './notes.types';

const initState = {
    notes: [],
    loading: false,
    error: false
};

export const notesReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case SUCCESS_NOTES: {
            return {
                ...state,
                notes: payload,
                loading: false,
                error: false
            }
        }
        case REQUEST_NOTES: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case ERROR_NOTES: {
            return {
                ...state,
                loading: false,
                error: true
            }
        }
        case CREATE_NOTE: {
            return {
                ...state
            }
        }
        default: return state;
    }
};