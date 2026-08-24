import { useDispatch, useSelector } from "react-redux";
import type { Productprops } from "../../types/productTypes";
import "./ProductInfo.css";
import type { AppDispatch, RootState } from "../../store/store";
import { addToCart } from "../../feature/cart/cartThunk";
import { toast } from "react-toastify";

function ProductInfo({product} : Productprops){

    const dispatch = useDispatch<AppDispatch>()
    const {loading} = useSelector((state : RootState)=> state.cart)

    const handleAddToCart = async()=>{

        try {

            await dispatch(addToCart(product._id)).unwrap()
            toast.success("Product added to cart")

        } catch (error) {
            toast.error(error as string)
            
        }
    }

    return(

        <div className="product-info-container">

            <div className="product-info-image-col">
                <img
                    className="product-info-image"
                    src={product.image}
                    alt={product.title}
                />
            </div>

            <div className="product-info-details-col">
                <h1 className="product-info-title">{product.title}</h1>
                <span className="product-info-category">{product.category}</span>
                <h2 className="product-info-price">₹{product.price?.toLocaleString("en-IN") ?? "0"}</h2>
                
                <div className="product-info-desc-section">
                    <h3>Description</h3>
                    <p className="product-info-desc">{product.description}</p>
                </div>

                <button onClick={handleAddToCart}>{loading ? "Adding" :"Add to Cart" }</button>
            </div>

        </div>

    )
}

export default ProductInfo