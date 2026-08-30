import express from "express"
import cors from "cors"
import authRoute from "./route/auth.routes"
import productRoute from "./route/product.routes"
import cookieParser from "cookie-parser"
import cartRoute from "./route/cart.routes";
import orderRoute from "./route/order.routes";


const app = express()
app.use(express.json())

app.use(
    cors({
        origin: ["http://localhost:5173","https://olx-ecommerce-clone-5yg4.vercel.app"],
        credentials: true
    })
)
app.use(cookieParser())


app.use("/", authRoute)
app.use("/", productRoute)
app.use("/", cartRoute);
app.use("/", orderRoute);

export default app