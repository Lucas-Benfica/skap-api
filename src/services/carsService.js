import { NotFoundError } from "../errors/notFound-error.js";
import { carById, carBySearch, carList, createCar, insertPhotos, ranking, saleCancel, saleConfirm, saleDelete, updateCar, updatePhotos } from "../repositories/carsRepository.js";

export async function postCreateCar(userId, car, photos) {
    const carData = {
        userId: userId,
        ...car,
    };
    delete carData.photos;

    const resultId = await createCar(carData);
    await insertPhotos(resultId, photos);
}

export async function postUpdateCar(carId, userId, photos, carData) {

    const idCar = await updateCar(carId, carData, userId);
    await updatePhotos(carId, photos);

    return idCar;
}

export async function getCarList(req, res) {
    const result = await carList();
    return result.rows;
}

export async function getCarById(id) {
    const result = await carById(id);
    if (!result) throw NotFoundError("Car not found");

    await openAd(id);
    return result
}

export async function getCarBySearch(term) {
    const result = await carBySearch(term);
    return result.rows;
}

export async function getCarRanking() {
    
    const result = await ranking();
    return result.rows;
}

export async function confirmSale(id, sell) {
    if (sell === 'confirm') {
        await saleConfirm(id);
        return "Sale confirmed";
    }
    if (sell === 'cancel') {
        await saleCancel(id);
        return "Sale canceled";
    } 
}

export async function deleteSale(id) {
    return await saleDelete(id);
}

const carsService = {
    postCreateCar, postUpdateCar, getCarList, getCarById,
    getCarBySearch, getCarRanking, confirmSale, deleteSale
}

export default carsService;