import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Service/api";
import type { ErrorResponse } from "../../types/productTypes";
import type { AxiosError } from "axios";



export const getProducts = createAsyncThunk("product/getProduct", async(_, {rejectWithValue})=>{
    try {
        
        const response = await api.get("/")

        return response.data.products

    } catch (error) {
        
        const err = error as AxiosError<ErrorResponse>

       return rejectWithValue(err.response?.data.message || "Failed to fetch products")
    }
})

export const createProduct = createAsyncThunk("product/createProduct", async(
    productData: { title: string; description: string; price: number;category: string; image: FileList; },{ rejectWithValue })=>{

        try {

            const formData = new FormData()

            formData.append("description", productData.description);
            formData.append("price",productData.price.toString());
            formData.append("category",productData.category);
            formData.append("image",productData.image[0]);

            const response = await api.post("/sell/product", formData)

            return response.data.product
        
            
        } catch (error) {
            const err = error as AxiosError<ErrorResponse>

            return rejectWithValue(err.response?.data.message || "Failed to create product")
        }

})