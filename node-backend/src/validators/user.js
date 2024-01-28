import Joi from "joi"

const userCreateValidator = Joi.object({
    name: Joi.string().max(30).required(),
    email: Joi.string().max(30).email().required(),
    password: Joi.string().min(4).required()
})

const userLoginValidator = Joi.object({
    email: Joi.string().max(30).email().required(),
    password: Joi.string().min(4).required()
})
export {
    userCreateValidator,
    userLoginValidator
}