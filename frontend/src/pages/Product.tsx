import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { useEffect, useState } from "react"
import { getProducts } from "../feature/product/productThunk"
import { toast } from "react-toastify"
import ProductCard from "../component/product/ProductCard"
import Loading from "../component/loading/Loading"
import "./Product.css"


function Product(){

    const dispatch = useDispatch<AppDispatch>()

    const {products, loading}  = useSelector((state : RootState)=> state.product)
    const [category, setCategory] = useState("");

    useEffect(()=>{

        const fetchProducts = async()=>{

           try {
                await dispatch(getProducts(category || undefined)).unwrap()
           } catch (error) {
                toast.error(error as string);
           }

        }

        fetchProducts();

    },[dispatch, category])


    return (
        <div className="products-page-container container">
            {loading && <Loading />}

            {!loading && (
                <>
                    <div className="products-header-section">
                        <h2 className="products-section-title">Fresh Recommendations</h2>
                        <div className="filter-wrapper">
                            <select className="category-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">All Categories</option>
                                <option value="Mobiles">Mobiles</option>
                                <option value="Laptops">Laptops</option>
                                <option value="Cars">Cars</option>
                                <option value="Bikes">Bikes</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {products.length === 0 ? (
                        <div className="no-products-container">
                            <h2 className="no-products">No products available</h2>
                        </div>
                    ) : (
                        <div className="products-grid"> 
                            {products.map((product) => (<ProductCard key={product._id} product={product}/> ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Product