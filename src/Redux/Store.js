import { configureStore } from "@reduxjs/toolkit";
import adminsReducer from './Slices/AdminSlice'
import categoryReducer from './Slices/CategorySlice'
import productReducer from './Slices/ProductSlice'
import userReducers from './Slices/UserSlice'
const store = configureStore({
    reducer: {
      admins: adminsReducer,
      categoryes: categoryReducer,
      products: productReducer,
      users: userReducers,
    },
  });
  
  export default store;