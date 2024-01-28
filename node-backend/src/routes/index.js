import express from "express"
import authRouter from "./user.js"
const router = express.Router()

router.use("/user", authRouter)

export default router