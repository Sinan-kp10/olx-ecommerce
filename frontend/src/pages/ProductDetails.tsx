import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { ErrorResponse, Product } from "../types/productTypes"
import api from "../Service/api"
import type { AxiosError } from "axios"
import { toast } from "react-toastify"
import ProductInfo from "../component/product/ProductInfo"
import Loading from "../component/product/loading/Loading"

function ProductDetails(){

    const {id} = useParams()

    const [product, setProduct] = useState<Product | null>(null)

    const [loading, setLoading] = useState(true)

    useEffect(()=>{

        const fetchProduct =  async()=>{

            try {
                const response = await api.get(`/product/${id}`)

                setProduct(response.data.product)
                
            } catch (error) {
                const err = error as AxiosError<ErrorResponse>

                toast.error(err.response?.data.message ||   "Failed to load product")
            }finally{

                setLoading(false)
            }
        }
        fetchProduct()
    },[id])

    return(

        <>

            {loading && <Loading />}

            {!loading && product && (
                <ProductInfo product={product} />
            )}

            {!loading && !product && (
                <p>No product available</p>
            )}
        </>
    )
}