import { useEffect } from "react";
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
            <div className="checkout-page">

                <h2>Your cart is empty</h2>

                <button onClick={() => navigate("/cart")}>
                    Go to Cart
                </button>

            </div>
        )
    }

    return (
        <div className="checkout-page">

            <h1>Checkout</h1>

            <div >

                {cart.items.map((item) => (

                    <div key={item.product._id}>

                        <img
                            src={item.product.image}
                            alt={item.product.title}
                        />

                        <div>
                            <h3>{item.product.title}</h3>

                            <p>
                                {item.product.category}
                            </p>

                            <strong>
                                ₹{item.product.price}
                            </strong>
                        </div>

                    </div>

                ))}

            </div>

            <div >

                <h2>
                    Total: ₹{cart?.totalAmount}
                </h2>

                <button
                    onClick={handlePlaceOrder}
                    disabled={orderLoading}
                >
                    {orderLoading
                        ? "Placing Order..."
                        : "Place Order"}
                </button>

            </div>

        </div>
    )
}

export default Checkout;