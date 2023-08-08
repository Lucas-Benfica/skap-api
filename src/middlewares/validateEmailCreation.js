import { db } from "../database/databaseConnection.js"

export async function validateEmailCreation(req, res, next) {
    const { email } = req.body;

    const response = await db.query(`SELECT * FROM users WHERE email=$1;`, [email]);

    if (response.rowCount !== 0) return res.status(409).send({ message: "E-mail already registered" });

    next()
}