import { Router } from "express";
import { getProductId, getProducts } from "../controllers/product.controller";

const router = Router()

router.get("/" , getProducts)
router.get("/product/:id", getProductId)

export default router