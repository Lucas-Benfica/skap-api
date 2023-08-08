import { db } from "../database/databaseConnection.js";

export async function createUser (name, email, password) {
	
    const newUser = db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, password]);
    return newUser;

}

export async function signInSession (token, userData) {	
    const login = db.query(`INSERT INTO session ("userId", token) VALUES ($1, $2);`, [userData.id, token]);
    return login;
}
/*
export async function getUser (id) {	
   
    return userInfo;
}
*/