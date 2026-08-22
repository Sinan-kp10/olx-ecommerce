import { Link } from "react-router-dom";
import type { Productprops } from "../../types/productTypes";
import "./ProductCard.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { addToCart } from "../../feature/cart/cartThunk";
import { toast } from "react-toastify";


function ProductCard({product} : Productprops){

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

        <div className="product-card">

            <Link to={`/product/${product._id}`} className="product-card-link">

                <div className="product-card-image-wrapper">
                    <img
                        className="product-card-image"
                        src={product.image}
                        alt={product.title}
                    />
                </div>

                <div className="product-card-info">
                    <h3 className="product-card-title">{product.title}</h3>
                    <p className="product-card-desc">{product.description}</p>
                    
                    <div className="product-card-footer">
                        <p className="product-card-price">₹{product.price}</p>
                        <span className="product-card-category">{product.category}</span>
                    </div>
                </div>
            </Link>
            <button onClick={handleAddToCart}>{loading ? "Adding" :"Add to Cart" }</button>

        </div>
    )
}

export default ProductCard