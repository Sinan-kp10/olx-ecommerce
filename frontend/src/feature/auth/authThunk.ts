import {  createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit"
import api from "../../Service/api"
import {AxiosError} from "axios";
import type { ErrorResponse} from "../../types/authTypes";

export const login = createAsyncThunk("/auth/login", async (loginData : {email : string; password : string}, {rejectWithValue}) => {

    try {

        const response = await api.post("/login", loginData)

        return response.data
        
    } catch (error) {
        
        const err = error as AxiosError<ErrorResponse>
        return rejectWithValue(err.response?.data.message)

    }
})

export const signup = createAsyncThunk("/auth/singup" , async(signupData : {name : string; email : string; password : string; confirmPassword : string }, {rejectWithValue})=>{

    try {

        const response = await api.post("/signup", signupData)

        return response.data
        
    } catch (error) {

        const err =  error as AxiosError<ErrorResponse>
        return rejectWithValue(err.response?.data.message)
        
    }
} )

export const checkAuth = createAsyncThunk("auth/checkAuth",async (_, { rejectWithValue }) => {

    try {

        const response = await api.get("/me");

        return response.data.user

    } catch (error) {

        const err = error as AxiosError<ErrorResponse>;

        return rejectWithValue(
            err.response?.data.message || "Not authenticated"
        );
    }
})

export const logout = createAsyncThunk("auth/logout", async (_, {rejectWithValue})=> {

    try {

        const responce = await api.post("/logout")

        return responce.data
        
    } catch (error) {
        
        const err = error as AxiosError<ErrorResponse>;

        return rejectWithValue(
            err.response?.data.message || "Logout failed"
        );
    }
})
