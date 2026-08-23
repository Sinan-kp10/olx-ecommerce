import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {

    const navigate = useNavigate();

    return (
        <div className="order-success-page">

            <div className="order-success-card">

                <div className="success-icon"></div>

                <h1>Order Placed Successfully!</h1>
                <p>Your order has been placed successfully.</p>

                <button className="continue-shopping-btn" onClick={() => navigate("/")}>
                    Continue Shopping
                </button>

            </div>

        </div>
    );
}

export default OrderSuccess;