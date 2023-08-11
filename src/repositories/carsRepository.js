import { db } from "../database/databaseConnection.js";

export async function carList(body) {
    const result = db.query(`
    SELECT c.*,
        COALESCE(array_agg(p.photo), ARRAY[]::TEXT[]) AS photos
    FROM cars c 
    LEFT JOIN photos p ON c.id = p.carId
    GROUP BY c.id
    ORDER BY c.id;
    `);
    return result;
}

export async function carById(id) {
    const result = db.query(`
    SELECT c.*,
    COALESCE(array_agg(p.photo), ARRAY[]::TEXT[]) AS photos
    FROM cars c
    LEFT JOIN photos p ON c.id = p.carId
    WHERE c.id = $1
    GROUP BY c.id;
    `, [id]);
    return result;
}

export async function createCar(carData) {
    const result = await client.query(insertCarQuery, carData);
    return result.rows[0].id;
}

export async function insertPhotos(carId, photoArray) {
    const insertPhotoQuery = `INSERT INTO photos (carId, photo) VALUES ($1, $2)`;

    try {
        for (const photo of photoArray) {
            await db.query(insertPhotoQuery, [carId, photo]);
        }
    } catch (error) {
        console.error({ message: 'Error inserting photo:', error });
    }
}

const insertCarQuery = `
    INSERT INTO cars (
        userId,
        name,
        category,
        description,
        brand,
        engine,
        plate,
        city,
        state,
        year,
        km,
        transmission,
        fuel,
        color,
        price
    ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
    )
    RETURNING id;
`;

