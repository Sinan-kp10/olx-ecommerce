import { getAllProducts, getProductById } from "../service/product.service"
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