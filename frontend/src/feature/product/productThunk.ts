import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Service/api";
import type { ErrorResponse } from "../../types/productTypes";
import type { AxiosError } from "axios";



export const getProducts = createAsyncThunk("product/getProducts", async(_, {rejectWithValue})=>{
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

            formData.append("title", productData.title)
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

export const getMyProducts = createAsyncThunk("product/getMyProducts", async(_, {rejectWithValue})=>{
    try {
        
        const response = await api.get("/sell")

        return response.data.products

    } catch (error) {
        
        const err = error as AxiosError<ErrorResponse>

       return rejectWithValue(err.response?.data.message || "Failed to fetch products")
    }
})

export const updateProduct = createAsyncThunk("product/updateProduct",async ({ id,productData}:
    {id: string;
            productData: {
                title: string;
                description: string;
                price: number;
                category: string;
                image?: FileList;
            };
    },{ rejectWithValue }) => {

    try {

        const formData = new FormData()

        formData.append("title", productData.title)
        formData.append("description", productData.description)
        formData.append("price", String(productData.price))
        formData.append("category", productData.category)


        if (productData.image && productData.image.length > 0){
            formData.append("image",productData.image[0])
        }

        const response = await api.put(`/sell/product/${id}`,formData);

        return response.data.product

    } catch (error) {

        const err = error as AxiosError<ErrorResponse>;

        return rejectWithValue(
            err.response?.data.message ||
            "Failed to update product"
        );
    }
})

export const deleteProduct = createAsyncThunk("product/delete", async(id :string, {rejectWithValue})=>{
    try {

        const response = await api.delete(`/product/delete/${id}`)

        return response.data.product
        
    } catch (error) {
        
        const err = error as AxiosError<ErrorResponse>
        return rejectWithValue(err.response?.data.message || "Failed to delete product" )
    }
})