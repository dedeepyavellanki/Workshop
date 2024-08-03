import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const workshopManagementLoginThunk = createAsyncThunk(
  'workshopManagement/login',
  async (userCredObj, thunkApi) => {
    try {
      const res = await axios.post(
        'http://localhost:4000/admin-api/login',
        userCredObj
      );
      if (res.data.message === 'login success') {
        // Store token in local storage
        localStorage.setItem('token', res.data.token);

        // Return the user data
        return res.data;
      } else {
        return thunkApi.rejectWithValue(res.data.message);
      }
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const workshopManagementSlice = createSlice({
  name: 'workshopManagement',
  initialState: {
    loginUserStatus: false,
    currentUser: null,
    errorOccurred: false,
    errMsg: '',
  },
  reducers: {
    resetState: (state) => {
      state.loginUserStatus = false;
      state.currentUser = null;
      state.errorOccurred = false;
      state.errMsg = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(workshopManagementLoginThunk.fulfilled, (state, action) => {
        state.loginUserStatus = true;
        state.currentUser = action.payload;
        state.errorOccurred = false;
        state.errMsg = '';
      })
      .addCase(workshopManagementLoginThunk.rejected, (state, action) => {
        state.loginUserStatus = false;
        state.errorOccurred = true;
        state.errMsg = action.payload || 'Login failed';
      });
  },
});

export const { resetState } = workshopManagementSlice.actions;
export default workshopManagementSlice.reducer;
