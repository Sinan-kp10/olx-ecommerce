import {  createAsyncThunk } from "@reduxjs/toolkit"
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