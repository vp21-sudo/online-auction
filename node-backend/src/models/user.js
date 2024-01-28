import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp:{
        type: String
    },
    is_email_verified:{
        type: Boolean,
        default: false
    },
}, {
    timestamps:true
})


const userModel = mongoose.model("User", userSchema)

export {
    userModel
} 