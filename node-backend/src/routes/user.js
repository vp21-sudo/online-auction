import express from "express"
import { userCreateValidator, userLoginValidator } from "../validators/user.js"
import { createUser, userLogin } from "../services/user.js"
import authUserSession from "../middleware/auth.js"
const authRouter = express.Router()


const createUserHandler = async (req, res) => {
    try{
        const validate = await userCreateValidator.validateAsync(req.body)
        const {name, email, password} = validate
        const user = await createUser({name, email, password})
        return res.status(201).json({message: user})
    } catch(err){
        if(err?.isJoi){
            return res.status(400).json({message: err?.message, code:"INVALID_INPUT"})
        }
        if(err?.code === 11000){
            return res.status(403).json({message: "Email already exists, please login", code:"EMAIL_ALREADY_EXISTS"})
        }
        return res.status(500).json({message: err.message})
    }
}

const userLoginHandler = async (req, res) => {
    try{
        const validate = await userLoginValidator.validateAsync(req.body)
        const {email, password} = validate
        res.status(200).json(await userLogin({email, password}))
    } catch(err){
        console.log(err)
        if(err?.isJoi){
            return res.status(400).json({message: err?.message, code:"INVALID_INPUT"})
        }
        if(err?.message === "USER_NOT_FOUND"){
            return res.status(404).json({message: "Invalid user, please register first.", code:"USER_NOT_FOUND"})
        }
        if(err?.message === "INVALID_PASSWORD"){
            return res.status(403).json({message: "Invalid password, please try again.", code:"INVALID_PASSWORD"})
        }
        return res.status(500).json({message: err.message})
    }
}

authRouter.post("/create", createUserHandler)
authRouter.post("/login", userLoginHandler)
authRouter.get("/", authUserSession, (req, res) => {
    res.status(200).json(req?.body?.auth_user)
})


export default authRouter