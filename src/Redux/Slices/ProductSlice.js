import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    product: [],
    singleProduct:[],
    deleteWarningModal:false,
    CreateProductsForm:false,
    UpdateProductsForm:false,
};

export const fetchAsyncProducts = createAsyncThunk('product/fetchAsyncProducts', async (id) => {
    const response = await axios.get(`http://localhost:4040/products?id=${id}`);
    console.log("response data get product", response);
    return response.data;
});


export const fetchAsyncProductsById = createAsyncThunk('product/fetchAsyncProductsById', async (id) => {
    const response = await axios.get(`http://localhost:4040/products/${id}`);
    console.log("response data get by id product", response);
    return response.data;
});


export const fetchAsyncCreateProducts = createAsyncThunk('product/fetchAsyncCreateProducts', async (data) => {
    const response = await axios.post(`http://localhost:4040/products`,data);
    console.log("response data create product", response);
    return response.data;
});


export const fetchAsyncDeleteProducts = createAsyncThunk('product/fetchAsyncDeleteProducts', async (id) => {
    const response = await axios.put(`http://localhost:4040/products/delete/${id}`);
    console.log("response data delete product", response);
    return response.data;
});


export const fetchAsyncUpdateProducts = createAsyncThunk('product/fetchAsyncUpdateProducts', async ({id,formData}) => {
    console.log("id of the product",formData);
    const response = await axios.put(`http://localhost:4040/products/${id}`,formData);
    console.log("response data update product", response);
    return response.data;
});


const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        showdeleteWarningModal:(state ,{payload})=>{
            state.deleteWarningModal=payload
        },
        showCreateProductsForm:(state ,{payload})=>{
            state.CreateProductsForm=payload
        },
        showUpdateProductsForm:(state ,{payload})=>{
            state.UpdateProductsForm=payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncProducts.fulfilled, (state, { payload }) => {
            state.product = payload;
        });
        builder.addCase(fetchAsyncProductsById.fulfilled, (state, { payload }) => {
            state.singleProduct = payload;
        });
    },
});


export const {showdeleteWarningModal,showCreateProductsForm,showUpdateProductsForm}=productSlice.actions;
export const getProducts = (state) => state.products.product;
export const getProductById = (state) => state.products.singleProduct;
export const DisplayProductDeleteModal = (state) => state.products.deleteWarningModal;
export const DisplayCreateProductsForm = (state) => state.products.CreateProductsForm;
export const DisplayUpdateProductsForm = (state) => state.products.UpdateProductsForm;
export default productSlice.reducer;
