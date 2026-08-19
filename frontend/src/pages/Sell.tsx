import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellSchema } from "../validation/sellSchema";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { createProduct } from "../feature/product/productThunk";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


interface SellFormData {
    title: string;
    description: string;
    price: number;
    category: string;
    image: FileList;
}

function Sell() {

    const dispatch = useDispatch<AppDispatch>()

    const {loading} = useSelector((state : RootState)=> state.product)

    const {register, handleSubmit,formState: { errors }} = useForm<SellFormData>({resolver: zodResolver(sellSchema)});

    const naviagte = useNavigate()

    const onSubmit = async(data: SellFormData) => {
        
        try {

            await dispatch(createProduct(data)).unwrap()
            toast.success( "Product listed successfully!");
            naviagte("/")
            
        } catch (error) {
            
            toast.error(error as string)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <h1>Sell Product</h1>

            <input
                type="text"
                placeholder="Product title"
                {...register("title")}
            />
            <p>{errors.title?.message}</p>


            <textarea
                placeholder="Product description"
                {...register("description")}
            />
            <p>{errors.description?.message}</p>


            <input
                type="number"
                placeholder="Price"
                {...register("price", { valueAsNumber: true})}
            />
            <p>{errors.price?.message}</p>


            <input
                type="text"
                placeholder="Category"
                {...register("category")}
            />
            <p>{errors.category?.message}</p>


            <input
                type="file"
                accept="image/*"
                {...register("image")}
            />

            <p>{errors.image?.message}</p>


            <button type="submit" disabled={loading}>{loading ? "Listing product" : "Sell Product"}</button>

        </form>
    );
}

export default Sell