import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import type { AppDispatch, RootState } from "../store/store"
import { useEffect } from "react"
import { getMyProducts } from "../feature/product/productThunk"
import { toast } from "react-toastify"
import Loading from "../component/loading/Loading"
import MyProductCard from "../component/product/MyProductCard"
import "./SellProducts.css"


function SellProducts() {

    const dispatch = useDispatch<AppDispatch>()
    const { products, loading } = useSelector((state: RootState) => state.product)

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                await dispatch(getMyProducts()).unwrap()

            } catch (error) {

                toast.error(error as string)

            }
        }
        fetchProducts()
    }, [dispatch])

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
                            <MyProductCard key={product._id} product={product} />
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
