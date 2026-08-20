import { Link } from "react-router-dom";
import type { Productprops } from "../../types/productTypes";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { deleteProduct } from "../../feature/product/productThunk"
import Swal from "sweetalert2"

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
        <div>

            <img src={product.image} alt={product.title}width="200"/>

            <h2>{product.title}</h2>

            <p>{product.description}</p>

            <p>₹{product.price}</p>

            <p>{product.category}</p>

            <Link to={`/sell/product/edit/${product._id}`}>Edit</Link>
            <button onClick={handleDelete} disabled={loading}>{loading ? "Deleting..." : "Delete"}</button>

        </div>
    );
}

export default MyProductCard;