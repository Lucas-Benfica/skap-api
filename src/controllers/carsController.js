import { carById, carBySearch, carList, createCar, insertPhotos, ranking, saleCancel, saleConfirm, saleDelete, updateCar, updatePhotos } from "../repositories/carsRepository.js";

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

  export async function postUpdateCar(req, res) {
    const { carId } = req.params;
    const { userId } = res.locals;
    const { photos } = req.body;
    const carData = {
        userId: userId,
        ...req.body,
    };
    delete carData.photos;
    try {
        await updateCar(carId, carData, userId);
        await updatePhotos(carId, photos); 
        res.status(200).send("Car updated successfully");
    } catch (err) {
        res.status(500).send({ message: "Error updating car: " + err.message });
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

export async function getCarBySearch(req, res) {
  const term = req.query.term;
  try {
    const result = await carBySearch(term);
    res.status(200).send(result.rows);
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

export async function confirmSale(req, res) {
  const { id } = req.params;
  const { sell } = req.body;
  try {
    if (sell === 'confirm') {
        const result = await saleConfirm(id);
        return res.status(200).send("Sale confirmed!");
    }
    if (sell === 'cancel') {
      const result = await saleCancel(id);
      return res.status(200).send("Sale canceled!");
    }
  } catch (err) {
    res.status(500).send({ message: "Error while processing sale: " + err.message });
  }
}

export async function deleteSale(req, res) {
  const { id } = req.params;
  try {
        const result = await saleDelete(id);
        return res.status(200).send("Deletado com sucesso!");

  } catch (err) {
    res.status(500).send({ message: "Error while deleting sale: " + err.message });
  }
}
  