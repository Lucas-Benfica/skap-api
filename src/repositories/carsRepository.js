import { db } from "../database/databaseConnection.js";

export async function carList() {
    const result = db.query(`
    SELECT c.*,
    jsonb_agg(p.photo) AS photos
    FROM cars c
    LEFT JOIN photos p ON c.id = p."carId"
    GROUP BY c.id;
    `);
    return result;
}

export async function carById(id) {
    openAd(id);
    const result = db.query(`
    SELECT c.*,
    jsonb_agg(p.photo) AS photos,
    jsonb_build_object('name', u.name, 'email', u.email, 'phoneNumber', u."phoneNumber") AS seller
    FROM cars c
    LEFT JOIN photos p ON c.id = p."carId"
    LEFT JOIN users u ON c."userId" = u.id
    WHERE c.id = $1
    GROUP BY c.id, u.name, u.email, u."phoneNumber";
    `, [id]);
    return result;
}

export async function openAd(id) {
    return db.query(`UPDATE cars SET views = views + 1 WHERE "id" = $1;`, [id]);
}

export async function createCar(carData) {
    const result = await db.query(insertCarQuery, [
        carData.userId,
        carData.name,
        carData.category,
        carData.description,
        carData.brand,
        carData.engine,
        carData.plate,
        carData.city,
        carData.state,
        carData.year,
        carData.km,
        carData.transmission,
        carData.fuel,
        carData.color,
        carData.price
      ]
      );
    return result.rows[0].id;
}

export async function insertPhotos(carId, photoArray) {
    const insertPhotoQuery = `INSERT INTO photos ("carId", photo) VALUES ($1, $2)`;

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
        "userId",
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
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
    )
    RETURNING id;
`;

export async function ranking(){
    const result = db.query(`
    SELECT c.*,
    jsonb_agg(p.photo) AS photos
    FROM cars c
    LEFT JOIN photos p ON c.id = p."carId"
    GROUP BY c.id
    ORDER BY c.views DESC
    LIMIT 6;
    `);
    return result;
}

