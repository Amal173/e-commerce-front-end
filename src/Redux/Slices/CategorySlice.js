import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    category: [],
    singleCategory:[],
    showDeleteConfirmationModal:false,
    showUpdateCategoryForm:false,
    showCreateCategoryForm:false,
};

export const fetchAsyncCategory = createAsyncThunk('category/fetchAsyncCategory', async () => {
    const response = await axios.get(`http://localhost:4040/categoryes`);
    console.log("response data get category", response);
    return response.data;
});

export const fetchAsyncOneCategory = createAsyncThunk('category/fetchAsyncOneCategory', async ({id}) => {
    const response = await axios.get(`http://localhost:4040/categoryes/${id}`);
    console.log("response data get one category", response);
    return response.data;
});


export const fetchAsyncCreateCategory = createAsyncThunk('category/fetchAsyncCreateCategory', async (data) => {
    const response = await axios.post(`http://localhost:4040/categoryes`,data);
    console.log("response data get category create", response);
    return response.data;
});


export const fetchAsyncDeleteCategory = createAsyncThunk('category/fetchAsyncDeleteCategory', async ({id}) => {
    const response = await axios.put(`http://localhost:4040/categoryes/delete/${id}`);
    console.log("response data get category delete", response);
    return response.data;
});


export const fetchAsyncUpdateCategory = createAsyncThunk('category/fetchAsyncUpdateCategory', async ({id,formData}) => {
   try {
    console.log(formData);
    const response = await axios.put(`http://localhost:4040/categoryes/${id.id}`,formData);
    console.log("response data get category update", response);
    return response.data;
   } catch (error) {
    console.error("Error updating category:", error.message);
    throw error;
   }
});


const categorySlice = createSlice({
    name: 'categoryes',
    initialState,
    reducers: {
        showDeleteConfirmationModal: (state,{payload}) => {
            state.showDeleteConfirmationModal = payload
        },
        toUpdateCategoryForm: (state,{payload}) => {
            state.showUpdateCategoryForm = payload
        },
        toCreateCategoryForm: (state,{payload}) => {
            state.showCreateCategoryForm = payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncCategory.fulfilled, (state, { payload }) => {
            state.category = payload;
        });
        builder.addCase(fetchAsyncOneCategory.fulfilled, (state, { payload }) => {
            state.singleCategory = payload;
        });
    },
});
export const {showDeleteConfirmationModal,toUpdateCategoryForm,toCreateCategoryForm} = categorySlice.actions;
export const getCategoryes = (state) => state.categoryes.category;
export const getCategoryesById = (state) => state.categoryes.singleCategory;
export const showDeleteConfirmation = (state) => state.categoryes.showDeleteConfirmationModal;
export const displayUpdateCategoryForm = (state) => state.categoryes.showUpdateCategoryForm;
export const displayCreateCategoryForm = (state) => state.categoryes.showCreateCategoryForm;
export default categorySlice.reducer;
