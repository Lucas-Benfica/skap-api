import express from "express"
import "express-async-errors"
import cors from "cors"
import router from "./routes/indexRoutes.js"
import dotenv from "dotenv"
import { handleApplicationErrors } from "./middlewares/error-handler.js"
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)
app.use(handleApplicationErrors)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))