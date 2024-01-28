import { userModel } from "../models/user.js";
import { generateToken } from "./token.js";

const createUser = async ({name, email, password}) => {
    try{
        const user = new userModel({
            name,
            email,
            password
        })
        await user.save()
        return "USER_CREATED"
    } catch(err){
        throw err
    }
}

const userLogin = async ({email, password}) => {
    try{
        const user = await userModel.findOne({email})
        if(!user){
            throw new Error("USER_NOT_FOUND")
        }
        if(user.password !== password){
            throw new Error("INVALID_PASSWORD")
        }
        // generate token
        const userToken = generateToken({
            _id: user?._id,
            email: user?.email
        })
        return {
            code: "LOGIN_SUCCESS",
            token: userToken,
        }
    } catch(err){
        throw err
    }
}

export {
    createUser,
    userLogin
}