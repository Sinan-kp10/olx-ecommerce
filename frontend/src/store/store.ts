import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authSlice";
import productReducer from "../feature/product/productSlice";
import cartReducer from "../feature/cart/cartSlice";


export const store = configureStore({
    reducer : {
        auth : authReducer,
        product : productReducer,
        cart : cartReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch