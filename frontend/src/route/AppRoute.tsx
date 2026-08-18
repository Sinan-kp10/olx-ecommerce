import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";

function AppRoute(){

    return(
        
        <BrowserRouter>

            <Routes>

                <Route element={<ProtectedRoute />}>
                
                
                </Route>

                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>


            </Routes>
        
        </BrowserRouter>
    )
}

export default AppRoute