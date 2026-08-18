import { createSlice } from "@reduxjs/toolkit";
import type { ProductState } from "../../types/productTypes";
import { getProducts } from "./productThunk";

const initialState : ProductState = {
    products : [],
    loading : false,
    error : null
} 

const productSlice = createSlice({
    name : "product",
    initialState,
    reducers : {},

    extraReducers : (builder) => {

        builder.addCase(getProducts.pending, (state)=>{
            state.loading = true
            state.error = null
        })

        builder.addCase(getProducts.fulfilled, (state, action)=>{
            state.loading = false
            state.products = action.payload
          
        })

        builder.addCase(getProducts.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload as string || "Failed to fetch products"
        })
    }
})

export default productSlice.reducer