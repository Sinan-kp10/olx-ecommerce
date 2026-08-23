import { AuthRequest } from "../middleware/auth.middleware";
import { addToCart, getCart, removeFromCart } from "../service/cart.service";
import { Response } from "express";

export const getCartController = async ( req: AuthRequest, res: Response): Promise<void> => {

    try {
        
        const cart = await getCart(req.user!.userId)

        res.status(200).json({
            success: true,
            cart
        })

    } catch (error) {

        console.log("Update product error:", error);

        res.status(404).json({
            success: false,
            message: error instanceof Error? error.message: "Failed to fetch cart"
        })
    }
}

export const addToCartController = async ( req: AuthRequest, res: Response): Promise<void> => {

    try {
        const {productId} = req.params

        const cart = await addToCart(productId as string, req.user!.userId)

        res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            cart
        })

    } catch (error) {

        console.log("Update product error:", error);

        res.status(404).json({
            success: false,
            message: error instanceof Error? error.message: "Failed to add product to cart"
        })
    }
}

export const removeFromCartController = async (req: AuthRequest, res: Response): Promise<void> => {

    try {

        const { productId } = req.params

        const cart = await removeFromCart(productId as string, req.user!.userId)

        res.status(200).json({
            success: true,
            message: "Product removed from cart",
            cart
        })

    } catch (error) {

        console.log("Remove from cart error:", error);

        res.status(400).json({
            success: false,
            message: error instanceof Error? error.message : "Failed to remove product from cart"
        });
    }
};