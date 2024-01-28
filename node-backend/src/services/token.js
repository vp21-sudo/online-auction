import jwt from "jsonwebtoken"

const usersWithTokenList = []

const generateToken = (payload) => {
    try{
        usersWithTokenList.push(payload?._id?.toString())
        return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "7d"})
    } catch(err){
        throw err
    }
}



export {
    generateToken,
    usersWithTokenList
}