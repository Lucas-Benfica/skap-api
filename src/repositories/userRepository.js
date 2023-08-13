import { db } from "../database/databaseConnection.js";
import bcrypt from "bcrypt";

/*
"id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"password" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "cpf" CHAR(11) UNIQUE NOT NULL,
    "phoneNumber" VARCHAR(15) UNIQUE NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
*/

export async function createUser (body) {
    const { name, password, email, cpf, phoneNumber } = body;
	const hash = bcrypt.hashSync(password, 10);

    const newUser = db.query(`INSERT INTO users (name, password, email, cpf, "phoneNumber") VALUES ($1, $2, $3, $4, $5);`, [name, hash, email, cpf, phoneNumber]);
    return newUser;
}

export async function signInSession (token, userData) {	
    const login = db.query(`INSERT INTO session ("userId", token) VALUES ($1, $2);`, [userData.id, token]);
    return login;
}

export async function userInfoById (id) {	
    const result = db.query(`SELECT * FROM users WHERE id=$1;`, [id]);
    return result;
}

export async function addFavorite (user, car) 
    const result = db.query(`INSERT INTO favorites ("userId", "carId") VALUES ($1, $2);`, [user, car]);
    return result;


export async function removeFavorite (user, car) {
    const result = db.query(`DELETE FROM favorites WHERE "userId" = $1 AND "carId" = $2;`, [user, car]);
    return result;
}

export async function isFavorite (user, car) {
    const result = db.query(`SELECT * FROM favorites WHERE "userId" = $1 AND "carId" = $2;`, [user, car]);
    return result;
}