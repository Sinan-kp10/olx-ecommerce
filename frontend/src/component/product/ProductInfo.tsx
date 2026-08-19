import type { Productprops } from "../../types/productTypes";

function ProductInfo({product} : Productprops){

    return(

        <div>

            <img
                src={product.image}
                alt={product.title}
                width="300"
            />

            <h1>{product.title}</h1>

            <p>{product.description}</p>

            <h2>₹{product.price}</h2>

            <p>
                Category: {product.category}
            </p>

        </div>

    )
}

export default ProductInfo