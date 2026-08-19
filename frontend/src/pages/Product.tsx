import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { useEffect } from "react"
import { getProducts } from "../feature/product/productThunk"
import { toast } from "react-toastify"
import ProductCard from "../component/product/ProductCard"
import Loading from "../component/loading/Loading"


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
            {loading && <Loading />}

            {!loading && (products.length === 0 ? (<h2>No products available</h2>) : (

                products.map((product) => (
                    <ProductCard  product={product} />
                ))
            ))}
        </>
    )
}

export default Product