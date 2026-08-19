import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

function Navbar() {

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return (
        <nav>

            <h4>OLX</h4>

            <div>

                <Link to="/">Products</Link>

                {isAuthenticated && (
                    <Link to="/sell/product">
                        Sell
                    </Link>
                )}

                {isAuthenticated ? (
                    <button>Logout</button>
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