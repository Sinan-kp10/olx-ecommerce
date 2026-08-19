import { Link } from "react-router-dom";
import type { Productprops } from "../../types/productTypes";


function ProductCard({product} : Productprops){

    return(

        <div>

            <Link to={`/product/${product._id}`}>

                <img
                    src={product.image}
                    alt={product.title}
                    width="200"
                />

                <h2>{product.title}</h2>

            </Link>

            <p>{product.description}</p>

            <p>₹{product.price}</p>

            <p>{product.category}</p>

        </div>
    )
}

export default ProductCard