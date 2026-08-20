import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellSchema } from "../../validation/sellSchema";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { createProduct } from "../../feature/product/productThunk";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./SellForm.css";


interface SellFormData {
    title: string;
    description: string;
    price: number;
    category: string;
    image: FileList;
}

function Sell() {

    const dispatch = useDispatch<AppDispatch>()

    const { loading } = useSelector((state: RootState) => state.product)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<SellFormData>({ resolver: zodResolver(sellSchema) });

    const naviagte = useNavigate()

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const imageFileList = watch("image");

    useEffect(() => {
        if (imageFileList && imageFileList.length > 0) {
            const file = imageFileList[0];
            const url = URL.createObjectURL(file);
            setImagePreview(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setImagePreview(null);
        }
    }, [imageFileList]);

    const onSubmit = async (data: SellFormData) => {

        try {

            await dispatch(createProduct(data)).unwrap()
            toast.success("Product listed successfully!");
            naviagte("/")

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
                <h1 className="sell-title">Sell Product</h1>

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

                            <button className="sell-button" type="submit" disabled={loading}>
                                {loading ? "Listing product..." : "Sell Product"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Sell