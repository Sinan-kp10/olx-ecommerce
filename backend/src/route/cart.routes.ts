import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { addToCartController, getCartController, removeFromCartController } from "../controllers/cart.controller";


const router = Router()

router.get("/cart", authMiddleware, getCartController)
router.post("/cart/add/:productId", authMiddleware, addToCartController)
router.delete("/cart/remove/:productId", authMiddleware,removeFromCartController)

export default router;