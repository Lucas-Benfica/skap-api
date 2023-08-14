import { db } from "../database/databaseConnection.js";
import bcrypt from "bcrypt";

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
    const result = db.query(`
    SELECT u.id, u.name, u.email, u.cpf, u."phoneNumber",
    (
        SELECT jsonb_agg(jsonb_build_object('id', c.id, 'name', c.name, 'category', c.category, 'description', c.description, 'brand', c.brand, 'engine', c.engine, 'plate', c.plate, 'city', c.city, 'state', c.state, 'year', c.year, 'km', c.km, 'transmission', c.transmission, 'fuel', c.fuel, 'color', c.color, 'price', c.price, 'views', c.views, 'createdAt', c."createdAt", 'photos', (SELECT jsonb_agg(photo) FROM photos WHERE "carId" = c.id)))
        FROM cars c
        INNER JOIN favorites f ON c.id = f."carId"
        WHERE f."userId" = u.id
    ) AS "favorites",
    (
        SELECT jsonb_agg(jsonb_build_object('id', c.id, 'name', c.name, 'category', c.category, 'description', c.description, 'brand', c.brand, 'engine', c.engine, 'plate', c.plate, 'city', c.city, 'state', c.state, 'year', c.year, 'km', c.km, 'transmission', c.transmission, 'fuel', c.fuel, 'color', c.color, 'price', c.price, 'views', c.views, 'createdAt', c."createdAt", 'photos', (SELECT jsonb_agg(photo) FROM photos WHERE "carId" = c.id)))
        FROM cars c
        WHERE c."userId" = u.id
    ) AS "userSales"
    FROM users u
    WHERE u.id = $1;
`, [id]);
    return result;
}

export async function addFavorite (user, car) {
    const result = db.query(`INSERT INTO favorites ("userId", "carId") VALUES ($1, $2);`, [user, car]);
    return result;
}

export async function removeFavorite (user, car) {
    const result = db.query(`DELETE FROM favorites WHERE "userId" = $1 AND "carId" = $2;`, [user, car]);
    return result;
}

export async function isFavorite (user, car) {
    const result = db.query(`SELECT * FROM favorites WHERE "userId" = $1 AND "carId" = $2;`, [user, car]);
    return result;
}