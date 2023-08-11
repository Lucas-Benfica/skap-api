import Joi from "joi";

export const carsSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    brand: Joi.string().required(),
    engine: Joi.string().required(),
    plate: Joi.string().max(10).required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    year: Joi.number().integer().min(1886).max(new Date().getFullYear()).required(),
    km: Joi.number().integer().required(),
    transmission: Joi.string().required(),
    fuel: Joi.string().required(),
    color: Joi.string().required(),
    price: Joi.number().integer().required(),
    photos: Joi.array().items(Joi.string())
});