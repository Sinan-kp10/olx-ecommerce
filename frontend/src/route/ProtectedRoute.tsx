import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute(){

    const {isAuthenticated, authInitialized} = useSelector((state : RootState)=> state.auth)

    if (!authInitialized) {
        return <h2>Checking authentication...</h2>;
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default ProtectedRoute