import { createSlice } from "@reduxjs/toolkit"
import { checkAuth, login, logout, signup } from "./authThunk"
import type { AuthState } from "../../types/authTypes"



const initialState : AuthState = {
    user : null,
    token : null,
    isAuthenticated : false,
    loading : false,
    authInitialized: false,
    error : null
}



const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {},

    extraReducers : (builder)=> {

        builder.addCase(login.pending, (state)=>{
            state.loading = true
            state.error = null
        })

        builder.addCase(login.fulfilled, (state, action)=> {
            state.loading = false
            state.token = action.payload.token
            state.user = action.payload.user
            state.isAuthenticated = true

        })

        builder.addCase(login.rejected, (state , action)=>{
            state.loading = false
            state.error = action.payload as string|| "Login failed"

        })



        builder.addCase(signup.pending, (state)=> {
            state.loading = true
            state.error = null
        })
         builder.addCase(signup.fulfilled, (state)=> {
            state.loading = false
            state.error = null

        })

        builder.addCase(signup.rejected, (state , action)=>{
            state.loading = false
            state.error = action.payload as string|| "Signup failed"

        })


        builder.addCase(checkAuth.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(checkAuth.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.authInitialized = true;
        });

        builder.addCase(checkAuth.rejected, (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.authInitialized = true;
        });

        builder.addCase(logout.fulfilled, (state) => {

            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;

        });
    
    }
})

export default authSlice.reducer