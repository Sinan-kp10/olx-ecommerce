import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema } from "../validation/signupSchema"
import { signup } from "../feature/auth/authThunk"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import "./Signup.css"


interface SignupFormData {
    name : string
    email : string
    password : string
    confirmPassword : string
}


function Signup(){

    const dispatch = useDispatch<AppDispatch>()

    const {loading} = useSelector((state : RootState)=> state.auth)

    const {register, handleSubmit, formState: {errors}} = useForm<SignupFormData>({ resolver : zodResolver(signupSchema)})

    const navigate = useNavigate()

    const onSubmit = async(data : SignupFormData)=>{

        try {

            await dispatch(signup(data)).unwrap()

            toast.success("Account created successfully!")

            navigate("/login")
            
        } catch (error) {

            toast.error(error as string)
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Join us today! It only takes a few steps</p>

                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className="form-group">
                        <input className="auth-input" type="text" placeholder="Full Name" {...register("name")}/>
                        {errors.name?.message && <p className="error-message">{errors.name.message}</p>}
                    </div>

                    <div className="form-group">
                        <input className="auth-input" type="email" placeholder="Email Address" {...register("email")} />
                        {errors.email?.message && <p className="error-message">{errors.email.message}</p>}
                    </div>

                    <div className="form-group">
                        <input className="auth-input" type="password" placeholder="Password" {...register("password")} />
                        {errors.password?.message && <p className="error-message">{errors.password.message}</p>}
                    </div>

                    <div className="form-group">
                        <input className="auth-input" type="password" placeholder="Confirm passsword" {...register("confirmPassword")} />
                        {errors.confirmPassword?.message && <p className="error-message">{errors.confirmPassword.message}</p>}
                    </div>

                    <button className="auth-button" type="submit" disabled={loading}>
                        {loading ? "Creating account..." : "Signup"}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login" className="auth-link">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup