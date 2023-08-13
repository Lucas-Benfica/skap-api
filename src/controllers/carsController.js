import { carByCategory, carById, carList, createCar, insertPhotos, ranking } from "../repositories/carsRepository.js";

export async function postCreateCar(req, res) {
    const { userId } = res.locals;
    const { photos } = req.body;
    const carData = {
      userId: userId,
      ...req.body,
    };
    delete carData.photos;
    try {
      const resultId = await createCar(carData);
      await insertPhotos(resultId, photos);
      res.status(201).send("Car created successfully");
    } catch (err) {
      res.status(500).send({ message: "Error creating car: " + err.message });
    }
  }
  
  export async function getCarList(req, res) {
    try {
      const result = await carList();
      res.status(200).send(result.rows);
    } catch (err) {
      res.status(500).send({ message: "Error retrieving car list: " + err.message });
    }
  }
  
  export async function getCarById(req, res) {
    const { id } = req.params;
    try {
      const result = await carById(id);
      if (result.rows.length === 0) {
        res.status(404).send({ message: "Car not found" });
      } else {
        res.status(200).send(result.rows[0]);
      }
    } catch (err) {
      res.status(500).send({ message: "Error retrieving car by ID: " + err.message });
    }
  }
  
  export async function getCarRanking(req, res) {
    try {
      const result = await ranking();
      res.status(200).send(result.rows);
    } catch (err) {
      res.status(500).send({ message: "Error retrieving car ranking: " + err.message });
    }
  }
  