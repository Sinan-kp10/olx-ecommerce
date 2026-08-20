import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { logout } from "../../feature/auth/authThunk";
import { toast } from "react-toastify";

function Navbar() {

    const { isAuthenticated } = useSelector((state: RootState) => state.auth)

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleClick = async ()=>{

        try {

            await dispatch(logout())
            navigate("/login")
            
        } catch (error) {

            toast.error(error as string);
        }

    }



    return (
        <nav>

            <h4>OLX</h4>

            <div>

                <Link to="/">Products</Link>

               
                    <Link to="/sell/product">
                        Sell
                    </Link>
                

                {isAuthenticated ? (
                    <button onClick={handleClick}>Logout</button>
                ) : (
                    <>
                        <Link to="/login">Login</Link>

                    </>
                )}

            </div>

        </nav>
    )
}

export default Navbar;