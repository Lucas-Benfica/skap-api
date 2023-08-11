import { carById, carList, createCar, insertPhotos, ranking } from "../repositories/carsRepository.js";

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
export async function getCarRanking(req, res) {
    try {
        const result = await ranking();
        res.status(201).send(result.rows);
    } catch (err) {
        res.status(500).send({ message: "Error when shortening url: " + err.message });
    }
}