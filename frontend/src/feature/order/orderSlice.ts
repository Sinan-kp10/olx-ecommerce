import { createSlice } from "@reduxjs/toolkit";
import { placeOrder } from "./orderThunk";

interface OrderState {
    order: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    order: null,
    loading: false,
    error: null
}

const orderSlice = createSlice({
    name: "order",
    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder.addCase(placeOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(placeOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload;
        });

        builder.addCase(placeOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string ||"Failed to place order"
        })
    }
});

export default orderSlice.reducer;