import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import type { AppDispatch, RootState } from "../store/store"
import { useEffect } from "react"
import { getMyProducts } from "../feature/product/productThunk"
import { toast } from "react-toastify"
import Loading from "../component/loading/Loading"
import ProductCard from "../component/product/ProductCard"
import type { Product } from "../types/productTypes"

function SellProducts(){

    const dispatch = useDispatch<AppDispatch>()
    const {products,loading} =useSelector((state : RootState)=> state.product)

    useEffect(()=>{

        const fetchProducts = async()=>{

            try {

                await dispatch(getMyProducts()).unwrap()
                
            } catch (error) {

                toast.error(error as string)
                
            }
        }
        fetchProducts()
    },[dispatch])

    return(
        <>

            <Link to="/sell/product">+ Sell Product</Link>

            <div>
                {loading && <Loading />}

                {!loading && products && (products.map((product)=> (
                    <ProductCard key={product._id} product={product} />
                )))}

                {!loading && !products && (<h4>No Products Available</h4>)}

            </div>


        </>
    )
     
}

export default SellProducts