import userService from "../services/userService.js";

export async function signUp(req, res) {
    await userService.signUp(req.body);
    res.status(201).json({ message: "User registered successfully" });
}

export async function signIn(req, res) {
    const { userData } = res.locals;
    const { token, name } = await userService.signIn(userData);
    res.status(200).send({ token: token, userName: name });
}

export async function getUser(req, res) {
    const { userId } = res.locals;
    const userData = await userService.getUser(userId);
    res.status(200).send(userData);
}

export async function postAddFavorite(req, res) {
    const { userId } = res.locals;
    const { id } = req.params;
    await userService.postAddFavorite(userId, id);
    res.status(200).send("Car added to favorites.");
}

export async function postRemoveFavorite(req, res) {
    const { userId } = res.locals;
    const { id } = req.params;
    await userService.postRemoveFavorite(userId, id);
    res.status(200).send("Car added to favorites.");
}

export async function getIsFavorite(req, res) {
    const { userId } = res.locals;
    const { id } = req.params;
    const result = await userService.getIsFavorite(userId, id);
    res.status(200).send(result);
}

