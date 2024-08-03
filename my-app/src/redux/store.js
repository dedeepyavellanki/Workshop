import { configureStore } from '@reduxjs/toolkit';
import workshopManagementReducer from './Slice/WorkShopManagementSlice';

const store = configureStore({
  reducer: {
    workshopManagement: workshopManagementReducer,
  },
});

export default store;
