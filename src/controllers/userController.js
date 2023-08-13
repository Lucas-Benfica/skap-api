import { v4 as uuid } from "uuid";
import { addFavorite, createUser, isFavorite, removeFavorite, signInSession, userInfoById } from "../repositories/userRepository.js";

export async function signUp(req, res) {
    try {
        await createUser(req.body);
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).send("Error while signing up: " + err.message);
    }
}

export async function signIn(req, res) {
    const { userData } = res.locals;
    const token = uuid();
    try {
        await signInSession(token, userData);
        res.status(200).send({ token: token, userName: userData.name });
    } catch (err) {
        res.status(500).send("Error while signing in: " + err.message);
    }
}

export async function getUser(req, res) {
    const { userId } = res.locals;
    try {
        const userData = await userInfoById(userId);
        res.status(200).send(userData);
    } catch (err) {
        res.status(500).send("Error while signing in: " + err.message);
    }
}

export async function postAddFavorite(req, res) {
    const { userId } = res.locals;
    const { id } = req.body;
    try {
        const result = await addFavorite(userId, id);
        res.status(200).send("Carro adicionado aos favoritos.");
    } catch (err) {
        res.status(500).send("Error while adding to favorites: " + err.message);
    }
}

export async function postRemoveFavorite(req, res) {
    const { userId } = res.locals;
    const { id } = req.body;
    try {
        const result = await removeFavorite(userId, id);
        res.status(200).send("Carro removido dos favoritos.");
    } catch (err) {
        res.status(500).send("Error while removing from favorites: " + err.message);
    }
}

export async function getIsFavorite(req, res) {
    const { userId } = res.locals;
    const { id } = req.params;
    try {
        const result = await isFavorite(userId, id);
        const favoriteCar = result.rows.length > 0;
        if (favoriteCar) {
            res.status(200).send({favoriteCar: true});
        } else {
            res.status(200).send({favoriteCar: false});
        }
    } catch (err) {
        res.status(500).send("Error while checking favorite status: " + err.message);
    }
}

