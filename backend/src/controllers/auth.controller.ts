import { Request , Response} from "express"
import { getCurrentuser, loginService, signupService } from "../service/auth.service"
import type { AuthRequest } from "../middleware/auth.middleware";



export const signup = async(req : Request , res: Response) : Promise<void> => {

    try {

        const user = await signupService(req.body)

        res.status(201).json({
            success : true,
            message : "User registred succefully",
            user
        })
        
    } catch (error) {

        console.error("Signup error:", error);

        res.status(401).json({
            success: false,
            message: error instanceof Error ? error.message : "Signup failed" ,
        });
    }
}

export const login = async(req : Request, res : Response): Promise<void> => {
    try {

        const result = await loginService(req.body)

        res.cookie("token", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });
        
        res.status(201).json({
            success : true,
            message : "Login successful",
            token : result.token,
            user : result.user
        })
        
    } catch (error) {

        console.error("Login error:", error)

        res.status(401).json({
            success: false,
            message: error instanceof Error ? error.message : "Login failed" ,
        });
    }
}

export const getMe = async(req: AuthRequest, res: Response): Promise<void> => {

    try {

        const user = await getCurrentuser(req.user!.userId);

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
}

export const logout = async(req: Request, res: Response) : Promise<void> =>{

    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })

        res.status(200).json({
            success: true,
            message: "Logout successful"
        })

        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Logout failed"
        });
    }
}