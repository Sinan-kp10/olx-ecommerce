import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { useEffect } from "react"
import { getCart, removeFromCart } from "../feature/cart/cartThunk"
import { toast } from "react-toastify"
import Loading from "../component/loading/Loading"
import Swal from "sweetalert2"
import "./Cart.css"

function Cart() {

    const dispatch = useDispatch<AppDispatch>()
    const { cart, loading } = useSelector((state: RootState) => state.cart)

    useEffect(() => {

        const fetchCart = async () => {
            try {

                await dispatch(getCart()).unwrap()


            } catch (error) {
                toast.error(error as string)

            }
        }
        fetchCart()
    }, [dispatch])

    const handleRemove = async (productId: string) => {

        const result = await Swal.fire({
            title: "Remove product?",
            text: "Do you want to remove this product from your cart?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, remove it",
            cancelButtonText: "Cancel"
        });

        if (!result.isConfirmed) {
            return;
        }

        try {

            await dispatch(removeFromCart(productId)).unwrap();

            toast.success("Product removed from cart");

        } catch (error) {

            toast.error(error as string);
        }
    }

    const total = cart?.items.reduce((sum, item) => sum + item.product.price, 0) ?? 0

    return (
        <div className="cart-page-container">
            <h1>My Cart</h1>

            {loading && <Loading />}

            {!loading && (!cart || cart.items.length === 0) ? (
                <div className="cart-empty">
                    <h2>Your Cart is Empty</h2>
                </div>
            ) : (
                <div className="cart-layout">
                    <div className="cart-items-section">

                        <div className="cart-items-list">
                            {cart?.items.map((item) => (
                                <div key={item.product._id} className="cart-item">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.title}
                                        className="cart-item-image"
                                    />

                                    <div className="cart-item-info">
                                        <div>
                                            <h3>{item.product.title}</h3>
                                            <p>{item.product.description}</p>
                                        </div>
                                        <div className="cart-item-footer">
                                            <strong>₹{item.product.price}</strong>
                                            <button className="remove-btn" onClick={() => handleRemove(item.product._id)}>remove</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="cart-summary-section">
                        <div className="cart-summary-card">
                            <h3 className="summary-title">Order Summary</h3>
                            <div className="summary-items-list">
                                {cart?.items.map((item) => (
                                    <div key={item.product._id} className="summary-item-row">
                                        <span className="summary-item-name">{item.product.title}</span>
                                        <span className="summary-item-price">₹{item.product.price}</span>
                                    </div>
                                ))}
                            </div>
                            <hr className="summary-divider" />
                            <h2>Total: ₹{total}</h2>
                            <button className="checkout-btn">Proceed to Checkout</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart