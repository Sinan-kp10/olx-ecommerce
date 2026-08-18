import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import {useForm} from "react-hook-form"
import { toast } from "react-toastify";
import { login } from "../feature/auth/authThunk"
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/loginScema";
import { Link, useNavigate } from "react-router-dom";


interface LoginFormData {
    email : string
    password : string
}

function Login (){

    const dispatch = useDispatch<AppDispatch>()

    const {loading } = useSelector((state : RootState)=> state.auth)

    const {register, handleSubmit, formState : {errors}} = useForm<LoginFormData>({resolver : zodResolver(loginSchema)})

    const navigate = useNavigate()

    const onSubmit = async(data : LoginFormData) =>{

        try {

            await dispatch(login(data)).unwrap()

            toast.success("succefully logged in")

            navigate("/")

        } catch (error) {

            toast.error(error as string) 
        }
    }

    return(
        <>
            <form  onSubmit={handleSubmit(onSubmit)}>

         
                <input type="email"  placeholder="Email Address" {...register("email")} />
                <p>{errors.email?.message}</p>

  
                <input type="password"  placeholder="Password" {...register("password")} />
                <p>{errors.password?.message}</p>

                

                <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
                <p>
                    Don't have an account? <Link to="/Signup">Signup</Link>
                </p>

            </form>
        
        </>
    )
}

export default Login;