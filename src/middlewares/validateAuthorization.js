import { db } from "../database/databaseConnection.js";

export async function validateAuth(req, res, next) {

    const { authorization } = req.headers;
    
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);
    
    try {
        const tokenOk = await db.query(`SELECT * FROM session Where token=$1 LIMIT 1`, [token]);
        if (!tokenOk.rows[0]) return res.sendStatus(401);

        res.locals.userId = tokenOk.rows[0].userId;
    } catch (err) {
        res.status(500).send(err.message);
    }

    next();
}