import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { Navigate, Outlet } from "react-router-dom"
import Loading from "../component/loading/Loading"

function ProtectedRoute(){

    const {isAuthenticated, authInitialized} = useSelector((state : RootState)=> state.auth)

    if (!authInitialized) {
        return <Loading />
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default ProtectedRoute