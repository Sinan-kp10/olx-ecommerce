import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authSlice";
import productReducer from "../feature/product/productSlice";
import cartReducer from "../feature/cart/cartSlice";
import orderReducer from "../feature/order/orderSlice";


export const store = configureStore({
    reducer : {
        auth : authReducer,
        product : productReducer,
        cart : cartReducer,
        order: orderReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch