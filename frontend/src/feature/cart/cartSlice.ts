import { createSlice } from "@reduxjs/toolkit";
import type { Cart } from "../../types/cartTypes";
import { addToCart, getCart, removeFromCart } from "./cartThunk";


interface CartState {
    cart: Cart | null;
    loading: boolean;
    error: string | null;
}


const initialState: CartState = {
    cart: null,
    loading: false,
    error: null
}


const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder.addCase(getCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(getCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
        });

        builder.addCase(getCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || "Failed to fetch cart";
        })


        builder.addCase(addToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload
        })

        builder.addCase(addToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || "Failed to add product to cart";
        })

        builder.addCase(removeFromCart.pending, (state) => {
            state.loading = true
            state.error = null
        });

        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            state.loading = false
            state.cart = action.payload
        })

        builder.addCase(removeFromCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || "Failed to remove product";
        })
    }
});


export default cartSlice.reducer;