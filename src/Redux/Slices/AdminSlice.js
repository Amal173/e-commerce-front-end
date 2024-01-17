import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    admin: {},
    adminAuthToken:''
}

export const fetchAsyncAdmin = createAsyncThunk('admin/fetchAsyncAdmin', async () => {
    const response = await axios.get(`http://localhost:4040/admin`)
    console.log("response data get admin", response);
    return response.data
})


export const fetchAsyncAdminLogin = createAsyncThunk('admin/fetchAsyncAdminLogin', async (data) => {
    try {
        
        const response = await axios.post(`http://localhost:4040/admin/login`,data)
        console.log("response data login admin", response);
        return response.data
    } catch (error) {
        console.log("response data login admin", error);
        
    }
})


const adminSlice = createSlice({
    name: 'admins',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncAdmin.fulfilled, (state, { payload }) => {
            state.admin = payload
        })
        builder.addCase(fetchAsyncAdminLogin.fulfilled, (state, { payload }) => {
            state.adminAuthToken = payload
        })

    }
})

// export const { } = adminSlice.actions
export const getAdmin = (state) => state.admins.admin;
export const getAdminToken = (state) => state.admins.adminAuthToken;
export default adminSlice.reducer