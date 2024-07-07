// Redux/Store.js
import { configureStore } from '@reduxjs/toolkit';
import workshopManagementReducer from '../redux/slice/workshopManagamentSlice';

export const store = configureStore({
    reducer: {
        workshopManagementLoginReducer: workshopManagementReducer,
    },
});
