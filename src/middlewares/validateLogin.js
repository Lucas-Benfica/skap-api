import bcrypt from "bcrypt";
import { db } from "../database/databaseConnection.js"
import { NotFoundError } from "../errors/notFound-error.js";
import { UnauthorizedError } from "../errors/Unauthorized-Error.js";


export async function validateLogin(req, res, next) {
    const { email, password } = req.body;

    const response = await db.query(`SELECT * FROM users WHERE email=$1 LIMIT 1;`, [email]);

    if (response.rowCount === 0) throw NotFoundError("Email does not exist");

    const passwordMatch = bcrypt.compareSync(password, response.rows[0].password);
    if (!passwordMatch) throw UnauthorizedError("Incorrect password");

    res.locals.userData = response.rows[0];
    next();

}