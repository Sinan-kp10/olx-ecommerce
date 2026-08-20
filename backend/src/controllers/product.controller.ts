import { createProduct, getAllProducts, getMyProducts, getProductById } from "../service/product.service"
import { Request, Response } from "express";
import { uploadImage } from "../service/cloudinary.service";
import type { AuthRequest } from "../middleware/auth.middleware";

export const getProducts = async(req:Request, res: Response): Promise<void>=>{

    try {

        const products = await getAllProducts()

        res.status(200).json({
            success : true,
            products
        })
        
    } catch (error) {
        
        console.log("Get products error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch products"
        });
    }
}

export const getProductId = async(req: Request, res: Response): Promise<void>=>{

    try {

        const product = await getProductById(req.params.id as string)

        res.status(200).json({
            success: true,
            product
        })
        
    } catch (error) {
        
        console.log("Get product error:", error);

        res.status(404).json({
            success: false,
            message: error instanceof Error ? error.message : "Product not found"
        });
    }
}

export const createProductController = async(req: AuthRequest, res: Response): Promise<void>=>{

    try {
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "Product image is required"
            });

            return;
        }

        const imageUrl = await uploadImage(
            req.file.buffer
        );

        const product = await createProduct({title: req.body.title, description: req.body.description,
             price: Number(req.body.price), category: req.body.category, image: imageUrl, seller: req.user!.userId})

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        })
        
    } catch (error) {
        
        console.log("Create product error:", error);

        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to create product"
        });
    }
}

export const getMyProductsController = async(req: AuthRequest, res: Response) : Promise<void>=>{

    try {

        const products = await getMyProducts(req.user!.userId)

        res.status(200).json({
            success : true,
            products
        })
        
    } catch (error) {
        
        console.log("Fetch my product error:", error);

        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to fetch your product"
        });
    }
}