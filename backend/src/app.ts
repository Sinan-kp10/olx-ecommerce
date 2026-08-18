import express from "express"
import cors from "cors"
import authRoute from "../src/route/auth.routes"
import productRoute from "../src/route/product.routes"


const app = express()
app.use(cors())
app.use(express.json())

app.use("/", authRoute)
app.use("/", productRoute)


export default app