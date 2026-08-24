import { useEffect } from "react";
import "./Checkout.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../store/store";
import { getCart } from "../feature/cart/cartThunk";
import { placeOrder } from "../feature/order/orderThunk";
import Loading from "../component/loading/Loading";
import { toast } from "react-toastify";

function Checkout() {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { cart, loading: cartLoading } = useSelector((state: RootState) => state.cart)

    const { loading : orderLoading } = useSelector((state: RootState) => state.order)

    useEffect(() => {

        const fetchCart = async () => {

            try {
                await dispatch(getCart()).unwrap();
            } catch (error) {
                toast.error(error as string);
            }

        };

        fetchCart();

    }, [dispatch]);


    const handlePlaceOrder = async () => {

        try {

            await dispatch(placeOrder()).unwrap();

            toast.success("Order placed successfully!");

            navigate("/order-success")

        } catch (error) {

            toast.error(error as string);
        }
    };

    if (cartLoading) {
        return <Loading />;
    }

    if (!cart || cart.items.length === 0) {

        return (
            <div className="checkout-page empty">
                <div className="checkout-empty-card">
                    <h2>Your cart is empty</h2>

                    <button className="checkout-back-btn" onClick={() => navigate("/cart")}>
                        Go to Cart
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="checkout-page-container">

            <button onClick={() => navigate(-1)} className="back-button">
                ← Back
            </button>

            <h1>Checkout</h1>

            <div className="checkout-layout">

                <div className="checkout-items-section">
                    <div className="checkout-items-list">
                        {cart.items.map((item) => {
                            if (!item.product) return null;
                            return (
                                <div key={item.product._id} className="checkout-item">

                                    <img src={item.product.image} alt={item.product.title} className="checkout-item-image"/>

                                    <div className="checkout-item-info">
                                        <h3>{item.product.title}</h3>

                                        <p className="checkout-item-desc">
                                            {item.product.description}
                                        </p>

                                        <strong className="checkout-item-price">
                                            ₹{item.product.price?.toLocaleString("en-IN") ?? "0"}
                                        </strong>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="checkout-summary-section">
                    <div className="checkout-summary-card">
                        <h3 className="summary-title">Order Summary</h3>

                        <div className="summary-items-list">
                            {cart.items.map((item) => {
                                if (!item.product) return null;
                                return (
                                    <div key={item.product._id} className="summary-item-row">
                                        <span className="summary-item-name">{item.product.title}</span>
                                        <span className="summary-item-price">₹{item.product.price?.toLocaleString("en-IN") ?? "0"}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="summary-delivery-row">
                            <span>Delivery</span>
                            <span className="free-delivery-badge">Free</span>
                        </div>

                        <hr className="summary-divider" />

                        <h2 className="summary-total">
                            <span>Total:</span>
                            <span>₹{cart?.totalAmount?.toLocaleString("en-IN") ?? "0"}</span>
                        </h2>

                        <button className="place-order-btn" onClick={handlePlaceOrder} disabled={orderLoading}>
                            {orderLoading? "Placing Order..." : "Place Order"}
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Checkout;