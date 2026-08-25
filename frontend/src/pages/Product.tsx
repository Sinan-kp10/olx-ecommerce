import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ProductCard from "../component/product/ProductCard"
import Loading from "../component/loading/Loading"
import "./Product.css"
import api from "../Service/api"
import type { AxiosError } from "axios"
import type { ErrorResponse, Product } from "../types/productTypes"


function Product(){


    const [category, setCategory] = useState("");
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)


    useEffect(()=>{

        const fetchProducts = async()=>{

           try {
                setLoading(true)
                const response = await api.get("/", {params : {category}})
                setProducts(response.data.products);
           } catch (error) {
                const err = error as AxiosError<ErrorResponse>
                
                toast.error(err.response?.data.message || "Failed to fetch products");
           }finally{
                setLoading(false)
           }

        }

        fetchProducts();

    },[category])


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