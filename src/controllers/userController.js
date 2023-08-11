import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { createUser, signInSession, userInfoById } from "../repositories/userRepository.js";
/*
"id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"password" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "cpf" CHAR(11) UNIQUE NOT NULL,
    "phoneNumber" VARCHAR(15) UNIQUE NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
*/
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

