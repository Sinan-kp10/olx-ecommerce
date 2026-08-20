import type { Productprops } from "../../types/productTypes";
import "./ProductInfo.css";

function ProductInfo({product} : Productprops){

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
                <h2 className="product-info-price">₹{product.price}</h2>
                
                <div className="product-info-desc-section">
                    <h3>Description</h3>
                    <p className="product-info-desc">{product.description}</p>
                </div>
            </div>

        </div>

    )
}

export default ProductInfo