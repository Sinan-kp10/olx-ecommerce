import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import type { ErrorResponse, Product } from "../types/productTypes"
import api from "../Service/api"
import type { AxiosError } from "axios"
import { toast } from "react-toastify"
import ProductInfo from "../component/product/ProductInfo"
import Loading from "../component/loading/Loading"


function ProductDetails(){

    const {id} = useParams()
    const navigate = useNavigate()

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

        <div className="product-details-page container">

            <button onClick={() => navigate(-1)} className="back-button">
                ← Back
            </button>

            {loading && <Loading />}

            {!loading && product && (
                <ProductInfo product={product} />
            )}

            {!loading && !product && (
                <p className="no-product-error">No product available</p>
            )}
        </div>
    )
}

export default ProductDetails