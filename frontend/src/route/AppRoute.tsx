import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Product from "../pages/Product";
import ProtectedRoute from "./ProtectedRoute";
import ProductDetails from "../pages/ProductDetails";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import type { AppDispatch } from "../store/store";
import { checkAuth } from "../feature/auth/authThunk";
import MainLayout from "../component/layout/MainLayout";
import SellProducts from "../pages/SellProducts";
import AddEditProduct from "../pages/AddEditProduct";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";


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
                    <Route path="/product/:id" element={<ProductDetails />}></Route>

                    <Route element={<ProtectedRoute />}>
                
                        <Route path="/sell" element={<SellProducts />}></Route>
                        <Route path="/sell/product" element={<AddEditProduct />}></Route>
                        <Route path="/sell/product/edit/:id" element={<AddEditProduct />}/>
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-success" element={<OrderSuccess />} />



                    </Route>


                </Route>

                

                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>


            </Routes>
        
        </BrowserRouter>
    )
}

export default AppRoute