import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Service/api";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "../../types/productTypes";
import type { Cart } from "../../types/cartTypes";


export const getCart = createAsyncThunk("cart/getCart",async (_, { rejectWithValue }) => {

    try {

        const response = await api.get("/cart");

        return response.data.cart as Cart;

    } catch (error) {

        const err = error as AxiosError<ErrorResponse>;

        return rejectWithValue(err.response?.data.message || "Failed to fetch cart")
    }
})

export const addToCart = createAsyncThunk("cart/addToCart",async (productId: string, { rejectWithValue }) => {

    try {

        const response = await api.post(`/cart/add/${productId}`);

        return response.data.cart;

    } catch (error) {

        const err = error as AxiosError<ErrorResponse>;

        return rejectWithValue( err.response?.data.message ||"Failed to add product to cart")
    }
})