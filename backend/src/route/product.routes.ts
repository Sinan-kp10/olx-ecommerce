import { Router } from "express";
import { getProductId, getProducts, createProductController } from "../controllers/product.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router()

router.get("/" , getProducts)
router.get("/product/:id", getProductId)
router.post("/sell/product", authMiddleware, createProductController)




export default router