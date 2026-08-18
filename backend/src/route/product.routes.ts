import { Router } from "express";
import { getAllProducts } from "../service/product.service";

const router = Router()

router.get("/" , getAllProducts)

export default router