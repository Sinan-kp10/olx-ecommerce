import { getAllProducts } from "../service/product.service"
import { Request, Response } from "express";

export const getProducts = async(req:Request, res: Response): Promise<void>=>{

    try {

        const products = await getAllProducts()

        res.status(201).json({
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