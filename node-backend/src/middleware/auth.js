import jwt from "jsonwebtoken"
import { userModel } from "../models/user.js"


const authUserSession = async (req, res, next) => {
    console.log("middler ware called")
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        const user = await userModel.findOne({ _id: decoded._id })
        console.log(user)
        req.body["auth_user"] = user
        next()
    } catch (e) {
        res.status(401).send({ error: "Unauthorized User, please login" })
    }
}

export default authUserSession