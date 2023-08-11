import Joi from "joi";

export const schemaSignUp = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    cpf: Joi.string().length(11).required(),
    phoneNumber: Joi.string().max(15).required()
});

export const schemaSignIn = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
});
