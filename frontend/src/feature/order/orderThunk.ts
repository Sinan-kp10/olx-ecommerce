import type { AxiosError } from "axios";
import type { ErrorResponse } from "../../types/authTypes";
import api from "../../Service/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const placeOrder = createAsyncThunk("order/placeOrder",async (_, { rejectWithValue }) => {

    try {

        const response = await api.post("/order/place");

        return response.data.order;

    } catch (error) {

        const err = error as AxiosError<ErrorResponse>;

        return rejectWithValue( err.response?.data.message || "Failed to place order")
    }
})