import { Router } from "express";
import { getMe, login, signup } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router()

router.post("/signup" , signup)
router.post("/login" , login)
router.get("/me", authMiddleware, getMe);


export default router