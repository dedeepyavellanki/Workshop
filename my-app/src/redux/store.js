// src/redux/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import userReducer from './slice/workshopManagamentSlice';
import workshopManagementLoginReducer from './slice/workshopManagamentSlice';

const rootReducer = combineReducers({
    user: userReducer,
    workshopManagementLoginReducer: workshopManagementLoginReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
