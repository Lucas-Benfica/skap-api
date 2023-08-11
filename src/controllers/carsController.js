import { carById, carList, createCar, insertPhotos } from "../repositories/carsRepository.js";
/*
export const carsSchema = Joi.object({
    userId: Joi.number().integer().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
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
});
*/
export async function postCreateCar (req, res){
    const { userId } = res.locals;
    const {photos} = req.body;
    const carData = {
        userId: userId,
        ...req.body,
    };
    delete carData.photos;
    try {
        const resultId = await createCar(carData);
        await insertPhotos(resultId, photos);
        res.status(201).send("User registered successfully");
    } catch (err) {
        res.status(500).send({ message: "Error when shortening url: " + err.message });
    }
}
export async function getCarList(req, res) {
    try {
        const result = await carList();
        res.status(201).send(result.rows);
    } catch (err) {
        res.status(500).send({ message: "Error when shortening url: " + err.message });
    }
}
export async function getCarById(req, res) {
    const { id } = req.params;
    try {
        const result = await carById(id);
        res.status(201).send(result.rows[0]);
    } catch (err) {
        res.status(500).send({ message: "Error when shortening url: " + err.message });
    }
}