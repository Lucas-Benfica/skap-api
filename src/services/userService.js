import { v4 as uuid } from "uuid";
import { InvalidDataError } from "../errors/invalidData-error.js";
import { addFavorite, createUser, isFavorite, removeFavorite, signInSession, userInfoById } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import { NotFoundError } from "../errors/notFound-error.js";
import { carById } from "../repositories/carsRepository.js";

export async function signUp(body) {
    const { name, password, email, cpf, phoneNumber } = body;
    if(!body) throw InvalidDataError("Incomplete information");
	const hash = bcrypt.hashSync(password, 10);
    
    await createUser(name, hash, email, cpf, phoneNumber);
}

export async function signIn(userData) {
    const { name, id } = userData;
    const token = uuid();

    const user = userInfoById(id);
    if(!user) throw NotFoundError(`User not found with id: ${id}`);

    await signInSession(token, id);
    
    return { token, name }
}

export async function getUser(userId) {
    const userData = await userInfoById(userId);
    if(!userData) throw NotFoundError(`User not found with id: ${userId}`);
    return userData;
}

export async function postAddFavorite(userId, carId) {
    const userData = await userInfoById(userId);
    if(!userData) throw NotFoundError(`User not found with id: ${userId}`);
    
    const carData = await carById(carId);
    if(!carData) throw NotFoundError("Car not found!");

    await addFavorite(userId, carId);
}

export async function postRemoveFavorite(userId, carId) {
    const userData = await userInfoById(userId);
    if(!userData) throw NotFoundError(`User not found with id: ${userId}`);
    
    const carData = await carById(carId);
    if(!carData) throw NotFoundError("Car not found!");

    await removeFavorite(userId, carId);
}

export async function getIsFavorite(userId, carId) {
    const userData = await userInfoById(userId);
    if(!userData) throw NotFoundError(`User not found with id: ${userId}`);
    
    const carData = await carById(carId);
    if(!carData) throw NotFoundError("Car not found!");

    const result = await isFavorite(userId, carId);
    const favoriteCar = result.rows.length > 0;
    if (favoriteCar) {
        return { favoriteCar: true };
    } else {
        return { favoriteCar: false };
    }
}

const userService = {
    signUp, signIn, getUser, postAddFavorite, postRemoveFavorite, getIsFavorite
}

export default userService;