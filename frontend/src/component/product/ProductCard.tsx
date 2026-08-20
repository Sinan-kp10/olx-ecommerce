import { Link } from "react-router-dom";
import type { Productprops } from "../../types/productTypes";
import "./ProductCard.css";


function ProductCard({product} : Productprops){

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

        </div>
    )
}

export default ProductCard