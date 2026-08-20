import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { logout } from "../../feature/auth/authThunk";
import { toast } from "react-toastify";
import "./Navbar.css";

function Navbar() {

    const { isAuthenticated } = useSelector((state: RootState) => state.auth)

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleClick = async () => {

        try {

            await dispatch(logout())
            navigate("/login")

        } catch (error) {

            toast.error(error as string);
        }

    }



    return (
        <nav className="navbar">
            <div className="navbar-container container">
                <Link to="/" className="navbar-brand">
                    <h4>OLX</h4>
                </Link>

                <div className="navbar-menu">
                    <Link to="/" className="navbar-link">Products</Link>
                    <Link to="/sell/product" className="navbar-link sell-link">Sell</Link>

                    {isAuthenticated ? (
                        <button className="navbar-btn logout-btn" onClick={handleClick}>Logout</button>
                    ) : (
                        <Link to="/login" className="navbar-btn login-btn">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;