import express from "express"
import dotenv from "dotenv"
import router from "./routes/index.js"
import connectDB from "./models/db.js"
dotenv.config()
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(router)


await connectDB()
app.listen(port, () => {
    console.log(`server listenting on port ${port}`)
})