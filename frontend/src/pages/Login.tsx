import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import {useForm} from "react-hook-form"
import { toast } from "react-toastify";
import { login } from "../feature/auth/authThunk"
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/loginScema";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";


interface LoginFormData {
    email : string
    password : string
}

function Login (){

    const dispatch = useDispatch<AppDispatch>()

    const {loading } = useSelector((state : RootState)=> state.auth)

    const {register, handleSubmit, formState : {errors}} = useForm<LoginFormData>({resolver : zodResolver(loginSchema)})

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async(data : LoginFormData) =>{

        try {

            await dispatch(login(data)).unwrap()

            toast.success("succefully logged in")

            navigate("/")

        } catch (error) {

            toast.error(error as string) 
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Please enter your credentials to log in</p>
                
                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <input className="auth-input" type="email" placeholder="Email Address" {...register("email")} />
                        {errors.email?.message && <p className="error-message">{errors.email.message}</p>}
                    </div>

                    <div className="form-group">
                        <div className="password-input-wrapper">
                            <input 
                                className="auth-input"  
                                type={showPassword ? "text" : "password"} 
                                placeholder="Password" 
                                {...register("password")} 
                            />
                            <button 
                                type="button" 
                                className={`password-toggle-btn ${showPassword ? "visible" : ""}`} 
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                        {errors.password?.message && <p className="error-message">{errors.password.message}</p>}
                    </div>

                    <button className="auth-button" type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                
                <p className="auth-footer">
                    Don't have an account? <Link to="/Signup" className="auth-link">Signup</Link>
                </p>
            </div>
        </div>
    )
}

export default Login;