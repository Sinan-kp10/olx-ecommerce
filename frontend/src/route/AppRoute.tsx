import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Product from "../pages/Product";
import ProtectedRoute from "./ProtectedRoute";
import ProductDetails from "../pages/ProductDetails";
import Sell from "../pages/Sell";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import type { AppDispatch } from "../store/store";
import { checkAuth } from "../feature/auth/authThunk";
import MainLayout from "../component/layout/MainLayout";



function AppRoute(){

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(checkAuth())

    }, [dispatch])

    return(
        
        <BrowserRouter>

            <Routes>

                <Route element={<MainLayout />}>
                    <Route path="/" element={<Product />}></Route>

                </Route>

                <Route element={<ProtectedRoute />}>
                
                    <Route path="/sell/product" element={<Sell />}></Route>

                </Route>

                <Route path="/product/:id" element={<ProductDetails />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>


            </Routes>
        
        </BrowserRouter>
    )
}

export default AppRoute