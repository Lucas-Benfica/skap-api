import { db } from "../database/databaseConnection.js";
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
