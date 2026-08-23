import { createProduct, deleteProduct, getAllProducts, getMyProducts, getProductById, updateProduct } from "../service/product.service"
import { Request, Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
import { placeOrder } from "../service/order.service";

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

export const createProductController = async(req: AuthRequest, res: Response): Promise<void>=>{

    try {
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "Product image is required"
            });

            return;
        }

        const product = await createProduct({title: req.body.title, description: req.body.description,
            price: Number(req.body.price), category: req.body.category, image: req.file, seller: req.user!.userId})

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

export const updateProductController = async ( req: AuthRequest, res: Response): Promise<void> => {

    try {
        

        const {id} = req.params

        const product = await updateProduct(id as string, { title: req.body.title, description: req.body.description,
            price: Number(req.body.price), category: req.body.category}, req.file, req.user!.userId)

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        })

    } catch (error) {

        console.log("Update product error:", error);

        res.status(404).json({
            success: false,
            message: error instanceof Error? error.message: "Failed to update product"
        })
    }
}

export const deleteProductController = async(req:AuthRequest, res: Response): Promise<void>=>{

    try {

        const {id} = req.params

        const product = await deleteProduct(id as string, req.user!.userId)
        
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            product
        })

    } catch (error) {
        console.log("Delete product error:", error);

        res.status(404).json({
            success: false,
            message: error instanceof Error? error.message : "Failed to delete product"
        })
    }
}

export const placeOrderController = async (req: AuthRequest, res: Response): Promise<void> => {

    try {

        const order = await placeOrder(req.user!.userId)

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {

        console.log("Place order error:", error);

        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to place order"
        })
    }
}