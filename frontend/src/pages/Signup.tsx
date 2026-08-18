import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema } from "../validation/signupSchema"
import { signup } from "../feature/auth/authThunk"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"


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

    return(
        <>

            <form onSubmit={handleSubmit(onSubmit)}>

 
                <input type="text" placeholder="Full Name" {...register("name")}/>
                <p>{errors.name?.message}</p>

            
                <input type="email" placeholder="Email Address" {...register("email")} />
                <p>{errors.email?.message}</p>

    
                <input type="password" placeholder="Password" {...register("password")} />
                <p>{errors.password?.message}</p>

                <input type="password" placeholder="Confirm passsword" {...register("confirmPassword")} />
                <p>{errors.confirmPassword?.message}</p>

                <button type="submit" disabled={loading}>{loading ? "Creating account..." : "Signup"}</button>

                <p>
                        Already have an account? <Link to="/login" >Login</Link>
                    </p>

            </form>
        
        
        </>
    )
}

export default Signup