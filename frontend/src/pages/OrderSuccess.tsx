import { useNavigate } from "react-router-dom";

function OrderSuccess() {

    const navigate = useNavigate();

    return (
        <div >

            <div >


                <h1>Order Placed Successfully!</h1>

                <p>
                    Your order has been placed successfully.
                </p>

                <button onClick={() => navigate("/")}>
                    Continue Shopping
                </button>

            </div>

        </div>
    );
}

export default OrderSuccess;