import { Link } from "react-router-dom";
import type { Productprops } from "../../types/productTypes";

function MyProductCard({ product }: Productprops) {

    return (
        <div>

            <img src={product.image} alt={product.title}width="200"/>

            <h2>{product.title}</h2>

            <p>{product.description}</p>

            <p>₹{product.price}</p>

            <p>{product.category}</p>

            <Link to={`/sell/product/edit/${product._id}`}>Edit</Link>

        </div>
    );
}

export default MyProductCard;