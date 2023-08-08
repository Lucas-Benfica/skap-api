import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { createUser, getUser, signInSession } from "../repositories/userRepository.js";

export async function signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(422).send({ message: "Incompatible passwords" });
    }

    try {
        const hash = bcrypt.hashSync(password, 10);
        await createUser(name, email, hash);
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
/*
export async function getUserInfo(req, res) {
    const { userId } = res.locals;

    try {
        const userInfo = await getUser(userId);

        res.status(200).send(userInfo.rows[0]);
    } catch (err) {
        res.status(500).send("Error while getting user information: " + err.message);
    }
}
*/