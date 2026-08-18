import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../Service/api";
import type { AxiosError } from "axios";

interface ErrorResponse {
    success: boolean;
    message: string;
}

export const getProducts = createAsyncThunk("/product/getProduct", async(_, {rejectWithValue})=>{
    try {
        
        const response = await api.get("/")

        return response.data

    } catch (error) {
        
        const err = error as AxiosError<ErrorResponse>

       return rejectWithValue(err.response?.data.message || "Failed to fetch products")
    }
})