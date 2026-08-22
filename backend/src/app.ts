import express from "express"
import cors from "cors"
import authRoute from "../src/route/auth.routes"
import productRoute from "../src/route/product.routes"
import cookieParser from "cookie-parser"
import cartRoute from "../src/route/cart.routes";



const app = express()
app.use(express.json())

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
)
app.use(cookieParser())


app.use("/", authRoute)
app.use("/", productRoute)
app.use("/", cartRoute);


export default app