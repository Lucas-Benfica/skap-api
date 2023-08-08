import bcrypt from "bcrypt";
import { db } from "../database/databaseConnection.js"


export async function validateLogin(req, res, next) {
    const { email, password } = req.body;

    try {
        const response = await db.query(`SELECT * FROM users WHERE email=$1 LIMIT 1;`, [email]);

        if (response.rowCount === 0) {
            return res.status(401).send({ message: "Email does not exist" });
        }

        const passwordMatch = bcrypt.compareSync(password, response.rows[0].password);
        if (!passwordMatch) {
            return res.status(401).send({ message: "Incorrect password" });
        }

        res.locals.userData = response.rows[0];
        next();
    } catch (err) {
        res.status(500).send("Error while validating login: " + err.message);
    }
}