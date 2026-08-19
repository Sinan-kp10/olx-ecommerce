import { Router } from "express";
import { getProductId, getProducts, createProductController } from "../controllers/product.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";

const router = Router()

router.get("/" , getProducts)
router.get("/product/:id", getProductId)
router.post("/sell/product", authMiddleware,upload.single("image"), createProductController)




export default router