import { createSlice } from "@reduxjs/toolkit";
import type { ProductState } from "../../types/productTypes";
import { createProduct, deleteProduct, getMyProducts, getProducts } from "./productThunk";

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


        builder.addCase(createProduct.pending, (state) => {
            state.loading = true
            state.error = null
        });

        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false
            state.products.push(action.payload)
        });

        builder.addCase(createProduct.rejected, (state, action) => {
            state.loading = false
            state.error =action.payload as string ||"Failed to create product"
        })


        builder.addCase(getMyProducts.pending, (state) => {
            state.loading = true
            state.error = null
        })

        builder.addCase(getMyProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
        })

        builder.addCase(getMyProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string || "Failed to fetch your products";
        })


        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;

            state.products = state.products.filter(
                product => product._id !== action.payload._id
            )
        })

        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false
            state.error =action.payload as string || "Failed to delete product"
        })
    }
})

export default productSlice.reducer