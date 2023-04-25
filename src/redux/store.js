import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { authReducer } from './auth/auth.reducer';
import { notesReducer } from './notes/notes.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    notes: notesReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));