import { createProduct, getAllProducts, getProductById } from "../service/product.service"
import { Request, Response } from "express";

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

export const createProductController = async(req: Request, res: Response): Promise<void>=>{

    try {

        const product = await createProduct({title: req.body.title, description: req.body.description,
             price: req.body.price, category: req.body.category, image: req.body.image, seller: req.body.seller})

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        })
        
    } catch (error) {
        
        console.log("Create product error:", error);

        res.status(404).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to create product"
        });
    }
}