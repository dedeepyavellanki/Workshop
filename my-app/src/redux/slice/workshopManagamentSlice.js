// src/redux/slice/workshopManagamentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const workshopManagementLoginThunk = createAsyncThunk(
    'workshopManagement/login',
    async (user, thunkAPI) => {
        // Simulate a login request or integrate with your API
        if (user.facultyId === 'admin' && user.password === 'password') {
            return { adminID: user.facultyId, userType: 'admin' };
        } else {
            return thunkAPI.rejectWithValue('Invalid credentials');
        }
    }
);

const workshopManagementSlice = createSlice({
    name: 'workshopManagement',
    initialState: {
        loginUserStatus: false,
        currentUser: null,
        errorOccured: false,
        errMsg: '',
    },
    reducers: {
        resetState: (state) => {
            state.loginUserStatus = false;
            state.currentUser = null;
            state.errorOccured = false;
            state.errMsg = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(workshopManagementLoginThunk.fulfilled, (state, action) => {
                state.loginUserStatus = true;
                state.currentUser = action.payload;
                state.errorOccured = false;
                state.errMsg = '';
            })
            .addCase(workshopManagementLoginThunk.rejected, (state, action) => {
                state.loginUserStatus = false;
                state.errorOccured = true;
                state.errMsg = action.payload;
            });
    },
});

export const { resetState } = workshopManagementSlice.actions;
export default workshopManagementSlice.reducer;
