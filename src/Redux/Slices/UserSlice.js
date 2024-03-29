import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: false,
    userInfo: {},
    userToken: null,
    error: null,
    success: false,
    user:[],
    users:[],
    cart:[],
    userOrder:[],
    orderDetails:[],
    orderDetailsById:[],
    allOrders:[],

};



export const fetchAsyncUsersLogin = createAsyncThunk('users/fetchAsyncUsersLogin', async (data) => {
    const response = await axios.post(`http://localhost:4040/user/login`, data);
    console.log("response data get user login", response);
    localStorage.setItem('userToken', response.data.token)
    localStorage.setItem('userData', response.data.user._id)
    return response.data;
});


export const fetchAsyncUserRegister = createAsyncThunk('users/fetchAsyncUserRegister', async (data) => {
    const response = await axios.post(`http://localhost:4040/user`, data);
    console.log("response data get user register", response);
    return response.data;
});


export const fetchAsyncAddUserCart = createAsyncThunk('users/fetchAsyncAddUserCart', async ({id,productId}) => {
    console.log(id,productId);
    const response = await axios.put(`http://localhost:4040/user/cart/${id}`, {id:productId});
    console.log("response data add user cart", response);
    return response.data;
});

export const fetchAsyncRemoveCartProducts = createAsyncThunk('users/fetchAsyncRemoveCartProducts', async ({id,productId}) => {
    console.log(id,productId);
    const response = await axios.put(`http://localhost:4040/user/cart/products/delete/${id}`, {productId:productId});
    console.log("response data add user cart", response);
    return response.data;
});

export const fetchAsyncUserData = createAsyncThunk('users/fetchAsyncUserData', async (id) => {
    const response = await axios.get(`http://localhost:4040/user/${id}`, );
    console.log("response data get user data", response);
    return response.data;
});
export const fetchAsyncUser = createAsyncThunk('users/fetchAsyncUser', async (id) => {
    const response = await axios.get(`http://localhost:4040/user`, );
    console.log("response data get user", response);
    return response.data;
});

export const fetchAsyncUserCartProducts = createAsyncThunk('users/fetchAsyncUserCartProducts', async (id) => {
    const response = await axios.get(`http://localhost:4040/user/cart/products/${id}`, );
    console.log("response data get user cart product", response);
    return response.data;
});


export const fetchAsyncUserCheckoutCart = createAsyncThunk('users/fetchAsyncUserCheckoutCart', async ({cartItems,userId,totalPrice}) => {
   try {
    const response = await axios.post(`http://localhost:4040/order/create-checkout-session`, {cartItems,userId,totalPrice});
    console.log("response data get user cart checkout", response.data);
    if(response.data.url){
        window.location.href=response.data.url
       
    }
    return response.data;
   } catch (error) {
    console.log(error.message);
   }
});

export const fetchAsyncRetrieveSession = createAsyncThunk('users/fetchAsyncRetrieveSession', async (id) => {
    console.log(id);
   try {
    const response = await axios.get(`http://localhost:4040/stripe/retrive-checkout-session/${id}`,);
    console.log("response data get session ", response.data);
    return response.data;
   } catch (error) {
    console.log(error.message);
   }
});

export const fetchAsyncUserOrders = createAsyncThunk('users/fetchAsyncUserOrders', async (id) => {
    const response = await axios.get(`http://localhost:4040/order/userOrder/${id}`, );
    console.log("response data get user order", response);
    return response.data;
});

export const fetchAsyncOrderDetails = createAsyncThunk('users/fetchAsyncOrderDetails', async (id) => {
    const response = await axios.get(`http://localhost:4040/order/Order-details/${id}`, );
    console.log("response data get user order details", response);
    return response.data;

});

export const fetchAsyncAllOrders = createAsyncThunk('users/fetchAsyncAllOrders', async () => {
    const response = await axios.get(`http://localhost:4040/order/getOrder`, );
    console.log("response data get user order", response);
    return response.data;
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userToken') 
            state.loading = false
            state.userInfo = null
            state.userToken = null
            state.error = null
          },
          setCredentials: (state, { payload }) => {
            state.userInfo = payload
          },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncUserRegister.pending, (state) => {
            state.loading = true
            state.error = null
        });
        builder.addCase(fetchAsyncUserRegister.fulfilled, (state) => {
            state.loading = false
            state.success = true
        });
        builder.addCase(fetchAsyncUserRegister.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        });
        builder.addCase(fetchAsyncUsersLogin.pending, (state) => {
            state.loading = true
            state.error = null
        });
        builder.addCase(fetchAsyncUsersLogin.fulfilled, (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
            state.userToken = payload.token
        });
        builder.addCase(fetchAsyncUsersLogin.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        });
        builder.addCase(fetchAsyncUserData.fulfilled, (state, { payload }) => {
            state.loading = false
            state.user = payload
        });
        builder.addCase(fetchAsyncUserCartProducts.fulfilled, (state, { payload }) => {
            state.loading = false
            state.cart = payload
        });
        builder.addCase(fetchAsyncUserOrders.fulfilled, (state, { payload }) => {
            state.loading = false
            state.userOrder = payload
        });
        builder.addCase(fetchAsyncRetrieveSession.fulfilled, (state, { payload }) => {
            state.loading = false
            state.orderDetails = payload
        });
        builder.addCase(fetchAsyncAllOrders.fulfilled, (state, { payload }) => {
            state.loading = false
            state.allOrders = payload
        });
        builder.addCase(fetchAsyncOrderDetails.fulfilled, (state, { payload }) => {
            state.loading = false
            state.orderDetailsById = payload
        });
        builder.addCase(fetchAsyncUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.users = payload
        });


    },
});




export const { logout, setCredentials } = userSlice.actions
export default userSlice.reducer;
