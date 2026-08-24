import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

function PublicRoute() {

    const { user, loading } = useSelector((state: RootState) => state.auth)

    if (loading) {
        return null;
    }

    if (user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default PublicRoute;