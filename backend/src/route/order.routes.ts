import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { placeOrderController } from "../controllers/product.controller";


const router = Router()

router.post("/order/place", authMiddleware, placeOrderController)

export default router;