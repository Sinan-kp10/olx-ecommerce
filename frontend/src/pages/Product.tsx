import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { useEffect } from "react"
import { getProducts } from "../feature/product/productThunk"
import { toast } from "react-toastify"
import ProductCard from "../component/product/ProductCard"
import Loading from "../component/loading/Loading"
import { Link } from "react-router-dom"


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
            <Link to="/sell/product">clisck</Link>

            {loading && <Loading />}

            {!loading && (products.length === 0 ? (<h2>No products available</h2>) : (

                products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))
            ))}
        </>
    )
}

export default Product