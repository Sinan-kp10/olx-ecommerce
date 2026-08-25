import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Loading from "../component/loading/Loading"
import MyProductCard from "../component/product/MyProductCard"
import "./SellProducts.css"
import api from "../Service/api"
import type { ErrorResponse, Product } from "../types/productTypes"
import type { AxiosError } from "axios"


function SellProducts() {


    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const fetchProducts = async () => {

            try {
                setLoading(true)
                const response = await api.get("/sell")

                setProducts(response.data.products)

            } catch (error) {
                const err = error as AxiosError<ErrorResponse>

                toast.error(err.response?.data.message || "Failed to fetch products")

            }finally{
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    const handleProductDelete = (id: string) => {
        setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
    };

    return (
        <div className="sell-products-container">

            <div className="sell-products-header">
                <div className="sell-products-title-group">
                    <h1 className="sell-products-title">My Listed Products</h1>
                    <p className="sell-products-subtitle">Manage and track your active listings</p>
                </div>
                <Link to="/sell/product" className="sell-product-btn">
                    + Sell Product
                </Link>
            </div>

            <div>
                {loading && <Loading />}

                {!loading && products && products.length > 0 && (
                    <div className="my-products-grid">
                        {products.map((product) => (
                            <MyProductCard key={product._id} product={product} onDelete={handleProductDelete}/>
                        ))}
                    </div>
                )}

                {!loading && (!products || products.length === 0) && (
                    <div className="empty-products-wrapper">
                        <h3 className="empty-products-title">No Listings Yet</h3>
                    </div>
                )}

            </div>

        </div>
    )

}

export default SellProducts
