import { db } from "../database/databaseConnection.js";
import { UnauthorizedError } from "../errors/Unauthorized-Error.js";

export async function validateAuth(req, res, next) {

    const { authorization } = req.headers;
    
    const token = authorization?.replace("Bearer ", "");
    if (!token) throw UnauthorizedError("Token is required.");
    
    const tokenOk = await db.query(`SELECT * FROM session Where token=$1 LIMIT 1`, [token]);
    if (!tokenOk.rows[0]) throw UnauthorizedError("Token not found.");

    res.locals.userId = tokenOk.rows[0].userId;

    next();
}