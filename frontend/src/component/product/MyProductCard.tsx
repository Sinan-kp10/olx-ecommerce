import { Link } from "react-router-dom";
import type { Productprops } from "../../types/productTypes";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { deleteProduct } from "../../feature/product/productThunk"
import Swal from "sweetalert2"
import "./MyProductCard.css"

function MyProductCard({ product }: Productprops) {

    const dispatch = useDispatch<AppDispatch>()
    const {loading} =useSelector((state : RootState)=> state.product)

    const handleDelete = async()=>{

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

            await dispatch(deleteProduct(product._id)).unwrap()

            await Swal.fire({
                title: "Deleted!",
                text: "Your product has been deleted.",
                icon: "success"
            })

            
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error as string,
                icon: "error"
            });
        }
    }

    return (
        <div className="my-product-card">

            <div className="my-product-card-image-wrapper">
                <img className="my-product-card-image" src={product.image} alt={product.title} />
            </div>

            <div className="my-product-card-info">
                <div className="my-product-card-header">
                    <p className="my-product-card-price">₹{product.price.toLocaleString("en-IN")}</p>
                    <span className="my-product-card-category">{product.category}</span>
                </div>

                <h2 className="my-product-card-title">{product.title}</h2>

                <p className="my-product-card-desc">{product.description}</p>

                <div className="my-product-card-actions">
                    {!product.isSold && (
                        <Link to={`/sell/product/edit/${product._id}`} className="my-product-card-edit-btn">Edit</Link>
                    )}

                    <button onClick={handleDelete} disabled={loading} className="my-product-card-delete-btn">
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>

        </div>
    );
}

export default MyProductCard;
