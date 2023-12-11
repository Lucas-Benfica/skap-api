import { db } from "../database/databaseConnection.js"
import { conflictError } from "../errors/conclict-error.js";

export async function validateEmailCreation(req, res, next) {
    const { email } = req.body;

    const response = await db.query(`SELECT * FROM users WHERE email=$1;`, [email]);

    if (response.rowCount !== 0) throw conflictError({ message: "E-mail already registered" });

    next()
}