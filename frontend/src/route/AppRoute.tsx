import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Product from "../pages/Product";
import ProtectedRoute from "./ProtectedRoute";

function AppRoute(){

    return(
        
        <BrowserRouter>

            <Routes>

                <Route element={<ProtectedRoute />}>
                
                
                </Route>

                <Route path="/" element={<Product />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>


            </Routes>
        
        </BrowserRouter>
    )
}

export default AppRoute