import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { useEffect } from "react"
import { getCart } from "../feature/cart/cartThunk"
import { toast } from "react-toastify"
import Loading from "../component/loading/Loading"

function Cart(){

    const dispatch = useDispatch<AppDispatch>()
    const {cart, loading} = useSelector((state : RootState)=> state.cart)

    useEffect(()=>{

        const fetchCart = async()=>{
            try {

                await dispatch(getCart()).unwrap()

                
            } catch (error) {
                toast.error(error as string)
                
            }
        }
        fetchCart()
    },[dispatch])

    const total = cart?.items.reduce((sum, item) => sum + item.product.price,0) ?? 0

    return(
        <>
            {loading && <Loading />}

            {!loading && (!cart || cart.items.length === 0) ? ( <h2>Your Cart is Empty</h2>) : (
                <>
                    <h1>My Cart</h1>

                    {cart?.items.map((item) => (

                        <div key={item.product._id}>
                            <img
                                src={item.product.image}
                                alt={item.product.title}
                            />

                            <div>
                                <h3>{item.product.title}</h3>

                                <p>{item.product.description}</p>

                                <strong>₹{item.product.price}</strong>
                            </div>
                        </div>
                    ))}

                    <h4>Free Delivary</h4>
                    <h2>Total: ₹{total}</h2>
                    
                    <button>Proceed to Checkout</button>
                </>
            )}

        
        </>
    )
}

export default Cart