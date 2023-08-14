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

export async function carBySearch(term) {
    const result = db.query(`
    SELECT c.*,
    jsonb_agg(p.photo) AS photos
    FROM cars c
    LEFT JOIN photos p ON c.id = p."carId"
    WHERE c.name ILIKE $1 OR c.category ILIKE $1 OR c.brand ILIKE $1
    GROUP BY c.id;
    `, [`%${term}%`]);
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

export async function updateCar(carId, carData, userId) {
    const updateCarQuery = `
        UPDATE cars
        SET
            "userId" = $1,
            "name" = $2,
            "category" = $3,
            "description" = $4,
            "brand" = $5,
            "engine" = $6,
            "plate" = $7,
            "city" = $8,
            "state" = $9,
            "year" = $10,
            "km" = $11,
            "transmission" = $12,
            "fuel" = $13,
            "color" = $14,
            "price" = $15,
            views = $16,
            sold = $17,

        WHERE "id" = $16
        RETURNING "id";
    `;
    
    const result = await db.query(updateCarQuery, [
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
        carData.price,
        carData.views,
        carData.sold
    ]);
    
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

export async function updatePhotos(carId, photoArray) {
    const deletePhotosQuery = `DELETE FROM photos WHERE "carId" = $1`;

    const insertPhotoQuery = `INSERT INTO photos ("carId", photo) VALUES ($1, $2)`;

    try {
        await db.query(deletePhotosQuery, [carId]);

        for (const photo of photoArray) {
            await db.query(insertPhotoQuery, [carId, photo]);
        }
    } catch (error) {
        console.error({ message: 'Error updating photos:', error });
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

export async function saleConfirm(id) {
    return db.query(`UPDATE cars SET sold = true WHERE "id" = $1;`, [id]);
}
export async function saleCancel(id) {
    return db.query(`UPDATE cars SET sold = false WHERE "id" = $1;`, [id]);
}

export async function saleDelete(id) {
    db.query(`DELETE FROM photos WHERE "carId" = $1;`, [id]);
    return db.query(`DELETE FROM cars WHERE "id" = $1;`, [id]);
}