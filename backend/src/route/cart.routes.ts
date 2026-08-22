import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { addToCartController, getCartController } from "../controllers/cart.controller";


const router = Router()

router.get("/cart", authMiddleware, getCartController)
router.post("/cart/add/:productId", authMiddleware, addToCartController)

export default router;