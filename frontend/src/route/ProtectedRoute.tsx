import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute(){

    const isAuthenticated = useSelector((state : RootState)=> state.auth.isAuthenticated)

    console.log("ProtectedRoute auth:", isAuthenticated);

    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default ProtectedRoute