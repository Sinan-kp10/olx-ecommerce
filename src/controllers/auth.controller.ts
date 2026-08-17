import { Request , Response} from "express"
import { loginService, signupService } from "../service/auth.service"



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

        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const login = async(req : Request, res : Response): Promise<void> => {
    try {

        const result = await loginService(req.body)
        
        res.status(201).json({
            success : true,
            message : "Login successful",
            token : result.token,
            user : result.user
        })
        
    } catch (error) {

        console.error("Login error:", error)

        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}