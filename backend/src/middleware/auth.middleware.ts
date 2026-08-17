import { Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request {
    user?:{
        userId : string,
        email : string
    }
}

export const authMiddleware = (req: AuthRequest, res : Response, next: NextFunction) : void =>{

    const authHeader = req.headers.authorization

      if (!authHeader) {
        res.status(401).json({
            success: false,
            message: "Authentication token is required"
        })
        return
    }

    const token = authHeader.split(" ")[1]

      if (!token) {
        res.status(401).json({
            success: false,
            message: "Invalid authorization header"
        })
        return
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        res.status(500).json({
            success: false,
            message: "JWT_SECRET is not defined"
        })
        return;
    }

    try {
        
        const decoded = jwt.verify(token, jwtSecret)

        if (typeof decoded === "string") {
            res.status(401).json({
                success: false,
                message: "Invalid token"
            })
            return;
        }

        req.user = {
            userId :  decoded.userId as string,
            email : decoded.email as string
        }

        next()

    } catch (error) {

        res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        })
        
    }
}