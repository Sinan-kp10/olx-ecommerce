import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { useEffect } from "react"
import { getProducts } from "../feature/product/productThunk"
import { toast } from "react-toastify"

function Product(){

    const dispatch = useDispatch<AppDispatch>()

    const {products, loading}  = useSelector((state : RootState)=> state.product)

    useEffect(()=>{

        const fetchProducts = async()=>{

           try {
                await dispatch(getProducts()).unwrap()
           } catch (error) {
                toast.error(error as string);
           }

        }

        fetchProducts();

    },[dispatch])


    return(
        <>
            {loading && <h1>Loading.....</h1>}
            {!loading && (products.length === 0 ? (<p>No products available</p>) : (
                products.map((product)=> (
                    <div key={product._id}>

                        <img
                        src={product.image}
                        alt={product.title}
                        width="200"
                        />

                        <h2>{product.title}</h2>

                        <p>{product.description}</p>

                        <p>₹{product.price}</p>

                        <p>{product.category}</p>

                    </div>
                )))
            )}
        </>
    )
}

export default Product