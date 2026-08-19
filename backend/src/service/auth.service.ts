import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.model"


interface singupData {
    name: string;
    email: string;
    password: string;
}

interface loginData {
    email : string,
    password : string
}


export const signupService = async({name, email, password} : singupData)=>{

    if(!name || !email || !password){
        throw new Error("Name, email and password are required")
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
        throw new Error("User already exist")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email,
        password : hashedPassword
    })

    return {
        id : user._id,
        name : user.name,
        email : user.email

    }
}

export const loginService = async({email, password} : loginData) => {

    if(!email || !password){
        throw new Error("Name and password required")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new Error("User not found")
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
        throw new Error("Invalid password");
    }

    const jwtSecret = process.env.JWT_SECRET

     if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({
        userId : user._id.toString(),
        email : user.email
    },
    jwtSecret,
    {
        expiresIn : "7d",
    })

    return {
        token,
        user :{
            id : user._id,
            name : user.name,
            email : user.email
        }
    }
}

export const getCurrentuser = async(userId : string) =>{

    const user = await User.findById(userId).select("-password")

    if(!user){
        throw new Error("User not found");
    }

    return user;
}