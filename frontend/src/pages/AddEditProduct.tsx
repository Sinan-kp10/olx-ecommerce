import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { createProduct, updateProduct } from "../feature/product/productThunk";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEditProduct.css";
import {  AddProductSchema, EditProductSchema } from "../validation/sellSchema";
import api from "../Service/api";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "../types/authTypes";


interface AddEditProductFormData {
    title: string;
    description: string;
    price: number;
    category: string;
    image?: FileList;
}

function AddEditProduct() {

    const dispatch = useDispatch<AppDispatch>()

    const { loading } = useSelector((state: RootState) => state.product)
    const {id} = useParams()
    const isEditMode = Boolean(id);

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<AddEditProductFormData>({ resolver: zodResolver(isEditMode ? EditProductSchema : AddProductSchema) });

    const naviagte = useNavigate()
    

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const imageFileList = watch("image")

    useEffect(() => {

        if (imageFileList && imageFileList.length > 0) {

            const file = imageFileList[0]

            const url = URL.createObjectURL(file);

            setImagePreview(url)

            return () => URL.revokeObjectURL(url)

        }
    }, [imageFileList])

    useEffect(() => {

        if (!isEditMode) {
            return;
        }

        const fetchProduct = async () => {

            try {

                const response = await api.get(`/product/${id}`);

                const product =response.data.product;

                reset({
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    category: product.category
                })


                setImagePreview(product.image);

            } catch (error) {

                const err = error as AxiosError<ErrorResponse>

                toast.error( err.response?.data.message ||"Failed to load product")
            }
        };

        fetchProduct();

    }, [id, isEditMode, reset])

    const onSubmit = async (data: AddEditProductFormData) => {

        try {

            if(isEditMode){

                await dispatch(updateProduct({id :  id!, productData : data})).unwrap()
                toast.success("Product updated successfully!")

            }else{

                
                
                await dispatch(createProduct({ ...data, image: data.image! })).unwrap()
                toast.success("Product listed successfully!")
                
            }

            naviagte("/sell")

        } catch (error) {

            toast.error(error as string)
        }
    };

    return (
        <div className="sell-page-container container">
            <button onClick={() => naviagte(-1)} className="back-button">
                ← Back
            </button>

            <div className="sell-card">
                <h1 className="sell-title">{isEditMode? "Edit Product": "Sell Product"}</h1>

                <form className="sell-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="sell-form-grid">
                        <div className="sell-form-left-col">
                            <div className="form-group">
                                <label className="form-label">Title</label>
                                <input
                                    className="sell-input"
                                    type="text"
                                    placeholder="e.g. iPhone 14 Pro Max"
                                    {...register("title")}
                                />
                                {errors.title?.message && <p className="error-message">{errors.title.message}</p>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="sell-textarea"
                                    placeholder="Describe the condition, features, age, etc."
                                    {...register("description")}
                                />
                                {errors.description?.message && <p className="error-message">{errors.description.message}</p>}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Price (₹)</label>
                                    <input
                                        className="sell-input"
                                        type="number"
                                        placeholder="Price"
                                        {...register("price", { valueAsNumber: true })}
                                    />
                                    {errors.price?.message && <p className="error-message">{errors.price.message}</p>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Category</label>
                                    <input
                                        className="sell-input"
                                        type="text"
                                        placeholder="e.g. Mobiles, Laptops"
                                        {...register("category")}
                                    />
                                    {errors.category?.message && <p className="error-message">{errors.category.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="sell-form-right-col">
                            <div className="form-group">
                                <label className="form-label">Product Image</label>
                                <div className={`file-upload-wrapper ${imagePreview ? 'has-preview' : ''}`}>
                                    {imagePreview ? (
                                        <>
                                            <img src={imagePreview} alt="Preview" className="image-preview-full" />
                                            <label htmlFor="image-upload" className="file-upload-label overlay-label">
                                                Change Image
                                            </label>
                                        </>
                                    ) : (
                                        <label htmlFor="image-upload" className="file-upload-label">
                                            Choose File
                                        </label>
                                    )}
                                    <input
                                        id="image-upload"
                                        className="sell-file-input"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        {...register("image")}
                                    />
                                </div>
                                {errors.image?.message && <p className="error-message">{errors.image.message}</p>}
                            </div>

                            <button className="sell-button" type="submit" disabled={loading}>{loading ? isEditMode ? "Updating product...": "Listing product..." : 
                                isEditMode ? "Update Product": "Sell Product"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEditProduct