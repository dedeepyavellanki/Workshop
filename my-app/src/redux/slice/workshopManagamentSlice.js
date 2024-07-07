import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
export const workshopManagementLoginThunk=createAsyncThunk('workshopManagement-login',async(userCredObj,thunkApi)=>{
    try{
        const dbRes = await axios.post('http://localhost:5000/adminapi/login',userCredObj)
        if(dbRes.data.message==='login success'){
            localStorage.setItem('token',dbRes.data.token)
            return dbRes.data;
        }
        else{
            console.log(dbRes.data.message)
            return thunkApi.rejectWithValue(dbRes.data.message)
        }
    }
catch(err){
    return thunkApi.rejectWithValue(err)
}
})
export const workshopManagementSlice=createSlice({
    name:"workshopManagement-login",
    initialState:{
        isPending:false,
        loginUserStatus:false,
        currentUser:{},
        errorOccured:false,
        errMsg:''
    },
    reducers:{
        resetState:(state,action)=>{
            state.isPending=false
            state.loginUserStatus=false
            state.currentUser={}
            state.errorOccured=false
            state.errMsg=''
        }
    },
    extraReducers:builder=>builder
    .addCase(workshopManagementLoginThunk.pending,(state,action)=>{
        state.isPending=true;
    })
    .addCase(workshopManagementLoginThunk.fulfilled,(state,action)=>{
        state.isPending=false;
        state.currentUser=action.payload.user
        state.loginUserStatus=true
        state.errorOccured=false
        state.errMsg=''

    })
    .addCase(workshopManagementLoginThunk.rejected,(state,action)=>{
        state.isPending=false;
        state.currentUser={}
        state.loginUserStatus=false
        state.errorOccured=true
        state.errMsg=action.payload
    }),
})

export const {resetState}=workshopManagementSlice.actions
export default workshopManagementSlice.reducer;