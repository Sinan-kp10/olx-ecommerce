import { Link } from "react-router-dom";
import type { ErrorResponse, MyProductCardProps } from "../../types/productTypes";
import Swal from "sweetalert2"
import "./MyProductCard.css"
import api from "../../Service/api";
import { useState } from "react";
import type { AxiosError } from "axios";

function MyProductCard({ product , onDelete}: MyProductCardProps) {

    const [loading, setLoading] = useState(false)

    const handleDelete = async(id : string)=>{

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to recover this product!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        })

        if (!result.isConfirmed) {
            return
        }

        try {
            setLoading(true)

            await api.delete(`/product/delete/${id}`)
            onDelete(id)
            await Swal.fire({
                title: "Deleted!",
                text: "Your product has been deleted.",
                icon: "success"
            })

            
        } catch (error) {
            const err = error as AxiosError<ErrorResponse>
            Swal.fire({
                title: "Error",
                text: err.response?.data.message || "Failed to delete product",
                icon: "error"
            });
        }finally {
            setLoading(false)
        }
    }

    return (
        <div className={`my-product-card ${product.isSold ? "sold" : ""}`}>

            <div className="my-product-card-image-wrapper">
                <img className="my-product-card-image" src={product.image} alt={product.title} />
                {product.isSold && (
                    <span className="my-product-card-sold-badge">Sold</span>
                )}
            </div>

            <div className="my-product-card-info">
                <div className="my-product-card-header">
                    <p className="my-product-card-price">₹{product.price?.toLocaleString("en-IN") ?? "0"}</p>
                    <span className="my-product-card-category">{product.category}</span>
                </div>

                <h2 className="my-product-card-title">{product.title}</h2>

                <p className="my-product-card-desc">{product.description}</p>

                <div className="my-product-card-actions">
                    {!product.isSold && (
                        <Link to={`/sell/product/edit/${product._id}`} className="my-product-card-edit-btn">Edit</Link>
                    )}

                    <button onClick={()=>handleDelete(product._id)} disabled={loading} className="my-product-card-delete-btn">
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>

        </div>
    );
}

export default MyProductCard;
