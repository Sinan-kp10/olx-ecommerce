import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Product from "../pages/Product";
import ProtectedRoute from "./ProtectedRoute";
import ProductDetails from "../pages/ProductDetails";
import Sell from "../pages/Sell";

function AppRoute(){

    return(
        
        <BrowserRouter>

            <Routes>

                <Route element={<ProtectedRoute />}>
                
                    <Route path="/sell/product" element={<Sell />}></Route>

                </Route>

                <Route path="/" element={<Product />}></Route>
                <Route path="/product/:id" element={<ProductDetails />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>


            </Routes>
        
        </BrowserRouter>
    )
}

export default AppRoute